import React, { Fragment, useContext } from 'react';

import IDBContext from '../../../contexts/idbContext';
import Spinner from '../../../components/Spinner';

const selectFolder = (folder, setOpenedFolder, setShowDropdown) => {
	setShowDropdown(false);
	setOpenedFolder(folder);
};

const createNewFolder = (idb, setShowDropdown) => {
	idb
		.then((db) => {
			let tx = db.transaction('folders', 'readwrite');
			let store = tx.objectStore('folders');
			store.add({
				name: 'Untitled',
				timestamp: new Date().getTime(),
				count: 0
			});
			return tx.complete;
		})
		.then(() => {
			setShowDropdown(false);
		});
};

const FolderList = ({ folders, setShowDropdown, setOpenedFolder, openedFolder }) => {
	const { idb } = useContext(IDBContext);

	if (!folders) {
		return <Spinner />;
	}

	return (
		<div className="container--list-item">
			{folders.map((folder) => (
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
			<div className="list-item" key="new-folder" onClick={() => createNewFolder(idb, setShowDropdown)}>
				<div className="new-folder-container">
					<div className="plus-icon">+</div>New Folder
				</div>
			</div>
		</div>
	);
};

export default FolderList;