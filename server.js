var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Datastore = require('nedb');
var dbsign = new Datastore({ filename: 'data/DataCenter.db', autoload: true });
var crypto = require('crypto');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var server = http.createServer(app);
var io = require ('socket.io').listen(server);
var people = {};
app.use(session({
	secret: 'owned',
	resave: false,
	saveUninitialized: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use (cookieParser());
app.use(flash());
//подключение шаблонизатора ejs, шаблоны хранятся в папке views
app.set('view engine', 'ejs');
//запрос на главную страницу
app.get('/', function(req,res){
	res.render('index',{user: req.session.user});
});
app.use(express.static('client'));
//запрос на страницу authorization
app.get('/authorization', function(req,res){
	res.render('authorization',{user: req.session.user});
});
//запрос на страницу registration
app.get('/registration', function(req,res){
	res.render('registration',{user: req.session.user});
});
app.get('/chat', function(req,res) {
	res.render('chat', {user:req.session.user});
});
app.get('/guest', function(req, res){
	res.render('guest');
});
app.post('/signup', function(req, res) {
 var user = req.body;
 console.log(user);
 var date = new Date ();
 user.created = date.toISOString();
 user.password = crypto.createHash('sha512').update(user.password).digest('hex');
 dbsign.insert(user, function(error) {
 		if (error) {
 			return res.send(500,error);
 		}
 		res.redirect('/authorization');
 	});
});
app.post('/login', function(req,res) {
	var loginData = req.body;
	loginData.password = crypto.createHash('sha512').update(loginData.password).digest('hex');
	dbsign.findOne({login: loginData.login}, function(error, user){if (user == null) {
			req.flash('loginError', 'Такого аккаунта не существует');
			return res.redirect('/');
		}
		if (loginData.password != user.password) {
			req.flash('loginError', 'Не верный пароль');
			return res.redirect('/'); 
		}
		req.session.user = {
			login: user.login
		};
		req.flash('loginSucces', 'Вы авторизировались на сайте');
		res.redirect('/');
	});
});
app.get('/logout', function(req,res) {
	req.session.user = null;
	res.redirect('/');
});
//чат
io.on('connection', function (client) {
  client.on('join', function(name){
    people[client.id] = name;
    client.emit('update', 'Вы подключились к серверу.');
    io.sockets.emit('update', name + ' Подключился к серверу.');
    io.sockets.emit('update-people', people);
  });

  client.on('send', function(msg){
    io.sockets.emit('chat', people[client.id], msg);
  });

  client.on('disconnect', function(){
    io.sockets.emit('update', people[client.id] + ' Отключился от сервера.');
    delete people[client.id];
    io.sockets.emit('update-people', people);
  });
});
//  end of chat
server.listen(process.env.PORT,process.env.IPnpm);