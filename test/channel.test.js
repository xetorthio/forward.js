var
  assert = require('assert'),
  http = require('http'),
  forward = require('forward'),
  redis = require('redis');

forward.create(8124, '127.0.0.1', ['channel']);
forward.start();

var client = http.createClient(8124, 'localhost');

var clients = 0; 

module.exports = {
  'check connection status and headers' : function() {
    var req = client.request('GET', '/');
    req.on('response', function(response) {
      try {
        assert.equal(200, response.statusCode);
      } catch(e) {
        --clients || forward.stop();
        throw e;
      }
      req.on('data', function(chunk) {
          assert.equal('{id:123}\n', chunk);
          --clients || forward.stop();
      });
    });
    clients++;
    req.end();
      /*
      redis = redis.createClient();
      redis.publish('channel', '{id:123}'); 
      redis.quit();
      */
  }
  /*
  ,
  'stream messages when received' : function(beforeExit) {
    var req = client.request('GET', '/');
    req.on('response', function(response) {
      req.on('data', function(chunk) {
        assert.equal('{id:123}\n', chunk);
      });
    });
    clientes++;
    req.end();
  }
  */
}
