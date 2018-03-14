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

//First-time Modal
$(document).ready(function() {
    var firstTime = localStorage.getItem('firstTime');
    if (firstTime== null) {
        localStorage.setItem('firstTime', 1);

        $('#welcome-modal').modal('show');
    }
});

//Auth Check & User Log

var pathname = window.location.pathname;

  if(pathname === "/dashboard.html") {
    console.log('home');
    console.log('')
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
