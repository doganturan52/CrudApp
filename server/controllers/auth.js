const AuthSchema = require('../modules/auth.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = await AuthSchema.findOne({ email });

        if (user) {
            return res.status(500).json({ msg: "Böyle bir kullanıcı zaten var!" })
        }
        if (password.length < 6) {
            return res.status(500).json({ msg: "Şifreniz 6 karakterden küçük olmamalı!" })
        }
        if (!isEmail(email)) {
            return res.status(500).json({ msg: "Geçerli bir email giriniz!" })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await AuthSchema.create({ username, email, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", { expiresIn: '1h' });

        res.status(201).json({
            status: "OK",
            newUser,
            token
        })

    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthSchema.findOne({email});

        if (!user) {
            return res.status(500).json({ msg: "Böyle bir kullanıcı bulunamadı!" })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return res.status(500).json({ msg: "Hatalı şifre!" })
        }

        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: '1h' });

        res.status(200).json({
            status: "OK",
            user,
            token
        })

    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

function isEmail(emailAddress) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emailAddress.match(regex)) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = { register, login };
