import React, { useMemo } from 'react';

import Paper from '@material-ui/core/Paper';

import Bold from '@material-ui/icons/FormatBold';
import Italic from '@material-ui/icons/FormatItalic';
import Underline from '@material-ui/icons/FormatUnderlined';
import Heading from '@material-ui/icons/FormatSize'
import Quote from '@material-ui/icons/FormatQuote';
import BulletedList from '@material-ui/icons/FormatListBulleted';
import NumberedList from '@material-ui/icons/FormatListNumbered';

import { getColorFromLabel } from '../../../contants/noteColors';

import options, { marks, BOLD, ITALIC, UNDERLINE, HEADING, QUOTE, BULLETED_LIST, NUMBERED_LIST } from '../../../contants/richTextOptions';
import { IconButton } from '@material-ui/core';

const defaultStyle = { fontSize: 20 }
const activeStyle = { color: '#000', ...defaultStyle };
const DEFAULT_NODE = 'paragraph';

const hasMark = (type, value) => value.activeMarks.some(mark => mark.type === type);

const hasBlock = (type, value) => value.blocks.some(node => node.type === type);

const RichTextOptions = ({ value, editorRef, note }) => {

    const noteColor = useMemo(() => getColorFromLabel(note.color, 'circleColor'), [note])

    const onClickMark = (event, type) => {
        event.preventDefault()
        editorRef.current.toggleMark(type)
    }

    const onClickBlock = (event, type) => {
        event.preventDefault()
        if (!editorRef.current) {
            return;
        }

        const { value } = editorRef.current;
        const { document } = value

        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = hasBlock(type, value)
            const isList = hasBlock('list-item', value)

            if (isList) {
                editorRef.current
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else {
                editorRef.current.setBlocks(isActive ? DEFAULT_NODE : type)
            }
        } else {
            const isList = hasBlock('list-item', value)
            const isType = value.blocks.some(block => {
                return !!document.getClosest(block.key, parent => parent.type === type)
            })

            if (isList && isType) {
                editorRef.current
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list')
            } else if (isList) {
                editorRef.current
                    .unwrapBlock(
                        type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
                    )
                    .wrapBlock(type)
            } else {
                editorRef.current.setBlocks('list-item').wrapBlock(type)
            }
        }
    }

    return <Paper style={{
        display: 'flex',
        justifyContent: 'space-around',
        boxShadow: 'none',
        margin: '5px 0'
    }}>

        {
            options.map(option =>
                <IconButton
                    style={{ padding: 10 }}
                    onClick={e => marks.includes(option) ? onClickMark(e, option) : onClickBlock(e, option)}>
                    {getIconForOption(option, marks.includes(option), value)}
                </IconButton>)
        }
        <style dangerouslySetInnerHTML={
            {
                __html: `
                    blockquote {
                        border-left: 2px solid ${noteColor};
                    }
                `
            }
        } >
        </style>
    </Paper>;
}

const getIconForOption = (option, isMark, value) => {
    let isActive = isMark ? hasMark(option, value) : hasBlock(option, value);
    if (['numbered-list', 'bulleted-list'].includes(option)) {
        const { document, blocks } = value;

        if (blocks.size > 0) {
            const parent = document.getParent(blocks.first().key);
            isActive = hasBlock('list-item', value) && parent && parent.type === option;
        }
    }
    switch (option) {
        case BOLD:
            return <Bold style={isActive ? activeStyle : defaultStyle} />
        case ITALIC:
            return <Italic style={isActive ? activeStyle : defaultStyle} />
        case UNDERLINE:
            return <Underline style={isActive ? activeStyle : defaultStyle} />

        case HEADING:
            return <Heading style={isActive ? activeStyle : defaultStyle} />
        case QUOTE:
            return <Quote style={isActive ? activeStyle : defaultStyle} />
        case BULLETED_LIST:
            return <BulletedList style={isActive ? activeStyle : defaultStyle} />
        case NUMBERED_LIST:
            return <NumberedList style={isActive ? activeStyle : defaultStyle} />
        default:
            return null;
    }
}

export default RichTextOptions;