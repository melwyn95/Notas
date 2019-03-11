import React, { memo } from 'react';
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
                        key={note.creationTimestamp}
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

const areNotesEqual = (prevProps, nextProps) => {
    const { notes: prevNotes, selection: prevSelection, fetching: prevFetching } = prevProps;
    const { notes: nextNotes, selection: nextSelection, fetching: nextFetching } = nextProps;
    return prevNotes === nextNotes && prevSelection === nextSelection && prevFetching === nextFetching;
}

export default withRouter(memo(NotesContainer, areNotesEqual));