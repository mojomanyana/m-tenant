import dotEnv from 'dotenv';
import AWS from 'aws-sdk';
import {
  success,
  failure,
} from '../../_shared/labda/responses';
import { getTenantsListQueryParams } from '../../_shared/labda/dynamo-helper';

dotEnv.config();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.get = (event, context, callback) => {
  try {
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
        ))
      .catch(err => callback(null, failure({ status: false, error: err })));
  } catch (err) {
    callback(null, failure({ status: false, error: err }));
  }
};
