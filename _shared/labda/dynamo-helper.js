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

const newTenantPutParams = (tenantId, userId, tenantProperties) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Item: {
      tenantId,
      userId,
      createdAt: new Date().getTime(),
    }
  }
);

module.exports = {
  getTenantsListQueryParams,
  getTenantByIdGetParams,
  newTenantPutParams,
};
