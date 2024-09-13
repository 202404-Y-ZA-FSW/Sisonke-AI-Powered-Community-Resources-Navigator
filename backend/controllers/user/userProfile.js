const User = require('../../models/user/userProfile');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber,
            gender,
            bio,
            address,
            location
        } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            dateOfBirth,
            phoneNumber,
            gender,
            bio,
            address,
            location
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (err) {
        res.status(500).json({ message:err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, password, phoneNumber, bio, location } = req.body;

        const updateData = { username, phoneNumber, bio, location };

       
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

module.exports = {
    createUser,
    updateUser
}
