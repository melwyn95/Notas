import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const AddNotes = ({ classes }) => {

    return (<div className="container--add-notes">
        <Fab className={classes.fabRoot}>
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