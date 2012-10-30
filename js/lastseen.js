var g = {};

// Additional JS functions here
window.fbAsyncInit = function() {

    console.log('doing some initialisation...');

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
    });
};

function testAPI() {
    FB.api('/me/friends?fields=picture.type(square),name', function(resp) {
        var f = document.getElementById('friends');
        
        for (var i = 0; i < resp.data.length; i++ ) {
	    var fDiv = document.createElement('div');
            fDiv.className = 'friend';
	    markup  = "<img src='" + resp.data[i].picture.data.url + "'/>";
            markup += '<p>' + resp.data[i].name + '</p>';
            fDiv.innerHTML = markup;
            f.appendChild(fDiv);
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

