import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Spinner from './components/Spinner';

import { initializeIDB } from './indexedDB';

import IDBContext from './contexts/idbContext';

const NotePage = React.lazy(() => import('./pages/NotePage'));
const FourOhFour = React.lazy(() => import('./pages/404'));

class App extends Component {
	constructor(props) {
		super(props);
		this.idb = initializeIDB();
	}
	render() {
		return (
			<IDBContext.Provider value={{ idb: this.idb }}>
				<Suspense fallback={<Spinner />}>
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
				</Suspense>
			</IDBContext.Provider>
		);
	}
}

export default App;
