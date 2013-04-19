$(document).ready(function () {
            var x = $(window).height();

            var suffix = "px";
            $("div[data-role='page']").css("height", x + suffix);
            $("div[data-role='header']").css("height",(x * 0.2) + suffix);
            $("div[data-role='content']").css("height", (x * 0.6) + suffix);
            $("div[data-role='footer']").css("height", (x * 0.16) + suffix);
        });
