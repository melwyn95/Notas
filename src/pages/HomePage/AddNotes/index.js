import React, { useCallback, useContext } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import doNoteAction, { CREATE_NOTE } from '../../../actions/doNoteAction';
import IDBContext from '../../../contexts/idbContext';

const AddNotes = ({ classes, openedFolder, setOpenedFolder, show }) => {
    const { idb } = useContext(IDBContext);
    const createNote = useCallback(() => {
        doNoteAction(CREATE_NOTE.operation, { idb, openedFolder, setOpenedFolder });
    }, []);

    return (show && <div className="container--add-notes">
        <Fab className={classes.fabRoot} onClick={createNote}>
            <AddIcon className={classes.iconRoot} />
        </Fab>
    </div>);
}

const styles = theme => ({
    fabRoot: {
        backgroundColor: '#ffc400',
        '&:hover': {
            backgroundColor: '#ffab00',
        }
    },
    iconRoot: {
        color: '#fff',
        fontSize: '35px',
    }
});

export default withStyles(styles)(AddNotes);