const blogModel = require('../../models/blog/blog');

const createBlog = async(req,res)=>{
    try{
        const {title,content,author,tags} = req.body;
        const blog = new blogModel({
            title,
            content,
            author,
            tags
        });
        await blog.save();
        res.status(201).json({
            message: "Blog created successfully",
            blog
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const getAllBlocks = async(req,res)=>{
    try{

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
       
        const startIndex = (page-1)*limit;
        const endIndex = page*limit;

        const totalBlogs = await blogModel.countDocuments();
        const blogs = await blogModel.find().skip(startIndex).limit(limit).populate('comments');

        const pagination = {};
        if(endIndex<totalBlogs){
            pagination.next = {
                page: page+1,
                limit
            }
        }

        if(startIndex>0){
            pagination.prev = {
                page: page-1,
                limit
            }
        }

        res.status(200).json({totalBlogs,currentPage:page,totalPages:Math.ceil(totalBlogs/limit),blogs,
            pagination
        });

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const getBlogById = async(req,res)=>{
    try{
        const blogId = req.params.id;
        const blog = await blogModel.findById(blogId).populate('comments');
        
        if(!blog){
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        res.status(200).json({blog});
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const updateBlog = async(req,res)=>{
    try{
        const blogId = req.params.id;
        const {title,content,tags} = req.body;
        const blog = await blogModel.findByIdAndUpdate(blogId,{title,content,tags},{new:true});

        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }
        res.status(200).json({blog});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const deleteBlog = async(req,res)=>{
    try{
        const blogId = req.params.id;
        const blog = await blogModel.findByIdAndDelete(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }
        res.status(302).json({message:"deleted successfully"});
    }catch(err){
        res.status(500).json({message: "Please check your server"});
    }
}

module.exports = {
    createBlog,
    getAllBlocks,
    getBlogById,
    updateBlog,
    deleteBlog
}