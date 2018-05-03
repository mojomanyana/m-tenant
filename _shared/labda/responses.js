const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});

module.exports = {
  success: (body) => {
    return buildResponse(200, body);
  },
  created: (body) => {
    return buildResponse(201, body);
  },
  failure: (body) => {
    return buildResponse(500, body);
  },
};
