import React, { useContext } from 'react';

import Paper from "@material-ui/core/Paper";

import Circle from './Circle';

import colors from '../../../contants/noteColors'

import doNoteAction, { CHANGE_NOTE_COLOR } from '../../../actions/doNoteAction';
import idbContext from '../../../contexts/idbContext';

const ColorSelector = ({ note, setNote }) => {
    const { idb } = useContext(idbContext);
    const colorOptions = colors.filter(option => option.label !== note.color);
    const changeNoteColor = (color) => doNoteAction(CHANGE_NOTE_COLOR.operation, { idb, setNote, note, color });

    return (<Paper style={{ display: 'flex', padding: 5 }}>
        {colorOptions.map(option => <Circle key={option.label} color={option.circleColor} onClick={() => changeNoteColor(option.label)} />)}
    </Paper>);
}

export default ColorSelector;