const expect = require('chai').expect;
const envConf = require('./index');


describe('Environment variable configuration  ', () => {
  let env = {};
  before(()=> {
    env = envConf.getEnv();
  });
  it('should able to set environment variable if its declared into ".env" file ', () => {
    const EXPECTED_OUTPUT = {
      NODE_ENV: 'test',
      SCHEDULER_RULE: '1 * * * * *'
    };
    expect(env.string('NODE_ENV')).to.be.equal(EXPECTED_OUTPUT.NODE_ENV);
    expect(env.string('SCHEDULER_RULE')).to.be.equal(EXPECTED_OUTPUT.SCHEDULER_RULE);
  });
  it('should able to typecast environment variable', () => {
    expect(typeof env.int('TIMEOUT')).to.be.equal('number');
  });
  it('should throw error when "checkEnvironmentVariables" called and environment variables are not set and it is defined in ".env.tpl"', function (done) {
    envConf.checkEnvironmentVariables(done)
      .catch(error=> {
        expect(error.message).to.be.equal('Please set environment variable PORT')
      }).finally(()=> {
      done()
    });
  });
});