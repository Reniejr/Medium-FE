let url = process.env.REACT_APP_BASE_URL_DEV;

//FETCH GET USER
export const fetchGetUser = async (token) => {
  const response = await fetch(`${url}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  console.log(result);
  return result;
};
