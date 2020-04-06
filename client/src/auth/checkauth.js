import decode from 'jwt-decode';

export const storeToken = (token) => localStorage.setItem("auth_token", token);
export const removeToken = () => localStorage.removeItem("auth_token");
export const getToken = () => localStorage.getItem("auth_token");
export const getDecodedToken = () => {
  const token = getToken();
  if (token)
    return decode(token);
  
  return { };
}

export const isAutenticated = () => {
  const token = getToken();
  if (!!token) {
    if (!isExpired(token))
      return true; //if token is not expired
    else {
      removeToken();
      return false; //if token is expired
    }

  } else {
    return false; //if token does not exist
  }
}

export const isExpired = token => {
  const decoded = decode(token);
  if (decoded.exp < Date.now() / 1000)
    return true;// if token is expired
  else
    return false;
}