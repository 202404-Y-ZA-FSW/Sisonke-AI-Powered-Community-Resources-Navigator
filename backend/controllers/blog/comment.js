const commentModel = require('../../models/blog/comment');
const Blog = require('../../models/blog/blog');
const { findByIdAndUpdate, findByIdAndDelete } = require('../../models/blog/comment');


const createComment = async(req,res)=>{
    try{
        //const {id} = req.params
        const blogId = req.params.blogId;
        const {content,author} = req.body;
        const blog = await Blog.findById(blogId);
         if(!blog){
            return res.status(404).json({message: "Blog not found"})
         }
         console.log(blogId);
         const comment = new commentModel({
            content,
            author,
            post: blogId
         })
         //console.log(comment);
         await comment.save();
         blog.comments.push(comment._id);
        // console.log(comment._id);
        await blog.save();
         
         res.status(200).json({message: "Comment created successfully", comment});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getAllComments = async(req,res)=>{
    try{

        const blogId = req.params.blogId;
        const comments = await commentModel.find({post: blogId}).populate('author','username');
        
        res.status(200).json({comments});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

const getCommentById = async(req,res)=>{
    try{

    const blogId = req.params.blogId;
    const commentId = req.params.id;
    const comment = await commentModel.findById({post:blogId, commentId}).populate('author','username');

    if(!comment){
        return res.status(404).json({message: "Comment not found"});
    }

    res.status(200).json({message:"Comment found successfully", comment});

    }catch(err){
        res.status(500).json({message: "Server error"});
    }

}

const updateComment = async(req,res)=>{
    try{
        const blogId = req.params.blogId;
        const commentId = req.params.id;
        const {content} = req.body;
        const comment = await findByIdAndUpdate({post:blogId},commentId,{content},{new:true}).populate('author','username');

        if(!comment){
            return res.status(404).json({meesage: "comment not found"})
        }

        res.status(200).json({message: "Comment updated successfully"})
    }catch(err){
        res.status(500).json({message: "Please check your server", comment});
    }
}

const deleteComment = async(req,res)=>{
    try{
        const blogId = req.params.blogId;
        const commentId = req.params.id;

        const comment = await findByIdAndDelete(commentId);

        if(!comment){
            return res.status(404).json({message:"Comment not found"})
        }

        await Blog.findByIdAndUpdate(blogId,{$pull:{comments:commentId}});
        res.status(204).json({message:"Comment deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Please check your server",err})
    }
}

module.exports ={
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
}
