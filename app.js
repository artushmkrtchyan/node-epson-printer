const app = require('express')();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors')

const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, application/json, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Accept-Language', '*');

    // Pass to next layer of middleware

    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use((req, res, next) => {
    // timeout for all HTTP requests
    req.setTimeout(30000, () => {
        let err = new Error('Request Timeout');
        err.status = 408;
        next(err);
    });
    // server response timeout for all HTTP requests
    res.setTimeout(30000, () => {
        let err = new Error('Service Unavailable');
        err.status = 503;
        next(err);
    });
    next();
});


let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: '/dev/usb/lp1',
    options:{
        timeout: 5000
    },
    lineCharacter: "-",
});

// app.options('*', cors())
// app.use(cors())

app.options('/api/v1/printer', cors())
app.post('/api/v1/printer', cors(), async (req, res, next) => {
    const isConnected = await printer.isPrinterConnected();
    if(!isConnected) {
        return next(new Error("Printer not connected"))
    }
    const body = require('./exampleData.js');
    // const {body} = req;
    if(Array.isArray(body) && !body.length) {
        return next(new Error("Body cannot be empty"))
    }

    try {
        printer.clear();

        body.forEach(item => {
            const {action, value} = item;
            if(!action) return;

            if(value === null) {
                printer[action]();
            }else if(Array.isArray(value) && (action === 'tableCustom' || action === 'table')){
                printer[action](value);
            }else if(Array.isArray(value) && value.length > 1){
                printer[action](...value);
            }else {
                printer[action](value);
            }
        })

        printer.cut();

		const execute = printer.execute();
        execute.then(result => res.status(200).json({status: "ok", message: result}))
            .catch(err => next(err))
    } catch (e) {
       return next(e)
    }

});

app.use((req, res, next) => {
    const err = new Error('Forbidden');
    err.status = 403;
    next(err);
})

app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    const error = {
        error: "error",
        message: err.message,
    };
    res.json(error);

});


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3002');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}