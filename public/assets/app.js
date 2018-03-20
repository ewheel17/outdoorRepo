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
  if (firstTime == null) {
    localStorage.setItem('firstTime', 1);

    $('#welcome-modal').modal('show');
  }
});


//Firebase User Authentication
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAM-t2CaMxXwb_HMZaqs-QHaGe1KETwmUM",
  authDomain: "outdoorrepo-e22c5.firebaseapp.com",
  databaseURL: "https://outdoorrepo-e22c5.firebaseio.com",
  projectId: "outdoorrepo-e22c5",
  storageBucket: "outdoorrepo-e22c5.appspot.com",
  messagingSenderId: "565862631025"
};
firebase.initializeApp(config);

var database = firebase.database();

// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccess: function(currentUser, credential, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'dashboard.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  tosUrl: 'http://github.com'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
// User Signout
$("#logout").click(function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.replace("index.html");
  }).catch(function(error) {
    // An error happened.
    console.log('Logout Error');
  });
});



//Auth Check & User Log
var pathname = window.location.pathname;

if (pathname === "/dashboard.html") {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('authStateChanged', user);
    if (user) {
      var firstName = user.displayName.split(' ').splice(0, 1);
      console.log(firstName);
      $("#welcome").append("<span class='welcome'>Welcome,  " + firstName + "!</span>");
    } else {
      window.location.replace("../index.html");
    }
  });
}


//Setup modal
//Only show setup on first login
//
//   var firstSetup = localStorage.getItem('firstSetup');
//   if (firstSetup == null) {
//     localStorage.setItem('firstSetup', 1);
//
//   };
// });

$(document).ready(function() {
  var modal = UIkit.modal('#setup-modal');
      modal.show();
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
        var things = [];

        if ($('#things1').is(':checked')) {
          things.push("things1");
        }
        if ($('#things2').is(':checked')) {
          things.push("things2");
        };
        if ($('#things3').is(':checked')) {
          things.push("things3");
        };
        if ($('#things4').is(':checked')) {
          things.push("things4");
        };
        console.log(things);
        if ($('#charity2').is(':checked')) {
          charity = "Charity 2";
        } else if ($('#charity3').is(':checked')) {
          charity = "Charity 3";
        };
        var charity;
        if ($('#charity1').is(':checked')) {
          charity = "Charity 1";
        }
        if ($('#charity2').is(':checked')) {
          charity = "Charity 2";
        } else if ($('#charity3').is(':checked')) {
          charity = "Charity 3";
        };


        // Save new value to Firebase
        var userProfile = database.ref('users/' + userId).set({
          userName: userName,
          preferredName: preferredName,
          themeChoice: theme,
          charityChoice: charity,
          thingChoice: things
        });

        var modal = UIkit.modal('#setup-modal');
        modal.hide();
      });
