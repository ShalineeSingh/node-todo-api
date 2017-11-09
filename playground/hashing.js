/*const {SHA256} = require('crypto-js');

var message = "new message";
var hash = SHA256(message);

console.log(`message: ${message}`);
console.log(`hash : ${hash}`);*/

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123!';

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log(hash);
	});
});
 var hashedPassword = '$2a$10$1VS87VvfTKRvWWR5zx.a5.BVRy5p1ZmCfMaYLQhk0tXEz8P2/V.Ai';
  bcrypt.compare(password, hashedPassword, (err, res) => {
  	console.log(res);
  })

var data= {
	id: 10
};

var encoded = jwt.sign(data, 'secretkey');

// console.log(encoded);

var decoded = jwt.verify(encoded , 'secretkey');

// console.log(decoded);