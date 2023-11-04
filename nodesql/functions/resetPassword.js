const { dbquery } = require('..');
const { ErrorCodes, success, failure } = require('../libs/response-libs');


async function main(req) {
    try {
        const body = req.body
        const {email, otp,password} = body
        if (email && email!== "" && otp && otp ==='12345' && password && password!=='') {
            const updated = await dbquery(`UPDATE users SET password = '${password}' WHERE email = '${email}'`)
            if (updated.status) {
                return success(updated)
            }
            return failure(ErrorCodes.BAD_REQUEST, { status: false, error: "User Not Exist" })
        } else {
            return failure(ErrorCodes.BAD_REQUEST, { status: false, error: "Invalid Params" })
        }
    } catch (e) {
        console.log("e..............:)", e)
        return failure(ErrorCodes.ERROR, { status: false, error: "Internal Server Error" })
    }
}

module.exports = { main }