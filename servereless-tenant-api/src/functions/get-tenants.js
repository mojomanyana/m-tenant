import AWS from 'aws-sdk';
import { success, failure } from '../../../_shared/labda/responses';
import {
  getTenantsListScanParams,
  getTenantByNameGetParams,
} from '../../../_shared/labda/dynamo-helper';

const getTenantsList = (event, context, callback) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { size } = event.queryStringParameters || { size: 100 };
    const paramsBody = JSON.parse(event.body);
    const params = getTenantsListScanParams(size, paramsBody.lastEvaluatedKey);

    // Query data and handle promise response
    dynamoDb.scan(params).promise()
      .then(data =>
        callback(
          null,
          success({
            status: true,
            tenants: data.Items,
            lastEvaluatedKey: data.LastEvaluatedKey,
          }),
        ));
  } catch (err) {
    callback(null, failure({ status: false, error: err }));
  }
};

const getTenantById = (event, context, callback) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { tenantName } = event.pathParameters;
    const params = getTenantByNameGetParams(tenantName);

    // Get single tenant data and handle promise response
    dynamoDb.get(params).promise()
      .then(data =>
        callback(
          null,
          success({
            status: true,
            tenant: data.Item,
          }),
        ));
  } catch (err) {
    callback(null, failure({ status: false, error: err }));
  }
};

module.exports = {
  getTenantsList,
  getTenantById,
};
