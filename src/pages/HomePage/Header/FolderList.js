import React, { Fragment } from 'react';

import Spinner from '../../../components/Spinner';

import doFolderAction, { OPEN_CREATE_FOLDER_MODAL } from '../actions/doFolderAction';

const selectFolder = (folder, setOpenedFolder, setShowDropdown) => {
	setShowDropdown(false);
	setOpenedFolder(folder);
};

const FolderList = ({ folders, setShowDropdown, setOpenedFolder, openedFolder, setOpen, show }) => {
	if (!folders && show) {
		return <Spinner />;
	}

	return (
		<div className="container--list-item" style={(show ? {} : { maxHeight: 0, opacity: 0 })}>
			{show && folders.map((folder) => (
				<Fragment key={`list-item-${folder.id}`}>
					<div className="list-item" onClick={() => selectFolder(folder, setOpenedFolder, setShowDropdown)}>
						<div
							className={`list-item-label ${openedFolder.id === folder.id
								? 'list-item-label__bold'
								: ''}`}
						>
							{folder.name}
						</div>
						<div
							className={`list-item-label ${openedFolder.id === folder.id
								? 'list-item-label__bold'
								: ''}`}
						>
							{folder.count}
						</div>
					</div>
					<div className="separator" />
				</Fragment>
			))}
			{show && <div className="list-item" key="new-folder"
				onClick={() => {
					doFolderAction(OPEN_CREATE_FOLDER_MODAL.operation, undefined, { setShowDropdown, setOpen })
				}}>
				<div className="new-folder-container">
					<div className="plus-icon">+</div>New Folder
				</div>
			</div>}
		</div>
	);
};

export default FolderList;