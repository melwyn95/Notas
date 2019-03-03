import { RED } from '../../../contants/noteColors';

const CREATE_NOTE = { operation: 'create_note' };
const GET_ALL_NOTES = { operation: 'get_all_notes' };

const doNoteAction = (action, params) => {
    switch (action) {
        case CREATE_NOTE.operation: {
            const { idb, openedFolder, setOpenedFolder } = params;
            const timestamp = new Date().getTime();
            idb
                .then((db) => {
                    let tx = db.transaction('notes', 'readwrite');
                    let store = tx.objectStore('notes');
                    store.put({
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
                        let range = IDBKeyRange.only(openedFolder.id);
                        if (openedFolder.id === 1) {
                            range = undefined;
                        }
                        return store.openCursor(range);
                    })
                    .then(function cursorLoop(cursor) {
                        if (!cursor) {
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
        default:
            console.log('INVALID_OPERATION');
    }
}

export {
    CREATE_NOTE,
    GET_ALL_NOTES,
}

export default doNoteAction;