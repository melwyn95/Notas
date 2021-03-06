import React, { useCallback, useMemo } from 'react';

import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleOutline from '@material-ui/icons/RadioButtonUnchecked'
import CheckCirlce from '@material-ui/icons/CheckCircleRounded';
import { withStyles } from '@material-ui/core/styles';

import { getReadableTimeStamp } from '../../../application/utils';
import TextView from '../../../components/TextView';
import { getColorFromLabel } from '../../../contants/noteColors';

const cardRootStyle = ({ color }) => ({ backgroundColor: getColorFromLabel(color, 'value'), position: 'relative' });

const Note = props => {
    const { note, note: { previewContent }, classes, selection, setSelection, history } = props;

    const isCheceked = useMemo(() => selection.includes(note.id), [selection, note.id]);

    const checkCallback = useCallback((e) => {
        e.stopPropagation();
        if (isCheceked) {
            setSelection(selection.filter(noteId => noteId !== note.id));
        } else {
            setSelection([...selection, note.id]);
        }
    }, [selection, note.id]);
    const noteClicked = useCallback(() => {
        history.push(`/note/${note.id}`);
    }, [note.id])

    return <Card className={classes.root} style={cardRootStyle(note)} onClick={noteClicked}>
        <p className={classes.content}>
            <strong style={{ color: '#000' }}>{previewContent.substr(0, 20)}</strong>
            {previewContent.substr(20)}
        </p>
        <div className="time-stamp-wrappper">
            <TextView className="text-view-content">{getReadableTimeStamp(note.lastModifiedTimestamp)}</TextView>
        </div>
        <Checkbox style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            padding: '5px',
            zIndex: '2',
        }}
            checked={isCheceked}
            icon={<CheckCircleOutline style={{ color: '#1e88e5' }} />}
            checkedIcon={<CheckCirlce style={{ color: '#1e88e5' }} />}
            onClick={checkCallback} />
    </Card>
}

const styles = theme => ({
    root: {
        height: '180px',
        width: '140px',
        boxSizing: 'border-box',
        padding: '10px',
        margin: '5px',
    },
    content: {
        color: '#555',
        fontSize: '14px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        height: 'calc(100% - 35px)',
    }
});

export default withStyles(styles)(Note);