const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const router = express.Router();

// User model
const User = require('../../models/User');

//@route        post api/users
//@desc         Register new users
//@access       public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'please enter all fields' });
    }

    //check for existing users
    User.findOne({ email })
    .then(user => {
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const newUser = new User({
            name,
            email,
            password
        });

        //create salt && hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                jwt.sign(
                    { id: user.id },
                    config.get('jwtSecret'),
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                    });
                    });

                    
                })
            })
        })
    });
});

module.exports = router; 