const express = require(`express`);
const userController = require(`./../controllers/userController`);
const authController = require(`./../controllers/authController`);

const router = express.Router();

router.post(`/signup`, authController.signup);
router.post(`/signin`, authController.signin);
router.get(`/logout`, authController.logout);
router.post(`/forgotPassword`, authController.forgotPassword);
router.patch(`/resetPassword/:token`, authController.resetPassword);

router.use(authController.protect);

router.patch(`/updateMyPassword`, authController.updatePassword);
router.get(`/me`, userController.getMe, userController.getUser);
router.delete(`/deleteMe`, userController.deleteMe);
router.patch(
  `/updateMe`,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch(`/updateRole`, userController.updateRole);

router.use(authController.restrictTo(`admin`));

router
  .route(`/`)
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route(`/:id`)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
