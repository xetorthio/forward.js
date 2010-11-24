var http = require('http'),
    redis = require('redis');




/*
client.on('error', function (err) {
  console.log('Redis connection error to ' + client.host + ':' + client.port + ' - ' + err);
});
client.subscribe('items');
*/
exports.create = function(port, interface, channels) {
  exports.server = new http.Server();
  exports.server.clients = [];
  exports.server.port = port;
  exports.server.interface = interface;
  // redis = redis.createClient();
  exports.server.on('request', function(req, res) {
    exports.server.clients.push(res);
    res.writeHead(200, {'Content-Type': 'text/plain','Transfer-Encoding':'chunked'});
    res.write("sdddddddddddddddddddddddddddd\n");
 /*   client.on('message', function(channel, message) {
      res.write(message + '\n');
    });*/
  });
}

exports.start = function() {
  exports.server.listen(exports.server.port, exports.server.interface);
};

exports.stop = function() {
  exports.server.clients.forEach(function(client) {
    client.end();
  });
  exports.server.clients = [];
  exports.server.close();
};
