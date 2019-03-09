import React from 'react';
import { withRouter } from 'react-router-dom';

import Note from './Note';
import NoNotesFallback from './NoNotesFallback';
import Spinner from '../../../components/Spinner';

const NotesContainer = ({ selection, setSelection, fetching, notes, history }) => {
    return (<div className="container--notes">
        {
            Boolean(notes.length) ?
                notes.map(note =>
                    <Note
                        key={note.creationTimeStamp}
                        note={note}
                        history={history}
                        selection={selection}
                        setSelection={setSelection} />) :
                fetching ?
                    <Spinner /> :
                    <NoNotesFallback />
        }
    </div>);
}

export default withRouter(NotesContainer);