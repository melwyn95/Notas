import React, { useState, Fragment, useContext, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';

import doFolderAction, { FolderMenuOptions, RENAME_FOLDER, CREATE_FOLDER } from '../actions/doFolderAction';

import IDBContext from '../../../contexts/idbContext';

import FolderList from './FolderList';
import DialogWithTextField from './DialogWithTextField';
import DeleteFolder from './DeleteFolder';

const HomePageHeader = ({ openedFolder, setOpenedFolder, setSnackError, showDropdown, setShowDropdown }) => {
	const [folders, setFolders] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const { idb } = useContext(IDBContext);
	const [open, setOpen] = useState(null);
	const close = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(
		() => {
			if (showDropdown) {
				const idbFolders = [];
				idb
					.then((db) => {
						let tx = db.transaction('folders', 'readonly');
						let store = tx.objectStore('folders');
						return store.openCursor();
					})
					.then(function loopFolders(cursor) {
						if (!cursor) {
							return;
						}
						let { value } = cursor;
						idbFolders.push(value);
						return cursor.continue().then(loopFolders);
					})
					.then(() => {
						setFolders(idbFolders);
					});
			}
		},
		[showDropdown]
	);

	return (
		<Fragment>
			<div className="container--header">
				<div className="container--dropdown">
					<Button onClick={(e) => {
						e.stopPropagation();
						setShowDropdown(!showDropdown)
					}}>
						<div className="dropdown-content">
							<div className="dropdown-text">{openedFolder.name}</div>
							<div className="dropdown-icon" />
						</div>
					</Button>
				</div>
				<div className="container--more-options" style={(!showDropdown ? { maxHeight: 0 } : {})}>
					<IconButton onClick={(e) => {
						e.stopPropagation();
						setAnchorEl(e.currentTarget);
						setShowDropdown(false);
					}}>
						<div className="more-options" />
					</IconButton>
				</div>
				<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={(e) => setAnchorEl(null)}>
					{FolderMenuOptions.map((option) => {
						if (!openedFolder.systemFolder || option.operation === 'open_settings') {
							return (
								<MenuItem
									style={{ fontSize: 14 }}
									onClick={(e) => {
										doFolderAction(option.operation, openedFolder.id, { setOpen, close });
									}}
								>
									{option.label}
								</MenuItem>
							);
						}
						return undefined;
					})}
				</Menu>
			</div>
			<FolderList
				folders={folders}
				setShowDropdown={setShowDropdown}
				setOpenedFolder={setOpenedFolder}
				setOpen={setOpen}
				openedFolder={openedFolder}
				show={showDropdown}
			/>
			<Dialog open={Boolean(open)} onClose={close}>
				{
					[RENAME_FOLDER.operation, CREATE_FOLDER.operation].includes(open) ?
						<DialogWithTextField
							openedFolder={openedFolder}
							close={close}
							setOpenedFolder={setOpenedFolder}
							create={open === CREATE_FOLDER.operation}
							setSnackError={setSnackError} />
						:
						<DeleteFolder
							openedFolder={openedFolder}
							close={close}
							setOpenedFolder={setOpenedFolder} />
				}
			</Dialog>
		</Fragment>
	);
};

export default HomePageHeader;
