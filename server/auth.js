// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('./model/User');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET ;

const maxFailedAttempts = 5;
const lockTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid username or password' });
        }

        if (user.isLocked()) {
            return res.status(403).json({ msg: 'Account locked. Try again later' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            user.failedLoginAttempts += 1;
            if (user.failedLoginAttempts >= maxFailedAttempts) {
                user.lockUntil = Date.now() + lockTime;
                user.failedLoginAttempts = 0;
            }
            await user.save();
            return res.status(401).json({ msg: 'Invalid username or password' });
        }

        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '30min' });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'jwtSecret', { expiresIn: '30min' });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/profile', async (req, res) => {
    // Extract token from request headers
    const token = req.header('x-auth-token');

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'jwtSecret');

        // Fetch user from database using user ID from decoded token
        const user = await User.findById(decoded.id);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return the username in the response
        res.json({ username: user.username });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
