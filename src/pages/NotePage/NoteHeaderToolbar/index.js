import React from 'react';

import Popper from '@material-ui/core/Popper';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Done from '@material-ui/icons/Done';
import MoreVert from '@material-ui/icons/MoreVert';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import TextFormat from '@material-ui/icons/TextFormat';

import { getColorFromLabel } from '../../../contants/noteColors';

import Circle from './Circle';

const iconSize = color => ({ fontSize: 25, color: getColorFromLabel(color, 'optionColor') });

const NoteHeaderToolbar = ({ anchorEl, iconClick, backButtonClick, ToolsComponent, noteColor }) => {

    return (<div className="container--header-toolbar">
        <KeyboardArrowLeft style={iconSize(noteColor)} onClick={backButtonClick} />
        <Circle color={getColorFromLabel(noteColor, 'circleColor')} onClick={(e) => iconClick(e, 'change_color')} />
        <TextFormat style={{ ...iconSize(noteColor), marginRight: 5 }} onClick={(e) => iconClick(e, 'rich_text_options')} />
        <Undo style={{ ...iconSize(noteColor), marginRight: 5 }} />
        <Redo style={{ ...iconSize(noteColor), marginRight: 5 }} />
        <Done style={{ ...iconSize(noteColor), marginRight: 5, marginLeft: 5 }} />
        <MoreVert style={iconSize(noteColor)} />
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom">
            {ToolsComponent}
        </Popper>
    </div>);
};

export default NoteHeaderToolbar;
