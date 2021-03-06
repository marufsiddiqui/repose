var fixtures = require('./fixtures.js');
var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');

require('./models/user');
var User = mongoose.model('User');

var URL = 'http://localhost:3001';

module.exports = function () {

  describe('/user', function () {
    it('should respond with an array of all users', function (done) {

      var users = fixtures.users;

      request(URL)
        .get('/user')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;

          res.body.should.be.an.instanceOf(Array)
            .with.lengthOf(users.length);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('joinDate');

          done();
        });

    });
  });

  describe('/user?name=Eric Cartman', function () {
    it('should respond with an array with the user "Eric Cartman" in it', function (done) {

      var users = fixtures.users;

      request(URL)
        .get('/user?name=Eric Cartman')
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;

          res.body.should.be.an.instanceOf(Array)
            .with.lengthOf(1);
          res.body[0].should.have.property('_id');
          res.body[0].should.have.property('name');
          res.body[0].should.have.property('joinDate');
          res.body[0].name.should.equal('Eric Cartman');

          done();
        });

    });
  });

};

