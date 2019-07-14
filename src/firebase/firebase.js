import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };














//EXAMPLES OF COMMON SUBSCRIPTIONS

//// child_removed
//database.ref('expenses').on('child_removed', (snapshot) => {
//    console.log(snapshot.key, snapshot.val());
//})
//
//// child_changed
//database.ref('expenses').on('child_changed', (snapshot) => {
//    console.log(snapshot.key, snapshot.val());
//});
//
//// child_added
//database.ref('expenses').on('child_added', (snapshot) => {
//    console.log(snapshot.key, snapshot.val());
//});




/***********************************
           EXAMPLES BELOW
***********************************/


//database.ref().set({
//    name: 'Harry Haigh',
//    age: 26,
//    stressLevel: 6,
//    job: {
//        title: 'Software developer',
//        company: 'Google'
//    },
//    location: {
//        city: 'Brisbane',
//        country: 'Australia'
//    }    
//}).then(() => {
//    console.log('Data is saved');
//}).catch((error) => {
//    console.log('Data was not saved', error);
//});
//
////database.ref('age').set(35);
////database.ref('location/city').set('Sydney');
//
//
//database.ref('attributes').set({
//    height: '169',
//    weight: 60 
//}).then(() => {
//    console.log('Database updated');
//}).catch((e) => {
//    console.log('Database did not update', e);
//});



// EAXMPLE OF REMOVING DATA
//database.ref('isSingle').remove()
//    .then(() => {
//        console.log('Data was removed');
//    }).catch((e) => {
//        console.log('Data was not removed', e);
//    });



// EXAMPLE OF UPDATING NESTED DATA
//database.ref().update({
//    stressLevel: 9,
//    'job/company': 'Amazon',
//    'location/city': 'Seattle'
//})



//EXAMPLE OF FETCHING DATA ONCE('value')
//database.ref('location').once('value')
//    .then((snapshot) => {
//        const val = snapshot.val();
//        console.log(val);
//    })
//    .catch((e) => {
//        console.log('Error fetching data', e);
//    });



////EXAMPLE OF FETCHING SUBSCRIPTION DATA ON('value')
//database.ref().on('value', (snapshot) => {
//    console.log(snapshot.val());
//});
//
//setTimeout(() => {
//    database.ref('age').set(45);
//}, 3500);



////EXAMPLE OF CANCELLING ALL SUBSCRIPTIONS
//database.ref().off();



////EXAMPLE OF CANCELLING 1 SUBSCRIPTION
//const onValueChange = database.ref().on('value', (snapshot) => {
//    console.log(snapshot.val());
//}, (e) => {
//    console.log('Error with data fetching', e);
//});
//database.ref().off(onValueChange);


//database.ref().once('value')
//    .then((snapshot) => {
//        const person = snapshot.val();
//        const name = person.name;
//        const job = person.job;
//
//        console.log(name, 'is a', job.title, 'at', job.company, '.');
//    }).catch((e) => {
//        console.log('Fetching data error ', e)
//    });



//EXAMPLE OF FETCHING SUBSCRIPTION DATA ON('value')
//database.ref().on('value', (snapshot) => {
//    const val = snapshot.val();
//    
//    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
//}, (e) => {
//    console.log('Error fetching data', e);
//});



//EXAMPLE OF PUSH() 
//database.ref('notes').push({
//    title: 'Course topics',
//    body: 'Ractive native, ANgular'
//})

//database.ref('expenses').push({
//    description: 'Renter',
//    note: '2 weeks rent',
//    amount: 25000,
//    createdAt: '10/07/2019'
//});



//EXAMPE OF FETCHING PUSHED DATA
//database.ref('expenses')
//    .once('value')
//    .then((snapshot) => {
//        const expenses = [];    
//        snapshot.forEach((childSnapshot) => {
//            expenses.push({
//                id: childSnapshot.key,
//                ...childSnapshot.val()
//            });
//        });
//    
//        console.log(expenses);
//});
//
//database.ref('expenses')
//    .on('value', (snapshot) => {
//        const expenses = [];    
//        snapshot.forEach((childSnapshot) => {
//            expenses.push({
//                id: childSnapshot.key,
//                ...childSnapshot.val()
//            });
//        });    
//        console.log(expenses);
//    
//}, (e) => {
//    console.log("Error fetching data ", e);
//});
