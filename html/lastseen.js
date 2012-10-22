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

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // connected
            console.log('logged in!');
            testAPI();
        } else if (response.status === 'not_authorized') {
            // not_authorized
            login();
        } else {
            // not logged in
            login();
        }
    });

};

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
        } else {
            // cancelled
        }
    });
};

function testAPI() {
    console.log('Welcome! Fetching your information...');
    FB.api('/me', function(resp) {
        console.log('Good to see you, ' + resp.name + '.');
    });
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

