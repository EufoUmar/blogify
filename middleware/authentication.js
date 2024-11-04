const { validateToken } = require("../services/authentication");

function checkForAuthenticationCokie(cookieName) {
    return (req, res, next) => {
        const tokenCokieValue = req.cookies[cookieName];
        if(!tokenCokieValue){
            next();
        };
        try {
            const userPayload = validateToken(tokenCokieValue)
            req.user = userPayload;
        } catch (error) {}
            next();
    };
}

module.exports = {
    checkForAuthenticationCokie,
}