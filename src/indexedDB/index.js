/* eslint-disable */

import { openDb } from 'idb';
import Plain from 'slate-plain-serializer';
import { WHITE } from '../contants/noteColors';

const DEFAULT_NOTE_TEXT = 'This is supposed to be a long long long note asdasdasdasdadsasddasdasddasd';

const timestamp = new Date().getTime();

export const initializeIDB = () => {
	return openDb('notas', 1, (upgradeDb) => {
		switch (upgradeDb.oldVersion) {
			case 0:
			case 1:
				let foldersObjectStore = upgradeDb.createObjectStore('folders', { keyPath: 'id', autoIncrement: true });
				foldersObjectStore.createIndex('folderNames', 'name', { unique: true });

				foldersObjectStore.add({ count: 1, timestamp: new Date().getTime(), name: 'All Notes', systemFolder: true });
				foldersObjectStore.add({ count: 0, timestamp: new Date().getTime(), name: 'Trash', systemFolder: true });

				let notesObjectStore = upgradeDb.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
				notesObjectStore.createIndex('notesCreationTimestamp', 'creationTimestamp');
				notesObjectStore.createIndex('notesLastModifiedTimestamp', 'lastModifiedTimestamp');
				notesObjectStore.createIndex('notesFolderId', 'folderId');

				// TODO: sort out previewContent issue in Grid View
				notesObjectStore.add(
					{
						color: WHITE.label,
						content: DEFAULT_NOTE_TEXT,
						previewContent: DEFAULT_NOTE_TEXT.substr(0, 80),
						structuredContent: Plain.deserialize(DEFAULT_NOTE_TEXT).toJSON(),
						folderId: 1,
						creationTimestamp: timestamp,
						lastModifiedTimestamp: timestamp,
					});
		}
	});
};
