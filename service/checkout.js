var http = require('https');
var querystring = require('querystring');

module.exports = function(amount, currency, cb) {
  var path='/v1/checkouts';

  console.log(amount);
  console.log(currency);
  
  var data = querystring.stringify({
		'authentication.userId' : '8a8294174b7ecb28014b9699220015cc',
		'authentication.password' : 'sy6KJsT8',
		'authentication.entityId' : '8a8294174b7ecb28014b9699220015ca',
		'amount' : amount,
		'currency' : currency,
		'paymentType' : 'DB'
	});

  var options = {
		port: 443,
		host: 'test.oppwa.com',
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		}
	};

  var postRequest = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			jsonRes = JSON.parse(chunk);
			return cb(jsonRes);
		});
	});

  postRequest.write(data);
  postRequest.end();
};
