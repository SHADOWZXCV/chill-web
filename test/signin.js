const { chai, app } = require('Test');
const should = chai.should();

describe("User is signing in...", () => {
    let user;
    beforeEach(() => {
        user = {
            username: "SHADOWZXCX",
            password: "123qweasdzxc"
        };
    });

    it("User has confirmed his email & is a valid user with valid data", done => {
        // existing user
        chai.request(app).post("/signin").send(user).end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("ttl").a("number");

            done(err);
        });
    });

    it("User didn't confirm his email & is a valid user with valid data", done => {
        user.username = "shadowzxcv";

        chai.request(app).post("/signin").send(user).end((err, res) => {
            res.should.have.status(401);

            done(err);
        });
    })
    it("Use tying to sign in but the account is not found", done => {
        user.username = "asd";
        // missing fields
        chai.request(app).post("/signin").send(user).end((err, res) => {
            res.should.have.status(404);
            done(err);
        });
    })
});
