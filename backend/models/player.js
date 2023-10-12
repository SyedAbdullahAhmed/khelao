const mongoose = require('mongoose');

const commonFields = (dataType,isRequired,isUnique) => ({
     type: dataType,
     required: isRequired,
     unique: isUnique,
});


const cricketPlayerSchema = new mongoose.Schema({
  "personalInformation": {
    username: commonFields(String,true,true),
    fullName: commonFields(String,true,true),
    dateOfBirth: commonFields(Date,true,false),
    profilePicture: commonFields(String,false,false),
    bio: commonFields(String,true,false),
    phoneNumber: commonFields(String,true,false),
    address: commonFields(String,true,false),
    town: commonFields(String,true,false),
    city: commonFields(String,true,false),
    country: commonFields(String,true,false)
  },
  "cricketDetails": {
    playingRole:commonFields(String,true,false),
    battingStyle:commonFields(String,true,false),
    bowlingStyle:commonFields(String,true,false),
    cricketTeams: {
     type: [String],
     required: true,
    },
  },
  "statistics": {
    innings: Number,    
    matches: {
      wons: Number,
      lose: Number,
      draws: Number
    },
    batting: {
      totalRunsScored: Number,
      thirties: Number,
      fifties: Number,
      centuries: Number,
      fours: Number,
      sixes: Number,
      battingAverage: Number,
      bestBattingFigures: String,
      strikeRate: Number,
      average: Number,
      ducks: Number
    },
    bowling: {
      overs: Number,
      wickets: Number,
      wides: Number,
      noballs: Number,
      dotBalls: Number,
      runs: Number,
      maidenOvers: Number,
      average: Number,
      economy: Number,
      strikeRate: Number,
      threeWicketsHauls: Number,
      fiveWicketsHauls: Number,
      bestFigures: String
    },
    fielding: {
      catches: Number,
      runout: Number,
      stumping: Number,
      assistedRunout: Number
    },
  },
  "achievements": {
    awards: [String],
    trophies: [String]
  },
  "timestamps": {
    updatedAt: {
      type:Date,
      default : Date.now
    }
  },
});

const CricketPlayer = mongoose.model('CricketPlayer', cricketPlayerSchema);

module.exports = CricketPlayer;
