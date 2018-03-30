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
function setUpDash() {
  var firstTime = localStorage.getItem('firstTime');
  if (firstTime != 1) {

  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie() {
  var firstTime = getCookie("firstTime");
  if (firstTime != "") {} else {
    var modal = UIkit.modal('#welcome-modal')
    modal.show();
    setCookie("firstTime", 1);
  }
}

//Launch Set Up on Dash Login
function setUpDash() {
  var setupProfile;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId + '/setupProfile/').once('value').then(function(snapshot) {
        setupProfile = (snapshot.val());
        if (setupProfile === null) {
          var modal = UIkit.modal('#setup-modal')
          modal.show();
        }
      });
    } else {
      // No user is signed in.
    }
  });
};


//Log info to database on submit
$("#finished-setup").on("click", function(event) {
  location.reload();
  userName = firebase.auth().currentUser.displayName;
  userEmail = firebase.auth().currentUser.email;
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
    userEmail: userEmail,
    preferredName: preferredName,
    themeChoice: theme,
    charityChoice: charity,
    sportChoice: sports,
    setupProfile: 1,
  });

  getUserProfile();
  var modal = UIkit.modal('#setup-modal');
  modal.hide();
});



//Extract from Firebase and Display in DOM
var chosenCharity;
var chosenTheme;
var chosenSports;
var email;
var preferredName;

function getUserProfile() {
  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/users/' + userId + '/charityChoice/').once('value').then(function(snapshot) {
    chosenCharity = (snapshot.val());
    if (chosenCharity === 'Water') {
      document.getElementById('charity-logo').src = 'assets/images/water.png';
      document.getElementById('display-charity').innerHTML = 'Water.org';
      document.getElementById('charity-description').innerHTML = 'Water.org thanks you for your donations! Water.org has empowered 10 million people with access to safe water and sanitation through affordable financing.';
    } else if (chosenCharity === 'Sierra') {
      document.getElementById('charity-logo').src = 'assets/images/sierra-club.png';
      document.getElementById('display-charity').innerHTML = 'SierraClubFoundation.org';
      document.getElementById('charity-description').innerHTML = 'SierraClubFoundation.org thanks you for your donations! The Sierra Club Foundation promotes climate solutions, conservation, and movement building through a powerful combination of strategic philanthropy and grassroots advocacy.';
    } else if (chosenCharity === 'Ocean') {
      document.getElementById('charity-logo').src = 'assets/images/ocean-conservancy.png';
      document.getElementById('display-charity').innerHTML = 'OceanConservancy.org';
      document.getElementById('charity-description').innerHTML = 'OceanConservancy.org thanks you for your donations! Together, we create science-based solutions for a healthy ocean and the wildlife and communities that depend on it.';
    } else {
      document.getElementById('display-charity').innerHTML = 'You are not currently sending your donations anywhere!';
    }
  });


  firebase.database().ref('/users/' + userId + '/preferredName/').once('value').then(function(snapshot) {
    preferredName = (snapshot.val());
    $("#welcome").append("Welcome,  " + preferredName + "!");
  });

  firebase.database().ref('/users/' + userId + '/themeChoice/').once('value').then(function(snapshot) {
    chosenTheme = (snapshot.val());
  });

  firebase.database().ref('/users/' + userId + '/sportChoice/').once('value').then(function(snapshot) {
    thingChoice = (snapshot.val());
  });
}



function userSettings() {
  var userId = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/' + userId + '/charityChoice/').once('value').then(function(snapshot) {
    chosenCharity = (snapshot.val());
    console.log('Chosen charity: ' + chosenCharity);

    if (chosenCharity === 'Water') {
      document.getElementById('settings-charity').innerHTML = 'Water.org';
    } else if (chosenCharity === 'Sierra') {
      document.getElementById('settings-charity').innerHTML = 'SierraClubFoundation.org';
    } else if (chosenCharity === 'Ocean') {
      document.getElementById('settings-charity').innerHTML = 'OceanConservancy.org';
    } else {
      document.getElementById('display-charity').innerHTML = 'You are not currently sending your donations anywhere!';
    }
  });

  firebase.database().ref('/users/' + userId + '/userEmail/').once('value').then(function(snapshot) {
    userEmail = (snapshot.val());
    document.getElementById('settings-email').innerHTML = userEmail;
  });

  firebase.database().ref('/users/' + userId + '/preferredName/').once('value').then(function(snapshot) {
    preferredName = (snapshot.val());
    document.getElementById('settings-preferred-name').innerHTML = preferredName;
  });

  firebase.database().ref('/users/' + userId + '/themeChoice/').once('value').then(function(snapshot) {
    chosenTheme = (snapshot.val());
    document.getElementById('settings-theme').innerHTML = chosenTheme;
  });

  firebase.database().ref('/users/' + userId + '/sportChoice/').once('value').then(function(snapshot) {
    thingChoice = (snapshot.val());
    document.getElementById('settings-purchase-preferences').innerHTML = thingChoice;
  });
}

