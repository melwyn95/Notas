import React, { useState, Fragment, useContext, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';

import doFolderAction, { FolderMenuOptions } from '../actions/doFolderAction';

import IDBContext from '../../../contexts/idbContext';

import FolderList from './FolderList';
import RenameFolder from './RenameFolder'; 

const Header = ({ openedFolder, setOpenedFolder }) => {
	const [ anchorEl, setAnchorEl ] = useState(null);
	const [ showDropdown, setShowDropdown ] = useState(false);
	const [ folders, setFolders ] = useState(null);
	const { idb } = useContext(IDBContext);
	const [ open, setOpen ] = useState(false);
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
						let index = store.index('folderTimestamps');
						return index.openCursor();
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
		[ showDropdown ]
	);

	return (
		<Fragment>
			<div className="container--header">
				<div className="container--dropdown">
					<Button onClick={() => setShowDropdown(!showDropdown)}>
						<div className="dropdown-content">
							<div className="dropdown-text">{openedFolder.name}</div>
							<div className="dropdown-icon" />
						</div>
					</Button>
				</div>
				{!showDropdown && (
					<div className="container--more-options">
						<IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
							<div className="more-options" />
						</IconButton>
					</div>
				)}
				<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={(e) => setAnchorEl(null)}>
					{FolderMenuOptions.map((option) => {
						if (!openedFolder.systemFolder || option.operation === 'open_settings') {
							return (
								<MenuItem
									style={{ fontSize: 14 }}
									onClick={() => {
										doFolderAction(option.operation, openedFolder.id, { setOpen, close });
										setAnchorEl(null);
									}}
								>
									{option.label}
								</MenuItem>
							);
						}
					})}
				</Menu>
			</div>
			{showDropdown && (
				<FolderList
					folders={folders}
					setShowDropdown={setShowDropdown}
					setOpenedFolder={setOpenedFolder}
					openedFolder={openedFolder}
				/>
			)}
			<Dialog open={open} onClose={close}>
				<RenameFolder />
			</Dialog>
		</Fragment>
	);
};

export default Header;
