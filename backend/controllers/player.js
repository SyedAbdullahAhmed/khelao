const mongoose = require('mongoose')
const CricketPlayer = require('../models/player')

// GET PLAYERS DATA
const getPlayersData = async(req,res)=>{
    try {
     //find data
      const result = await CricketPlayer.find()
      res.send(result)
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

// GET DATA BY ID
const getPlayersDataByID = async(req,res)=>{
     //id from parameter
     let _id = req.params.id;
    try {
      const result = await CricketPlayer.findOne({_id})
      if(!result){
          return res.status(404).send('CricketPlayer not found'); 
      }
      res.send(result)
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}

//POST DATA
const postPlayersData = async(req,res)=>{
       let body = req.body
       console.log(body);
       let doc = new CricketPlayer(body)
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
const updatePlayersDataByID = async (req, res) => {
  const _id = req.params.id;
  const body = req.body;

  try {

    const createUpdateFields = (body, parentKey = "") => {
      // Initialize an empty result object
      const updateFields = {};
    
      // Loop through each key in the input object (body)
      for (const key in body) {
        // Create a full key by combining the parentKey (if it exists) with the current key
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
    
        // Check if the value associated with the key is a nested object (not an array)
        // and it doesn't start with an underscore
        if (typeof body[key] === "object" && !Array.isArray(body[key])) {
          // If yes, recursively process the nested object and merge the result
          const nestedFields = createUpdateFields(body[key], fullKey);
          Object.assign(updateFields, nestedFields);
          // console.log("Update fields:", JSON.stringify(updateFields, null, 2));
          // console.log("Nested fields:", JSON.stringify(nestedFields, null, 2));
        } else if (!fullKey.startsWith("_")) {
          // If not an object and doesn't start with an underscore, add it to the result
          updateFields[fullKey] = body[key];
        }
      }

      return updateFields;
    };

    const updateFieldss = createUpdateFields(body);
    console.log(updateFieldss);
  
    const result = await CricketPlayer.findOneAndUpdate({ _id }, { $set: updateFieldss }, { new: true });

    if (!result) {
      return res.status(404).send('CricketPlayer not found');
    }
    res.send({ msg: "Updated Successfully!", updatedPlayer: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};



// DELETE DATA BY ID
const deletePlayersDataByID = async(req,res)=>{
  const _id = req.params.id
    try {
      const result = await CricketPlayer.findOneAndDelete({_id})
      if(!result) {
          return res.status(404).send('CricketPlayer not found'); 
      }
      res.send({msg : "Deleted Successfully!"})
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
}

module.exports = {getPlayersData,getPlayersDataByID,postPlayersData,updatePlayersDataByID,deletePlayersDataByID};

`{
  "personalInformation": "Omer2",
  "cricketDetails": {
      "playingRole": "Batsman",
      "battingStyle": "Right-handed",
      "bowlingStyle": "Leg-spin",
      "cricketTeams": [
          "Team A",
          "Team B",
          "Team C"
      ]
  },
  "statistics": {
      "matches": {
          "wons": 20,
          "lose": 10,
          "draws": 5
      },
      "batting": {
          "total_runs_scored": 1500,
          "thirties": 8,
          "fifties": 4,
          "centuries": 2,
          "fours": 120,
          "sixes": 30,
          "battingAverage": 35.71,
          "bestBatting_figures": "100*",
          "strikeRate": 125,
          "average": 40,
          "ducks": 3
      },
      "bowling": {
          "overs": 100,
          "wickets": 25,
          "wides": 10,
          "noballs": 2,
          "dotBalls": 300,
          "runs": 500,
          "maidenOvers": 5,
          "average": 20,
          "economy": 5,
          "strikeRate": 24,
          "threeWicketsHauls": 2,
          "fiveWicketsHauls": 0,
          "bestFigures": "5/30"
      },
      "fielding": {
          "catches": 15,
          "runout": 3,
          "stumping": 1,
          "assistedRunout": 2
      },
      "innings": 50
  },
  "achievements": {
      "awards": [
          "Player of the Match",
          "Best Batsman Award"
      ],
      "trophies": [
          "Champions Trophy 2020",
          "Cricket League Winner 2021"
      ]
  },
  "timestamps": {
      "createdAt": "2022-01-10T10:00:00.000Z",
      "updatedAt": "2022-10-05T15:30:00.000Z"
  },
  "_id": "6522f67d63b1277a2dff515f",
  "__v": 0
}`