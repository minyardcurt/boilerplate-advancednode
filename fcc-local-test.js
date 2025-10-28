'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server'); // your server.js
const expect = chai.expect;

chai.use(chaiHttp);

async function runTests() {
  try {
    // 1️⃣ Test root route
    const resRoot = await chai.request(app).get('/');
    expect(resRoot.status).to.equal(200);
    expect(resRoot.text).to.include('<h1>Hello Pug!</h1>');
    console.log('✅ Root route rendered index.pug correctly');

    // 2️⃣ Test package.json endpoint
    const resPkg = await chai.request(app).get('/_api/package.json');
    expect(resPkg.status).to.equal(200);
    expect(resPkg.body).to.have.property('dependencies');
    console.log('✅ /_api/package.json returned correctly');

    // 3️⃣ Test _api/app endpoint
    const resApp = await chai.request(app).get('/_api/app');
    expect(resApp.status).to.equal(200);
    console.log('✅ /_api/app returned correctly');

    console.log('\n🎉 All local FCC checks passed!');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

runTests();
