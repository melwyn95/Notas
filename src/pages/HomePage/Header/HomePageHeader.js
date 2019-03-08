import React, { useState, Fragment, useContext, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';

import doFolderAction, { FolderMenuOptions, RENAME_FOLDER, CREATE_FOLDER, GET_ALL_FOLDERS } from '../actions/doFolderAction';

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
		setAnchorEl(null);
	}, []);

	useEffect(
		() => {
			doFolderAction(GET_ALL_FOLDERS.operation, undefined, { idb, setFolders });
		},
		[openedFolder]
	);

	return (
		<Fragment>
			<div className="container--header">
				<FolderNameButton {...{ setShowDropdown, showDropdown, openedFolder }} />
				<MoreOptions {...{ showDropdown, setShowDropdown, setAnchorEl }} />
				<Options {...{ anchorEl, setAnchorEl, openedFolder, setOpen, close }} />
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
				{[RENAME_FOLDER.operation, CREATE_FOLDER.operation].includes(open) ? (
					<DialogWithTextField
						openedFolder={openedFolder}
						close={close}
						setOpenedFolder={setOpenedFolder}
						create={open === CREATE_FOLDER.operation}
						setSnackError={setSnackError}
					/>
				) : (
						<DeleteFolder openedFolder={openedFolder} close={close} setOpenedFolder={setOpenedFolder} />
					)}
			</Dialog>
		</Fragment>
	);
};

const FolderNameButton = ({ setShowDropdown, showDropdown, openedFolder: { name } }) =>
	(<div className="container--dropdown">
		<Button
			onClick={(e) => {
				e.stopPropagation();
				setShowDropdown(!showDropdown);
			}}
		>
			<div className="dropdown-content">
				<div className="dropdown-text">{name}</div>
				<div className={!showDropdown ? 'dropdown-icon' : 'dropdown-icon dropdown-icon-rotate'} />
			</div>
		</Button>
	</div>);

const MoreOptions = ({ showDropdown, setShowDropdown, setAnchorEl }) =>
	(<div className="container--more-options" style={!showDropdown ? { maxHeight: 0 } : {}}>
		<IconButton
			onClick={(e) => {
				e.stopPropagation();
				setAnchorEl(e.currentTarget);
				setShowDropdown(false);
			}}
		>
			<div className="more-options" />
		</IconButton>
	</div>);

const Options = ({ anchorEl, setAnchorEl, openedFolder, setOpen, close }) =>
	(<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={(e) => setAnchorEl(null)}>
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
	</Menu>);

export default HomePageHeader;
