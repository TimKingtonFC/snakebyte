// server.js
// where your node app starts

// init
var H = require("hyperweb");
var hs = require("./highscores");

app = H.blastOff();

app.get("/", function (request, response) {
  try {
    response.render('index.html', {});
  } catch (err) {
    handleError(err, response);
  }
});


app.get("/highscore", function (request, response) {
  try {
    var ixNew = -1;
    var scores = hs.getScores().slice();
    if (request.query.score) {
      var newScore = {
        name: "",
        level: parseInt(request.query.level),
        score: parseInt(request.query.score),
      };
      
      if (newScore.score > 0) {
        ixNew = hs.insertScore(scores, newScore);
      }
    }
    response.render('highscores.html', {scores: scores, ixNew: ixNew});
  } catch (err) {
    handleError(err, response);
  }
});

app.get("/highscore/raw", function (request, response) {
  try {
    response.send(JSON.stringify(hs.getScores()));
  } catch (err) {
    handleError(err, response);
  }
});

app.post("/highscore", function (request, response) {
  try {
    var scores = hs.getScores();
    var newScore = request.body;
    newScore.score = parseInt(newScore.score);
    newScore.level = parseInt(newScore.level);
    
    hs.insertScore(scores, newScore);
    hs.save();
    response.redirect("/highscore");
  } catch (err) {
    handleError(err, response);
  }
});

// app.get("/highscore/delete", function (request, response) {
//   try {
//     hs.getScores().splice(0);
//     hs.save();
//     response.send("Success");
//   } catch (err) {
//     handleError(err, response);
//   }
// });

function handleError(err, response) {
  response.status(500);
  response.send(
    "<html><head><title>Internal Server Error!</title></head><body><pre>"
    + JSON.stringify(err, null, 2) + "</pre></body></pre>"
  );
}
