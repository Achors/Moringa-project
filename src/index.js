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

 const loginForm = document.getElementById("main");
    const submitBtn = document.getElementById("submit");
        function handleSubmitBtn(event) {
            event.preventDefault(); 
            if (email == null || password == null) {
                    window.alert("Please fill out all required fields");
                } else {
            window.location = "/crt-tasks/crt-tasks.html";
                }
        }

    loginForm.addEventListener("submit", handleSubmitBtn);

const addTaskBtn = document.getElementById('task-btn');
addTaskBtn.addEventListener('click', () => {
  const task = document.getElementById('tasks').value;
  const description = document.getElementById('tsk-des').value;
  const date = document.getElementById('dates').value;

  fetch('http://localhost:3000/AMS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task, description, date }),
  })
    .then((response) => response.text())
    .then((message) => {
      console.log(message);
    });
})

const { json } = require('body-parser');
const fs = require('fs');
const app = json();
const port = 3000;

app.use(db.json());

app.post('#tsk', (req, res) => {
  const taskData = req.body;

  fs.readFile('taskData.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read data.' });
    }

    const existingData = JSON.parse(data);

    // Adding tasks to the existing array
    existingData.push(taskData);

    // Write the updated data back to the JSON file
    fs.writeFile('taskData.json', JSON.stringify(existingData), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not write data.' });
      }
      res.json({ message: 'Task Created!' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});