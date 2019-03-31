const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const admin = decoded.doc;
        if(admin.isAdmin) {
            req.userdata = decoded;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            message: "Admin Authentication failed"
        });
    }
};