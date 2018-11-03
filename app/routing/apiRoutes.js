// file system
let fs = require("fs");

module.exports = function (app, path) {
   // display match list
   app.get("/api/friends", function (req, res) {
      fs.readFile("app/data/friends.js", function (err, data) {
         if (err) {
            throw err;
         }
         else {
            res.json(JSON.parse(data));
         }
      });
   });

   // store the data and create a match
   // A POST routes /api/friends.
   // This will be used to handle incoming survey results.
   // This route will also be used to handle the compatibility logic.
   app.post("/api/friends", function (req, res) {

      // hold match object
      let matchObject = [];

      // postResponse interface defines the API of a response container which can (and should)
      // be used by PostOperation services to prepare responses to be sent back to the client
      // via https://sling.apache.org/apidocs/sling7/org/apache/sling/servlets/post/PostResponse.html
      let postResponse = JSON.stringify(req.body);

      // compare the scoreDifference between user's scores and possible matches
      // grab info from friends.js
      fs.readFile("app/data/friends.js", function (err, data) {
         let possiblePartnerData = JSON.parse(data);

         // run through array for match
         for (let i = 0; i < friends.length; i++) {
            let scoreDifference = 0;
            for (let i = 0; i < friends[i]["answers[]"].length; i++) {
               scoreDifference += Math.abs((parseInt(req.body["answers[]"][i]) - parseInt(friends[i]["answers[]"][i])));
            }

            // hold the value  scoreDifference
            let closestMatch = 0;
            let compatibilityScore = 9;

            // update the closestMatch w/ less scoreDifference
            if (scoreDifference <= compatibilityScore) {
               compatibilityScore = scoreDifference;
               closestMatch = i;
            }
         }

         possiblePartnerData.push(friends[closestMatch]);

         // add the new user to the existing array
         friends.push(JSON.parse(postResponse));

         // return
         fs.writeFile("app/data/friends.js", JSON.stringify(friends));
         res.send(possiblePartnerData[0]);

      });
   });
}