var KS = {

  init: function() {
    log("ready");

    KS.init_ui();
  },

  init_ui: function() {
    // focus q1
    $("#option_1").focus();

    // ASK click handler
    $("form").submit(function(e) {

      var option_1 = $("#option_1").val();
      var option_2 = $("#option_2").val();

      var url = $(this).attr("action");

      var postdata = {
        method: "",
        option_1: option_1,
        option_2: option_2
      };

      var answer = $(".answer")
      $(".answer").text("Silence! The King is thinking.")
      KS.api_ask(url, postdata, function(response) {
        $(".answer").text("The King has decided: " + response['answer']);
      });

      e.preventDefault();
      return false;
    });
  },

  api_ask: function(url, postdata, callback) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      data: postdata,
      success: function(response) {
        log(response);
        if (callback)
          callback(response);
      }
    });
  }
};
