/*const {SHA256} = require('crypto-js');

var message = "new message";
var hash = SHA256(message);

console.log(`message: ${message}`);
console.log(`hash : ${hash}`);*/

const jwt = require('jsonwebtoken');

var data= {
	id: 10
};

var encoded = jwt.sign(data, 'secretkey');

console.log(encoded);

var decoded = jwt.verify(encoded , 'secretkey');

console.log(decoded);