const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
global.__basedir = __dirname;

const app = express()
const corsOptions = {
	'https://test-app.org': true,
	'http://localhost:4200': true
}

app.use(cors(corsOptions));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

app.use((error, req, res, next) => {
	res.status(500).json(error.message);
	next(error);
});

require('./src/route/user.route')(app)
console.log('--------------',process.env.PORT);
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})