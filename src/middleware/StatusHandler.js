class StatusHandler {
    constructor(logger) {
        this.ok = 200;
        this.created = 201;
        this.noContent = 204;
        this.badRequest = 400;
        this.unauthorized = 401;
        this.forbidden = 403;
        this.notFound = 404;
        this.methodNotAllowed = 405;
        this.internalServerError = 500;
        this.logger = logger;
    }

    sendJson(res, status, data) {
        data = data || {};
        res.status(status);
        res.json(data);
    }
}

module.exports = StatusHandler;