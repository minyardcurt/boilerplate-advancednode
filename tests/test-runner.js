const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

describe('Functional Tests', function () {
  this.timeout(5000);

  describe('Template Engine Tests', function () {
    it('GET / should render Pug template', function (done) {
      chai.request(server)
        .get('/')
        .end(function (err, res) {
          if (err) return done(err);
          assert.equal(res.status, 200);
          assert.match(res.text, /Hello Pug!/);
          assert.match(res.text, /Home Page/);
          done();
        });
    });
  });
});
