const express = require('express');
const {postData,getData,updateDataByID,deleteDataByID,getDataByID} = require('../controllers/signup')

const router = express.Router();

// get data
router.get('/signup',getData)

// get data by id
router.get('/signup/:id',getDataByID)

// post data
router.post('/signup',postData)

// update data
router.put('/signup/:id',updateDataByID)

// delete data
router.delete('/signup/:id',deleteDataByID)

module.exports = router;
