const check = (response, expect, code) => {
  expect(response.statusCode).to.be.a('number');
  expect(response.statusCode).to.equal(code);
}

module.exports = {
  errorResponseCheck: (response, expect) => check(response, expect, 500),
  successResponseCheck: (response, expect) => check(response, expect, 200),
  createdResponseCheck: (response, expect) => check(response, expect, 201),
};
