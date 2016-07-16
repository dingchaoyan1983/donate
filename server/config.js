var nconf = require('nconf');

nconf.argv().env();
nconf.file({ file: 'config/config.json' });
module.exports = nconf;
