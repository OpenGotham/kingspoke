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

    $(".why-button").click(function(e) {
      $(".why-info").slideToggle();
      e.preventDefault();
    });

    // ASK click handler
    $("form").submit(function(e) {

      var option_1 = $("#option_1").val();
      var option_2 = $("#option_2").val();
			
			if (option_1 == option_2) {
				alert("Please choose different words!");
				return false;
			}
			
      var url = $(this).attr("action");

      var postdata = {
        method: "",
        option_1: option_1,
        option_2: option_2
      };

      KS.ui_changemode("thinking");

      var answer = $(".answer");

      KS.api_ask(url, postdata, function(response) {
        KS.ui_changemode("decision");

        var answer = response['answer'];
        $(".answer").text(answer);
        
        var choices = [];
        
        if (response['sentiments']) {
        	var sentiments = response['sentiments'];
        	for (key in sentiments) {
        		choices.push({name: key, value: sentiments[key]});
        	}
        	$(".sentiment-level-text").text("sentiment level");
        }
        else if (response['klouts']) {
        	var klouts = response['klouts'];
        	for (key in klouts) {
        		choices.push({name: key, value: klouts[key]});
        	}
        	$(".sentiment-level-text").text("influence (klout)");
        }
        
        // populate choices (orange text)
        $(".why-info .choice1 .choice-text").text(choices[0].name);
        $(".why-info .choice2 .choice-text").text(choices[1].name);
        var percent_better = 0;
        var people_like_text = "";
				
        $(".why-info .kings-choice").addClass("unselected").removeClass("selected");
        if (answer == choices[0].name) {
          $(".why-info .choice1 span.kings-choice").addClass("selected")
            .removeClass("unselected");
          percent_better = (((5+choices[0].value) - (5+choices[1].value)) / ((5+choices[0].value) + (5+choices[1].value))) * 100;
          percent_better = Math.round(percent_better*1000)/1000;
          if (response['klouts'])
	          people_like_text = choices[0].name + " is " + percent_better + "% more influential.";
	        else
	        	people_like_text = "People like " + choices[0].name + " " + percent_better + "% better.";
        }
        else {
          $(".why-info .choice2 span.kings-choice").addClass("selected")
            .removeClass("unselected");
          percent_better = (((5+choices[1].value) - (5+choices[0].value)) / ((5+choices[0].value) + (5+choices[1].value))) * 100;
          percent_better = Math.round(percent_better*1000)/1000;
          if (response['klouts'])
          	people_like_text = choices[1].name + " is " + percent_better + "% more influential."
          else
          	people_like_text = "People like " + choices[1].name + " " + percent_better + "% better."
        }

        // set "people like X 10% better"
        $(".why-info .bottom-text").text(people_like_text);

        $sentiment1_button = $(".why-info .choice1 .sentiment-button");
        $sentiment2_button = $(".why-info .choice2 .sentiment-button");
        
        if (response['sentiments']) {

	        // change sentiment button 1
	        if (choices[0].value <= -2.83) {
	          $sentiment1_button.addClass("superbad");
	          $sentiment1_button.text("Super bad");
	        }
	        else if (choices[0].value <= -1.7) {
	          $sentiment1_button.addClass("bad");
	          $sentiment1_button.text("Bad");
	        }
	        else if (choices[0].value <= -0.1) {
	          $sentiment1_button.addClass("not-good");
	          $sentiment1_button.text("Not good");
	        }
	        else if (choices[0].value <= 0.1) {
	          $sentiment1_button.addClass("neutral");
	          $sentiment1_button.text("neutral");
	        }
	        else if (choices[0].value <= 1.7) {
	          $sentiment1_button.addClass("notbad");
	          $sentiment1_button.text("Not bad");
	        }
	        else if (choices[0].value <= 2.83) {
	          $sentiment1_button.addClass("good");
	          $sentiment1_button.text("Good");
	        }
	        else {
	          $sentiment1_button.addClass("supergood");
	          $sentiment1_button.text("Super good");
	        }
	
	        // change sentiment button 2
	        if (choices[1].value <= -2.83) {
	          $sentiment2_button.addClass("superbad");
	          $sentiment2_button.text("Super bad");
	        }
	        else if (choices[1].value <= -1.7) {
	          $sentiment2_button.addClass("bad");
	          $sentiment2_button.text("Bad");
	        }
	        else if (choices[1].value <= -0.1) {
	          $sentiment2_button.addClass("not-good");
	          $sentiment2_button.text("Not good");
	        }
	        else if (choices[1].value <= 0.1) {
	          $sentiment2_button.addClass("neutral");
	          $sentiment2_button.text("neutral");
	        }
	        else if (choices[1].value <= 1.7) {
	          $sentiment2_button.addClass("notbad");
	          $sentiment2_button.text("Not bad");
	        }
	        else if (choices[1].value <= 2.83) {
	          $sentiment2_button.addClass("good");
	          $sentiment2_button.text("Good");
	        }
	        else {
	          $sentiment2_button.addClass("supergood");
	          $sentiment2_button.text("Super good");
	        }
        }
        else if (response['klouts']) {
        	$sentiment1_button.text(Math.round(choices[0].value*10)/10);
        	if (choices[0].value <= 33)
        		$sentiment1_button.addClass("not-good");
        	else if (choices[0].value <= 67)
        		$sentiment1_button.addClass("neutral");
        	else
        		$sentiment1_button.addClass("supergood");
        	
        	$sentiment2_button.text(Math.round(choices[1].value*10)/10);
        	if (choices[1].value <= 33)
        		$sentiment2_button.addClass("not-good");
        	else if (choices[1].value <= 67)
        		$sentiment2_button.addClass("neutral");
        	else
        		$sentiment2_button.addClass("supergood");
        }
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
