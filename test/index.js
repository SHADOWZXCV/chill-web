const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("@app");


chai.use(chaiHttp);

module.exports = {
    chai,
    app
};
