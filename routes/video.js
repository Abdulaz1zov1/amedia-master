const express = require('express');
const { addVideo , getVideos , getVideo ,deleteVideo , updateVideo} = require('../controllers/video');
const router = express.Router({mergeParams: true});
const {protect , authorize} = require('../middlewares/auth');


router.route('/')
        .post(protect , authorize('publisher' , 'admin') , addVideo)
        .get(getVideos);

router.route('/:videoId')
        .get(getVideo)
        .put(protect , authorize('admin') ,updateVideo)
        .delete(protect , authorize('admin') ,deleteVideo);

module.exports = router;