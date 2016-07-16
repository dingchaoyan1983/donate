import nconf from 'nconf';

nconf.argv().env();
nconf.file({
  file: 'config.json'
});

export default nconf;
