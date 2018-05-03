const buildResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify(body),
});

module.exports = {
  success: body => buildResponse(200, body),
  created: body => buildResponse(201, body),
  failure: body => buildResponse(500, body),
};
