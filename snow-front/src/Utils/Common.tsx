// return the user data from the session storage
export const getUserId = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }

  export const getUserRole = () => {
    const roleStr = sessionStorage.getItem('role');
    if (roleStr) return roleStr.toString();
    else return null;
  }
     
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
     
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
  }
     
  // set the token and user from the session storage
  export const setUserSession = (token: string, user: JSON, role: string) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('role', role);
  }
  
  export const isAuthorized = () => {
    const token = getToken()
    return token != null;
  }

  export const isAdmin = () => {
    const role = getUserRole()
    return (role == "admin");
  }

  export const isInstructor = () => {
    const role = getUserRole()
    console.log(role);
    return (role == "instructor");
  }


