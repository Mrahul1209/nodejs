module.exports.successResponse = (status, error = false, msg, responce) => {
    return { status, error, msg, responce };
}
module.exports.errorResponse = (status, error = true, msg) => {
    return { status, error, msg };
}