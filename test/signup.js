const { chai, app } = require('Test');
const should = chai.should();

describe("User is signing up...", () => {
    let user;
    beforeEach(() => {
        user = {
            email: "faded.lover.shadows@gmail.com",
            username: "SHADOWZXCV",
            password: "123qweasdzxc"
        };
    });

    it("If existing user, should return with 405 saying user already exists!", done => {
        // existing user
        chai.request(app).post("/signup").send(user).end((err, res) => {
            res.should.have.status(405);
            res.body.errors.should.have.property("type").equal("account-exists");

            done(err);
        });
    })
    it("If new user, it should add user to db and send email verification link, returns back 200 sc!", done => {
        user = {
            email: "test@test.com",
            username: "SHADOWZXCX",
            password: "123qweasdzxc"
        };

         // new user
        chai.request(app).post("/signup").send(user).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("email");

            done(err);
        });
    })
    it("If scheme of input is flawed: Should generate error and send back 400", done => {
        user.password = null;

        // missing fields
        chai.request(app).post("/signup").send(user).end((err, res) => {
            res.should.have.status(400);
            res.body.should.not.have.property("errors");

            done(err);
        });
    })
});
