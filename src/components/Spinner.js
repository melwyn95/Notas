import React from 'react'; 
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropsTypes from 'prop-types';

const Spinner = props => {
    const {classes} = props;
    return (<div style={{
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <CircularProgress className={classes.root} {...props}/>
        </div>);
}

Spinner.propTypes = {
    classes: PropsTypes.object,
};

// TODO: fix this
const styles = theme => ({
    root: {
        color: '#969696',
    }
});

export default withStyles(styles)(Spinner);