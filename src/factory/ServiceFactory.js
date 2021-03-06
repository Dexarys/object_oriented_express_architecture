const BaseFactory = require('./BaseFactory');

class ServiceFactory extends BaseFactory {
    static initServices(services, connectors, logger) {
        return new Promise((resolve, reject) => {
            try {
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = ServiceFactory;