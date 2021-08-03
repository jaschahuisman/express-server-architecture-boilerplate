/*! require("source-map-support").install(); */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/database.ts":
/*!********************************!*\
  !*** ./src/common/database.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
/**
 * ## Database
 * Database class that is responsible for the creation of the main database \
 * in this application. By initializing a new instance of this class, database \
 * is created and must be started with the {@link Database.connect connect  } method.
 * @class Database
 */
var Database = /** @class */ (function () {
    function Database() {
        /**
         * ### Mongoose connection options
         * @type {mongoose.ConnectOptions}
         */
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        };
    }
    /**
     * ### getConnectionString
     * Get the connection string for the database corresponding to the current environment.
     *
     * Available environments:
     * - `development`
     * - `test`
     * - `production`
     *
     * Specifiy the environment with the `NODE_ENV` environment variable.
     *
     * @returns {string}
     */
    Database.prototype.getConnectionString = function () {
        switch ("development") {
            case 'development':
                return 'mongodb://localhost/dbname-dev';
            case 'production':
                return (process.env.MONGODB_URI ||
                    'mongodb://localhost:27017/dbname-prod');
            default:
                return 'mongodb://localhost/dbname-test';
        }
    };
    /**
     * ### connect
     * Connect to the database with the calculated connectionstring, \
     * and retrieve a mongoose connection object.
     *
     * ```typescript
     * // Start database
     * const database = new Database();
     * database.connect();
     * ```
     *
     * @returns {mongoose.Connection}
     */
    Database.prototype.connect = function () {
        var connectionString = this.getConnectionString();
        mongoose_1.default
            .connect(connectionString, this.options)
            .then(function () {
            console.info("*** Connected to database: " + connectionString);
        })
            .catch(function (err) {
            console.error("*** Failed to connect to database: " + connectionString, err);
        });
        var db = mongoose_1.default.connection;
        db.on('error', function (err) { return console.log('*** Database error: ', err); });
        return db;
    };
    return Database;
}());
exports.default = Database;


/***/ }),

/***/ "./src/common/env.ts":
/*!***************************!*\
  !*** ./src/common/env.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ "dotenv"));
dotenv_1.default.config();


/***/ }),

/***/ "./src/common/server.ts":
/*!******************************!*\
  !*** ./src/common/server.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var cors_1 = __importDefault(__webpack_require__(/*! cors */ "cors"));
var body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var os_1 = __importDefault(__webpack_require__(/*! os */ "os"));
var http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
var routes_1 = __importDefault(__webpack_require__(/*! @src/routes */ "./src/routes.ts"));
var root = path_1.default.normalize(__dirname + '/../..');
/**
 * ## ExpressServer
 * Server class that is responsible for the creation of the express server used \
 * in this application. By initializing a new instance of this class, the express server \
 * is created and must be started with the {@link ExpressServer.listen listen  } method.
 * @class ExpressServer
 */
var ExpressServer = /** @class */ (function () {
    /**
     * ### constructor
     * Initializes the http server in the desired order.
     * 1. Initialize the default middleware
     * 2. Serve static files
     * 3. Serve custom routes
     * 4. Initialize error handler middleware
     */
    function ExpressServer() {
        this.app = express_1.default();
        this.initialize();
        this.serveStatic();
        this.serveRoutes();
        this.initializeErrorHandlers();
    }
    /**
     * ### initialize
     * Initializes the default middleware configuration for the server.
     * @returns {void}
     */
    ExpressServer.prototype.initialize = function () {
        this.app.use(cors_1.default({ origin: '*' }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    };
    /**
     * ### serveStatic
     * Serves static files from the root/static directory.
     * @returns {void}
     */
    ExpressServer.prototype.serveStatic = function () {
        this.app.use('/static', express_1.default.static(root + "/static"));
    };
    /**
     * ### serveRoutes
     * Serves custom routes from the routes directory.
     * @returns {void}
     */
    ExpressServer.prototype.serveRoutes = function () {
        routes_1.default(this.app);
    };
    /**
     * ### initializeErrorHandlers
     * Initializes the default error handlers for the server.
     * @returns {void}
     */
    ExpressServer.prototype.initializeErrorHandlers = function () {
        this.app.use(function (req, res) { return res.status(404).send('Not found'); });
    };
    /**
     * ### listen
     * Run a http server with the express app and listen on the specified port.
     *
     * ```typescript
     * // Start server
     * const port = 3000;
     * const server = new Server();
     * server.listen(port);
     * ```
     *
     * @param  {number} port
     * @returns {express.Application} express
     */
    ExpressServer.prototype.listen = function (port) {
        /**
         * ### welcome
         * Generates a welcome message for the server log.
         * @param  {number} p
         * @returns void
         */
        var welcome = function (p) { return function () {
            var environment = "development" || 0;
            var device = os_1.default.hostname();
            var message = "*** Server running in: " + environment + " @: " + device + " on port: " + p;
            console.log(message);
        }; };
        http_1.default.createServer(this.app).listen(port, welcome(port));
        return this.app;
    };
    return ExpressServer;
}());
exports.default = ExpressServer;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! @common/env */ "./src/common/env.ts");
var server_1 = __importDefault(__webpack_require__(/*! @common/server */ "./src/common/server.ts"));
var database_1 = __importDefault(__webpack_require__(/*! @common/database */ "./src/common/database.ts"));
// Start server
var port = parseInt(process.env.PORT || '3000');
var server = new server_1.default();
server.listen(port);
// Start database
var database = new database_1.default();
database.connect();


/***/ }),

/***/ "./src/routes.ts":
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * ## Routes
 * Configure the custom routes for the api application by \
 * using the imported routers on their provided path.
 *
 * ```typescript
 * // Example usage
 * export default function routes(app: express.Application) {
 * 	app.use('/api', apiRouter);
 * 	app.use('/user', userRouter);
 * 	app.use('/products', productRouter);
 * }
 * ```
 * @param  {express.Application} app
 */
function routes(app) {
    app.use('/', function () { });
}
exports.default = routes;


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map