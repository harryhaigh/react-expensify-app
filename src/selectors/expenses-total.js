export default (expenses) => {
//    if(expenses.length === 0){
//        return 0;
//    } else {
//        return expenses
//            .map((expense) => expense.amount)
//            .reduce((sum, value) => {
//                return sum + value;
//        }, 0);
//    }
    
    // Refractor the code to be more simple
    // as long as the test cases are setup
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => {
            return sum + value;
    }, 0);
};