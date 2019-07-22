import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter'; // [164] - { history }
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout} from './actions/auth'; //[ 165]
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();
//store.dispatch(addExpense({ description: 'Water bill', amount: 100 }));
//store.dispatch(addExpense({ description: 'Gas bill', amount: 0, createdAt: 1000}));
//store.dispatch(addExpense({ description: 'Rent', amount: 193500}));
//store.dispatch(setTextFilter('water'));
//
//setTimeout(() => {
//    store.dispatch(setTextFilter('bill'));
//}, 3000);
//
//const state = store.getState();
//const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//console.log(visibleExpenses);


const jsx = (
    <Provider store={store}>    
        <AppRouter />
    </Provider>
) 

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

// [l158 - Fetching expenses 2]
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));
//store.dispatch(startSetExpenses()).then(() => {
//    ReactDOM.render(jsx, document.getElementById('app'));
//});

// [L162 - login page and google authenticaiton]
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        // [L165]
        console.log("User logged in");
        store.dispatch(login(user.uid));        
        // [164]
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/'){
                history.push('/dashboard');   
            }
        });
    }else{
        // [L165]
        store.dispatch(logout());
        // [164]
        renderApp();
        history.push('/');
    }
});


