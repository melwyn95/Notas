import { RED } from '../../../contants/noteColors';

const CREATE_NOTE = { operation: 'create_note' };
const GET_ALL_NOTES = { operation: 'get_all_notes' };
const DELETE_NOTES = { operation: 'delete_notes' }

const doNoteAction = (action, params) => {
    switch (action) {
        case CREATE_NOTE.operation: {
            const { idb, openedFolder, setOpenedFolder } = params;
            const timestamp = new Date().getTime();
            idb
                .then(async (db) => {
                    let tx = db.transaction(['notes', 'folders'], 'readwrite');
                    let notesStore = tx.objectStore('notes');
                    let foldersStore = tx.objectStore('folders');

                    let openedFolderFromDB = await foldersStore.get(openedFolder.id);
                    openedFolderFromDB.count += 1;

                    foldersStore.put(openedFolderFromDB);

                    notesStore.add({
                        color: RED.value,
                        content: '',
                        previewContent: '',
                        heading: '',
                        folderId: openedFolder.id,
                        creationTimestamp: timestamp,
                        lastModifiedTimestamp: timestamp,
                    });
                    return tx.complete;
                })
                .then(() => {
                    setOpenedFolder(openedFolder);
                });
            break;
        }
        case GET_ALL_NOTES.operation: {
            const { idb, openedFolder, setFetching, setNotes } = params;
            const folderNotes = [];
            if (openedFolder) {
                idb
                    .then((db) => {
                        setFetching(true);
                        let tx = db.transaction('notes', 'readonly');
                        let store = tx.objectStore('notes');
                        let index = store.index('notesFolderId');
                        let range = IDBKeyRange.only(openedFolder.id);
                        if (openedFolder.id === 1) {
                            range = undefined;
                        }
                        return index.openCursor(range);
                    })
                    .then(function cursorLoop(cursor) {
                        if (!cursor ||
                            (cursor.value.folderId === 2 && openedFolder.id !== 2)) {
                            // Also exclude trash notes
                            return;
                        }
                        const { value } = cursor;
                        folderNotes.push(value);
                        return cursor.continue().then(cursorLoop);
                    })
                    .then(() => {
                        setNotes(folderNotes);
                        setFetching(false);
                    });
            }
            break;
        }
        case DELETE_NOTES.operation: {
            const { idb, selection, openedFolder, setOpenedFolder } = params;
            idb
                .then(async (db) => {
                    let tx = db.transaction(['notes', 'folders'], 'readwrite');
                    let notesObjectStore = tx.objectStore('notes');
                    let foldersObjectStore = tx.objectStore('folders');

                    let trashFolder = await foldersObjectStore.get(2);

                    if (openedFolder.id === 2) {
                        // Delete Permanently
                        selection.map(noteId => notesObjectStore.delete(noteId));
                        trashFolder.count -= selection.length;
                    } else {
                        // Move to trash
                        trashFolder.count += selection.length;

                        let currentlyOpenedFolder = await foldersObjectStore.get(openedFolder.id);
                        currentlyOpenedFolder.count -= selection.length;
                        foldersObjectStore.put(currentlyOpenedFolder);

                        selection.map(async (noteId) => {
                            let note = await notesObjectStore.get(noteId);
                            note.folderId = 2;
                            notesObjectStore.put(note);
                        });
                    }
                    foldersObjectStore.put(trashFolder);

                    return tx.complete;
                })
                .then(() => {
                    idb
                        .then(async (db) => {
                            let tx = db.transaction('folders', 'readonly');
                            let store = tx.objectStore('folders');
                            let folder = await store.get(openedFolder.id);
                            setOpenedFolder(folder);
                        });
                });
            break;
        }
        default:
            console.log('INVALID_OPERATION');
    }
}

export {
    CREATE_NOTE,
    GET_ALL_NOTES,
    DELETE_NOTES,
}

export default doNoteAction;