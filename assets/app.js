$(document).ready(function() {
    var firstTime = localStorage.getItem('firstTime');
    if (firstTime== null) {
        localStorage.setItem('firstTime', 1);

        $('#welcome-modal').modal('show');
    }
});
