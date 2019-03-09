import React, { useEffect, useState, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import doNoteAction, { GET_NOTE_BY_ID } from '../../actions/doNoteAction';
import idbContext from '../../contexts/idbContext';

import NoteHeaderToolbar from './NoteHeaderToolbar';
import ColorSelector from './NoteHeaderToolbar/ColorSelector';
import RichTextOption from './NoteHeaderToolbar/RichTextOptions';
import Spinner from '../../components/Spinner';

import { getColorFromLabel } from '../../contants/noteColors';

import './styles.css';

const NotePage = ({ match, history }) => {
    const { idb } = useContext(idbContext);
    const [note, setNote] = useState(null);
    const [tools, setTools] = useState(null);

    const [toolTipAnchorEl, setToolTipAnchorEl] = useState(null);
    const iconClick = useCallback((e, tools) => {
        e.stopPropagation();
        setTools(tools);
        setToolTipAnchorEl(e.currentTarget);
    }, []);
    const closeToolTip = useCallback(() => setToolTipAnchorEl(null), []);

    const backButtonClick = useCallback(() => history.replace('/'), []);


    useEffect(() => {
        const noteId = match.params.id;
        doNoteAction(GET_NOTE_BY_ID.operation, { idb, setNote, noteId })
    }, []);

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
                noteColor: note.color,
                ToolsComponent: getToolsComponent(tools, note, setNote)
            }} />
            {note && note.content}

        </div>);
};

const getToolsComponent = (tools, note, setNote) => {
    switch (tools) {
        case 'change_color':
            return <ColorSelector note={note} setNote={setNote} />;
        case 'rich_text_options':
            return <RichTextOption />
        default:
            return null;
    }
}

export default withRouter(NotePage);