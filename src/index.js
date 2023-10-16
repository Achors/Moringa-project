const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetSectionId = this.getAttribute("href").substring(1);

        // Hide all sections
        sections.forEach(section => {
            section.style.display = "none";
        });


        document.getElementById(targetSectionId).style.display = "block";
    });
});


function addTaskToDb (task) {
  db.tasks.push(task);
}



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


// const main = document.getElementById("main");
const landPage = document.getElementById("landing-page");
const logpage = document.getElementById("login")
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
    // console.log("hello")
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
            // window.location = "./create-task.html";
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
        // window.location = "/crt-tasks/crt-tasks.html";
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
            // window.location = "";
                }
        }

    loginForm.addEventListener("submit", handleSubmitBtn);


// Creating and Deleting tasks


// const task = {
//   title: "",
//   description: "",
//   date: "",
// };
const addTaskBtn = document.getElementById('task-btn');
addTaskBtn.addEventListener('click', () => {
  const tasks = document.getElementById('tasks').value;
  const description = document.getElementById('tsk-des').value;
  const date = document.getElementById('dates').value;
  // task.title = tasks;
  // task.description = description;
  // task.date = date;
  addTask();
})


async function addTask(newTask) {
  const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: document.getElementById('tasks').value, 
        description: document.getElementById('tsk-des').value, 
        date: document.getElementById('dates').value,
      }),
  });
}

async function fetchTasks() {
  const response = await fetch('http://localhost:3000/tasks');
  const tasks = await response.json();
 

  tasks.forEach(item => {
    const tasksTable = document.createElement("tr");
    tasksTable.innerHTML = `
 <td>${item.title}</td>
 <td>${item.description}</td>
 <td>${item.date}</td>
  `;
   document.querySelector("#tsk-view form").append(tasksTable)

  })

  // console.log(tasks);
  
}


// async function editTask(updatedTask) {
//   const response = await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
//       method: 'PUT',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedTask),
//   });
//   const editedTask = await response.json();
//   const tsk = document.getElementById("tsk-view");
//   editedTask.textContent = tsk.task;
// }


// async function deleteTask(taskId) {
//   const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
//       method: 'DELETE',
//   });
//   // Handle the deletion (e.g., remove the task from the page).
// };



document.addEventListener("DOMContentLoaded", function() {
  fetchTasks();
})



  
 

  // fetch('http://localhost:3000/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ task, description, date }),
  // })
  //   .then((response) => response.text())
  //   .then((message) => {
  //     console.log(message);
  //       // window.location.href = "#tsk-view";
//   //   });
// })
function updateTasksList() {
  const taskList = document.getElementById('task-view');
  taskList.innerHTML = ''; 
  db.tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
      `;
      taskList.appendChild(taskItem);
  });
}

const { json } = require('body-parser');
const fs = require('fs');
const app = json();
const port = 3000;

app.use(db.json());

app.post('#tsk', (req, res) => {
  const taskData = req.body;

  fs.readFile('db.json', (err, data) => {
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

// function toggleVisibility (){
//     let div = document.getElementById("log-page");
//     div.style.display = (div.style.display === "none") ? "block" : "none";
// }

const getStartedButton = document.getElementById("tsk-btn");
getStartedButton.addEventListener("click", function (){
    logpage.style.display = "none";
    landPage.style.display = "block";
})