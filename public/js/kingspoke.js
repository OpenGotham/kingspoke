var KS = {
	
	api_url: "",
	
	init: function() {
		log("initialized!");
		
		KS.init_ui();
	},
	
	init_ui: function() {
		$("#q1 textarea").focus();
		
		$("#btn-ask").click(function(e) {
			
			e.preventDefault();
		});
	}
	

};