let url = process.env.REACT_APP_BASE_URL_DEV;

//FETCH LOGOUT
export const fetchLogout = async (token, username, password) => {
  const response = await fetch(`${url}/users/logoutAll`, {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  });
  const result = await response.json();
  console.log(result);
  return result;
};
