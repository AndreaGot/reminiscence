$(document).ready(function(e) {
	/* ------------ questa parte si occupa di posizionare i div in maniera corretta -------------*/
	 var x = $(window).height();

            var suffix = "px";
            $("div[data-role='page']").css("height", x + suffix);
            $("div[data-role='header']").css("height",(x * 0.2) + suffix);
            $("div[data-role='content']").css("height", (x * 0.6) + suffix);
            $("div[data-role='footer']").css("height", (x * 0.16) + suffix);

	/* ------------ questa parte si occupa dell'autocompletamento dei luoghi -------------*/
   	$("#ComList").children().click(function(){
		 $("input[data-type='search']").val(this.innerHTML);
		  $("#ComList").children().addClass("ui-screen-hidden");
		  });
});
