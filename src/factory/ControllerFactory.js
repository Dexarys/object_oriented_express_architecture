const BaseFactory = require('./BaseFactory');

class ControllerFactory extends BaseFactory {
    static initController(app, router, services, statusHandler, accessGranted, logger) {
        return new Promise((resolve, reject) => {
            try {
                app.use('/', router);
                const viewController = new ViewController(router, services, statusHandler, accessGranted, logger);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ControllerFactory;