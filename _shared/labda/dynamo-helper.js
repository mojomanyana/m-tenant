const getTenantsListScanParams = (size, lastEvaluatedKey) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Limit: size,
    ExclusiveStartKey: lastEvaluatedKey,
  }
);

const getTenantByNameGetParams = tenantName => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Key: {
      tenantName,
    },
  }
);

const newTenantPutParams = (tenantId, tenantName, ownerEmail) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Item: {
      tenantId,
      tenantName,
      ownerEmail,
      createdAt: Date.now(),
    },
    ConditionExpression: '#tenantName <> :tenantName',
    ExpressionAttributeNames: {
      '#tenantName': 'tenantName',
    },
    ExpressionAttributeValues: {
      ':tenantName': tenantName,
    },
  }
);

const existingTenantAddTaskUpdateParams = (
  tenantName,
  description,
  operations,
  notifyAfterTS,
) => (
  {
    TableName: process.env.DYNAMODB_TENANT_TABLE,
    Key: {
      tenantName,
    },
    UpdateExpression: 'SET #attrName = list_append(if_not_exists(#attrName, :empty_list), :attrValue)',
    ExpressionAttributeNames: {
      '#attrName': 'tasks',
    },
    ExpressionAttributeValues: {
      ':attrValue': [
        {
          notifyAfterTS,
          description,
          operations,
          createdAt: Date.now(),
        },
      ],
      ':empty_list': [],
    },
    ReturnValues: 'UPDATED_NEW',
  }
);

module.exports = {
  getTenantsListScanParams,
  getTenantByNameGetParams,
  newTenantPutParams,
  existingTenantAddTaskUpdateParams,
};
