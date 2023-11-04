const { ErrorCodes, success, failure } = require('../libs/response-libs');
const jwt = require('jsonwebtoken');
const { dbquery } = require('..');

async function main(req) {
    try {
        const query = req.query
        console.log('queryyy:::::::',query);
        if (query && query.email && query.email !== "" && query.password && query.password!=="") {
            const payload = await dbquery(`select * from users where email = '${query.email}' AND password ='${query.password}' `)
            if (payload.data.length > 0) {
                console.log('payload::::::::',payload)
                let token = jwt.sign({ _id: payload.data[0].userid }, process.env.skey, { expiresIn: '24h' });
                return success({ status: true, data: token })
            } else {
                return failure(ErrorCodes.BAD_REQUEST, { status: false, error: "Invalid user" })
            }
        } else if (query && query.userId && query.userId !== "") {
            const payload = await dbquery(`select * from users where userid = '${query.userId}'`)
            if (payload.status) {
                return success(payload)
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