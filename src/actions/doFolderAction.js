const OPEN_RENAME_FOLDER_MODAL = { label: 'Rename', operation: 'open_rename_folder_modal' };
const OPEN_DELETE_FOLDER_MODAL = { label: 'Delete', operation: 'open_delete_folder_modal' };
const OPEN_CREATE_FOLDER_MODAL = { operation: 'open_create_folder_modal' };
const RENAME_FOLDER = { operation: 'rename_folder' };
const DELETE_FOLDER = { operation: 'delete_folder' };
const CREATE_FOLDER = { operation: 'create_foler' };
const OPEN_SETTINGS = { label: 'Open Settings', operation: 'open_settings' };
const GET_ALL_NOTES_FOLDER = { operation: 'get_all_notes_folder' }
const GET_ALL_FOLDERS = { operation: 'get_all_folders' };

const FolderMenuOptions = [OPEN_RENAME_FOLDER_MODAL, OPEN_DELETE_FOLDER_MODAL];

const doFolderAction = async (actionName, folder_id, params) => {
	switch (actionName) {
		case OPEN_RENAME_FOLDER_MODAL.operation: {
			const { setOpen } = params;
			setOpen(RENAME_FOLDER.operation);
			break;
		}
		case OPEN_DELETE_FOLDER_MODAL.operation: {
			const { setOpen } = params;
			setOpen(DELETE_FOLDER.operation);
			break;
		}
		case RENAME_FOLDER.operation: {
			const { setOpenedFolder, idb, value, close, setSnackError } = params;
			idb
				.then(async (db) => {
					let tx = db.transaction('folders', 'readwrite');
					let store = tx.objectStore('folders');
					let folder = await store.get(folder_id);

					folder.name = value;
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
						close();
					});
				})
				.catch(() => {
					setSnackError('A folder with the same name already exists.');
				});

			break;
		}
		case DELETE_FOLDER.operation: {
			const { setOpenedFolder, idb } = params;
			idb
				.then(async (db) => {
					let tx = db.transaction(['folders', 'notes'], 'readwrite');
					let foldersStore = tx.objectStore('folders');
					let notesStore = tx.objectStore('notes');
					let index = notesStore.index('notesFolderId');
					let range = IDBKeyRange.only(folder_id);
					
					await index.openCursor(range).then(function cursorLoop(cursor) {
						if (!cursor) {
							return;
						}
						cursor.delete(cursor.primaryKey);
						return cursor.continue().then(cursorLoop);
					});

					foldersStore.delete(folder_id);
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
		case OPEN_CREATE_FOLDER_MODAL.operation: {
			const { setShowDropdown, setOpen } = params;
			setShowDropdown(false);
			setOpen(CREATE_FOLDER.operation);
			break;
		}
		case CREATE_FOLDER.operation: {
			const { idb, setOpenedFolder, value, close, setSnackError } = params;
			idb
				.then((db) => {
					let tx = db.transaction('folders', 'readwrite');
					let store = tx.objectStore('folders');
					const timestamp = new Date().getTime();
					store.add({
						name: value,
						count: 0,
						timestamp
					});
					return tx.complete;
				})
				.then(() => {
					idb.then(async (db) => {
						let tx = db.transaction('folders', 'readonly');
						let store = tx.objectStore('folders');
						let index = store.index('folderNames');
						let folder = await index.get(value);
						setOpenedFolder(folder);
						close();
					});
				})
				.catch(() => {
					setSnackError('A folder with the same name already exists.');
				});
			break;
		}
		case GET_ALL_NOTES_FOLDER.operation: {
			const { idb, setOpenedFolder } = params;
			idb
				.then(async (db) => {
					let tx = db.transaction('folders', 'readonly');
					let store = tx.objectStore('folders');
					let folder = await store.get(folder_id);
					setOpenedFolder(folder);
				});
			break;
		}
		case GET_ALL_FOLDERS.operation: {
			const { idb, setFolders, foldersToExclude = [] } = params;
			const idbFolders = [];
			return idb
				.then((db) => {
					let tx = db.transaction('folders', 'readonly');
					let store = tx.objectStore('folders');
					return store.openCursor();
				})
				.then(function loopFolders(cursor) {
					if (!cursor) {
						return;
					}
					if (foldersToExclude.includes(cursor.value.id)) {
						return cursor.continue().then(loopFolders);
					}
					let { value } = cursor;
					idbFolders.push(value);
					return cursor.continue().then(loopFolders);
				})
				.then(() => {
					setFolders(idbFolders);
				});
		}
		default:
			console.log('INVALID_OPERATION');
	}
};

export {
	FolderMenuOptions,
	OPEN_RENAME_FOLDER_MODAL,
	OPEN_DELETE_FOLDER_MODAL,
	OPEN_CREATE_FOLDER_MODAL,
	RENAME_FOLDER,
	DELETE_FOLDER,
	OPEN_SETTINGS,
	CREATE_FOLDER,
	GET_ALL_NOTES_FOLDER,
	GET_ALL_FOLDERS
};

export default doFolderAction;
