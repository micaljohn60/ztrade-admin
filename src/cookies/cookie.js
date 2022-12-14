export const setCookie = (name,value,days) =>{   
    var date = new Date();
    var now = new Date(); // 1 hour cookie
    var time = now.getTime(); // 1 hour cookie
    time += 3600 * 1000; // 1 hour cookie
    now.setTime(time);
   
    date.setTime(date.getTime() + (days*30*60*60*1000)) // 1 day cookie
    // const expires = "; expires=" + now.toUTCString();   
    const expires = " expires=" + new Date(2147483610 * 1000).toUTCString();
    
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export const getCookie =(name) =>{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

export const deleteCookie = (name) => {
  document.cookie =  name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}
