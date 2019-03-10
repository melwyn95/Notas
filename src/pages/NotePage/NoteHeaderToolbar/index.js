import React, { useCallback } from 'react';

import Popper from '@material-ui/core/Popper';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Done from '@material-ui/icons/Done';
import MoreVert from '@material-ui/icons/MoreVert';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';

import ColorSelector from '../NoteHeaderToolbar/ColorSelector';

import { getColorFromLabel } from '../../../contants/noteColors';

import Circle from './Circle';

const iconSize = color => ({ fontSize: 25, color: getColorFromLabel(color, 'optionColor') });

const NoteHeaderToolbar = ({ anchorEl, iconClick, backButtonClick, doneButtonClick, noteColor, note, setNote, editorRef }) => {

    const undo = useCallback((e) => {
        e.preventDefault();
        editorRef.current.undo();
    }, []);
    const redo = useCallback((e) => {
        e.preventDefault();
        editorRef.current.redo();
    }, []);

    return (<div className="container--header-toolbar">
        <KeyboardArrowLeft style={iconSize(noteColor)} onClick={backButtonClick} />
        <Circle color={getColorFromLabel(noteColor, 'circleColor')} onClick={(e) => iconClick(e, 'change_color')} />
        <Undo style={{ ...iconSize(noteColor), marginRight: 10 }} onClick={undo} />
        <Redo style={{ ...iconSize(noteColor), marginRight: 10 }} onClick={redo} />
        <Done style={{ ...iconSize(noteColor), marginRight: 10, marginLeft: 5 }} onClick={doneButtonClick}/>
        <MoreVert style={iconSize(noteColor)} />
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom">
            <ColorSelector {...{ note, setNote }} />s
        </Popper>
    </div>);
};

export default NoteHeaderToolbar;