$("#commit-name-change").on("click", function(event) {
  var preferredName = $("#change-preferred-name").val().trim();
  var userId = firebase.auth().currentUser.uid;
  var userProfile = database.ref('users/' + userId).update({
    preferredName: preferredName
  });

  var modal = UIkit.modal('#change-name');
  modal.hide();
  location.reload();
});

$("#commit-email-change").on("click", function(event) {
  var userEmail = $("#change-user-email").val().trim();
  var userId = firebase.auth().currentUser.uid;
  var userProfile = database.ref('users/' + userId).update({
    userEmail: userEmail
  });

  var modal = UIkit.modal('#change-email');
  modal.hide();
  location.reload();
});

$("#commit-charity-change").on("click", function(event) {
  var charity;
  if ($('#new-water').is(':checked')) {
    charity = "Water";
  };
  if ($('#new-sierra').is(':checked')) {
    charity = "Sierra";
  } else if ($('#new-ocean').is(':checked')) {
    charity = "Ocean";
  };

  var userId = firebase.auth().currentUser.uid;
  var userProfile = database.ref('users/' + userId).update({
    charityChoice: charity
  });

  var modal = UIkit.modal('#change-charity');
  modal.hide();
  location.reload();
});

$("#commit-theme-change").on("click", function(event) {
  var theme;
  if ($('#new-dark-theme').is(':checked')) {
    theme = "Dark Theme";
  } else if ($('#new-light-theme').is(':checked')) {
    theme = "Light Theme";
  };

  var userId = firebase.auth().currentUser.uid;
  var userProfile = database.ref('users/' + userId).update({
    themeChoice: theme
  });

  var modal = UIkit.modal('#change-theme');
  modal.hide();
  location.reload();
});


$("#commit-purchase-change").on("click", function(event) {
  var sportOne = $("#new-hiking").val().trim();
  var sportTwo = $("#new-cycling").val().trim();
  var sportThree = $("#new-snow-sports").val().trim();
  var sportFour = $("#new-general-fitness").val().trim();
  var sports = [];
  if ($('#new-hiking').is(':checked')) {
    sports.push(sportOne);
  };
  if ($('#new-cycling').is(':checked')) {
    sports.push(sportTwo);
  };
  if ($('#new-snow-sports').is(':checked')) {
    sports.push(sportThree);
  };
  if ($('#new-general-fitness').is(':checked')) {
    sports.push(sportFour);
  };

  var userId = firebase.auth().currentUser.uid;
  var userProfile = database.ref('users/' + userId).update({
    sportChoice: sports
  });

  var modal = UIkit.modal('#change-purchase-preferences');
  modal.hide();
  location.reload();
});


//Delete user
$("#delete").click(function() {
  var user = firebase.auth().currentUser;
  var userId = firebase.auth().currentUser.uid;
  var userProfile = database.ref('users/' + userId).remove();
  user.delete().then(function() {
    localStorage.clear();
    window.location.href = "index.html";
  }).catch(function(error) {

    var user = firebase.auth().currentUser;
    var credential;

    // Prompt the user to re-provide their sign-in credentials
    user.reauthenticateWithCredential(credential).then(function() {
      // User re-authenticated.
    }).catch(function(error) {
      // An error happened.
    });

  });
})


