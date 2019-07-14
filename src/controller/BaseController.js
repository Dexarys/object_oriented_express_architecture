class BaseController {
    constructor(router, services, statusHandler, accessGranted, logger) {
        this.router = router;
        this.services = services;
        this.bdd = this.services.bdd;
        this.smtp = this.services.smtp;
        this.statusHandler = statusHandler;
        this.accessGranted = accessGranted;
        this.logger = logger;
        this.registerRoutes();
        this.logger.info(`Instantiating ${this.constructor.name}...`);
    }

    registerRoutes() {}

    sendMissingParameters(res) {
        this.statusHandler.sendJson(res, this.statusHandler.internalServerError, { error: 'Missing parameters' });
    }
}

module.exports = BaseController;