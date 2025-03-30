import express from 'express';
import authController from '../controllers/authController.js';

const  router=express.Router();

router.route('/register').post(authController.register);
router.route('/register').post(authController.login);
// router.route('/login', authController.login);
// router.route('/logout', authController.logout);
// router.route('/refresh', authController.refresh);
// router.route('/forgot-password', authController.forgotPassword);
// router.route('/reset-password/:token', authController.resetPassword);

module,exports={
    router
}