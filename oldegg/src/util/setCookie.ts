const setCookie = (cookieName: string, cookieValue: string, cookieExpire: any) => {
    let date = new Date();
    date.setTime(date.getTime() + (cookieExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/";
    
}

export default setCookie