<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);

router.post('/create', userController.createUser);
router.post('/login', userController.userLogin);

router.put("/update/:id", userController.userUpdate);

router.delete('/delete/:email', userController.deleteUser);
router.delete('/deleteAll', userController.deleteAllUsers);

=======
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/create', userController.createUser);
router.post('/login', userController.userLogin);
router.delete('/delete/:email', userController.deleteUser);
router.delete('/deleteAll', userController.deleteAllUsers);

>>>>>>> f89ca1459a0986a835c57ae79333a48ae82ec41e
module.exports = router;