
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Harry',
            age: 35
        });
        reject('Something went wrong');
    }, 3000);
    
});

console.log("before");

promise.then((data) => {
    console.log(data);
    return 'Some data';
    // U can also return a promise L154
    
}).then((str) => {
    console.log('This runs after the first then', str); // str = 'Some data';
}).catch((error) => {
    console.log(error);
});


console.log("after");