var KS = {
	
	api_url: "/api",
	
	init: function() {
		log("ready");
		
		KS.init_ui();
	},
	
	init_ui: function() {
		// focus q1
		$("#q1 textarea").focus();
		
		// ASK click handler
		$("#btn-ask").click(function(e) {

			var q1 = $("#q1 textarea").text();
			var q2 = $("#q2 textarea").text();
			
			var postdata = {
				method: "",
				q1: q1,
				q2: q2
			};
			
			KS.api_ask(postdata, function(response) {
				log("got response");
				log(response);
			});
			
			e.preventDefault();
		});
	},
	
	api_ask: function(postdata, callback) {

		$.ajax({
			type: "POST",
			dataType: "json",
			url: KS.api_url,
			data: postdata,
			success: function(response) {
				if (callback)
					callback(response);
			}
		});
		
	}
	

};