//Add Affiliates
$("#submit-affiliates").on("click", function(event) {
  var cabelas = "Cabela's"
  var marmot = "Marmot"
  var rei = "REI"
  var deuter = "Deuter"
  var backcountry = "Backcountry"
  var patagonia = "Patagonia"
  var mountainHardware = "Mountain Hardware"
  var amazon = "Amazon.com"
  var activeAffiliates = [];

  if ($('#add-cabelas').is(':checked')) {
    activeAffiliates.push(cabelas);
  };
  if ($('#add-marmot').is(':checked')) {
    activeAffiliates.push(marmot);
  };
  if ($('#add-rei').is(':checked')) {
    activeAffiliates.push(rei);
  };
  if ($('#add-deuter').is(':checked')) {
    activeAffiliates.push(deuter);
  };
  if ($('#add-backcountry').is(':checked')) {
    activeAffiliates.push(backcountry);
  };
  if ($('#add-patagonia').is(':checked')) {
    activeAffiliates.push(patagonia);
  };
  if ($('#add-mountain').is(':checked')) {
    activeAffiliates.push(mountainHardware);
  };
  if ($('#add-amazon').is(':checked')) {
    activeAffiliates.push(amazon);
  };

  var userId = firebase.auth().currentUser.uid;
  var userProfile = database.ref('users/' + userId).update({
    activeAffiliates: activeAffiliates
  });
  window.location.href = "dashboard.html";
});


//Display Affiliates on Dashboard

function displayAffiliates() {
  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('/users/' + userId + '/activeAffiliates/').once('value').then(function(snapshot) {
    var activeAffiliates = (snapshot.val());
    console.log(activeAffiliates);

    for (var i = 0; i < activeAffiliates.length; i++) {
      var cabelasImg = "assets/images/cabelas.png";
      var marmotImg = "assets/images/marmot.jpg";
      var deuterImg = "assets/images/deuter.jpg";
      var reiImg = "assets/images/REIimage.jpg";
      var mountainImg = "assets/images/mountain.jpg";
      var amazonImg = "assets/images/amazonlogo.svg";
      var backcountryImg = "assets/images/backcountry.png";
      var patagoniaImg = "assets/images/patagonia.jpg";
      var affiliateImage;
      var cabelasUrl = "https://www.cabelas.com/";
      var marmotUrl = "https://www.marmot.com/";
      var deuterUrl = "https://www.deuter.com/US/us/";
      var reiUrl = "https://www.rei.com/";
      var mountainHardwareUrl = "https://www.mountainhardwear.com/home";
      var amazonUrl = "https://www.amazon.com/";
      var backcountryUrl = "https://www.backcountry.com/";
      var patagoniaUrl = "http://www.patagonia.com/";
      var affiliateUrl;
      if (activeAffiliates[i] === "Cabela's") {
        affiliateImage = cabelasImg;
        affiliateUrl = cabelasUrl;
      }
      if (activeAffiliates[i] === "Marmot") {
        affiliateImage = marmotImg;
        affiliateUrl = marmotUrl;
      }
      if (activeAffiliates[i] === "REI") {
        affiliateImage = reiImg;
        affiliateUrl = reiUrl;
      }
      if (activeAffiliates[i] === "Deuter") {
        affiliateImage = deuterImg;
        affiliateUrl = deuterUrl;
      }
      if (activeAffiliates[i] === "Mountain Hardware") {
        affiliateImage = mountainImg;
        affiliateUrl = mountainHardwareUrl;
      }
      if (activeAffiliates[i] === "Amazon.com") {
        affiliateImage = amazonImg;
        affiliateUrl = amazonUrl;
      }
      if (activeAffiliates[i] === "Backcountry") {
        affiliateImage = backcountryImg;
        affiliateUrl = backcountryUrl;
      }
      if (activeAffiliates[i] === "Patagonia") {
        affiliateImage = patagoniaImg;
        affiliateUrl = patagoniaUrl;
      }
      $("#no-affiliates").fadeOut();
      $("#affiliate-grid").append("<div class='uk-width-1-5@l'><div class='uk-card uk-card-default uk-card-body'><a href = '" + affiliateUrl + "' target = '_blank'><h3>" + activeAffiliates[i] +
        "</h3><img src='" + affiliateImage + "'></a></div></div>");
    }
  });
}



function setTheme() {
  var userId = firebase.auth().currentUser.uid;

  firebase.database().ref('/users/' + userId + '/themeChoice/').once('value').then(function(snapshot) {
    chosenTheme = (snapshot.val());
    console.log(chosenTheme); //logs theme correctly

    if (chosenTheme == "Dark Theme") {
      $("#theme-choice").attr("href", "assets/css/app-dark.css");
    } else {
      $("#theme-choice").attr("href", "assets/css/app.css");
    }

  });
}

$("#learnMore").click(function() {
  $('html, body').animate({
    scrollTop: $("#knowMore").offset().top
  }, 800);
});
