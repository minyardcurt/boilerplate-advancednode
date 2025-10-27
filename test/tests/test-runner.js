const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const server = require('../server'); // your server.js
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);

  test('GET / should render Pug template', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.match(res.text, /Hello Pug!/);
        done();
      });
  });
});
