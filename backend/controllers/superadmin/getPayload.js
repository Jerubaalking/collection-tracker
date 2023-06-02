const { spawnJwtPayload } = require("../services/handlers");

const getPayload = async (req) => {

    let payload = await spawnJwtPayload(req.cookies.token, req.cookies.est_);
    console.log("payload: ", payload);
    req.body['userId'] = payload.userId;
    req.body['schoolId'] = payload.schoolId;
    req.body['sessionId'] = payload.sessionId;
    req.body['school_name'] = payload.school_name;
    console.log("my payload::", payload);
    return payload;
}
module.exports = { getPayload };