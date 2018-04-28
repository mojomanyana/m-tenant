import dotEnv from 'dotenv';
import AWS from 'aws-sdk';
import { success, failure } from '../../_shared/labda/responses';

dotEnv.config();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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
    // Query data and handle promise response
    dynamoDb.query(getTenantsListParams).promise()
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
