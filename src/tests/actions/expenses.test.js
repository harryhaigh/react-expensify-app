import configureMockStore from 'redux-mock-store'; //Lesson 153
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses'; // Lesson 153 Testing Async Redux Actions
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

//[L157] - Fetching expenses 1
beforeEach((done) => {
    const expenseData = {};
    
    expenses.forEach(({id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt };
    });   
    database.ref('expenses').set(expenseData).then(() => done());
})

test('Should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});    
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
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
    const store = createMockStore({}); // L153
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
        
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Should add expense with defaults to database and store', (done) => {
    const store = createMockStore({}); // L153
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
        
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        
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
    const store = createMockStore({});
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