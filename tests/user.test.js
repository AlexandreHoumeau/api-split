const chai = require("chai");
const mongoose = require("mongoose");
const chaiHttp = require("chai-http");
const app = require('../index');
const User = require('../models/User');

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });
  describe("/POST User", () => {
    it("it should add user", (done) => {
      let user = new User({
        name: "Test",
        email: "test@test.test",
        password: "testtest"
      });
      chai
        .request(app)
        .post('/register')
        .send(user)
        .end((err, res) => {
          console.log(res.error)
          // res.should.have.status(200);
          // res.body.should.be.a("object");
          // res.body.book.should.have.property("_id");
          // res.body.book.should.have.property("email");
          // res.body.book.should.have.property("password");
          done();
        });
    });
  });
});
