const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";
const LOCAL_URL = "http://localhost:3000/api";
// USERS

const allUsersRequest = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/all-users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const deactivateUserRequest = async (token, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/deactivate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

const promoteUserRequest = async(token, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/users/promote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();
    return data; 
  }
  catch(err){console.error('An error occurred:',(err))};
}

// ORDERS

const allUsersOrdersRequest = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/all-orders`, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (err) {
    console.error("An error occurred:", err);
  }
};

export { allUsersRequest, allUsersOrdersRequest, deactivateUserRequest, promoteUserRequest, };
