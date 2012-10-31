$(document).ready(init);

function init() {
    $('#selected-friends').sortable({
	receive: function(e, ui) {
	    $(ui.item).css({opacity: "1"}).fadeOut(function() {$(this).remove();});
	    $(this).children().css({opacity: ""});
	},
    });
}

var g = {};

// Additional JS functions here
window.fbAsyncInit = function() {

    FB.init({
        appId: '405101322876456',
        channelUrl: '//fb.mindcontrolray.com/channel.html',
        status: true,
        cookie: true,
        xfbml:  true
    });

    checkLogin();
};

function checkLogin() {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
	    doWelcome();
            // connected
        } else if (response.status === 'not_authorized') {
            // not_authorized
	    askLogin();
        } else {
            // not logged in
	    askLogin();
        }
    });

}

function doWelcome() {
    FB.api('/me', function(r){ 
	g.name = r.name; 
	$('#fb-status').text("You are logged into Facebook, " + g.name);
    });

    $('#fb-status').text("You are logged into Facebook...");

    $('#access-button').val('Logout')
        .one('click', logout);

    testAPI();
};

function logout() {
    FB.logout(askLogin);
}

function askLogin() {
    $('#fb-status').text("You are not currently logged into Facebook.");

    $('#access-button').val('Login')
        .one('click', login);
}

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
	    doWelcome();
        } else {
            // cancelled
	    askLogin();
        }
    });};

function testAPI() {
    FB.api('/me/friends?fields=picture.type(square),name', function(resp) {
        var f = document.getElementById('friends');
        
        for (var i = 0; i < resp.data.length; i++ ) {
	    var friend = $('<div/>')
	                     .addClass('friend')
	                     .append($('<img/>').prop('src', resp.data[i].picture.data.url))
	                     .append($('<p/>').text( resp.data[i].name))
	                     .data("fb", resp.data[i]);

	    if (i < 7) { friend.clone(true).prependTo($('#selected-friends')); }

	    friend.draggable({
	        revert: "invalid",
		connectToSortable: '#selected-friends',
		helper: 'clone',
		start: function(e, ui) {
		    $(this).css({opacity: "0.3"});
		},
		stop: function(e, ui) {
		    $(this).css({opacity: ""});
		},

	    });
	    friend.prependTo($('#friends'));
	    
        };
    });
};

(function(d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

