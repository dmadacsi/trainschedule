/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyB2-0HCh1-sYnWchx7ZeidgowKQsBq-E1M",
    authDomain: "pushpro-db67c.firebaseapp.com",
    databaseURL: "https://pushpro-db67c.firebaseio.com",
    projectId: "pushpro-db67c",
    storageBucket: "",
    messagingSenderId: "319273166110"
  };
  firebase.initializeApp(config);

  var database = firebase.database();



// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: trainDestination,
    start: trainStart,
    rate: trainRate
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  // Alert
  alert("New Train Details Successfully Added to the Database");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");

});

// 3. Create Firebase event for adding train info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  // train Info
  console.log(trainName, "train name");
  console.log(trainDestination, "train destination");
  console.log(trainStart, " train start");
  console.log(trainRate, "train rate");

  // Prettify the train start
  var trainStartPretty = moment.unix(trainStart).format("HH:mm"); //not sure if needed
  var trainNext =moment(b).format("HH:mm");//this just seems to give current time
  console.log (trainNext, "trainNext");
  // 
  //
 
  var hours = (moment().unix()- trainStart); "HH:mm";
  console.log(hours,"hours");
  var x =(hours / 3600) //gives me hours in real time 3600 secons in an hour 
  var y = (hours/ (trainRate*60));
  var ratePlusOne = (y + 1);
  console.log(y, "stops");
  console.log(Math.floor(ratePlusOne), "almost next");
  var z = (Math.floor(ratePlusOne)*trainRate);//this was the bug had 30 here but changed it to trainRate to fix. out of order but all good now!
  var a = (z * 60)
  console.log(a," mins or hours in seconds to add to day start to get next train" )
  var b = a + parseInt(trainStart) ;
  console.log(b, "next train in unix)")
  
  var newNext = moment.unix(b).format("HH:mm");
  var result = moment().diff(moment.unix(b, "X"), "HH:mm");
  console.log(result, "result")

  

  var humanize=moment.duration(result).humanize();
//   if(result<=0){
//       humanize=result+trainRate;
//   }

  console.log(humanize);

//   // Calculate next arrival
//   var nextArrival = empMonths * empRate;
//   console.log(empBilled);
    
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainRate    + "</td><td>" + newNext+ "</td><td>" + humanize+ "</td><td>");

  setTimeout(function(){ //refresh page
    location.reload();
},30000);

});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
// var t= 20.00;
// now= (Date)
// while( t < now );
// t+=trainRate;
// humanize= t-now;