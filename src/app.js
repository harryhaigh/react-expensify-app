import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses.js';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate} from './actions/filters.js';
import getVisibleExpenses from './selectors/expenses.js';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

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


ReactDOM.render(jsx, document.getElementById('app'));

