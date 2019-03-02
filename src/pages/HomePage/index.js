import React, { useState, useContext, useEffect, useCallback } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import Spinner from '../../components/Spinner';

import './styles.css';

import IDBContext from '../../contexts/idbContext';

import Header from './Header'
import SearchBar from './SearchBar';
import NotesContainer from './NotesContainer';
import AddNotes from './AddNotes';

const HomePage = () => {
	const [openedFolder, setOpenedFolder] = useState(null);
	const [snackError, setSnackError] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const clearDropDown = useCallback(() => {
		setShowDropdown(false);
	}, []);
	const closeSnackBar = useCallback(() => {
		setSnackError(null);
	}, []);
	const { idb } = useContext(IDBContext);

	useEffect(() => {
		idb
			.then(async (db) => {
				let tx = db.transaction('folders', 'readonly');
				let store = tx.objectStore('folders');
				let folder = await store.get(1);
				setOpenedFolder(folder);
			})
	}, []);

	if (!openedFolder) {
		return <Spinner />;
	}

	return (
		<div className="container--home-page" onClick={clearDropDown}>
			<Header
				openedFolder={openedFolder}
				setOpenedFolder={setOpenedFolder}
				setSnackError={setSnackError}
				showDropdown={showDropdown}
				setShowDropdown={setShowDropdown} />
			<SearchBar />
			<NotesContainer openedFolder={openedFolder} />
			<AddNotes />
			<Snackbar
				open={Boolean(snackError)}
				autoHideDuration={2000}
				onClose={closeSnackBar}
				message={snackError} />
		</div>
	);
};

export default HomePage;
