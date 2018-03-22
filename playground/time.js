var moment = require('moment');



// var date = moment();
// date.subtract(30, 'day');
// console.log(date.format('MMM Do YYYY'));

// var date = moment();
// console.log(date.format('h:mm a'));
var someTimestamp = moment().valueOf();

var date = moment(someTimestamp);

console.log(date.format('h:mm a'));