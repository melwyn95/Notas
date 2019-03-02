import React, { useEffect, useContext, useState } from 'react';

import IDBContext from '../../../contexts/idbContext';

import Note from './Note';
import NoNotesFallback from './NoNotesFallback';
import Spinner from '../../../components/Spinner';

const NotesContainer = props => {
    const { openedFolder } = props;
    const { idb } = useContext(IDBContext);
    const [notes, setNotes] = useState([]);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const folderNotes = [];
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
    }, [openedFolder.id]);

    return (<div className="container--notes">
        {
            Boolean(notes.length) ? 
                notes.map(note => <Note key={note.creationTimeStamp} note={note} />) :
                fetching ?
                    <Spinner /> :
                    <NoNotesFallback />
        }
    </div>);
}

export default NotesContainer;