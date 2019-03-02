const OPEN_RENAME_FOLDER_MODAL = { label: 'Rename', operation: 'open_rename_folder_modal' };
const OPEN_DELETE_FOLDER_MODAL = { label: 'Delete', operation: 'open_delete_folder_modal' };
const RENAME_FOLDER = { operation: 'rename_folder' };
const DELETE_FOLDER = { operation: 'delete_folder' };
const OPEN_SETTINGS = { label: 'Open Settings', operation: 'open_settings' };

const FolderMenuOptions = [ OPEN_RENAME_FOLDER_MODAL, OPEN_DELETE_FOLDER_MODAL, OPEN_SETTINGS ];

const doFolderAction = async (actionName, folder_id, params) => {
	switch (actionName) {
		case OPEN_RENAME_FOLDER_MODAL.operation: {
			const { setOpen } = params;
			setOpen(true);
			break;
		}
		case OPEN_DELETE_FOLDER_MODAL.operation: {
			break;
		}
		case RENAME_FOLDER.operation: {
			const { setOpenedFolder, idb } = params;
			idb
				.then(async (db) => {
					let tx = db.transaction('folders', 'readwrite');
					let store = tx.objectStore('folders');
					let folder = await store.get(folder_id);

					folder.name = 'Rename';
					folder.timestamp = new Date().getTime();
					store.put(folder);
					return tx.complete;
				})
				.then(() => {
					idb.then(async (db) => {
						let tx = db.transaction('folders', 'readonly');
						let store = tx.objectStore('folders');
						let folder = await store.get(folder_id);
						setOpenedFolder(folder);
					});
				});

			break;
		}
		case DELETE_FOLDER.operation: {
			const { setOpenedFolder, idb } = params;
			idb
				.then((db) => {
					let tx = db.transaction('folders', 'readwrite');
					let store = tx.objectStore('folders');
					store.delete(folder_id);
					return tx.complete;
				})
				.then(() => {
					idb.then(async (db) => {
						let tx = db.transaction('folders', 'readonly');
						let store = tx.objectStore('folders');
						let folder = await store.get(1);
						setOpenedFolder(folder);
					});
				});
			break;
		}
		default:
			console.log('INVALID OPERATION');
	}
};

export { FolderMenuOptions };

export default doFolderAction;
