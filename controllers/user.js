const User = require('../models/User');
const CircularJSON = require('circular-json');

exports.read = (req, res) => {
    try {
        req.profile.hashed_password = undefined;
        const sanitizedProfile = CircularJSON.stringify(req.profile);
        res.json({ user: JSON.parse(sanitizedProfile) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
