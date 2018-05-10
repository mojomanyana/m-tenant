import AWS_MOCK from 'aws-sdk-mock';
import assert from 'assert';
import { expect } from 'chai';
import {
  getAll,
  getSingle,
  create,
  addTask,
} from '../src/index';
import {
  successResponseCheck,
  createdResponseCheck,
  errorResponseCheck,
} from '../../_shared/labda/responses-test-helper';

const eventEmpty = { body: '{}' };
const eventInvalid = { body: undefined };
const context = {};

describe('Test tenant lambda functions', () => {
  before(() => {
    AWS_MOCK.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, { Items: [{ name: 'Test 1', tenantId: 'tenantId1' }, { name: 'Test 2', tenantId: 'tenantId2' }] });
    });

    AWS_MOCK.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
      callback(null, { Item: { name: 'Test 1', tenantId: 'tenantId1', userId: 'userId1' } });
    });

    AWS_MOCK.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, 'Success');
    });

    AWS_MOCK.mock('DynamoDB.DocumentClient', 'update', (params, callback) => {
      callback(null, 'Success');
    });
  });

  it('getAll() => should return 2 tenants and undefined lastEvaluatedKey', (done) => {
    getAll(eventEmpty, context, (errAll, responseAll) => {
      const data = JSON.parse(responseAll.body);
      successResponseCheck(responseAll, expect);
      expect(data.lastEvaluatedKey).to.equal(undefined);
      assert.equal(data.tenants.length, 2);
      assert.equal(data.tenants[0].name, 'Test 1');
      assert.equal(data.tenants[1].name, 'Test 2');
      done();
    });
  });

  it('getAll() => should return error for invalid body', (done) => {
    getAll(eventInvalid, context, (errForAll, responseForAll) => {
      errorResponseCheck(responseForAll, expect);
      done();
    });
  });

  it('getSingle() => should return solo tenant details', (done) => {
    eventEmpty.pathParameters = {
      tenantId: 'tenantId1',
      userId: 'userId1',
    };
    getSingle(eventEmpty, context, (errSingle, responseSingle) => {
      const data = JSON.parse(responseSingle.body);
      successResponseCheck(responseSingle, expect);
      assert.equal(data.tenant.name, 'Test 1');
      assert.equal(data.tenant.tenantId, 'tenantId1');
      assert.equal(data.tenant.userId, 'userId1');
      done();
    });
  });

  it('getSingle() => should return error for invalid body', (done) => {
    getSingle(eventInvalid, context, (errForSingle, responseForSingle) => {
      errorResponseCheck(responseForSingle, expect);
      done();
    });
  });

  it('create() => should save new tenant details', (done) => {
    const eventNewTenant = { body: '{ "name": "test name" }' };
    eventNewTenant.requestContext = {
      authorizer: {
        principalId: 'userId1',
      },
    };
    create(eventNewTenant, context, (errCreate, responseCreate) => {
      const data = JSON.parse(responseCreate.body);
      createdResponseCheck(responseCreate, expect);
      assert(data.tenant.tenantId);
      assert.equal(data.tenant.tenantName, 'test name');
      done();
    });
  });

  it('create() => should return error for missing name', (done) => {
    eventEmpty.requestContext = {
      authorizer: {
        principalId: 'userId1',
      },
    };
    create(eventEmpty, context, (errCreateMissing, responseCreateMissing) => {
      errorResponseCheck(responseCreateMissing, expect);
      done();
    });
  });

  it('addTask() => should return solo tenant details with task added', (done) => {
    const eventNewTask = { body: '{ "description": "task name", "operations": ["cache"] }' };
    eventNewTask.pathParameters = {
      tenantName: 'tenantId1',
    };
    addTask(eventNewTask, context, (errAddTask, responseAddTask) => {
      const data = JSON.parse(responseAddTask.body);
      successResponseCheck(responseAddTask, expect);
      assert.equal(data.data, 'Success');
      done();
    });
  });

  it('addTask() => should return error for invalid body', (done) => {
    addTask(eventInvalid, context, (errForTask, responseForTask) => {
      errorResponseCheck(responseForTask, expect);
      done();
    });
  });

  after(() => AWS_MOCK.restore());
});
