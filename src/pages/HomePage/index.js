import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import Spinner from '../../components/Spinner';

import './styles.css';

import IDBContext from '../../contexts/idbContext';

import { options } from '../../application/noteOperations';

import doNoteAction, { GET_ALL_NOTES } from './../../actions/doNoteAction';
import doFolderAction, { GET_ALL_NOTES_FOLDER } from './../../actions/doFolderAction';

import Header from './Header'
import SearchBar from './SearchBar';
import NotesContainer from './NotesContainer';
import AddNotes from './AddNotes';
import BottomNotesOperations from './BottomNotesOperations';

const HomePage = ({ match }) => {
	const { idb } = useContext(IDBContext);

	const [openedFolder, setOpenedFolder] = useState(null);
	const [snackError, setSnackError] = useState(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [selection, setSelection] = useState([]);
	const [notes, setNotes] = useState([]);
	const [fetching, setFetching] = useState(true);

	const bottomOptions = useMemo(() => options(openedFolder), [openedFolder]);

	const clearDropDown = useCallback(() => {
		setShowDropdown(false);
	}, []);
	const closeSnackBar = useCallback(() => {
		setSnackError(null);
	}, []);

	const showBottomToolbar = selection.length !== 0;
	const isTrashFolder = openedFolder && openedFolder.id === 2;

	useEffect(() => {
		const folderId = Number.parseInt(match.params.id);
		doFolderAction(GET_ALL_NOTES_FOLDER.operation, folderId, { idb, setOpenedFolder });
	}, [match]);

	useEffect(() => {
		doNoteAction(GET_ALL_NOTES.operation, { idb, openedFolder, setFetching, setNotes });
	}, [openedFolder]);


	if (!openedFolder) {
		return <Spinner />;
	}

	return (
		<div className="container--home-page" onClick={clearDropDown}>
			<Header
				openedFolder={openedFolder}
				setSnackError={setSnackError}
				showDropdown={showDropdown}
				setShowDropdown={setShowDropdown}
				notes={notes}
				selection={selection}
				clearDropDown={clearDropDown}
				setSelection={setSelection} />
			<SearchBar openedFolder={openedFolder} setNotes={setNotes} />
			<NotesContainer
				fetching={fetching}
				notes={notes}
				selection={selection}
				setSelection={setSelection} />
			<AddNotes
				openedFolder={openedFolder}
				setOpenedFolder={setOpenedFolder}
				fetching={fetching}
				notes={notes}
				show={!showBottomToolbar && !isTrashFolder} />
			<BottomNotesOperations
				options={bottomOptions}
				show={showBottomToolbar}
				selection={selection}
				openedFolder={openedFolder}
				setSelection={setSelection}
				setOpenedFolder={setOpenedFolder} />
			<Snackbar
				open={Boolean(snackError)}
				autoHideDuration={2000}
				onClose={closeSnackBar}
				message={snackError} />
		</div>
	);
};

export default HomePage;
