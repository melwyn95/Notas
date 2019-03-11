import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import doNoteAction, { GET_NOTE_BY_ID, SAVE_NOTE } from '../../actions/doNoteAction';
import idbContext from '../../contexts/idbContext';

import NoteHeaderToolbar from './NoteHeaderToolbar';
import NoteBody from './NoteBody';
import Spinner from '../../components/Spinner';

import { getColorFromLabel } from '../../contants/noteColors';
import wordCountWorker from '../../workers/wordCount';


import './styles.css';

const NotePage = ({ match, history }) => {
    const { idb } = useContext(idbContext);

    const [note, setNote] = useState(null);
    const [value, setValue] = useState(null);
    const [toolTipAnchorEl, setToolTipAnchorEl] = useState(null);
    const [wordCount, setWordCount] = useState(-1);

    const iconClick = useCallback((e, tools) => {
        e.stopPropagation();
        setToolTipAnchorEl(e.currentTarget);
    }, []);
    const closeToolTip = useCallback(() => setToolTipAnchorEl(null), []);
    const backButtonClick = useCallback(() => history.replace('/'), []);
    const doneButtonClick = useCallback(() => {
        doNoteAction(SAVE_NOTE.operation, { idb, note, value })
        history.replace('/');
    }, [note, value]);

    useEffect(() => {
        const noteId = match.params.id;
        doNoteAction(GET_NOTE_BY_ID.operation, { idb, setNote, setValue, noteId })
    }, []);

    useEffect(() => {
        if (note) {
            wordCountWorker.wordCount(note.id).then((countWords) => {
                setWordCount(countWords);
            });
        }
    }, [note]);

    const editorRef = useRef();

    if (!note) {
        return <Spinner />;
    }

    return (
        <div
            className="container--note-page"
            style={{ backgroundColor: getColorFromLabel(note.color, 'value') }}
            onClick={closeToolTip}>
            <NoteHeaderToolbar {...{
                anchorEl: toolTipAnchorEl,
                iconClick,
                backButtonClick,
                doneButtonClick,
                noteColor: note.color,
                note,
                setNote,
                editorRef,
            }} />
            <div className="container--note-body">
                <NoteBody  {...{
                    value,
                    setValue,
                    editorRef,
                    note,
                    wordCount,
                }} />
            </div>
        </div>);
};

export default withRouter(NotePage);