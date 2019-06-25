import moment from 'moment';

// timestamps (milliseconds) 
// January 1st 1970 (unix epoch)
// 1000 = 1 second

// Get visible expenses
export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
//        No longer needed with moment js
//        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
//        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());  
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1; 
        }
    });
}