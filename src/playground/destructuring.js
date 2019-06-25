//
// Object destructuring
//


//const person = {
//    name: 'Harry',
//    age: 26,
//    location: {
//        city: 'Brisbane',
//        temp: 88
//    }
//};
//
////const name = person.name;
////const age = person.age;
//const {name = 'Anonymous', age} = person;
//console.log(`${name} is ${age}.`);
//
//const {city, temp: temperature} = person.location;
//if(city && temperature){
//    console.log(`It's ${temperature} in ${city}.`);
//}


//const book = {
//    title: 'Ego is the Enemy',
//    author: 'Ryan Holiday',
//    publisher: {
//        name: 'Penguin'
//    }
//};
//
//
//const {name: publisherName = 'Self-Published'} = book.publisher;
//console.log(publisherName);


//
// Array destructuring
//

//const address = ['1299 s Juniper Stree', 'Brisbane', 'Queensland', '4120'];
//const [, city, state = 'NSW'] = address;
//
//console.log(`You are in ${city}, ${state}.`);

const item = ['coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;


console.log(`A medium ${itemName} cost ${mediumPrice}`)