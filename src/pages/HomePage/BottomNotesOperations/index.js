import React from 'react';

import Folder from '@material-ui/icons/FolderOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const BottomNotesOperations = ({ classes, show }) => {

    return (<div className="container--bottom-toolbar" style={(show ? {} : { height: 0 })}>
        <div className="container--bottom-tool-button">
            <Button className={classes.buttonRoot}>
                <Folder />
                <span className="bottom-button-text">Move to</span>
            </Button>
        </div>
        <div className="container--bottom-tool-button">
            <Button className={classes.buttonRoot}>
                <Delete />
                <span className="bottom-button-text">Delete</span>
            </Button>
        </div>
    </div>);
};

const styles = theme => ({
    buttonRoot: {
        width: '100%',
        height: '100%',
    }
});

export default withStyles(styles)(BottomNotesOperations);