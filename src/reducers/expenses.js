
// Expenses Reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_EXPENSE':
            //return state.concat(action.expense); // CONCAT DOES NOT CHANGE STATE OF ARRAY
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            // return state.filter(( expense ) => expense.id !== action.id);
            // Implicitly call the id below
            return state.filter(({ id }) => id !== action.id);	
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return{
                        ...expense,
                        ...action.updates
                    };
                }else{
                    return expense;
                }
            });
	   
        default:
            return state;
    }
};

// export default expensesReducer;