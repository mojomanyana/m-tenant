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

const getTenantByIdGetParams = (tenantId, userId) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Key: {
      tenantId,
      userId,
    },
  }
);

module.exports = {
  getTenantsListQueryParams,
  getTenantByIdGetParams,
};
