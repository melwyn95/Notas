import React, { useState, useContext, useEffect } from 'react';

import Spinner from '../../components/Spinner';

import './styles.css';

import IDBContext from '../../contexts/idbContext';

import Header from './Header'

const HomePage = () => {
	const [ openedFolder, setOpenedFolder ] = useState(null);
	const { idb } = useContext(IDBContext);

	useEffect(() => {
		idb
			.then((db) => {
				let tx = db.transaction('folders', 'readonly');
				let store = tx.objectStore('folders');
				let index = store.index('folderTimestamps');
				return index.openCursor();
			})
			.then(function findFolder(cursor) {
				let { value } = cursor;
				let { name } = value;
				if (name === 'Trash') {
					return cursor.continue().then(findFolder);
				}
				setOpenedFolder(value);
			});
	}, []);

	if (!openedFolder) {
		return <Spinner size={30} thickness={4} />;
	}

	return (
		<div>
			<Header openedFolder={openedFolder} setOpenedFolder={setOpenedFolder} />
		</div>
	);
};

export default HomePage;
