const express = require('express');
const { writeComment , deleteComment,allComments,editStatus} = require('../controllers/comment');
const router = express.Router({mergeParams: true});
const {protect , authorize} = require('../middlewares/auth');

//router.route('/').post(protect ,  writeComment);

router.route('/add')
        .post(protect , writeComment);
router.get('/all',protect,authorize('admin','publisher'),allComments)

router.route('/:id')
        .put(protect,authorize('admin','publisher'), editStatus)
        .delete(protect , authorize('admin') , deleteComment);

module.exports = router;