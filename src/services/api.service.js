export const apiService = {
  Login
};

async function Login(username, password) {
    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  
  const response = await fetch('https://wssia.translamex.com/cxpservice/api/Login', requestOptions);
  const user     = await handleResponse(response);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
  
}

function handleResponse(response) {

  let error ='';

    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {

            if (response.status === 401) {
               // auto logout if 401 response returned from api
               // logout();
               //location.reload(true);
               console.log(response.status);
               error = "Usuario no autorizado";
            }

            // error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });

}