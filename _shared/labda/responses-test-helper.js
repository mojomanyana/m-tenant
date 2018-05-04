module.exports = {
  errorResponseCheck: (response, expect) => {
    expect(response.statusCode).to.be.a('number');
    expect(response.statusCode).to.equal(500);
  },
  successResponseCheck: (response, expect) => {
    expect(response.statusCode).to.be.a('number');
    expect(response.statusCode).to.equal(200);
  },
  createdResponseCheck: (response, expect) => {
    expect(response.statusCode).to.be.a('number');
    expect(response.statusCode).to.equal(201);
  },
};