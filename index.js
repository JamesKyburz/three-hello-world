require('./src/reporterrors')
var app = require('./src/app')
require('./src/load')(app)
require('./src/render')(app)
