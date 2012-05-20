var KS = {

  init: function() {
    log("ready");

    KS.init_ui();
  },
	
	ui_changemode: function(mode) {
		
		if (!mode)
			return;
			
		if (mode == "thinking") {
			$(".section-main").hide();
			$(".section-decision").hide();
			$(".section-thinking").show();
		}
		else if (mode == "decision") {
			$(".section-main").hide();
			$(".section-decision").show();
			$(".section-thinking").hide();
		}
		else if (mode == "start") {
			$(".section-main").show();
			$(".section-decision").hide();
			$(".section-thinking").hide();
		}
		
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
			
			KS.ui_changemode("thinking");
			
      var answer = $(".answer");
      
      /* $(".answer").text("Silence! The King is thinking."); */
      
      KS.api_ask(url, postdata, function(response) {
      	KS.ui_changemode("decision");
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
