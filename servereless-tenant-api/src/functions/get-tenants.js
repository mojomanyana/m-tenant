import AWS from 'aws-sdk';
import { success, failure } from '../../../_shared/labda/responses';
import { getTenantsListQueryParams } from '../../../_shared/labda/dynamo-helper';

const getTenantsList = (event, context, callback) => {
  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const { size } = event.queryStringParameters || { size: 100 };
    const paramsBody = JSON.parse(event.body);
    const params = getTenantsListQueryParams(size, paramsBody.lastEvaluatedKey);

    // Query data and handle promise response
    dynamoDb.query(params).promise()
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

module.exports = {
  getTenantsList,
};
