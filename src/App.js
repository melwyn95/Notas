import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotePage from './pages/NotePage';
import FourOhFour from './pages/404';

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
				<Router basename="/Notas">
					<Switch>
						<Route path="/" exact component={props => <Redirect to={{
							pathname: "/folder/1",
							state: { from: props.location }
						}} />} />
						<Route path="/folder/:id" exact component={HomePage} />
						<Route path="/note/:id" component={NotePage} />
						<Route component={FourOhFour} />
					</Switch>
				</Router>
			</IDBContext.Provider>
		);
	}
}

export default App;
