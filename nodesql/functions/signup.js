const { dbinsert } = require('..');
const { ErrorCodes, success, failure } = require('../libs/response-libs');
const { v4: uuidv4 } = require('uuid');

async function main(req) {
    try {
        const body = req.body
        const {password, email} = body;
        if (email && email !== "" && password && password !=='' ) {
            const createUser = "INSERT INTO users (userId, password, email) VALUES (?, ?, ?)";
            let item = [uuidv4(), password , email]
            let results = await dbinsert(createUser, item)
            console.log(results)
            if (results.status) {
                return success({ status: true, data: "Created Successfully" })
            } else {
                return failure(ErrorCodes.BAD_REQUEST, { status: false, error: "Invalid user" })
            }
        } else {
            return failure(ErrorCodes.BAD_REQUEST, { status: false, error: "Invalid Params" })
        }
    } catch (e) {
        console.log("e..............:)", e)
        return failure(ErrorCodes.ERROR, { status: false, error: "Internal Server Error" })
    }
}

module.exports = { main }