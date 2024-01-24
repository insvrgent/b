const session = require('../models').session;

function cek() {
    return async (req, res, next) => {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized - Bearer token is missing' });
        }

        const token = authorizationHeader.split(' ')[1];

        try {
            const ses = await session.findOne({
                where: {token}
            });

            if (!ses) {
                return res.status(403).json({ message: 'Forbidden - You must be logged in' });
            }

            req.ses = ses;

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized - Bearer token is invalid' });
        }
    };
}

module.exports = cek;