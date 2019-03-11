import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

import defaultContent from '../contants/noteDefaultValue.json';

import { WHITE } from '../contants/noteColors';

const CREATE_NOTE = { operation: 'create_note' };
const GET_ALL_NOTES = { operation: 'get_all_notes' };
const DELETE_NOTES = { operation: 'delete_notes' };
const MOVE_NOTES = { operation: 'move_notes' };

const GET_NOTE_BY_ID = { operation: 'get_note_by_id' };
const CHANGE_NOTE_COLOR = { operation: 'change_note_color' };
const SAVE_NOTE = { operation: 'save_note' };
const GET_NOTES_BY_IDS = { operation: 'get_notes_by_ids' };

const updateOpenedFolder = async (db, folderId, setOpenedFolder) => {
	let tx = db.transaction('folders', 'readonly');
	let foldersStore = tx.objectStore('folders');
	let folder = await foldersStore.get(folderId);
	setOpenedFolder(folder);
};

const doNoteAction = (action, params) => {
	switch (action) {
		case CREATE_NOTE.operation: {
			const { idb, openedFolder, setOpenedFolder, changeRoute } = params;
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
						color: WHITE.label,
						content: '',
						previewContent: '',
						structuredContent: defaultContent,
						heading: '',
						folderId: openedFolder.id,
						creationTimestamp: timestamp,
						lastModifiedTimestamp: timestamp
					});
					return tx.complete;
				})
				.then(() => {
					setOpenedFolder(openedFolder);
					idb.then(async db => {
						let tx = db.transaction(['notes'], 'readonly');
						let store = tx.objectStore('notes');
						let index = store.index('notesCreationTimestamp');
						let note = await index.get(timestamp);
						changeRoute(note.id);
					});
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
						if (!cursor || (cursor.value.folderId === 2 && openedFolder.id !== 2)) {
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
						selection.map((noteId) => notesObjectStore.delete(noteId));
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
					idb.then((db) => updateOpenedFolder(db, openedFolder.id, setOpenedFolder));
				});
			break;
		}
		case MOVE_NOTES.operation: {
			const { idb, selection, openedFolder, setOpenedFolder, moveToFolderId } = params;
			idb
				.then(async (db) => {
					let tx = db.transaction(['folders', 'notes'], 'readwrite');
					let notesStore = tx.objectStore('notes');
					let foldersStore = tx.objectStore('folders');

					let srcFolder = await foldersStore.get(openedFolder.id);
					let dstFolder = await foldersStore.get(moveToFolderId);

					srcFolder.count -= selection.length;
					dstFolder.count += selection.length;

					selection.map(async (noteId) => {
						let note = await notesStore.get(noteId);
						note.folderId = dstFolder.id;
						notesStore.put(note);
					});

					foldersStore.put(srcFolder);
					foldersStore.put(dstFolder);

					return tx.complete;
				})
				.then(() => {
					idb.then((db) => updateOpenedFolder(db, openedFolder.id, setOpenedFolder));
				});
			break;
		}
		case GET_NOTE_BY_ID.operation: {
			const { noteId, idb, setNote, setValue } = params;
			return idb
				.then(async db => {
					let tx = db.transaction(['notes'], 'readonly');
					let store = tx.objectStore('notes');
					let note = await store.get(Number.parseInt(noteId));
					setValue(Value.fromJSON(note.structuredContent));
					setNote(note);
				});
		}
		case CHANGE_NOTE_COLOR.operation: {
			const { note, idb, setNote, color } = params;
			return idb.then(async (db) => {
				let tx = db.transaction(['notes'], 'readwrite');
				let store = tx.objectStore('notes');
				let dBnote = await store.get(note.id);
				dBnote.color = color;
				store.put(dBnote);
				return tx.complete;
			}).then(() => {
				idb.then(async db => {
					let tx = db.transaction(['notes'], 'readwrite');
					let store = tx.objectStore('notes');
					let dBnote = await store.get(note.id);
					setNote(dBnote);
				})
			});
		}
		case SAVE_NOTE.operation: {
			const { idb, note: { id, folderId }, value, setNote } = params;
			const serializedContent = Plain.serialize(value);
			return idb.then(async db => {
				let tx = db.transaction(['notes', 'folders'], 'readwrite');
				let notesStore = tx.objectStore('notes');
				let foldersStore = tx.objectStore('folders');
				let note = await notesStore.get(id);
				let folder = await foldersStore.get(folderId);
				let timestamp = new Date().getTime();
				note.content = serializedContent;
				note.previewContent = serializedContent.substr(0, 80);
				note.structuredContent = value.toJSON();
				note.lastModifiedTimestamp = timestamp;
				folder.timestamp = timestamp;
				notesStore.put(note);
				foldersStore.put(folder);
				return tx.complete;
			}).then(() => {
				idb.then(async db => {
					let tx = db.transaction(['notes'], 'readonly');
					let notesStore = tx.objectStore('notes');
					let dbNote = await notesStore.get(id);
					setNote(dbNote);
				});
			});
		}
		case GET_NOTES_BY_IDS.operation: {
			const { idb, noteIds, setNotes } = params;
			return idb.then(db => {
				const tx = db.transaction(['notes'], 'readonly');
				const store = tx.objectStore('notes');
				Promise.all(noteIds.map(noteId => store.get(noteId))).then((notes => setNotes(notes)));
			});
		}
		default:
			console.log('INVALID_OPERATION');
	}
};

export {
	CREATE_NOTE,
	GET_ALL_NOTES,
	DELETE_NOTES,
	MOVE_NOTES,

	GET_NOTE_BY_ID,
	CHANGE_NOTE_COLOR,
	SAVE_NOTE,
	GET_NOTES_BY_IDS,
};

export default doNoteAction;
