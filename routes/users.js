const express = require('express');

const { getUser ,
        getUsers ,
        deleteUser,
        createUser,
        editUser
    } = require('../controllers/users');
const router = express.Router();

const {protect , authorize} = require('../middlewares/auth')
//router.use(protect);

router
    .route('/')
    .get(protect,authorize('admin','publisher') , getUsers)
    .post(protect,authorize('admin','publisher') , createUser);

router
    .route('/:id')
    .get(getUser)
    .put(protect,authorize('admin','publisher') ,editUser)
    .delete(protect,authorize('admin') , deleteUser);



module.exports = router;