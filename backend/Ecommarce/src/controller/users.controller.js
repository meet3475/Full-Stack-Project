const Users = require('../model/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const craeteToken = async (id) => {
    try {
        const user = await Users.findOne(id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not fond"
            })
        }

        console.log(user);

        const accessToken = await jwt.sign({
            _id: user._id,
            role: user.role,
            expiresIn: '1 hours'
        },
            'fshjkjhjkas4578ghks',
            { expiresIn: '1 hours' }
        )

        const refreshToken = await jwt.sign({
            _id: id,
        },
            'djkjkkj4679hbjjk',
            { expiresIn: '2 days' }
        )

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        console.log(error.message);
    }
}


const ragister = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (user) {
            return res.status(409).json({
                success: false,
                message: "user alredy exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const userData = await Users.create({ ...req.body, password: hashPassword })

        if (!userData) {
            return res.status(500).json({
                success: false,
                message: "create hash password error"
            })
        }

        const userDataF = await Users.findById({ _id: userData._id }).select("-password")

        if (!userDataF) {
            return res.status(500).json({
                success: false,
                message: "internal server error" + error.message
            })
        }

        // const { accessToken, refreshToken } = await craeteToken(userData._id);

        res.status(201).json({
            success: true,
            message: "ragister succesfully",
            data: userDataF,
            // tokens: { accessToken, refreshToken }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user are not exist."
            })
        }

        const variPassword = await bcrypt.compare(password, user.password)

        if (!variPassword) {
            return res.status(400).json({
                success: false,
                message: "invalid Credistional"
            })
        }

        const { accessToken, refreshToken } = await craeteToken(user._id)

        console.log({ accessToken, refreshToken });

        // res.status(200).json({
        //     success: true,
        //     message: "login successful",
        //     tokens: { accessToken, refreshToken }
        // });


        const userDataF = await Users.findById({ _id: user._id }).select("-password -refreshToken")

        const option = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                success: true,
                message: "Login Sucessfully",
                data: {
                    ...userDataF.toObject(),
                    accessToken
                }
            })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
}

const generateNewTokens = async (req, res) => {
    try {
        console.log(req.cookies.refreshToken);

        const VerifyToken = await jwt.verify(req.cookies.refreshToken, 'djkjkkj4679hbjjk');
        console.log(VerifyToken);

        if (!VerifyToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const user = await Users.findById(VerifyToken._id);
        console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Define"
            })
        }

        if (req.cookies.refreshToken != user.toObject().refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Invalid Token"
            })
        }

        const { accessToken, refreshToken } = await craeteToken(user._id)

        console.log({ accessToken, refreshToken });

        const option = {
            httpOnly: true,
            secure: true
        }

        res.status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", refreshToken, option)
            .json({
                success: true,
                message: "Refresh Token Sucessfully",
                data: {
                    accessToken
                }
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        })
    }
} 

const logout = async (req, res) => {
    try {
        console.log(req.body._id);

        const user = await Users.findByIdAndUpdate(
            req.body._id,
            {
                $unset :{ refreshToken : 1}
            },
            {
                new: true
            }
        )

        console.log(user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Logout"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Logeed Out."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message
        });
    }
}



module.exports = {
    ragister,
    login,
    generateNewTokens,
    logout
} 