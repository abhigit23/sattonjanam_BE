const router = require("express").Router();
const authController = require("../controller/authController");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");

router.post(`/register`, authController.register);

router.post(`/login`, authController.login);

router.get(`/logout`, authController.logout);

router.get(`/auth/authToken`, authController.authToken);

router.get(`/auth/currentUser`, auth, authController.currentUser);

router.get(`/user/all`, authController.getAll);

router.get(`/user/single/:id`, auth, authController.getSingle);

router.delete(`/delete/:id`, auth, adminAuth, authController.delete);

router.post(`/sendmail`, authController.sendMail);

router.post(`/sendmailadmin`, authController.sendMailAdmin);

router.get(`/all/users`, auth, adminAuth, authController.allUsers);

router.patch(`/update/:userId`, auth, adminAuth, authController.update);

router.patch(`/user/update/:id`,  authController.updateUser);


module.exports = router;
