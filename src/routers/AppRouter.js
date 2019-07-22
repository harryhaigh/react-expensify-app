import React from 'react';
import { Router, Route, Switch } from 'react-router-dom'; // [L164] Update BrowserRouter to Router
import createHistory from 'history/createBrowserHistory'; // [L164] Redirecting Login or Logout
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
//import Header from '../components/Header'; [L166]
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage'; // [L162]
import PrivateRoute from './PrivateRoute'; // [l166]

// [L164 Redirecting Login or Logout ]
export const history = createHistory();

const AppRouter = () => (
	//<BrowserRouter>
    // Router [L162] - Replace BrowserRouter
    <Router history={history}>
		<div>			
			<Switch> // Goes through each Route in order from top to bottom
				<Route path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
				<PrivateRoute path="/create" component={AddExpensePage} />
				<PrivateRoute path="/edit/:id" component={EditExpensePage} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFoundPage} />
			</Switch>		
		</div>
    </Router>
	//</BrowserRouter>
);

export default AppRouter;
