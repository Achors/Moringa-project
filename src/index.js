document.addEventListener("DOMContentLoaded", function() {
    let newId = document.getElementById("text");

})

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");

const firstnameInput = document.getElementById("firstName");
const lastnameInput = document.getElementById("lastname");
const createEmailInput = document.getElementById("email-signup");
const ConfirmEmailInput = document.getElementById("email-confirm");
const signUpPasswordInput = document.getElementById("passwordt");
const confirmSignUpPasswordInput = document.getElementById("cfm-passwordt");
const createAcctButton = document.getElementById("crt-acc");


const main = document.getElementById("main");
const signup = document.getElementById("signup");

const signupButton = document.getElementById("create-acct-btn");
const returnButton = document.getElementById("rtn-acc");


var email,
password,
firstname,
lastname,
signupEmail,
signupPassword,
confirmSignupEmail,
confirmSignupPassword;

createAcctButton.addEventListener("click", function () {
    console.log("hello")
    var isVerified = true;

    firstname = firstnameInput.value;
    lastname = lastnameInput.value;
    signupEmail = createEmailInput.value;
    confirmSignupEmail = ConfirmEmailInput.value;
    if (signupEmail != confirmSignupEmail) {
        window.alert("Email does not match");
        isVerified = false;
    }

    signupPassword = signUpPasswordInput.value;
    confirmSignupPassword = confirmSignUpPasswordInput.value;
    if (signupPassword != confirmSignupPassword) {
        window.alert("Password does not match");
        isVerified = false;
    }

    if (
    signupEmail == null ||
    confirmSignupEmail == null ||
    signupPassword== null ||
    confirmSignupPassword == null
    ) {
        window.alert("Please fill out all required fields");
    }

    if (isVerified) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
        .then((userCredential) => {
            const user = userCredential.user;


            window.alert("Success! Account Created");
            window.location = "./create-task.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            window.alert("Error occured. Try again");
            window.alert(errorMessage);
        });
    }
});

submitButton.addEventListener("click", function(){
    email = emailInput.value;
    password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
        const user = userCredentials.user;

        window.alert("Success!, welcome Back");
        window.location = "./create-task.html";
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("Error occured. Try again");
        window.alert(errorMessage);
    });
});



signupButton.addEventListener("click", function (){
    main.style.display = "none";
    signup.style.display = "block";
})
returnButton.addEventListener("click", function (){
    signup.style.display = "none";
    main.style.display = "block";
    
});

const signInBtn = document.getElementById("crt-acc" );
        function handleLoginClick() {
            window.location.href = "/crt-tasks/crt-tasks.html"; 
        }

    loginButton.addEventListener("click", handleLoginClick);

// const signupButton = document.getElementById('signup-button');
// signupButton.addEventListener('click', () => {
//   const username = document.getElementById('username').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;

//   fetch('http://localhost:3000/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, email, password }),
//   })
//     .then((response) => response.text())
//     .then((message) => {
//       console.log(message);
//     });
// })

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(db.json());

app.post('#signup', (req, res) => {
  const signupData = req.body;

  // Read existing data from the JSON file
  fs.readFile('signupData.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read data.' });
    }

    const existingData = JSON.parse(data);

    // Add new signup data to the existing array
    existingData.push(signupData);

    // Write the updated data back to the JSON file
    fs.writeFile('signupData.json', JSON.stringify(existingData), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not write data.' });
      }
      res.json({ message: 'Account created!' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});