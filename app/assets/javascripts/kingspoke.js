var KS = {
	
	king_pics: [
		{name: "King Charles I of England", image: "assets/images/kings/1.png"},
		{name: "King William I the Conquerer", image: "assets/images/kings/2.png"},
		{name: "King Hamlet the Ghost", image: "assets/images/kings/3.png"},
		{name: "King Lear", image: "assets/images/kings/4.png"},
		{name: "Nat King Cole", image: "assets/images/kings/5.png"},
		{name: "Old King Cole", image: "assets/images/kings/6.png"},
		{name: "Henry IV of England", image: "assets/images/kings/7.png"},
		{name: "Henry IV of France", image: "assets/images/kings/8.png"},
		{name: "Henry I of England", image: "assets/images/kings/9.png"},
		{name: "Henry VIII of England", image: "assets/images/kings/10.png"},
		{name: "King Cobra", image: "assets/images/kings/11.png"},
		{name: "Burger King Guy", image: "assets/images/kings/12.png"},
		{name: "Burger King Guy", image: "assets/images/kings/12.png"},
		{name: "Burger King Guy", image: "assets/images/kings/12.png"},
		{name: "Burger King Guy", image: "assets/images/kings/12.png"},
		{name: "King Harold Bluetooth", image: "assets/images/kings/13.png"},
		{name: "King Kong", image: "assets/images/kings/14.png"}
	],
	
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
      $(".send-twilio").hide();
      $(".section-thinking").show();
    }
    else if (mode == "decision") {
      $(".section-main").hide();
      $(".section-decision").show();
      $(".send-twilio").show();
      $(".section-thinking").hide();
    }
    else if (mode == "start") {
      $(".section-main").show();
      $(".section-decision").hide();
      $(".section-thinking").hide();
      $(".send-twilio").hide();
    }
  },

  init_ui: function() {
    // focus q1
    $("#option_1").focus();

    $(".why-button").click(function(e) {
      $(".why-info").slideToggle();
      e.preventDefault();
    });
    
    $(".btn-ask-again").click(function(e) {
    	document.location = "/";
    });

    // ASK click handler
    $("form#decision-form").submit(function(e) {

      var option_1 = $("#option_1").val();
      var option_2 = $("#option_2").val();
<<<<<<< HEAD
			
			if (!option_1.length || !option_2.length) {
				alert("Make sure you type in two words for the King!");
				return false;
			}
			
			if (option_1 == option_2) {
				alert("Please choose two different words for the King!");
				return false;
			}
			
=======
      
      if (option_1 == option_2) {
        alert("Please choose different words!");
        return false;
      }
      
>>>>>>> b1fdb1e6e5b81d24410ea1dc1c7a75c5640df825
      var url = $(this).attr("action");

      var postdata = {
        method: "",
        option_1: option_1,
        option_2: option_2
      };

      KS.ui_changemode("thinking");

      var answer = $(".answer");

      KS.api_ask(url, postdata, function(response) {
        
        // render "decision" page
        KS.ui_changemode("decision");
        
        // choose a king
        var num_kings = KS.king_pics.length;
        var king_i = Math.floor(Math.random()*num_kings);
        var king = KS.king_pics[king_i];
        
        // king name & picture
        $(".section-decision .king-name").text(king.name);
        $(".section-decision .the-king img").attr("src",king.image);
        
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
        if (choices.length) {
  	      $(".why-info .choice1 .choice-text").text(choices[0].name);
	        $(".why-info .choice2 .choice-text").text(choices[1].name);
        }
        var percent_better = 0;
        var people_like_text = "";
        
        $(".why-info .kings-choice").addClass("unselected").removeClass("selected");
        if (choices.length && answer == choices[0].name) {
          $(".why-info .choice1 span.kings-choice").addClass("selected")
            .removeClass("unselected");
          percent_better = (((5+choices[0].value) - (5+choices[1].value)) / ((5+choices[0].value) + (5+choices[1].value))) * 100;
          percent_better = Math.round(percent_better*1000)/1000;
          if (response['klouts'])
<<<<<<< HEAD
	          people_like_text = choices[0].name + " is " + percent_better + "% more influential.";
	        else if (response['sentiments'])
	        	people_like_text = "People like " + choices[0].name + " " + percent_better + "% better.";
=======
            people_like_text = choices[0].name + " is " + percent_better + "% more influential.";
          else
            people_like_text = "People like " + choices[0].name + " " + percent_better + "% better.";
>>>>>>> b1fdb1e6e5b81d24410ea1dc1c7a75c5640df825
        }
        else if (choices.length && answer == choices[1].name){
          $(".why-info .choice2 span.kings-choice").addClass("selected")
            .removeClass("unselected");
          percent_better = (((5+choices[1].value) - (5+choices[0].value)) / ((5+choices[0].value) + (5+choices[1].value))) * 100;
          percent_better = Math.round(percent_better*1000)/1000;
          if (response['klouts'])
<<<<<<< HEAD
          	people_like_text = choices[1].name + " is " + percent_better + "% more influential."
          else if (response['sentiments'])
          	people_like_text = "People like " + choices[1].name + " " + percent_better + "% better."
=======
            people_like_text = choices[1].name + " is " + percent_better + "% more influential."
          else
            people_like_text = "People like " + choices[1].name + " " + percent_better + "% better."
>>>>>>> b1fdb1e6e5b81d24410ea1dc1c7a75c5640df825
        }
        else {
        	people_like_text = "Because I'm the King.";
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
        else {
        	$(".sentiment-choice").css("visibility","hidden");
        	$(".text-vs").css("visibility","hidden");
        }
      });

      e.preventDefault();
      return false;
    });
    
    $("#twitter-share").click(function(e) {

    	var our_url = encodeURIComponent("http://www.askin.gs");
    	var share_text = encodeURIComponent("I asked the King: heads or tails, and he answered tails. Ask the King a question of your own!");
    	var tw_url = "https://twitter.com/share?url=" + our_url + "&text=" + share_text + "&hashtags=GoAskTheKing";
    	KS.popupWindow(tw_url, "Twitter Share");
    	
    	
    });
    
    $("#facebook-share").click(function(e) {
    	var our_url = encodeURIComponent("http://www.askin.gs");
    	var share_text = encodeURIComponent("I asked the King: heads or tails, and he answered tails. Ask the King a question of your own at http://askin.gs");
    	var fb_url = "https://www.facebook.com/sharer.php?u=" + our_url + "&t=testing";
    	KS.popupWindow(fb_url, "Facebook Share");
    	e.preventDefault();
    	
    });
    
    $("#gplus-share").click(function(e) {
    	var our_url = encodeURIComponent("http://www.askin.gs");
    	var gplus_url = "https://plus.google.com/share?url=" + our_url;
    	KS.popupWindow(gplus_url, "Google+ Share");
    	e.preventDefault();
    });
  },
  
  popupWindow: function(url,title) {
  	window.open(url, title, "menubar=1,resizable=1,width=450,height=250");
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
