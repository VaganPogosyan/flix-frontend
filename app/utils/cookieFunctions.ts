export function setCookie(
  cookie_name: string,
  cookie_value: string,
  expire_in_Days = 0
) {
  if (expire_in_Days !== 0) {
    const d = new Date();
    d.setTime(d.getTime() + expire_in_Days * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie =
      cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
  } else {
    document.cookie = cookie_name + "=" + cookie_value + ";path=/";
  }
}

export function getCookie(cookie_name: string) {
  let name = cookie_name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookiesArray = decodedCookie.split(";");
  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i];

    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

export function removeCookie(cookie_name: string) {
  // let name = cookie_name + "=";
  // let decodedCookie = decodeURIComponent(document.cookie);
  // let cookiesArray = decodedCookie.split(";");
  // for (let i = 0; i < cookiesArray.length; i++) {
  //   let cookie = cookiesArray[i];
  //   while (cookie.charAt(0) == " ") {
  //     cookie = cookie.substring(1);
  //   }
  //   if (cookie.indexOf(name) == 0) {
  //     return cookie.substring(name.length, cookie.length);
  //   }
  // }
  // return "mami";
}

export function checkCookie() {
  let username;
  username = getCookie("username");
  if (username != "") {
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}
