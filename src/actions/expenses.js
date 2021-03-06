import uuid from 'uuid';
import database from '../firebase/firebase';
// ACTION GENERATORS FOR EXPENSES

// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// Lessson 152 - Asynchronous Redux Actions
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid; //[L168]
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData;
        
        const expense = { description, note, amount, createdAt};
        
        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) =>({
    type: 'REMOVE_EXPENSE',
    id
});

// [L159] Remove expense
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid; //[L168]
        // First remove object from Firebase
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            // Then remove from the redux store
            dispatch(removeExpense({ id }));
        });
    };
};
    
// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// [L160 - update expense]
export const startEditExpense = (id, updates) => {
    return(dispatch, getState) => {
        const uid = getState().auth.uid; //[L168]
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
           dispatch(editExpense(id, updates)); 
        });
    };
};


// [L157 - Fetching expenses: part 1]
// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// [L158 - Fetching expenses: part 2]
export const startSetExpenses = (expenses = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid; //[L168]
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const expenses = [];
                
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });            
            dispatch(setExpenses(expenses));
        });
    };
};


