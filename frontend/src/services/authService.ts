// export const login = (
//   email: string,
//   password: string
// ) => {
//   if (
//     email === "admin@scms.com" &&
//     password === "admin123"
//   ) {
//     localStorage.setItem(
//       "isAuthenticated",
//       "true"
//     );

//     return true;
//   }

//   return false;
// };

// export const logout = () => {
//   localStorage.removeItem(
//     "isAuthenticated"
//   );
// };

// export const isAuthenticated = () => {
//   return (
//     localStorage.getItem(
//       "isAuthenticated"
//     ) === "true"
//   );
// };
export const login = (
  email: string,
  password: string
) => {

  if (
    email === "admin@scms.com" &&
    password === "admin123"
  ) {

    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    localStorage.setItem(
      "userId",
      "1"
    );

    localStorage.setItem(
      "userName",
      "Admin"
    );

    localStorage.setItem(
      "userRole",
      "System Administrator"
    );

    return true;

  }

  if (
    email === "manager@scms.com" &&
    password === "manager123"
  ) {

    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    localStorage.setItem(
      "userId",
      "2"
    );

    localStorage.setItem(
      "userName",
      "Manager"
    );

    localStorage.setItem(
      "userRole",
      "Store Manager"
    );

    return true;

  }

  if (
    email === "employee@scms.com" &&
    password === "employee123"
  ) {

    localStorage.setItem(
      "isAuthenticated",
      "true"
    );

    localStorage.setItem(
      "userId",
      "3"
    );

    localStorage.setItem(
      "userName",
      "Employee"
    );

    localStorage.setItem(
      "userRole",
      "Store Employee"
    );

    return true;

  }

  return false;

};

export const logout = () => {

  localStorage.removeItem(
    "isAuthenticated"
  );

  localStorage.removeItem(
    "userId"
  );

  localStorage.removeItem(
    "userName"
  );

  localStorage.removeItem(
    "userRole"
  );

};

export const isAuthenticated = () => {

  return (
    localStorage.getItem(
      "isAuthenticated"
    ) === "true"
  );

};

export const getCurrentUser = () => {

  return {

    id: localStorage.getItem(
      "userId"
    ),

    name: localStorage.getItem(
      "userName"
    ),

    role: localStorage.getItem(
      "userRole"
    ),

  };

};