class BaseService {
    constructor(bddConnection, smtpConnection, io, logger) {
        this.bdd = bddConnection;
        this.smtp = smtpConnection;
        this.io = io;
        this.logger = logger;
        this.logger.info(`Instantiating ${this.constructor.name}...`);
    }
}

module.exports = BaseService;