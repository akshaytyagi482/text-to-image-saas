import userModal from "../models/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModal.js";
import transactionModel from "../models/transaction.Model.js";
import razorpay from 'razorpay'



const registerUser = async (req,res) =>{
     try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:'Misssing Details'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const userData = {
            name,email,
            password:hashedPassword
        }
        const newUser = new userModal(userData)
        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.secret_key)

       res.json({success:true,token,user:{name:user.name}})
     } catch (error) {
        console.log(error)
       res.json({success:false,message: error.message})
     }
}

 const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body
        const user = await userModal.findOne({email})
        if(!user){
           return res.json({success:false,message: "user doesn't exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.secret_key)
           return res.json({success:true,token,user:{name:user.name}})
        } else {
         res.json({success:false,message: "Invalid password"})
        }
    } catch (error) {
        console.log(error)
       res.json({success:false,message: error.message})
    }
}
// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

// const paymentRazorpay = async (req,res) =>{
//     try {
        
//         const {userId,planId} = req.body

//         const userData = await userModel.findById(userId)

//         if(!userId || !planId){
//             return res.json({success:false,message:'Misssing details'})
//         }

//         let credits,plan,amount,date

//         switch (planId) {
//             case 'Basic':
//                 plan = 'Basic'
//                 credits = 100
//                 amount = 10
//                 break;
//             case 'Advanced':
//                     plan = 'Advanced'
//                     credits = 500
//                     amount = 50
//                     break;
//             case 'Business':
//                         plan = 'Business'
//                         credits = 5000
//                         amount = 250
//                         break;
//             default:
//                 return res.json({success: false,message: 'plan not found'})
//         }
            
//         date = Date.now()
//         const transactionData = {
//             userId,plan,amount,credits,date
//         }
//         const newTransaction = await transactionModel.create(transactionData)
//         const option = {
//             amount : amount * 100,
//             currency: process.env.Currency,
//             reciept: newTransaction._id
//         }

//         await razorpayInstance.orders.create(option,(error,order)=>{
//                if(error){
//                 console.log(error);
//                 return res.json({success:false,message: error.message})
//                }
//                res.json({success:true,order})
//         })
//     } catch (error) {
//         console.log(error)
//         res.json({success:false,message: error.message})
//     }
// }

const userCredits = async (req,res) =>{
    try {
        const {userId} = req.body;
        const user = await userModal.findById(userId)
        res.json({success:true,credits:user.creditBalance,user:{name: user.name}})
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}
export {registerUser,loginUser,userCredits}