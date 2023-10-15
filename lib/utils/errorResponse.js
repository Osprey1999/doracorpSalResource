class ErrorResponse{
    constructor(errorConstant){
        this.statusCode = errorConstant.statusCode
        this.message = errorConstant.message
    }
}