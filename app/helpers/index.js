
exports.sendResponse = (msg = '', data = {}, response, status = 200) => {

    let response_to_send = {
        msg: msg,
        data: typeof data == "object" ? data : {},
    };

    response.status(status).json(response_to_send);
}

exports.sendValidationErrorMessage = (errors = {}, response, status = 400) => {

    let msg = errors[0].msg;

    this.sendResponse(msg,errors,response,status);
}

exports.generateUUID = () => {

    let d = new Date().getTime();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
