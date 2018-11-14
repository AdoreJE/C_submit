var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var writeFile = require('write');
var fs = require('fs');
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage })
var fs = require('fs');
var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  var ip;
  if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
      ip = req.connection.remoteAddress;
  } else {
      ip = req.ip;
  }console.log("client IP is *********************" + ip);
  var filename = req.file.filename;
  fs.appendFileSync('log.txt', filename + " " + ip + "\n");
  
  res.send('Uploaded : '+filename);

});
app.listen(3000, function(){
  console.log('Connected, 3000 port!');
})
