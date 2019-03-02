import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const Note = props => {
    const { note, classes } = props;

    return <Card className={classes.root}>
        <Typography component="h2" className={classes.heading}>
            {note.heading}
        </Typography>
        <Typography component="p" className={classes.content}>
            {note.previewContent}
        </Typography>
        {/* Time Stamp */}
    </Card>
}

const styles = theme => ({
    root: {
        height: '150px',
        width: '48%',
        boxSizing: 'border-box',
        padding: '10px',
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