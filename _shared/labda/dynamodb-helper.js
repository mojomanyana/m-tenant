import AWS from 'aws-sdk';

const callGet = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb.get(params).promise();
};
const callUpdate = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb.update(params).promise();
};
const callPut = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb.put(params).promise();
};
const callDelete = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb.delete(params).promise();
};
const callQuery = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb.query(params).promise();
};
const callScan = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb.scan(params).promise();
};
const callBatchWrite = (params) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb.batchWrite(params).promise();
};
const call = (action, params) => {
  switch (action) {
    case 'get':
      return callGet(params);
    case 'update':
      return callUpdate(params);
    case 'delete':
      return callDelete(params);
    case 'put':
      return callPut(params);
    case 'query':
      return callQuery(params);
    case 'scan':
      return callScan(params);
    case 'batchWrite':
      return callBatchWrite(params);
    default:
      throw new Error('DynamoDB method not implemented!');
  }
};

export default call;
