const jwt = require("jsonwebtoken");
const jwtSecret = "E.A.B.M.O.D.E.L.";

const jsonWebT = (req, res, next) => {
    const token = req.body["token-Ok"];

    if (!token) {
        return res.status(401).json("Error: Token necesario")
    };

    jwt.verify(token, keyjsonWT, (err, decoded) => {
        if (err) {
            return res.status(401).json(`Error en la verificación del token: ${err}`);
        } else {
            console.log(`Token verificado: ${decoded}`);
            next();
        };
    });
};

module.exports = {jsonWebT,jwtSecret};
