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
    // console.log("data", data);
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

// console.log(data);
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
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addBookToCart = async (userId, price, bookId, quantity) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        bookPrice: price,
        bookId,
        quantity,
      }),
    });
    const data = await response.json();
    console.log("datafromIndex", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersCart = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me/cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFromCart = async (
  orderId,
  orderPrice,
  bookId,
  bookPrice,
  quantity,
  userCart,
  setUserCart
) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        bookId,
        bookPrice,
        quantity,
      }),

    });
    const data = await response.json();
    console.log("data", data)
    if (data) {
      const newCart = userCart.filter((cart) => cart.id !== bookId);
      setUserCart(newCart);
    }
  } catch (error) {
    console.log(error);
  }
};

export const requestCuratedRanking = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books/lists/curated-rankings`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestTopRated = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books/lists/curated-ratings`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const requestFeatured = async () => {
  try {
    const response = await fetch(`${BASE_URL}/books/lists/featured`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export async function searchRequest (searchstring){
  try{
      const response = await fetch (`${BASE_URL}/search/${searchstring}`,{ //
          headers: {
              "Content-Type": "application/json",
          }
      })
      const data = await response.json();
      return data;
  } catch(error) {
      console.log(error);
  }
};

// export const requestCuratedRanking = async () => {
//   const response = await fetch(`${BASE_URL}/books/lists/curated-rankings`,{
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }); 
//   const data = await response.json();
//   // console.log(data);
//   return data;
// }

// export const requestTopRated = async () => {
//   const response = await fetch(`${BASE_URL}/books/lists/curated-ratings`, {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//   const dataTopRated = await response.json();
//   // console.log(dataTopRated);
//   return dataTopRated;
// }

// export const requestFeatured = async () => {
//   const response = await fetch(`${BASE_URL}/books/lists/featured`, {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   });
//   const dataFeatured = await response.json();
//   // console.log(dataFeatured);
//   return dataFeatured;
// }

export const requestHorror = async () => {
  const response = await fetch(`${BASE_URL}/books/genre/Horror`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const horrorData = await response.json();
  // console.log(horrorData);
  return horrorData;
}

export const requestComedy = async () => {
  const response = await fetch(`${BASE_URL}/books/genre/Comedy`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const comedyData = await response.json();
  // console.log(comedyData);
  return comedyData;
}

export const requestRomance = async () => {
  const response = await fetch(`${BASE_URL}/books/genre/Romance`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const romanceData = await response.json();
  // console.log(romanceData);
  return romanceData;
}

export const requestScienceFiction = async () => {
  const response = await fetch(`${BASE_URL}/books/genre/Science-Fiction`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const scienceFictionData = await response.json();
  // console.log(scienceFictionData);
  return scienceFictionData;
}

export const requestGeneralFiction = async () => {
  const response = await fetch(`${BASE_URL}/books/genre/General Fiction`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const generalFictionData = await response.json();
  console.log(generalFictionData);
  return generalFictionData;
}

export const requestThriller = async () => {
  const response = await fetch(`${BASE_URL}/books/genre/Thriller`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const thrillerData = await response.json();
  // console.log(thrillerData);
  return thrillerData;
}

export const requestMystery = async () => {
  const response = await fetch(`${BASE_URL}/books/genre/Mystery`, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  const mysteryData = await response.json();
  // console.log(mysteryData);
  return mysteryData;
}