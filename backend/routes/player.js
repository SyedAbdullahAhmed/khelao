const express = require('express');
const {getPlayersData,getPlayersDataByID,postPlayersData,updatePlayersDataByID,deletePlayersDataByID} = require('../controllers/player')

const router = express.Router();

// get players data
router.get('/players',getPlayersData)

// get players data by id
router.get('/players/:id',getPlayersDataByID)

// post players data
router.post('/players',postPlayersData)

// update players data
router.patch('/players/:id',updatePlayersDataByID)

// delete players data
router.delete('/players/:id',deletePlayersDataByID)

module.exports = router;
