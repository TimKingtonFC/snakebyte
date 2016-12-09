"use strict";

var CONFIG_FILE = ".data/highscores.json";
var NUM_HIGHSCORES = 30;

// Loading the data in the config file
var fs = require("fs");
var scores = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));

function getScores() {
  return scores || [];
}

function insertScore(scores, score) {
  var ixNew = -1;
  
  var i = 0;
  while(i < scores.length &&
    (score.level <= scores[i].level || score.score <= scores[i].score))
    i++;
    
  if (i < NUM_HIGHSCORES) {
    scores.splice(i, 0, score);
    ixNew = i;
    scores = scores.slice(0, NUM_HIGHSCORES);
  }
  
  return ixNew;
}

function save() {
  fs.writeFileSync(".data/highscores.json", JSON.stringify(scores));
}

module.exports = {
  NUM_HIGHSCORES: NUM_HIGHSCORES,
  getScores: getScores,
  insertScore: insertScore,
  save: save,
};
