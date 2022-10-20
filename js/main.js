// USER LOGIN / SIGNUP

// HTML VARIABLES
let signInBtn = document.getElementById('sign-in-btn');
let signUpBtn = document.getElementById('sign-up-btn');
let userInpSign = document.getElementById("username-inp-signup");
let passInpSign = document.getElementById("password-inp-signup");
let passInpSign2 = document.getElementById("password-inp-signup2");
let userInpLog = document.getElementById("username-inp-login");
let passInpLog = document.getElementById("password-inp-login");

// Global variables
let users = loadUsers();

// SIGN UP BTN CLICKED
signUpBtn.addEventListener('click', signUpHandler);

function signUpHandler() {
  let username = {username: userInpSign.value};
  let password = {password: passInpSign.value};

  // check password and confirm password values
  if (passInpSign.value === passInpSign2.value) {
    // check to see if username is in use
    let newUser = Object.values(username).toString();
    let testUser = searchUser(newUser);
    if (testUser === -1) {
      let newUser = Object.assign(username, password);
      JSON.stringify(newUser);
      users.push(newUser);
      alert("Sign up complete");
      saveUsers(); 
    } else {
      alert("Username is already in use");
    }
  } else if (passInpSign.value === "" || passInpSign2.value === ""){
    alert("One or more input fields are empty");
  } else {
    alert("Passwords do not match");
  }

  // clear input elements
  userInpSign.value = "";
  passInpSign.value = "";
  passInpSign2.value = "";
}

// SIGN IN BTN CLICKED
signInBtn.addEventListener('click', signInHandler);

function signInHandler() {
  for (let i = 0; i < users.length; i++) {
    if (userInpLog.value === users[i].username && passInpLog.value === users[i].password) {
      return alert("Login Successful!");
    }
  }
  alert("Invalid Login");

  // clear input elements
  userInpLog.value = "";
  passInpLog.value = "";
}

// HELPER FUNCTIONS
// Save user login array to local storage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// load user login array
function loadUsers() {
  let userStr = localStorage.getItem("users");
  return JSON.parse(userStr) ?? [];
}


// Search global users array for a username that matches provided username
function searchUser(username) {
  for (let i = 0; i < users.length; i++) {
    let userSearch = users[i].username;
    if (username === userSearch) {
      return i;
    }
  }
  return -1;
}