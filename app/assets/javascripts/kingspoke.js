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

        var answer = response['answer'];
        $(".answer").text(answer);

        var sentiments = response['sentiments'];
        var i=0;
        var sentiment1_name, sentiment1_value;
        var sentiment2_name, sentiment2_value;
        for (k in sentiments) {
          if (i==0) {
            sentiment1_name = k;
            sentiment1_value = sentiments[k];
          }
          else {
            sentiment2_name = k;
            sentiment2_value = sentiments[k];
          }
          i++;
        }

        // populate choices (orange text)
        $(".why-info .choice1 .choice-text").text(sentiment1_name);
        $(".why-info .choice2 .choice-text").text(sentiment2_name);
        var percent_better = 0;
        var people_like_text = "";

        $(".why-info .kings-choice").addClass("unselected").removeClass("selected");
        if (answer == sentiment1_name) {
          $(".why-info .choice1 span.kings-choice").addClass("selected")
            .removeClass("unselected");
          percent_better = (((5+sentiment1_value) - (5+sentiment2_value)) / ((5+sentiment1_value) + (5+sentiment2_value))) * 100;
          percent_better = Math.round(percent_better*1000)/1000;
          people_like_text = "People like " + sentiment1_name + " " + percent_better + "% better.";
        }
        else {
          $(".why-info .choice2 span.kings-choice").addClass("selected")
            .removeClass("unselected");
          percent_better = (((5+sentiment2_value) - (5+sentiment1_value)) / ((5+sentiment1_value) + (5+sentiment2_value))) * 100;
          percent_better = Math.round(percent_better*1000)/1000;
          people_like_text = "People like " + sentiment2_name + " " + percent_better + "% better."
        }

        // set "people like X 10% better"
        $(".why-info .bottom-text").text(people_like_text);

        $sentiment1_button = $(".why-info .choice1 .sentiment-button");
        $sentiment2_button = $(".why-info .choice2 .sentiment-button");
        // change sentiment button 1
        if (sentiment1_value <= -2.83) {
          $sentiment1_button.addClass("superbad");
          $sentiment1_button.text("Super bad");
        }
        else if (sentiment1_value <= -1.7) {
          $sentiment1_button.addClass("bad");
          $sentiment1_button.text("Bad");
        }
        else if (sentiment1_value <= -0.1) {
          $sentiment1_button.addClass("not-good");
          $sentiment1_button.text("Not good");
        }
        else if (sentiment1_value <= 0.1) {
          $sentiment1_button.addClass("neutral");
          $sentiment1_button.text("neutral");
        }
        else if (sentiment1_value <= 1.7) {
          $sentiment1_button.addClass("notbad");
          $sentiment1_button.text("Not bad");
        }
        else if (sentiment1_value <= 2.83) {
          $sentiment1_button.addClass("good");
          $sentiment1_button.text("Good");
        }
        else {
          $sentiment1_button.addClass("supergood");
          $sentiment1_button.text("Super good");
        }

        // change sentiment button 2
        if (sentiment2_value <= -2.83) {
          $sentiment2_button.addClass("superbad");
          $sentiment2_button.text("Super bad");
        }
        else if (sentiment2_value <= -1.7) {
          $sentiment2_button.addClass("bad");
          $sentiment2_button.text("Bad");
        }
        else if (sentiment2_value <= -0.1) {
          $sentiment2_button.addClass("not-good");
          $sentiment2_button.text("Not good");
        }
        else if (sentiment2_value <= 0.1) {
          $sentiment2_button.addClass("neutral");
          $sentiment2_button.text("neutral");
        }
        else if (sentiment2_value <= 1.7) {
          $sentiment2_button.addClass("notbad");
          $sentiment2_button.text("Not bad");
        }
        else if (sentiment2_value <= 2.83) {
          $sentiment2_button.addClass("good");
          $sentiment2_button.text("Good");
        }
        else {
          $sentiment2_button.addClass("supergood");
          $sentiment2_button.text("Super good");
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
