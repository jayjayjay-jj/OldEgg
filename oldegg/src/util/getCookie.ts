const getCookie = (cookieName: string) => {
    let name = cookieName + "=";

    let decodingCookie = decodeURIComponent(document.cookie);
    let decodedCookie = decodingCookie.split(';');

    for(let i = 0; i < decodedCookie.length; i++) {
        let cookie = decodedCookie[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

export default getCookie