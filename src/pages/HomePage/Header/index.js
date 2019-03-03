import React from 'react';

import SelectionHeader from './SelectionHeader';
import HomePageHeader from './HomePageHeader';

const Header = ({ selection, notes, setSelection, ...homePageHeaderProps }) => {
	const isSelectionMode = selection.length;

	return (isSelectionMode ?
		<SelectionHeader
			selection={selection}
			setSelection={setSelection}
			notes={notes} /> :
		<HomePageHeader {...homePageHeaderProps} />);
};

export default Header;
