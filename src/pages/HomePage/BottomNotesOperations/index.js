import React, { useCallback, useContext, useState, useEffect } from 'react';

import Folder from '@material-ui/icons/FolderOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import IDBContext from '../../../contexts/idbContext';

import doNoteAction, { DELETE_NOTES, MOVE_NOTES } from '../actions/doNoteAction';
import { getAllFolders } from '../Header/HomePageHeader';

const BottomNotesOperations = ({ classes, show, openedFolder, selection, setOpenedFolder, setSelection }) => {
	const { idb } = useContext(IDBContext);
	const [ openDialog, setOpenDialog ] = useState(false);
	const [ folders, setFolders ] = useState([]);

	const deleteNotesCallback = useCallback(
		() => {
			doNoteAction(DELETE_NOTES.operation, { idb, selection, openedFolder, setOpenedFolder });
			setSelection([]);
		},
		[ selection ]
	);
	const moveToCallback = useCallback(
		(moveToFolderId) => {
			doNoteAction(MOVE_NOTES.operation, { idb, selection, openedFolder, setOpenedFolder, moveToFolderId });
            setSelection([]);
            closeDialog();
		},
		[ selection ]
	);
	const closeDialog = useCallback(() => {
		setOpenDialog(false);
	}, []);

	useEffect(
		async () => {
            await getAllFolders(idb, setFolders, [ openedFolder.id ]);
		},
		[ openedFolder ]
	);

	return (
		<div className="container--bottom-toolbar" style={show ? {} : { height: 0 }}>
			<div className="container--bottom-tool-button">
				<Button className={classes.buttonRoot}>
					<Folder />
					<span className="bottom-button-text">Move to</span>
				</Button>
			</div>
			<div className="container--bottom-tool-button">
				<Button className={classes.buttonRoot} onClick={deleteNotesCallback}>
					<Delete />
					<span className="bottom-button-text">Delete</span>
				</Button>
			</div>
			<Dialog open={openDialog} onClose={closeDialog} scroll="paper">
				<List>
					{folders.map(folder => (
						<ListItem button onClick={() => moveToCallback(folder.id)} key={folder.id}>
							<ListItemText primary={folder.name} />
						</ListItem>
					))}
				</List>
			</Dialog>
		</div>
	);
};

const styles = (theme) => ({
	buttonRoot: {
		width: '100%',
		height: '100%'
	}
});

export default withStyles(styles)(BottomNotesOperations);
