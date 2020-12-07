const express = require('express');
const { allMembers , addMember, deleteMember } = require('../controllers/members');
const router = express.Router();
const {protect , authorize} = require('../middlewares/auth');
const multer = require('multer')
const path = require('path')
const md5 = require('md5');

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './public/uploads/members');
    },
    filename: function (req,file,cb) {
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    }
});
const upload = multer({storage: storage});
router.route('/')
    .get(allMembers)
    .post(protect , authorize('publisher' , 'admin'),upload.single('file'), addMember);

router.route('/:id')
    .delete(protect , authorize('admin') ,deleteMember);

module.exports = router;

