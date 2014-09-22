var PocketSphinx = require('../');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  var ps = new PocketSphinx({

  }, function(hypothesis, score, utterance_id) {
	socket.emit('utterance', {hyp: hyp, utterance: utt, score:score});
  });

  ps.addGrammarSearch("digits", __dirname + "/digits.gram");
  ps.search = "digits";

  socket.on('audio', function(data) {
    ps.write(data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});