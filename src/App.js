import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';

import { initializeIDB } from './indexedDB';

import IDBContext from './contexts/idbContext';

class App extends Component {
	constructor(props) {
		super(props);
		this.idb = initializeIDB();
	}
	render() {
		return (
			<IDBContext.Provider value={{ idb: this.idb }}>
				<Router>
					<Route path="/" exact component={HomePage} />
					<Route path="/note/:id" component={NotePage} />
				</Router>
			</IDBContext.Provider>
		);
	}
}

export default App;
