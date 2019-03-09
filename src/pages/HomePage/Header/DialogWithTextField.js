import React, { useState, useContext } from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import doFolderAction, { RENAME_FOLDER, CREATE_FOLDER } from '../../../actions/doFolderAction';
import IDBContext from '../../../contexts/idbContext';

const DialogWithTextField = (props) => {
	const { classes } = props;
	const { openedFolder, close, setOpenedFolder, create, setSnackError } = props;
	const headerLabel = (create && 'New Folder') || 'Rename Folder';
	const operation = (create && CREATE_FOLDER.operation) || RENAME_FOLDER.operation

	const { idb } = useContext(IDBContext);
	const [value, setValue] = useState(create ? 'Unnamed Folder' : openedFolder.name);

	return (
		<Paper className={classes.root}>
			<div>{headerLabel}</div>
			<TextField
				value={value}
				className={classes.rootTextField}
				InputProps={{
					classes: {
						root: classes.rootTextField,
						focussed: classes.rootTextField
					}
				}}
				onChange={(e) => setValue(e.target.value)}
				variant="outlined"
			/>
			<Button onClick={() => {
				doFolderAction(operation, openedFolder.id, { setOpenedFolder, idb, value, close, setSnackError });
			}}>Ok</Button>
			<Button onClick={close}> Cancel</Button>
		</Paper>
	);
};

const styles = (theme) => ({
	root: {
		height: 150,
		width: 250
	},
	rootTextField: {
		backgroundColor: '#eee'
	}
});

export default withStyles(styles)(DialogWithTextField);
