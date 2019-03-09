import React from 'react';

import Paper from '@material-ui/core/Paper';

import Bold from '@material-ui/icons/FormatBold';
import Italic from '@material-ui/icons/FormatItalic';
import Underline from '@material-ui/icons/FormatUnderlined';
import Heading from '@material-ui/icons/FormatSize'
import Quote from '@material-ui/icons/FormatQuote';
import BulletedList from '@material-ui/icons/FormatListBulleted';
import NumberedList from '@material-ui/icons/FormatListNumbered';

import options, { BOLD, ITALIC, UNDERLINE, HEADING, QUOTE, BULLETED_LIST, NUMBERED_LIST, } from '../../../contants/richTextOptions';
import { IconButton } from '@material-ui/core';

const RichTextOptions = props => <Paper>
    {options.map(option => <IconButton style={{ padding: 10 }}>{getIconForOption(option)}</IconButton>)}
</Paper>

const getIconForOption = option => {
    switch (option) {
        case BOLD:
            return <Bold />
        case ITALIC:
            return <Italic />
        case UNDERLINE:
            return <Underline />
        case HEADING:
            return <Heading />
        case QUOTE:
            return <Quote />
        case BULLETED_LIST:
            return <BulletedList />
        case NUMBERED_LIST:
            return <NumberedList />
        default:
            return null;
    }
}

export default RichTextOptions;