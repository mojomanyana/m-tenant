import AWS from 'aws-sdk';
import uuid from 'uuid';
import assert from 'assert';
import { created, failure } from '../../../_shared/labda/responses';
import { newTenantPutParams } from '../../../_shared/labda/dynamo-helper';

const newTenant = (event, context, callback) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const paramsBody = JSON.parse(event.body);

    assert(event.requestContext.authorizer.principalId);
    assert(paramsBody.name);

    const params = newTenantPutParams(
      uuid.v1(), // New tenant ID
      event.requestContext.authorizer.principalId, // ID of the creator user
      paramsBody,
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

module.exports = {
  newTenant,
};
