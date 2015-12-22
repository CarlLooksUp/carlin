//check form field against regex, add to error_list if invalid
function validate(regex, id, error_list) {
  if(!regex.test($(id).val())) {
    error_list.push($(id));
  }
}

$(function() {
  $('#personal_info').submit(function(e) {
    e.preventDefault();
    var errors = [];

    $('input').each(function(i, o) {
      $(o).parent().parent().removeClass('has-error');
      $(o).parent().find('.help-block').addClass('hidden');
    });

    //check name validity
    var valid_name = /^\D+$/;
    $('#firstName, #lastName').each(function (i, o) {
      if(!valid_name.test($(o).val())) {
        errors.push(o);
      }
    });

    //check phone validity
    validate(/^\d+$/, '#phone', errors);

    //check zip validity
    validate(/^\d{5}$/, '#zip', errors);

    //check date validity
    validate(/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/, '#date', errors);

    //check email validity
    //email regexes are terrible, so I'm going to accept that and write a dumb one
    //https://davidcel.is/posts/stop-validating-email-addresses-with-regex/
    validate(/.*@.+\..*/, '#email', errors);

    //check for city
    validate(/.+/, '#city', errors);

    //show errors, or show confirmation
    if(errors.length > 0) {
      $.each(errors, function(i, o) {
        $(o).parent().parent().addClass('has-error');
        $(o).parent().find('.help-block').removeClass('hidden');
      });
      $('.alert').text('Please correct input and resubmit form').removeClass('alert-success').addClass('alert-danger');
    } else {
      $('.alert').text('Form submitted successfully').removeClass('alert-danger').addClass('alert-success');
    }
  });

});
