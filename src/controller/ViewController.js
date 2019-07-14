const BaseController = require('./BaseController');

class ViewController extends BaseController {
    registerRoutes() {
        this.router.route('/').get(this.test.bind(this));
    }

   test() {

   }
}

module.exports = ViewController;