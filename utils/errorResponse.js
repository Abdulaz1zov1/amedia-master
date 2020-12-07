const errorHandler = require("../middlewares/error");

class errorResponse extends Error{
    constructor(message , statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}
module.exports = errorResponse;