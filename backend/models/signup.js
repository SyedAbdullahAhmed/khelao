const mongoose = require("mongoose");

  // Define the user schema
  const userSchema = new mongoose.Schema({
     phoneNumber: {
       type: String,
       required: true,
       unique: true,
       validate: {
         validator: function (value) {
           return value.length === 11;
         },
         message: 'Phone number must be a 11-digit number without spaces or special characters.'
       }
     },
     password: {
       type: String,
       required: true,
       validate: {
         validator: function (value) {
           return value.length >= 8;
         },
         message: 'Password must be at least 8 characters long.'
       }
     }
   });

module.exports = userSchema