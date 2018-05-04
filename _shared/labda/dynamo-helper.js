const getTenantsListScanParams = (size, lastEvaluatedKey) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Limit: size,
    ExclusiveStartKey: lastEvaluatedKey,
  }
);

const getTenantByNameGetParams = (tenantName) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Key: {
      tenantName,
    },
  }
);

const newTenantPutParams = (tenantId, tenantProperties) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Item: {
      tenantId,
      tenantName: tenantProperties.name,
      createdAt: new Date().getTime(),
    },
  }
);

module.exports = {
  getTenantsListScanParams,
  getTenantByNameGetParams,
  newTenantPutParams,
};
