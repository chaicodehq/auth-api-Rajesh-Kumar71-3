import { User } from '../models/user.model.js';


function sanitizeUser(user) {
  const userObj = user.toObject() ? user.toObject() : user;
  delete userObj.password;
  return userObj;
}
/**
 * TODO: List all users (Admin only)
 *
 * 1. Find all users (password excluded by default)
 * 2. Return 200 with { users }
 */
export async function listUsers(req, res, next) {
  try {
    // Your code here
    const users = await User.find();
    res.status(200).json({ users: users.map(sanitizeUser) });
  
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Get user by ID (Admin only)
 *
 * 1. Extract id from req.params
 * 2. Find user by id (password excluded by default)
 * 3. If not found: return 404 with { error: { message: "User not found" } }
 * 4. Return 200 with { user }
 */
export async function getUser(req, res, next) {
  try {
    // Your code here
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    res.status(200).json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Delete user (Admin only)
 *
 * 1. Extract id from req.params
 * 2. Delete user by id
 * 3. If not found: return 404 with { error: { message: "User not found" } }
 * 4. Return 200 with { message: "User deleted successfully" }
 */
export async function deleteUser(req, res, next) {
  try {
    // Your code here

    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: { message: "User not found" } });
    }

    res.status(200).json({ message: "User deleted successfully" }); 
  } catch (error) {
    next(error);
  }
}
