let url = process.env.REACT_APP_BASE_URL_DEV;

//FETCH POST USER
export const fetchPostUser = async (user) => {
  const response = await fetch(`${url}/users`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  const results = await response.json();
  console.log(results);
  return results;
};

//FETCH GET TOKENS
export const fetchGetTokens = async (username, password) => {
  const response = await fetch(`${url}/users/authorize`, {
    method: "POST",
    body: JSON.stringify({ username: username, password: password }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  const results = await response.json();
  console.log(results);
  localStorage.setItem("access_token", results.access_token);
  localStorage.setItem("refresh_token", results.refresh_token);
  return results;
};

//FETCH GET USER
export const fetchGetUser = async (token) => {
  const response = await fetch(`${url}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = response.json();
  console.log(result);
  return result;
};
