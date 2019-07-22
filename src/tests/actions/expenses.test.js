import configureMockStore from 'redux-mock-store'; //Lesson 153
import thunk from 'redux-thunk';
import {     
    addExpense, 
    startAddExpense, 
    editExpense, 
    startEditExpense,
    removeExpense, 
    startRemoveExpense,
    setExpenses, 
    startSetExpenses} from '../../actions/expenses';
import expenses from '../fixtures/expenses'; // Lesson 153 Testing Async Redux Actions
import database from '../../firebase/firebase';

const uid = 'thisismytestuid'; //[L168]
const defaultAuthState = { auth: { uid } }; //[L168]
const createMockStore = configureMockStore([thunk]);

//[L157] - Fetching expenses 1
beforeEach((done) => {
    const expenseData = {};
    
    expenses.forEach(({id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt };
    });   
    // Updating database ref ${uid} - [L168]
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
})

test('Should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});    
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

// [L159 - Remove expense]
test('Should remove expense from firebase', (done) => {
    
    // createMockStore arg Auth - [L168]
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        // Updating database ref ${uid} - [L168]
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
    
});

test('Should setup edit expense action object', () => {
   const action = editExpense('123abc', {
       note: 'Note',
   });
    
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'Note',
        }
    })
});

// [L160 - Update expense]
test('Should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { amount: 21045 };
    
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    }).catch((e) => {
        console.log(e);
    }); 
});


test('Should setup add expense action object with provided values', () => {
//    const expenseData = {
//        description: 'Rent',
//        amount: 109500,
//        createdAt: 1000,
//        note: 'This was last months rent'        
//    }    
    const action = addExpense(expenses[2]);    
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});


test('Should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState); // L153
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions(); // L154
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        })
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState); // L153
    const expenseDefaults = {        
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions(); // L154
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        })
        
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    });
});

test('Should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

//[L158 Fetching expenses 2]
test('Should fetch the expenses from Firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
    
});

//test('Should setup and expense action object with default values', () => {
//    const action = addExpense();
//    expect(action).toEqual({
//        type: 'ADD_EXPENSE',
//        expense:{
//            id: expect.any(String),
//            description: '', 
//            note: '', 
//            amount: 0, 
//            createdAt: 0 
//        }
//    })
//});