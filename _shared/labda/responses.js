const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});

module.exports = {
  success: function success(body) {
    return buildResponse(200, body);
  },
  created: function success(body) {
    return buildResponse(201, body);
  },
  failure: function success(body) {
    return buildResponse(500, body);
  },
}
