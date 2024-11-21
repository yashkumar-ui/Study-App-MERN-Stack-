// controller for the category 
// import all the required models 
const Course = require("../models/Course");
const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

//create a new category controller 
exports.createCategory = async (req,res) => {
    try{
        // fetch the data from the body 
        const{ name , description} = req.body;
        // perform the validation
        if( !name || !description ){
            return res.status(400).json({
                success:false,
                message:"all the fields are required ",
            })
        }
        // create the entry in the database
        const categoryDetails = await Category.create(
            {  name : name ,
               description : description, 
            }
        );
        // return the response
        return res.status(200).json({
            success:true,
            message:"category created successfully",
            categoryDetails,
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message: "failure occur while create the category",
            error:err.message,
        })
    }
}

// show all the category here 

exports.showAllCategory = async (req,res) => {
    try{
        // fetch the all category 
        const allCategory = await Category.find( {} , {name:true , description:true });
        // return the response
        return res.status(200).json({
            success:true,
            message:"all the category are fetched successfully..",
            allCategory,
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"failure occurs while fetch the all category...",
            error:err.message,
        })
    }
}

// show all the category page details 
// here we defiine three things in the category 
// most popular --> best 
// all course on that particular category 
exports.categoryPageDetails = async (req,res) => {
    try{
        // fetch the category id from the body 
        const {categoryId} = req.body;
        // get all the courses data on that particular id 
        const selectedCategory = await Category.findById(categoryId).populate({
            path:"courses",
            match: { status : "Published"},
            populate:"ratingAndReviews",
            populate:"instructor"
        })
        
        // console.log("selected Category -->", selectedCategory);
        // if no category found on given id 
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"no category found ..",
            })
        }
        // handle the case when category found , but no course on that particular category 
        if(selectedCategory.courses.length === 0 ){
            // console.log("no courses found on this particular category ..")
            return res.status(404).json({
                success:false,
                message:"no courses found on this particular category ...",
            });
        };

        const selectedCoures = selectedCategory.courses;
        // get courses for other categories 
        // get the others categores except the select one 
        const categoriesExceptSelect = await Category.find(
            {
                _id : { $ne : categoryId},
            } );
        
        // function to findout different category coures always 
        let differentCategory = await Category.findOne(
            categoriesExceptSelect[getRandomInt(categoriesExceptSelect.length)]._id
        ).populate({
            path:"courses",
            match:{ status : "Published"},
            populate:"ratingAndReviews",
        }) .exec();  

        let differentCourses = [];

        for( const category of categoriesExceptSelect){
            differentCourses.push(...category.courses);
        }

        // get the most selling course 
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses
             .sort( (a,b) => b.sold - a.sold)
             .slice(0,10);

        // return the success response 
        return res.status(200).json({
            success:true,
            message:"here is the requires data of all courses ",
            data :{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
            // selectedCoures : selectedCoures,
            // differentCourses: differentCourses,
            // mostSellingCourses : mostSellingCourses,
        });

    } catch(err){
        console.log("error occur while fetching the category details ", err);
        return res.status(500).json({
            success:false,
            message:"internal server error of category page details ",
            error:err.message,
        })
    }
}