const mongoose = require('mongoose')
const userSchema = require('../models/signup')

// GET DATA
const getData = async(req,res)=>{
  const User = mongoose.model('User', userSchema);
    try {
     //find data
      const result = await User.find()

      res.send(result)

    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}

// GET DATA BY ID
const getDataByID = async(req,res)=>{

  const User = mongoose.model('User', userSchema);

     //id from parameter
     let _id = req.params.id;
    try {
      const result = await User.findOne({_id})
      if(!result){
          return res.status(404).send('User not found'); 
      }
      res.send(result)
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}

//POST DATA
const postData = async(req,res)=>{
     const User = mongoose.model('User', userSchema);
       let body = req.body
       let doc = new User(body)
       try {
         const result = await doc.save();
         console.log(result);
         res.send({msg:"Save Document Successfully!"})
       } catch (error) {
         console.log(error);
         res.status(500).send('Internal Server Error');
       }
   }
   

// UPDATE DATA BY ID
const updateDataByID = async(req,res)=>{
  const User = mongoose.model('User', userSchema);
  const _id = req.params.id;
  const body = req.body
    try {
      const result = await User.findOneAndReplace({ _id }, body, { new: true })
      if(!result){
          return res.status(404).send('User not found'); 
      }
      res.send({msg : "Updated Successfully!"})
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}

// DELETE DATA BY ID
const deleteDataByID = async(req,res)=>{
  const User = mongoose.model('User', userSchema);
  const _id = req.params.id
    try {
      const result = await User.findOneAndDelete({_id})
      if(!result) {
          return res.status(404).send('User not found'); 
      }
      res.send({msg : "Deleted Successfully!"})
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}

module.exports = {getData,postData,updateDataByID,deleteDataByID,getDataByID};