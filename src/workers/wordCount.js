import workerize from 'workerize';

const worker = workerize(`
    export function wordCount(noteId) {
            
        return new Promise(function (resolve, reject) {
            
            var openRequest = indexedDB.open('notas', 1);

            var dbPromise = new Promise(function (resolve1, reject1) {
                openRequest.onsuccess = function(e) {
                    resolve1(e.target.result);
                };
            }).then(function (db) {
                var transaction = db.transaction(['notes'], 'readonly');
                var store = transaction.objectStore('notes');

                var getRequest = store.get(noteId);
                getRequest.onsuccess = function (e) {
                    var note = e.target.result;
                    var words = note.content.split(/\\s+/g).filter(w => w !== '');
                    resolve(words.length);
                }
                getRequest.onerror = function (e) { reject(e.target.result); };
            });
        });

    }
`);

export default worker;