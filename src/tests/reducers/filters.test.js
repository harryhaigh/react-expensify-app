import moment from 'moment';
import filtersReducers from '../../reducers/filters';

test('Should setup default filter values', () => {
    const state = filtersReducers(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('Should set sortBy to amount', () => {
    const state = filtersReducers(undefined, {type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE'};
    
    const state = filtersReducers(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
    const action = {
        type: 'SET_TEXT_FILTER',
        text: 'Something'   
    };    
    const state = filtersReducers(undefined, action);
    expect(state.text).toBe('Something');
});

test('Should set startDate filter', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    } 
    const state = filtersReducers(undefined, action);
    // toEqual as we are comparing two Moment objects
    expect(state.startDate).toEqual(startDate);
});

test('Should set endDate filter', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    }
    const state = filtersReducers(undefined, action);
    // toEqual as we are comparing two Moment objects
    expect(state.endDate).toEqual(endDate);
});