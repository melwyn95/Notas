import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOff from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles'

const SearchBar = ({ classes }) => {
    const [value, setValue] = useState('');
    const clearValue = useCallback(() => {
        setValue('');
    }, []);

    return (
        <div className="container--search-bar">
            <TextField
                className={classes.root}
                style={{ fontSize: 17 }}
                value={value}
                placeholder="Search notes"
                onChange={(e) => setValue(e.target.value)}
                variant="outlined"
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <IconButton className={classes.marginLeft} >
                            <SearchIcon style={{ fontSize: '17px' }} />
                        </IconButton>
                    </InputAdornment>),
                    endAdornment: (Boolean(value) && <InputAdornment position="end">
                        <IconButton className={classes.marginRight} onClick={clearValue}>
                            <HighlightOff style={{ fontSize: '17px' }} />
                        </IconButton>
                    </InputAdornment>),
                    classes: {
                        input: classes.fontSize,
                        notchedOutline: classes.notchedOutline
                    }
                }} />
        </div>);
}

const styles = theme => ({
    root: {
        maxHeight: 30,
        width: '100%',
        background: '#dcdcdc',
        borderRadius: '5px',
    },
    notchedOutline: {
        border: 0
    },
    marginRight: {
        marginRight: '-20px'
    },
    marginLeft: {
        marginLeft: '-15px'
    },
    fontSize: {
        fontSize: '12px'
    }
});

export default withStyles(styles)(SearchBar); 