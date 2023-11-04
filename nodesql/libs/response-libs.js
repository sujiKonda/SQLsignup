const ErrorCodes = {
    BAD_REQUEST : 400, //Bad Request
    UNAUTHORIZED : 401, //Unauthorized Access
    FORBIDDEN : 403, //Access Denied
    NOT_FOUND : 404, //Data Not Found
    ERROR : 500, //Internal Server Error
    UNAVAILABLE : 503, //Service Unavailable
}

function success(body){
    return buildResponse(200, body);
}

function failure(errorType, body){
    return buildResponse(errorType, body);
}

function buildResponse(statusCode, body){
    return ({
        statusCode : statusCode || 500,
        headers : {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
        },
        body : body
    })
}

module.exports = {
    ErrorCodes,
    success,
    failure
}
