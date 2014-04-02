/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs  = require('ejs');

var app = express();

app.enable('trust proxy');	//since we're sitting behind a reverse proxy
// all environments
app.set('port', 3001);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout:false, root: __dirname + '/views' });
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.index);
app.get('/projects', routes.projects);
app.get('/projects/:project_id', routes.view_project);
app.get('/cv', routes.cv);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
