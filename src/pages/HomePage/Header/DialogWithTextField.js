import React, { useState, useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import doFolderAction, { RENAME_FOLDER, CREATE_FOLDER } from '../../../actions/doFolderAction';
import IDBContext from '../../../contexts/idbContext';

import './styles.css';

const DialogWithTextField = (props) => {
	const { classes } = props;
	const { openedFolder, close, setOpenedFolder, create, setSnackError } = props;
	const headerLabel = (create && 'New Folder') || 'Rename Folder';
	const operation = (create && CREATE_FOLDER.operation) || RENAME_FOLDER.operation

	const { idb } = useContext(IDBContext);
	const [value, setValue] = useState(create ? 'Unnamed Folder' : openedFolder.name);

	return (
		<Paper className={classes.root}>
			<div className="container--header-label">{headerLabel}</div>
			<TextField
				value={value}
				fullWidth
				InputProps={{
					classes: {
						input: classes.rootInput,
						notchedOutline: classes.notchedOutline
					}
				}}
				onChange={(e) => setValue(e.target.value)}
				variant="outlined"
			/>
			<div className="container--buttons">
				<Button classes={{ root: classes.buttonRoot }} onClick={() => {
					doFolderAction(operation, openedFolder.id, { setOpenedFolder, idb, value, close, setSnackError });
				}}>Ok</Button>
				<Button classes={{ root: classes.buttonRoot }} onClick={close}> Cancel</Button>
			</div>
		</Paper>
	);
};

const styles = (theme) => ({
	root: {
		minHeight: 125,
		minWidth: 220,
		height: 125,
	},
	rootInput: {
		backgroundColor: '#eee',
		padding: 10,
		margin: '0 10px',
	},
	buttonRoot: {
		width: '50%',
	},
	notchedOutline: {
		border: 0,
	}
});

export default withStyles(styles)(DialogWithTextField);
