import workerize from 'workerize';

const searchWorker = workerize(`
    export function search(folderId, searchText) {
            
        return new Promise(function (resolve, reject) {
            
            var openRequest = indexedDB.open('notas', 1);

            var dbPromise = new Promise(function (resolve1, reject1) {
                openRequest.onsuccess = function(e) {
                    resolve1(e.target.result);
                };
            }).then(function (db) {
                var transaction = db.transaction(['notes'], 'readonly');
                var store = transaction.objectStore('notes');
                var index = store.index('notesFolderId');
                var keyRange = folderId !== 1 ? IDBKeyRange.only(folderId) : undefined;
                var filteredNoteIds = [];

                var cursorPromise = new Promise(function (resolve2, reject2) {
                    index.openCursor(keyRange).onsuccess = function (event) {
                        var cursor = event.target.result;
                        if(cursor) {
                            var note = cursor.value;
                            if (note.content.indexOf(searchText) >= 0) {
                                filteredNoteIds.push(note.id)
                            }
                            cursor.continue();
                        } else {
                            resolve(filteredNoteIds);
                        }
                    };
                });
                
            });
        });
    }
`);

export default searchWorker;