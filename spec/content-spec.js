var request = require('request');

describe('testing express server', function() {

  beforeEach(function() {
    // start a server;
  });
  afterEach(function() {
    // stop a server;
  });

  it('Server should respond to / path', function (done){
    request.get('http://localhost:8080/', function(err, response){
      expect(response).toBeDefined();
      if (response) {
        expect(response.statusCode).toBe(200);
      }
      done();
    });
  });
  it('Server should respond to /records path', function (done){
    request.get('http://localhost:8080/records', function(err, response){
      expect(response).toBeDefined();
      if (response) {
        expect(response.statusCode).toBe(200);
      }
      done();
    });
  });
  it('Server should respond to /task_one path', function (done){
    request.get('http://localhost:8080/task_one', function(err, response){
      expect(response).toBeDefined();
      if (response) {
        expect(response.statusCode).toBe(200);
      }
      done();
    });
  });
  it('Server should respond to /task_two path', function (done){
    request.get('http://localhost:8080/task_two', function(err, response){
      expect(response).toBeDefined();
      if (response) {
        expect(response.statusCode).toBe(200);
      }
      done();
    });
  });
  it('Server should respond with response code 404 to /error path', function (done){
    request.get('http://localhost:8080/error', function(err, response){
      expect(response).toBeDefined();
      if (response) {
        expect(response.statusCode).toBe(404);
      }
      done();
    });
  });

});
