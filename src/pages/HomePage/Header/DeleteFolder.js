import React, { useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import IDBContext from '../../../contexts/idbContext';

import doFolderAction, { DELETE_FOLDER } from '../../../actions/doFolderAction';

const DeleteFolder = (props) => {
    const { classes, close } = props;
    const { openedFolder, setOpenedFolder } = props;
    const { idb } = useContext(IDBContext);

    return (<Paper className={classes.root}>
        <div>Delete Folder</div>
        <div>{`Delete ${openedFolder.name} ?`}</div>
        <Button
            onClick={() => {
                doFolderAction(DELETE_FOLDER.operation, openedFolder.id, { setOpenedFolder, idb });
                close();
            }
            }>
            Delete
        </Button>
        <Button
            onClick={close}>
            Cancel
        </Button>
    </Paper>);
}

const styles = (theme) => ({
    root: {
        height: 150,
        width: 250
    },
});


export default withStyles(styles)(DeleteFolder);