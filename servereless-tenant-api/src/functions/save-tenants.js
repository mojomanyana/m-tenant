import AWS from 'aws-sdk';
import uuid from 'uuid';
import assert from 'assert';
import { created, success, failure } from '../../../_shared/labda/responses';
import {
  newTenantPutParams,
  existingTenantAddTaskUpdateParams,
} from '../../../_shared/labda/dynamo-helper';

const newTenant = (event, context, callback) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const paramsBody = JSON.parse(event.body);

    assert(paramsBody.name);

    const params = newTenantPutParams(
      uuid.v1(), // New tenant ID
      paramsBody.name,
    );

    // Query data and handle promise response
    dynamoDb.put(params).promise()
      .then(() =>
        callback(
          null,
          created({
            status: true,
            tenant: params.Item,
          }),
        ));
  } catch (err) {
    callback(null, failure({ status: false, error: err }));
  }
};

const newTaskForTenant = (event, context, callback) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const paramsBody = JSON.parse(event.body);
    const { tenantName } = event.pathParameters;
    assert(tenantName);
    assert(paramsBody.description);
    assert(paramsBody.operations);
    assert(paramsBody.operations[0]);

    const paramsAddTask = existingTenantAddTaskUpdateParams(
      tenantName,
      paramsBody.description,
      paramsBody.operations,
      paramsBody.notifyAfterTS || Date.now(),
    );

    // Update data and handle promise response
    dynamoDb.update(paramsAddTask).promise()
      .then(data =>
        callback(
          null,
          success({
            data,
            status: true,
          }),
        ));
  } catch (err) {
    callback(null, failure({ status: false, error: err }));
  }
};

module.exports = {
  newTenant,
  newTaskForTenant,
};
