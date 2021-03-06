import React, { useContext } from 'react';
import { debounce } from 'lodash';

import { Editor } from 'slate-react'

import TextView from '../../../components/TextView';
import doNoteAction, { SAVE_NOTE } from '../../../actions/doNoteAction';

import { getReadableTimeStamp } from '../../../application/utils';

import RichTextOption from '../NoteHeaderToolbar/RichTextOptions';
import idbContext from '../../../contexts/idbContext';

const saveNote = debounce((idb, value, note, setNote) => {
    doNoteAction(SAVE_NOTE.operation, { idb, value, note, setNote });
}, 600);

const NoteBody = ({ editorRef, value, setValue, note, wordCount, setNote }) => {
    const { idb } = useContext(idbContext);

    const onKeyDown = (event, editor, next) => {
        return next()
    }

    const renderNode = (props, editor, next) => {
        const { attributes, children, node } = props

        switch (node.type) {
            case 'block-quote':
                return <blockquote {...attributes}>{children}</blockquote>
            case 'bulleted-list':
                return <ul {...attributes}>{children}</ul>
            case 'heading-two':
                return <h2 {...attributes}>{children}</h2>
            case 'list-item':
                return <li {...attributes}>{children}</li>
            case 'numbered-list':
                return <ol {...attributes}>{children}</ol>
            default:
                return next()
        }
    }

    const renderMark = (props, editor, next) => {
        const { children, mark, attributes } = props

        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
                return next()
        }
    }

    return <>
        <RichTextOption {...{ value, editorRef, note }} />
        <div className="container--info">
            <TextView className="text-view-content">{getReadableTimeStamp(note.lastModifiedTimestamp)}</TextView>
            <TextView className="text-view-content--separator">|</TextView>
            <TextView className="text-view-content">{`${wordCount} words`}</TextView>
        </div>
        <Editor
            spellCheck
            autoFocus
            style={{
                height: 'calc(100% - 50px)',
                padding: '5px',
                boxSizing: 'border-box',
                overflow: 'auto',
            }}
            placeholder="Enter your note..."
            ref={editor => editorRef.current = editor}
            value={value}
            onChange={({ value }) => {
                saveNote(idb, value, note, setNote);
                setValue(value)
            }
            }
            onKeyDown={onKeyDown}
            renderNode={renderNode}
            renderMark={renderMark}
        />
    </>;
}

export default NoteBody;
