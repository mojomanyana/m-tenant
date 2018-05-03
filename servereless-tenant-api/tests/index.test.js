import assert from 'assert';
import { expect } from 'chai';
import { get } from '../src/index';

describe('Test tenant lambda functions in dist/index.js ', () => {
  it('should print console log', (done) => {
    get(null, null, (err, response) => {
      const data = JSON.parse(response.body);
      console.log(process.env.DYNAMODB_TENANT_TABLE);
      expect(response.statusCode).to.be.a('number');
      expect(response.statusCode).to.equal(200);
      assert.equal(data.data, 'Success');
      done();
    });
  });
});
