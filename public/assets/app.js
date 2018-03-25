//Tawk_API
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function() {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/5aab337fd7591465c7089c8f/default';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();

//First-time Modal
$(document).ready(function() {
  var firstTime = localStorage.getItem('firstTime');
  if (firstTime != 1) {
    var modal = UIkit.modal('#welcome-modal')
    modal.show();
    localStorage.setItem('firstTime', 1);
  }
});

  //Launch Set Up on Dash Login
function setUpDash(){
  $(document).ready(function() {
        var modal = UIkit.modal('#setup-modal');
            modal.show();
});

$(document).ready(function(){
  getUserProfile();
});


//Log info to database on submit
$("#finished-setup").on("click", function(event) {
  event.preventDefault();
  userName = firebase.auth().currentUser.displayName;
  userId = firebase.auth().currentUser.uid;
  preferredName = $("#preferred-name").val().trim();


  var theme;
    if ($('#dark-theme').is(':checked')) {
      theme = "Dark Theme"
      } else {
      theme = "Light Theme"
    };

    var sportOne = $("#hiking").val().trim();
    var sportTwo = $("#cycling").val().trim();
    var sportThree = $("#snow-sports").val().trim();
    var sportFour = $("#general-fitness").val().trim();
    var sports = [];
    if ($('#hiking').is(':checked')) {
      sports.push(sportOne);
    };
    if ($('#cycling').is(':checked')) {
      sports.push(sportTwo);
    };
    if ($('#snow-sports').is(':checked')) {
      sports.push(sportThree);
    };
    if ($('#general-fitness').is(':checked')) {
      sports.push(sportFour);
    };

    var charity;
    if ($('#water').is(':checked')) {
      charity = "Water";
    };
    if ($('#sierra').is(':checked')) {
      charity = "Sierra";
    } else if ($('#ocean').is(':checked')) {
      charity = "Ocean";
  };

  // Save new value to Firebase
  var userProfile = database.ref('users/' + userId).set({
    userName: userName,
    preferredName: preferredName,
    themeChoice: theme,
    charityChoice: charity,
    sportChoice: sports,
  });

  getUserProfile();
  var modal = UIkit.modal('#setup-modal');
    modal.hide();
});
}


//Extract from Firebase and Display in DOM
var chosenCharity;
var chosenTheme;
var chosenSports;
var email;
var preferredName;

function getUserProfile(){
  $(document).ready(function() {
  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/users/' + userId + '/charityChoice/').once('value').then(function(snapshot){
    chosenCharity = (snapshot.val());
    if (chosenCharity === 'Water'){
      document.getElementById('charity-logo').src = 'assets/images/water.png';
      document.getElementById('display-charity').innerHTML = 'Water.org';
      document.getElementById('charity-description').innerHTML = 'Water.org thanks you for your donations! Water.org has empowered 10 million people with access to safe water and sanitation through affordable financing.';
    } else if (chosenCharity === 'Sierra'){
      document.getElementById('charity-logo').src = 'assets/images/sierra-club.png';
      document.getElementById('display-charity').innerHTML = 'SierraClubFoundation.org';
      document.getElementById('charity-description').innerHTML = 'SierraClubFoundation.org thanks you for your donations! The Sierra Club Foundation promotes climate solutions, conservation, and movement building through a powerful combination of strategic philanthropy and grassroots advocacy.';
    } else if (chosenCharity === 'Ocean'){
      document.getElementById('charity-logo').src = 'assets/images/ocean-conservancy.png';
      document.getElementById('display-charity').innerHTML = 'OceanConservancy.org';
      document.getElementById('charity-description').innerHTML = 'OceanConservancy.org thanks you for your donations! Together, we create science-based solutions for a healthy ocean and the wildlife and communities that depend on it.';
    } else {
      document.getElementById('display-charity').innerHTML = 'You are not currently sending your donations anywhere!';
    }
  });

  firebase.database().ref('/users/' + userId + '/preferredName/').once('value').then(function(snapshot){
    preferredName = (snapshot.val());
    $("#welcome").append("Welcome,  " + preferredName + "!");
  });

  firebase.database().ref('/users/' + userId + '/themeChoice/').once('value').then(function(snapshot){
    chosenTheme = (snapshot.val());
  });

  firebase.database().ref('/users/' + userId + '/sportChoice/').once('value').then(function(snapshot){
    thingChoice = (snapshot.val());
  });
});
}


function userSettings(){
  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/users/' + userId + '/charityChoice/').once('value').then(function(snapshot){
    chosenCharity = (snapshot.val());
    console.log('Chosen charity: ' + chosenCharity);

    if (chosenCharity === 'Water'){
      document.getElementById('settings-charity').innerHTML = 'Water.org';
    } else if (chosenCharity === 'Sierra'){
      document.getElementById('settings-charity').innerHTML = 'SierraClubFoundation.org';
    } else if (chosenCharity === 'Ocean'){
      document.getElementById('settings-charity').innerHTML = 'OceanConservancy.org';
    } else {
      document.getElementById('display-charity').innerHTML = 'You are not currently sending your donations anywhere!';
    }
  });

  firebase.database().ref('/users/' + userId + '/preferredName/').once('value').then(function(snapshot){
    preferredName = (snapshot.val());
    document.getElementById('settings-preferred-name').innerHTML = preferredName;
  });

  firebase.database().ref('/users/' + userId + '/themeChoice/').once('value').then(function(snapshot){
    chosenTheme = (snapshot.val());
    document.getElementById('settings-theme').innerHTML = chosenTheme;
  });

  firebase.database().ref('/users/' + userId + '/sportChoice/').once('value').then(function(snapshot){
    thingChoice = (snapshot.val());
    document.getElementById('settings-purchase-preferences').innerHTML = thingChoice;
  });
}
