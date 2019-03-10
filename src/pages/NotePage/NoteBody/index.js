import React, { useContext } from 'react';
import { debounce } from 'lodash';

import { Editor } from 'slate-react'

import doNoteAction, { SAVE_NOTE } from '../../../actions/doNoteAction';

import RichTextOption from '../NoteHeaderToolbar/RichTextOptions';
import idbContext from '../../../contexts/idbContext';

const saveNote = debounce((idb, value, note, setValue, setNote) => {
    doNoteAction(SAVE_NOTE.operation, { idb, value, note, setValue, setNote });
}, 1000);

const NoteBody = ({ editorRef, value, setValue, note }) => {
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
        <Editor
            spellCheck
            autoFocus
            style={{
                height: 'calc(100% - 50px)',
                padding: '10px',
                boxSizing: 'border-box',
                overflow: 'auto',
            }}
            placeholder="Enter your note..."
            ref={editor => editorRef.current = editor}
            value={value}
            onChange={({ value }) => {
                saveNote(idb, value, note);
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
