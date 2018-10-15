//console.log("test");


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBa_yNUg-g5ez7Y6FnUNJvc2_qYlzKZ2j4",
    authDomain: "clickbuttoncounter-82703.firebaseapp.com",
    databaseURL: "https://clickbuttoncounter-82703.firebaseio.com",
    projectId: "clickbuttoncounter-82703",
    storageBucket: "clickbuttoncounter-82703.appspot.com",
    messagingSenderId: "520359151984"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //console.log(database);


$("#submit-info").on("click", function(event){
    event.preventDefault();

    var trainNameInput = $("#train-name-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var firstTrainTime = $("#first-train-time-input").val().trim();
    //var firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim();
    console.log("first train time from the input" + firstTrainTime);
    
    //console.log("this is the first input of first train time" + firstTrainTime);
    
    
    //console.log(trainNameInput, destinationInput, firstTrainTime, frequency);


    var newTrain = {
        trainNameInput: trainNameInput,
        destinationInput: destinationInput,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
    }

    database.ref().push(newTrain);

    //console.log(newTrain.trainNameInput, newTrain.destinationInput, newTrain.firstTrainTime, newTrain.frequency)

    alert("new train has been added to the databas!");

    //Now Clear Out All Of The Text Boxes
    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

})

database.ref().on("child_added", function(childSnapshot){
        
    //console.log(childSnapshot.val());

    var trainNameInput = childSnapshot.val().trainNameInput;
    var destinationInput = childSnapshot.val().destinationInput;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;
    console.log("fisrst train time from the db" + firstTrainTime);

    

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainTimeFormatted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    //.subtract(1, "years")
    console.log("FIRST TRAIN TIME FORMATTED: " + firstTrainTimeFormatted);
    console.log(firstTrainTimeFormatted.format("hh:mm:ss"));


    var currentTime = moment();
    //console.log("this is the current time unformatted" + currentTime);
    console.log("CURRENT TIME FORMATTED: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainTimeFormatted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    


    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log("the remainder" + tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    //console.log("next train time without the formatting" + nextTrain);
    //console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    



    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainNameInput),
        $("<td>").text(destinationInput),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
        
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
   

})
