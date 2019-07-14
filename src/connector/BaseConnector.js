class BaseConnector {
    constructor(logger) {
        this.logger = logger;
        this.logger.info(`Instantiating ${this.constructor.name}...`);
    }
}

module.exports = BaseConnector;