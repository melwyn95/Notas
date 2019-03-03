import React, { useCallback, useMemo } from 'react';

import Typography from '@material-ui/core/Typography';
import Clear from '@material-ui/icons/Clear';
import SelectAll from '@material-ui/icons/DoneAll';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

const SelectionHeader = ({ selection, setSelection, notes, classes }) => {
    const clearSelectionCallback = useCallback(() => {
        setSelection([]);
    }, []);

    const selectAllNotes = useCallback(() => {
        if (selection.length === notes.length) {
            setSelection([]);
        } else {
            setSelection(notes.map(note => note.id));
        }
    }, [selection]);

    const allNotesSelected = useMemo(() => notes.length === selection.length, [selection]);

    return (<div className="container--selectionn-header">
        <IconButton onClick={clearSelectionCallback}>
            <Clear />
        </IconButton>
        <Typography component="h2" className={classes.heading}>
            {
                selection.length === 1 ?
                    `1 item selected` :
                    `${selection.length} items selected`
            }
        </Typography>
        <IconButton onClick={selectAllNotes}>
            <SelectAll style={(allNotesSelected ? { color: '#1e88e5' } : {})} />
        </IconButton>
    </div>);
};

const styles = theme => ({
    heading: {
        lineHeight: '50px',
        fontSize: '16px',
        fontWeight: 700,
    }
});

export default withStyles(styles)(SelectionHeader);