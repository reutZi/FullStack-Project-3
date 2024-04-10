// -------Function to set a cookie with a specified name, value, and expiration time--------
function setCookie(name, value, hoursToLive){
    const date = new Date();
    date.setTime(date.getTime() +  (hoursToLive * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// ------Function to retrieve user information from cookie------------------------------------
function getUserFromCookie() {
    var name = "user=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) == 0) {
            var userCookie = cookie.substring(name.length, cookie.length);
            return JSON.parse(userCookie);
        }
    }
    return null;
}

// ----Function to delete a cookie by setting its expiration time to a past date---------------
function deleteCookie(name){
    setCookie(name, null, null);
}
