const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const Member = require('../models/members')

// @description Get all Categories
// @route GET /api/category
// @access Public
exports.allMembers = asyncHandler( async (req , res , next) => {
    const members = await Member.find();
    res.status(200).json({success: true , count : members.length , data: members});
});
// @description Create Category
// @route POST /api/category
// @access Private/(Admin or Publisher)
exports.addMember = asyncHandler( async (req , res , next) => {
    const member = new Member({
        name: req.body.name,
        image: `/public/uploads/members/${req.file.filename}`
    })
    member.save()
        .then(()=>{
            res.status(201).json({
                success: true,
                data: member
            })
        })
})

// @description delete single Category
// @route DELETE /api/category
// @access Private/Admin
exports.deleteMember = asyncHandler( async (req , res , next) => {
    const category = await Member.findByIdAndRemove(req.params.id);
    if(!category)
        return next(new ErrorResponse(`Resourse not found with id of ${req.params.req.params.id}`, 404))
    res.status(200).json({success: true , data: category});
});
