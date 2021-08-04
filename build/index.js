/*! require("source-map-support").install(); */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/example/example.controller.ts":
/*!***********************************************!*\
  !*** ./src/api/example/example.controller.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkOwnership = exports.getByName = exports.createExampleDocument = void 0;
var example_model_1 = __importDefault(__webpack_require__(/*! ./example.model */ "./src/api/example/example.model.ts"));
/**
 * ### createExampleDocument
 * Create a new example document from the request body's JSON data.
 * @param  {express.Request} req
 * @param  {express.Response} res
 * @param  {express.NextFunction} next
 * @returns {void}
 */
function createExampleDocument(req, res, next) {
    var exampleFromBody = req.body;
    var example = new example_model_1.default(exampleFromBody);
    example.save(function (err) {
        if (err)
            return next(err);
        res.json(example);
    });
}
exports.createExampleDocument = createExampleDocument;
/**
 * ### getByName
 * Get a example document by its name.
 * @param  {express.Request} req
 * @param  {express.Response} res
 * @param  {express.NextFunction} next
 * @returns {Promise<void>}
 */
function getByName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var query, example;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = req.body.name;
                    return [4 /*yield*/, example_model_1.default.getByName(query)];
                case 1:
                    example = _a.sent();
                    if (!example)
                        return [2 /*return*/, next(new Error('Example document not found'))];
                    res.json(example);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getByName = getByName;
/**
 * ### checkOwnership
 * Check a example document's ownership by its name & owner.
 * @param  {express.Request} req
 * @param  {express.Response} res
 * @param  {express.NextFunction} next
 * @returns {Promise<void>}
 */
function checkOwnership(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var query, owner, example, isOwner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = req.body.name;
                    owner = req.body.owner;
                    return [4 /*yield*/, example_model_1.default.getByName(query)];
                case 1:
                    example = _a.sent();
                    if (!example)
                        return [2 /*return*/, next(new Error('Example not found'))];
                    isOwner = example.checkOwnership(owner);
                    res.json(isOwner);
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkOwnership = checkOwnership;


/***/ }),

/***/ "./src/api/example/example.model.ts":
/*!******************************************!*\
  !*** ./src/api/example/example.model.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
var exampleSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    owner: { type: String, required: true },
    tags: { type: [String], default: [] },
    content: { type: String, default: '' },
});
exampleSchema.methods = {
    /**
     * ### checkOwnership
     * Example method that checks if the owner of a specified \
     * example document is the same as the given owner parameter.
     * @param {string} owner
     * @returns {boolean}
     */
    checkOwnership: function (owner) {
        return this.owner === owner;
    },
};
exampleSchema.statics = {
    /**
     * ### getByName
     * Example static method that gets a single document by name.
     * @param  {string} name
     * @returns {Promise<ExampleDocument | undefined>}
     */
    getByName: function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne({ name: name }).exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
};
/**
 * ## exampleModel
 * Mongoose model that implements the exampleSchema & IExampleModel interface.
 * @extends {ExampleDocument, IExampleModel}
 */
var exampleModel = mongoose_1.default.model('Example', exampleSchema);
exports.default = exampleModel;


/***/ }),

/***/ "./src/api/example/example.router.ts":
/*!*******************************************!*\
  !*** ./src/api/example/example.router.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var example_controller_1 = __webpack_require__(/*! ./example.controller */ "./src/api/example/example.controller.ts");
var exampleRouter = express_1.default.Router();
exampleRouter.get('/', function (req, res) { return res.send('Hello from Example Router!'); });
exampleRouter.get('/checkOwner', example_controller_1.checkOwnership);
exampleRouter.get('/getByName', example_controller_1.getByName);
exampleRouter.post('/create', example_controller_1.createExampleDocument);
exports.default = exampleRouter;


/***/ }),

/***/ "./src/common/database.ts":
/*!********************************!*\
  !*** ./src/common/database.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
     * @returns {Promise<mongoose.Connection>}
     */
    Database.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        connectionString = this.getConnectionString();
                        return [4 /*yield*/, mongoose_1.default
                                .connect(connectionString, this.options)
                                .then(function () {
                                console.info("*** Connected to database: " + connectionString);
                            })
                                .catch(function (err) {
                                console.error("*** Failed to connect to database: " + connectionString, err);
                            })];
                    case 1:
                        _a.sent();
                        db = mongoose_1.default.connection;
                        db.on('error', function (err) { return console.log('*** Database error: ', err); });
                        return [2 /*return*/, db];
                }
            });
        });
    };
    /**
     * ### disconnect
     * Disconnect from the database.
     * @returns {Promise<void>}
     */
    Database.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.default
                            .disconnect()
                            .then(function () { return console.info('*** Disconnected from database'); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ### clear
     * Clear the database.
     * @returns {Promise<void>}
     */
    Database.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongoose_1.default.connection.dropDatabase()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var example_router_1 = __importDefault(__webpack_require__(/*! ./api/example/example.router */ "./src/api/example/example.router.ts"));
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
    app.use('/example', example_router_1.default);
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