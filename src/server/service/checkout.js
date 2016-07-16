import http from 'https';
import querystring from 'querystring';
import config from '../config';

export default function(amount, currency, cb) {
  const path=config.get('payOnServer:checkoutPath');

  const data = querystring.stringify({
		'authentication.userId' : config.get('authentication:userId'),
		'authentication.password' : config.get('authentication:password'),
		'authentication.entityId' : config.get('authentication:entityId'),
		'amount' : amount,
		'currency' : currency,
		'paymentType' : 'DB'
	});

  const options = {
		port: 443,
		host: config.get('payOnServer:host'),
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': data.length
		}
	};

  const postRequest = http.request(options, function(res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			const jsonRes = JSON.parse(chunk);
			return cb(jsonRes);
		});
	});

  postRequest.write(data);
  postRequest.end();
};
