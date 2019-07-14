const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./config/Logger');
const StatusHandler = require('./middleware/StatusHandler');
const AccessGranted = require('./middleware/AccessGranted');
const ServiceFactory = require('./factory/ServiceFactory');
const ControllerFactory = require('./factory/ControllerFactory');
const ConnectorFactory = require('./factory/ConnectorFactory');
const http = require('http');



class Server {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.router = express.Router();
        this.services = {};
        this.connectors = {};
        this.setPort();
        this.setBodyparser();
        this.setViewEngines();
        this.setMiddleware();
    }

    run() {
        logger.info(`Initialisation de l'application..`);
        ConnectorFactory.initConnector(this.connectors, logger).then(() => {
            ServiceFactory.initServices(this.services, this.connectors, logger).then(() => {
                ControllerFactory.initController(this.app, this.router, this.services, this.statusHandler, this.accessGranted, logger).then(() => {
                    this.server.listen(this.port, () => logger.info(`Server's started port: ${this.port}`));
                }).catch(err => {
                    logger.error(err);
                });
            }).catch(err => {
                logger.error(err);
            });
        }).catch(err => {
            logger.error(err);
        });
    }

    setPort() {
        logger.info(`Getting Server's Port..`);
        this.port = this.normalizePort(process.env.PORT || 3000);
    }

    normalizePort(val) {
        const port = parseInt(val, 10);
        if (typeof port !== 'number') {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }

    setMiddleware() {
        this.statusHandler = new StatusHandler(logger);
        this.accessGranted = new AccessGranted(logger);
    }

    setBodyparser() {
        logger.info(`bodyParser configuration..`);
        this.router.use(bodyParser.json());
        this.router.use(bodyParser.urlencoded({ extended: true }));
    }

    setViewEngines() {
        logger.info('Setting view engine..');
        this.app.use(express.static(path.join(__dirname, '..', 'public')));
        this.app.set('view engine', 'twig');
        this.app.set('views', path.join(__dirname, 'views'));
    }
}

module.exports = Server;