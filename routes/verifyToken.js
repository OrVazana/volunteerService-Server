const jws = require('jsonwebtoken')

function auth(req,res,next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied')
    try {
        const verified = jwd.verify(token, process.env.SECRET)
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('invalid Token')
    }
}