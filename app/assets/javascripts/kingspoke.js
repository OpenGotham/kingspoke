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

      var q1 = $("#option_1").val();
      var q2 = $("#option_2").val();

      var url = $(this).attr("action");

      var postdata = {
        method: "",
        option_1: q1,
        option_2: q2
      };

      KS.api_ask(url, postdata, function(response) {
        $(".answer").empty();
        $(".answer").text(response['answer']);
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
