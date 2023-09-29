module.exports = (req, res, next) => {
   try {
        const uuid = req.headers.authorization.split(' ')[1]
        if(uuid == process.env.INVADER_UUID) {
            req.auth = {
                user_id: 1
            }
            next()
        }
        else {
            res.status(401).json({ error });
        }
    }
	catch(error) {
        res.status(401).json({ error });
    }
};