import React, { useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import IDBContext from '../../../contexts/idbContext';
import doFolderAction, { DELETE_FOLDER } from '../../../actions/doFolderAction';

import './styles.css';

const DeleteFolder = (props) => {
    const { classes, close } = props;
    const { openedFolder, setOpenedFolder } = props;
    const { idb } = useContext(IDBContext);

    return (<Paper className={classes.root}>
        <div className="container--header-label">Delete Folder</div>
        <div className="container--message">{`Delete ${openedFolder.name} ?`}</div>
        <div className="container--buttons">
            <Button
                classes={{ root: classes.buttonRoot }}
                onClick={() => {
                    doFolderAction(DELETE_FOLDER.operation, openedFolder.id, { setOpenedFolder, idb });
                    close();
                }}>
                Delete
            </Button>
            <Button
                classes={{ root: classes.buttonRoot }}
                onClick={close}>
                Cancel
            </Button>
        </div>
    </Paper>);
}

const styles = (theme) => ({
    root: {
        minHeight: 125,
        minWidth: 220,
        height: 125,
    },
    buttonRoot: {
        width: '50%',
    },
});


export default withStyles(styles)(DeleteFolder);