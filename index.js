// Claude AI was used as a learning tool in developing this file

const express = require('express')
const app = express()

const cors = require("cors")

const dice = require('./roll-dice')

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 0

// Add sites that can speak to the server
// NEED TO ADD STATIC SITE URL!
const corsOptions = {
	origin: ['http://localhost:5500', 'static site']
}

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/public'))

// The app.get functions below are being processed in Node.js running on the server.
app.get('/api/ping', cors(corsOptions), (request, response) => {
	console.log('Calling "/api/ping"')
	response.type('text/plain')
	response.send(`ping response v${majorVersion}.${minorVersion}`)
})

// Dice rolling call
app.get('/api/roll', cors(corsOptions), (request, response) => {
	console.log('Calling "/api/roll" on the Node.js server.')
	const value = dice.rollD20()
	
	console.log('Rolled: ' + value)

	response.type('text/plain')
	response.json({ sides: 20, roll: value })
});

// Intentionally has no CORS for CORS failure demo
app.get('/api/no-cors', (request, response) => {
	console.log('Calling "/api/no-cors"')
	response.type('text/plain')
	response.send('Shouldnt see this in client')
})

// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Access function from a separate JavaScript module.
    response.write("Test roll: " + dice.rollD20() + "<br><br>");

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Close the response
    response.end('<h3>The End.</h3>');
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)
