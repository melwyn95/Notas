import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const RenameFolder = (props) => {
	const { classes } = props;
	const [ value, setValue ] = useState('Unnamed Folder');
	return (
		<Paper className={classes.root}>
			<div>New Folder</div>
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
            <Button>Rename</Button>
            <Button>Cancel</Button>
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

export default withStyles(styles)(RenameFolder);
