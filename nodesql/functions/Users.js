const { dbquery } = require('..');
const { ErrorCodes, success, failure } = require('../libs/response-libs');


async function main(req) {
    try {
        const query = req.query
        if (query && query.userId && query.userId !== "") {
            const exist = await dbquery(`select * from users where userid = '${query.userId}'`)
            console.log(exist)

            if (exist.status) {
                return success(exist.data[0])
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