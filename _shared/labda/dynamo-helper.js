const getTenantsListQueryParams = (size, lastEvaluatedKey) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    IndexName: 'createdAt-index',
    KeyConditionExpression: 'createdAt > :crtAt',
    ExpressionAttributeValues: {
      ':crtAt': 0,
    },
    Limit: size,
    ScanIndexForward: false,
    ExclusiveStartKey: lastEvaluatedKey,
  }
);

module.exports = {
  getTenantsListQueryParams,
};