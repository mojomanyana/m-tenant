import AWS_MOCK from 'aws-sdk-mock';
import assert from 'assert';
import { expect } from 'chai';
import { get } from '../src/index';

const eventEmpty = { body: '{}' };
const eventInvalid = { body: {} };
const context = {};

describe('Test tenant lambda functions in dist/index.js ', () => {
  before(() => {
    AWS_MOCK.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
      callback(null, { Items: [{ name: 'Test 1', tenantId: 'tenantId1' }, { name: 'Test 2', tenantId: 'tenantId2' }] });
    });
  });

  it('should return 2 tenants and undefined lastEvaluatedKey', (done) => {
    get(eventEmpty, context, (err, response) => {
      const data = JSON.parse(response.body);
      expect(response.statusCode).to.be.a('number');
      expect(response.statusCode).to.equal(200);
      expect(data.lastEvaluatedKey).to.equal(undefined);
      assert.equal(data.tenants.length, 2);
      assert.equal(data.tenants[0].name, 'Test 1');
      assert.equal(data.tenants[1].name, 'Test 2');
      done();
    });
  });

  it('should return error for invalid body', (done) => {
    get(eventInvalid, context, (err, response) => {
      expect(response.statusCode).to.be.a('number');
      expect(response.statusCode).to.equal(500);
      done();
    });
  });

  after(() => AWS_MOCK.restore());
});
