const Restaurant = require('../models/Restaurant')


exports.createRestaurant = async(req,res) => {
    try{
        //fetch data
        const {name,address,contactNumber} = req.body;
        if(!name || !address || !contactNumber){
            return res.status(401).json({
                success:false,
                message:'All fields required!!!'
            })
        }

        const alreadyIncluded = await Restaurant.find({address})
        if(alreadyIncluded){
            return res.status(403).json({
                success:false,
                message:'Restaurant already exists!!!',
            })
        }

        const newRestaurant = await Restaurant.create(name,address,contactNumber)
        return res.status(201).json({
            success:true,
            message:'Restaurant added!!'
        })
    }
    catch(error){
        console.log("error");
        return res.status(501).json({
            succesS:false,
            message:"error creating restaurant!!!"
        })
    }
}


exports.updateRestautrant = async(req,res) => {
    try{
        
    }
    catch(error){

    }
}