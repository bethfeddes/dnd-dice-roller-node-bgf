# DND Dice Roller API Server
 
**Author:** Bethany Feddes
**Course:** Software Engineering 44000-001
 
A Node.js and Express server, hosted on Microsoft Azure App Service, that provides RESTful APIs for the DND Dice Roller. The server has no standard user interface. Its main page (`public/index.html`) is a diagnostic page that tests each API endpoint; it does not implement the Dice Roller itself.
 
The Dice Roller client is a separate repository hosted on an Azure static website: [link to client repo]
 
- **Live server:** [https://your-server.azurewebsites.net]
- **Live client:** [https://your-static-site-url]
## API endpoints
 
| Method | Route | Response | CORS |
|---|---|---|---|
| GET | `/api/ping` | Plain text with the server version, e.g. `ping response v1.0`. Used by the client to wake up the server. | Allowed origins only |
| GET | `/api/roll` | Plain text number from 1 to 20 (one d20 roll) | Allowed origins only |
| GET | `/api/no-cors` | Plain text message. Sends no CORS header, so the client can demonstrate a CORS failure. | None (intentional) |
| GET | `/test` | HTML page with a sample roll and request details | Not applicable |
 
Requests to any other route return a custom `404 - Not Found` response.
 
Allowed origins are set in `corsOptions` in `index.js`: the local client during development (`http://localhost:5500`) and the deployed static website.
 
## Files
 
```
index.js        Express server and API routes
roll-dice.js    Module that generates d20 rolls
public/
  index.html    API test page (served at the server's root URL)
package.json    Project information, start script, and dependencies
web.config      IIS configuration for Azure App Service on Windows
README.md
LICENSE
```
 
## Running locally
 
This is a JavaScript project, so there is no compile step. Node.js runs the source files directly.
 
**Prerequisites:** [Node.js](https://nodejs.org/) (which includes npm)
 
1. Clone the repository and open a terminal in the project folder.
2. Install the dependencies (Express and cors):
```
   npm install
```
3. Start the server:
```
   npm start
```
4. Open `http://localhost:3000/` in a browser to view the API test page. Click each button to call an endpoint and see its status code, response time, and response text.
Press `Ctrl-C` in the terminal to stop the server.
 
To use the server with the local Dice Roller client, run the client with VS Code Live Server on port 5500 (or add the client's actual origin to `corsOptions` in `index.js`).
 
## Deploying to Azure
 
1. Deploy the repository to an Azure App Service (Node.js). Azure installs the dependencies from `package.json` and starts the app with `npm start` (Linux) or through `web.config` (Windows).
2. Add the deployed static website's origin to `corsOptions` in `index.js`, using `https://` and no trailing slash.
3. Increase `minorVersion` in `index.js` with each deployment, then visit `/api/ping` on the live server to confirm the new version is running.
## Credits
 
- **Template:** The server structure, `web.config`, and `package.json` are based on the Microsoft Azure App Service Node.js template, provided by Eric Pogue for Lewis' Software Engineering class. Modified for this assignment.
- **Packages:** [Express](https://expressjs.com/) and [cors](https://github.com/expressjs/cors), installed through npm.
- **AI assistance:** Claude AI (Anthropic) was used as a learning tool and to assist with development, including explanations of client/server architecture, CORS, and Express routing; code review of `index.js`; and the `testEndpoint` function in `public/index.html`. All AI-assisted code was reviewed and tested by the author. Details are noted at the top of each source file. Claude AI also generated the README for this project.
## License
 
MIT. See `LICENSE`.
 