import React from 'react';

import Note from './Note';
import NoNotesFallback from './NoNotesFallback';
import Spinner from '../../../components/Spinner';

const NotesContainer = ({ selection, setSelection, fetching, notes }) => {
    return (<div className="container--notes">
        {
            Boolean(notes.length) ?
                notes.map(note => <Note
                    key={note.creationTimeStamp}
                    note={note}
                    selection={selection}
                    setSelection={setSelection} />) :
                fetching ?
                    <Spinner /> :
                    <NoNotesFallback />
        }
    </div>);
}

export default NotesContainer;