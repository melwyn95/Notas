import { openDb } from 'idb';

export const initializeIDB = () => {
	return openDb('notas', 1, (upgradeDb) => {
		switch (upgradeDb.oldVersion) {
			case 0:
			case 1:
				let foldersObjectStore = upgradeDb.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
				foldersObjectStore.createIndex('folderNames', 'name', { unique: true });
				foldersObjectStore.add({ count: 0, timestamp: new Date().getTime(), name: 'All Notes', systemFolder: true });
				foldersObjectStore.add({ count: 0, timestamp: new Date().getTime(), name: 'Trash', systemFolder: true });
		}
	});
};
