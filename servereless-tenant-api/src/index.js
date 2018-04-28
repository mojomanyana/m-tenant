import dotEnv from 'dotenv';
import { success, failure } from '../../_shared/labda/responses';
import { call } from '../../_shared/labda/dynamodb-helper';

dotEnv.config();

exports.get = (event, context, callback) => {
  try {
    const { size } = event.queryStringParameters || { size: 100 };
    const paramsBody = JSON.parse(event.body);
    const getTenantsListParams = {
      TableName: process.env.DYNAMODB_TENANT_TABLE,
      IndexName: 'createdAt-index',
      KeyConditionExpression: 'createdAt > :crtAt',
      ExpressionAttributeValues: {
        ':crtAt': 0,
      },
      Limit: size,
      ScanIndexForward: false,
      ExclusiveStartKey: paramsBody.lastEvaluatedKey,
    };
    call(getTenantsListParams)
      .then(data =>
        callback(
          null,
          success({
            status: true,
            tenants: data.Items,
            lastEvaluatedKey: data.LastEvaluatedKey,
          }),
        ))
      .catch(err => callback(null, failure({ status: false, error: err })));
  } catch (err) {
    callback(null, failure({ status: false, error: err }));
  }
};
