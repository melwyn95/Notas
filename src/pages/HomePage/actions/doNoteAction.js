import { RED } from '../../../contants/noteColors';

const CREATE_NOTE = { operation: 'create_note' };

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
        default:
            console.log('INVALID_OPERATION');
    }
}

export {
    CREATE_NOTE,
}

export default doNoteAction;