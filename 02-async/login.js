function login() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Login Successful");
    }, 1500);
  });
}

function userData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "John Doe", age: 30 });
    }, 1500);
  });
}

login()
  .then(() => {
    console.log("User logged in");
    return userData();
  })
  .then(() => {
    console.log("User Data OK");
  })
  .catch((error) => {
    console.error("Error during login:", error);
  });
