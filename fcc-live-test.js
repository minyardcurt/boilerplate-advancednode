'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

// Replace with your deployed Render URL
const RENDER_URL = 'https://boilerplate-advancednode-xx67.onrender.com';

async function runLiveTests() {
  try {
    console.log('Testing root URL...');
    const resRoot = await chai.request(RENDER_URL).get('/');
    console.log(`Status: ${resRoot.status}`);
    expect(resRoot.status).to.equal(200);
    expect(resRoot.text).to.include('<h1>Hello Pug!</h1>');
    console.log('✅ Root route rendered correctly');

    console.log('Testing /_api/package.json...');
    const resPkg = await chai.request(RENDER_URL).get('/_api/package.json');
    expect(resPkg.status).to.equal(200);
    expect(resPkg.body.dependencies).to.have.property('pug');
    console.log('✅ /_api/package.json returned correctly');

    console.log('Testing /_api/app...');
    const resApp = await chai.request(RENDER_URL).get('/_api/app');
    expect(resApp.status).to.equal(200);
    console.log('✅ /_api/app returned correctly');

    console.log('\n🎉 All live Render checks passed!');
  } catch (err) {
    console.error('❌ Test failed:', err.message);
  }
}

runLiveTests();
