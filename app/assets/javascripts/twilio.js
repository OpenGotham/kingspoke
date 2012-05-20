var Twilio = {
  init: function() {
    Twilio.bindAllEvents();
  },
  bindAllEvents: function() {
    $("#show-twilio-form-button").click(function() {
      $(this).hide();
      $(".twilio-form-container").show();
    });

    $("#cancel-button").click(function() {
      $("#twilio-form").each (function() {
        this.reset();
      });
      $(".twilio-form-container").hide();
      $("#show-twilio-form-button").show();
    });

    $("form#twilio-form").submit(function() {
      var data = {
        phone_number: $("#twilio_phone_number").val(),
        option_1: $("#option_1").val(),
        option_2: $("#option_2").val(),
        answer: $(".answer").text()
      }
      $.ajax({
        type: "POST",
        dataType: "json",
        url: $(this).attr("action"),
        data: data,
        success: function(response) {
          $("#twilio-form").each (function() {
            this.reset();
          });
          $(".twilio-form-container").hide();
          $("#show-twilio-form-button").show();
        }
      })
      return false;
    });
  }
};
