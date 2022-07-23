const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";


  
  

export const fetchRegister = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogin = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: username,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserAccount = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const requestCuratedRanking = async () => {
  const response = await fetch(`${BASE_URL}/books/lists/curated-rankings`,{
    headers: {
      "Content-Type": "application/json"
    }
  }); 
  const data = await response.json();
  // console.log(data);
  return data;
}

export const requestTopRated = async () => {
  const response = await fetch(`${BASE_URL}/books/lists/curated-ratings`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const dataTopRated = await response.json();
  console.log(dataTopRated);
  return dataTopRated;
}

export const requestFeatured = async () => {
  const response = await fetch(`${BASE_URL}/books/lists/featured`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const dataFeatured = await response.json();
  console.log(dataFeatured);
  return dataFeatured;
}