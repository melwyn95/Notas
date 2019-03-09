import React from 'react';

import SelectionHeader from './SelectionHeader';
import HomePageHeader from './HomePageHeader';

const Header = ({ selection, notes, setSelection, clearDropDown, ...homePageHeaderProps }) => {
	const isSelectionMode = selection.length;

	return (isSelectionMode ?
		<SelectionHeader
			selection={selection}
			setSelection={setSelection}
			clearDropDown={clearDropDown}
			notes={notes} /> :
		<HomePageHeader {...homePageHeaderProps} />);
};

export default Header;
