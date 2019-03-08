import React, { useCallback, useMemo } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleOutline from '@material-ui/icons/RadioButtonUnchecked'
import CheckCirlce from '@material-ui/icons/CheckCircleRounded';
import { withStyles } from '@material-ui/core/styles';

const Note = props => {
    const { note, classes, selection, setSelection } = props;

    const checkCallback = useCallback((e, checked) => {
        if (checked) {
            setSelection([...selection, note.id]);
        } else {
            setSelection(selection.filter(noteId => noteId !== note.id));
        }
    }, [selection]);
    const isCheceked = useMemo(() => selection.includes(note.id), [selection]);

    return <Card className={classes.root} style={{ backgroundColor: note.color, position: 'relative' }}>
        <Typography component="h2" className={classes.heading}>
            {note.heading}
        </Typography>
        <Typography component="p" className={classes.content}>
            {note.previewContent}
        </Typography>
        {/* TODO: Time Stamp */}
        <Checkbox style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            padding: '5px',
            }}
            checked={isCheceked}
            icon={<CheckCircleOutline style={{ color: '#1e88e5' }} />}
            checkedIcon={<CheckCirlce style={{ color: '#1e88e5' }} />}
            onChange={checkCallback} />
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
    heading: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: '16px',
    },
    content: {
        color: '#555',
    }
});

export default withStyles(styles)(Note);