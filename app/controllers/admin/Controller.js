const MainController = require(`${config.path.mainController}`)

module.exports = class Controller extends MainController {
    constructor() {
        super()
        this.controllerTag = 'Admin'
    }
}