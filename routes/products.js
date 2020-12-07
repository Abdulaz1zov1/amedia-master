const express = require('express');
const {  getProducts , 
        createProduct,
        getSingleProduct,
        updateProduct,
        deleteProduct,
        uploadProductPhoto,
        rateproduct
         } = require('../controllers/products');
const router = express.Router({mergeParams: true});
const {protect , authorize} = require('../middlewares/auth');

router.use('/:productId/comment' , require('./comment'));
router.use('/:productId/video' , require('./video'));


router.route('/')
        .get(getProducts)
        .post(protect , authorize('admin' , 'publisher') , createProduct);

router.route('/:productId')
    .get(getSingleProduct)
    .put(protect , authorize('admin') ,updateProduct)
    .delete(protect , authorize('admin') ,deleteProduct)

router.route('/:productId/rating').post(protect , rateproduct);
router.route('/:productId/photo').put(protect , authorize('publisher' , 'admin') , uploadProductPhoto);
module.exports = router;