import React, { useCallback, useContext, useState } from 'react';

import Folder from '@material-ui/icons/FolderOutlined';
import Delete from '@material-ui/icons/DeleteOutlined';
import Restore from '@material-ui/icons/RestoreOutlined';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import IDBContext from '../../../contexts/idbContext';

import { OPTION_MOVE, OPTION_DELETE, OPTION_RESTORE } from '../../../application/noteOperations';
import doNoteAction, { DELETE_NOTES, MOVE_NOTES } from '../../../actions/doNoteAction';
import doFolderAction, { GET_ALL_FOLDERS, OPEN_CREATE_FOLDER_MODAL } from '../../../actions/doFolderAction';

const BottomNotesOperations = ({ classes, options, show, openedFolder, selection, setOpenedFolder, setSelection, setCreateDialogOpen }) => {
	const { idb } = useContext(IDBContext);
	const [open, setOpen] = useState(false);
	const [folders, setFolders] = useState([]);

	const deleteNotesCallback = useCallback(
		() => {
			doNoteAction(DELETE_NOTES.operation, { idb, selection, openedFolder, setOpenedFolder });
			setSelection([]);
		},
		[selection]
	);
	const moveToCallback = useCallback(
		(moveToFolderId) => {
			doNoteAction(MOVE_NOTES.operation, { idb, selection, openedFolder, setOpenedFolder, moveToFolderId });
			setSelection([]);
			closeDialog();
		},
		[selection]
	);
	const closeDialog = useCallback(() => {
		setOpen(false);
	}, []);
	const openDialog = useCallback(
		async () => {
			const foldersToExclude = [openedFolder.id];
			await doFolderAction(GET_ALL_FOLDERS.operation, openedFolder.id, { idb, setFolders, foldersToExclude });
			setOpen(true)
		},
		[openedFolder]
	);
	const getBottomOptionProps = option => {
		switch (option.operation) {
			case OPTION_MOVE.operation:
				return { option, Icon: Folder, callback: openDialog };
			case OPTION_RESTORE.operation:
				return { option, Icon: Restore, callback: () => moveToCallback(1) };
			case OPTION_DELETE.operation:
				return { option, Icon: Delete, callback: deleteNotesCallback };
			default:
				return () => { }
		}
	};

	return (
		<div className="container--bottom-toolbar" style={show ? {} : { height: 0 }}>
			{
				options.map(option =>
					<BottomOption
						key={option.operation}
						className={classes.buttonRoot}
						{...getBottomOptionProps(option)} />)
			}
			<Dialog open={open} onClose={closeDialog} scroll="paper">
				<ListItem>
					<ListItemText primary='Select Folder' classes={{ primary: classes.flexJustifyCenter }} />
				</ListItem>
				<Divider />
				<List style={{ maxHeight: '80vh', padding: 0 }}>
					{folders.map(folder => (
						<>
							<ListItem
								button
								classes={{ root: classes.flexJustifyCenter }}
								onClick={() => moveToCallback(folder.id)} key={folder.id}>
								<ListItemText primary={folder.name} classes={{ primary: classes.listItemPrimary }} />
							</ListItem>
							<Divider />
						</>
					))}
				</List>
			</Dialog>
		</div>
	);
};

const BottomOption = ({ option, className, Icon, callback }) => (
	<div className="container--bottom-tool-button">
		<Button className={className} onClick={callback}>
			<Icon />
			<span className="bottom-button-text">{option.label}</span>
		</Button>
	</div>);

const styles = (theme) => ({
	buttonRoot: {
		width: '100%',
		height: '100%'
	},
	listItemPrimary: {
		maxWidth: '175px',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	flexJustifyCenter: {
		display: 'flex',
		justifyContent: 'center',
	}
});

export default withStyles(styles)(BottomNotesOperations);
