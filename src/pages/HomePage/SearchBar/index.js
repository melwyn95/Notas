import React, { useState, useCallback, useContext } from 'react';
import { debounce } from 'lodash';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOff from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles'

import idbContext from '../../../contexts/idbContext';

import searchWorker from '../../../workers/search';
import doNoteAction, { GET_NOTES_BY_IDS } from '../../../actions/doNoteAction';

const searchNotes = debounce(async (folderId, searchText, idb, setNotes) => {
    const noteIds = await searchWorker.search(folderId, searchText);
    doNoteAction(GET_NOTES_BY_IDS.operation, { idb, noteIds, setNotes })
}, 400);

const SearchBar = ({ classes, openedFolder, setNotes }) => {
    const { idb } = useContext(idbContext);
    const [value, setValue] = useState('');
    const clearValue = useCallback(() => {
        searchNotes(openedFolder.id, '', idb, setNotes);
        setValue('');
    }, [openedFolder]);

    return (
        <div className="container--search-bar">
            <TextField
                className={classes.root}
                style={{ fontSize: 17 }}
                value={value}
                placeholder="Search notes"
                onChange={(e) => {
                    searchNotes(openedFolder.id, e.target.value, idb, setNotes);
                    setValue(e.target.value)
                }}
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
        minHeight: 30,
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
        fontSize: '12px',
        padding: 0,
        minHeight: 30,
    }
});

export default withStyles(styles)(SearchBar); 