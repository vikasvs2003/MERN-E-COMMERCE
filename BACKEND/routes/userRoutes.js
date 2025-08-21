import express from "express";
import { registerUser ,loginUser, logoutUser, requestPasswordReset, resetPassword, getUserDetails, updatePassword, updateProfile} from "../controller/userController.js";
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { deleteUserProfile, getSingleUser, getUsersList, updateUserRole } from "../controller/productController.js";

const router = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)
router.route("/password/forgot").post(requestPasswordReset)
router.route("/reset/:token").post(resetPassword)
router.route("/profile").get(verifyUserAuth, getUserDetails)
router.route("/password/update").put(verifyUserAuth, updatePassword)
router.route("/profile/update").put(verifyUserAuth, updateProfile)
router.route("/admin/users").get(verifyUserAuth,roleBasedAccess('admin'), getUsersList)
router.route("/admin/user/:id").get(verifyUserAuth,roleBasedAccess('admin'), getSingleUser).put(verifyUserAuth,roleBasedAccess('admin'), updateUserRole).delete(verifyUserAuth,roleBasedAccess('admin'),deleteUserProfile)


export default router;