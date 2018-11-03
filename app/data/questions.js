// create a function for asking questions
function questionsToAsk() {
   let question1 = "I love dogs.";
   let question2 = "I hate cats.";
   let question3 = "Christmas should be a year round holiday.";
   let question4 = "Motorcycles represent freedom.";
   let question5 = "College was so worth it.";
   let question6 = "Columbus day should be abolished.";
   let question7 = "Tacos are the greatest food ever.";
   let question8 = "Tequila.";
   let question9 = "Most people are stupid.";
   let question10 = "Dinner and a movie is a terrible first date idea.";

   // create an array to hold the questions
   let questionArray = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
   return questionArray;
 }

 // append the HTML to show each question
 // through a loop
 // w/ dropdown options
 let questions = questionsToAsk();

 $("#surveyQuestions").append('div class = "row"></div>');

 for (let i = 0; i < questions.length; i++) {
   $("#surveyQuestions").append("<h4> Question" + (i + 1) + "<h3>" +
     "<p>" + questions[i] + "<p>" +
     "<select id = 'answerDropdown' class = 'chosen-select'>"
     + '<option value=""></option>'
     + '<option value="1">1 (Strongly Agree)</option>'
     + '<option value="2">2 (Somewhat Agree)</option>'
     + '<option value="3">3 (Meh)</option>'
     + '<option value="4">4 (Somewhat Digree)</option>'
     + '<option value="5">5 (Strongly Disgree)</option>'
     + "</select>"
   );
 }
 // create a submit button
 $("#surveyQuestions").append(
   '<button type="submit" class="btn btn-primary" id="submitButton">
   < em ></em >
   Submit </button > ' + '</div ></div > '
 );

 for (let selector in config) {
   $(selector).chosen(config[selector]);
 }

 // when the user presses submit button
 // load tihis function
 $("#submitButton").on("click", function (event) {
   // don't restart the app
   event.preventDefault();

   // check the form for errors
   // assume true and
   // if conditions are not met,
   // change to false
   function validateUserInputs() {
     let valid = true;

     // check if name is empty
     if ($("#nameForm").val() === " ") {
       valid = false;
     }

     // check if photo is uploaded
     if ($("#pictureForm").val() === " ") {
       valid = false;
     }

     // check if questions are all submitted
     $(".chosen-select").each(function(){
       if($(this).val() === ""){
         valid = false;
       }
     });
     return valid;
   }

   if (validateUserInputs()){
     let storedAnswers = {
       "Name": $(#nameForm).val().trim(),
       "Profile Picture": $(#pictureForm).val().trim(),
       "userResponses": [
         parseInt($("#question1").val()),
         parseInt($("#question2").val()),
         parseInt($("#question3").val()),
         parseInt($("#question4").val()),
         parseInt($("#question5").val()),
         parseInt($("#question6").val()),
         parseInt($("#question7").val()),
         parseInt($("#question8").val()),
         parseInt($("#question9").val()),
         parseInt($("#question10").val()),
       ]
     };
     $.post("/api/friends", questionsToAsk, function(updateMatchInfo){
       $("#matchName").html("<h1>" + updateMatchInfo.name + "</h1>");
       $("#matchProfilePicture").attr("src", updateMatchInfo.photo);
       
       // pull up the modal
       $("#matchModal").modal("toggle");
     });
   }
   else{
     alert ("You left some of the good stuff out :)");
   }
 });
 // exportable
module.exports = exportQuestionArray;