const BaseFactory = require('./BaseFactory');

class ConnectorFactory extends BaseFactory {
    static initConnector(connectors, logger) {
        return new Promise((resolve, reject) => {
            try {
                resolve();
            } catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = ConnectorFactory;