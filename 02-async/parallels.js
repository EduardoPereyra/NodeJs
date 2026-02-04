function privateMessage() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is a private message.");
    }, 1500);
  });
}

function photoGallery() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is the photo gallery.");
    }, 1500);
  });
}

function lastTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is the last transactions.");
    }, 1500);
  });
}

Promise.all([privateMessage(), photoGallery(), lastTransactions()]).then(
  (results) => {
    console.log(results);
  }
);
