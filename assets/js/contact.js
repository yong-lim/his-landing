//selector from your HTML form
function postContact(e) {
  //prevent the form from submiting so we can post to the google form
  e.preventDefault();
  console.log("in postContact");
  $('#alert-field').removeClass('is-hidden');

  //AJAX request
  console.log("data");
  console.log($('#contact-form').serialize());
  $.ajax({
    //The public Google Form url, but replace /view with /formResponse
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSenjU1ot3m7pJwyFMJYPWViLRNmUvfEB-X-HGCzNxI90dpWpQ/formResponse',
    //Nifty jquery function that gets all the input data 
    data: $('#contact-form').serialize(),
    type: 'POST',         //tells ajax to post the data to the url
    dataType: "json",     //the standard data type for most ajax requests
    statusCode: {         //the status code from the POST request
      0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
        //success
        $('#alert-field').addClass('is-hidden');
        document.location.href="/";
      }, 
      200: function(data) {//200 is a success code. it went through!
        //success
        // $('#form-success').text('hooray! 200');
        $('#alert-field').addClass('is-hidden');
        document.location.href="/";
      },
      403: function(data) {//403 is when something went wrong and the submission didn't go through
        //error
        alert('Oh no! something went wrong. Please let us know of your problem.');
      }
    }  
  });
};
 
function changeSubject(e) {
  if(e.target.value === 'Other') {
    $('#subject-select').removeClass('col-xs-12').addClass('col-xs-6');
    $('#hidden-other-subject').removeClass('hidden');
  } else {
    $('#subject-select').removeClass('col-xs-6').addClass('col-xs-12');
    $('#hidden-other-subject').addClass('hidden');
  }
}

