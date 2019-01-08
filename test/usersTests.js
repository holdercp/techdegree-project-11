const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const User = require('../src/users/usersModel');

const { expect } = chai;

chai.use(chaiHttp);

describe('Users', () => {
  // GET current user w/ proper auth
  describe('/GET user w/ valid auth', () => {
    before((done) => {
      User.remove({ fullName: 'TEST USER' }, (err) => {
        User.create(
          { fullName: 'TEST USER', emailAddress: 'test@example.com', password: 'pass' },
          (err) => {
            done();
          },
        );
      });
    });
    it('it should GET the currently authenticated user', (done) => {
      chai
        .request(server)
        .get('/api/users')
        .auth('test@example.com', 'pass')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res).to.be.a('object');
          expect(res.body).to.have.property('fullName');
          expect(res.body).to.have.property('emailAddress');
          expect(res.body).to.have.property('password');
          done();
        });
    });
  });

  // GET course w/ invalid auth
  describe('/GET user w/ invalid auth', () => {
    it('it should respond with a 401', (done) => {
      chai
        .request(server)
        .get('/api/users')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
