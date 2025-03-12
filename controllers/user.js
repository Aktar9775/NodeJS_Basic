const UserData=require("../models/DataBase")
async function handleGetAllUsers(req,res) {
  try {
    const users = await UserData.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUserById(req,res) {
  try {
    const user = await UserData.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateUserById(req,res) {
  try {
    const updatedUser = await UserData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ status: 'Data Updated', data: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteUserById(req,res) {
  try {
    const deletedUser = await UserData.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ status: 'Data Deleted Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = new UserData(req.body);
    await newUser.save();
    res.status(201).json({ msg: "Successful", id: newUser._id });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: err.message });
  }
};
module.exports={
  handleGetAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser,
}