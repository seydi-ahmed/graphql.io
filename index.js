import { buildHTMLElements, student } from "./zone01student.js";

export function userLogin() {
    // buildHTMLElements()
    let userJwt;
    const mainLogin = document.createElement('div');
    mainLogin.classList.add('login-box');
    mainLogin.innerHTML = `
        <h1 class="login-title">Login</h1>
        <form id="credForm">
            <input class="login-input" type="text" placeholder="Username or E-mail" required><br>
            <input class="login-input" type="password" placeholder="Password" required><br>
            <button class="login-button" type="submit">Log In</button>
        </form>
    `
    const badCred = document.createElement('div');
    badCred.innerHTML = `Bad user login or/and password try once again!`;
    badCred.style.display = "none";
    badCred.style.color = "red";
    mainLogin.appendChild(badCred)
    document.body.appendChild(mainLogin);

    // Retrieve userJwt from localStorage if available
    const storedUserJwt = localStorage.getItem('userJwt');
    if (storedUserJwt) {
        // document.body.removeChild(mainLogin)
        userJwt = JSON.parse(storedUserJwt);
        // student(userJwt);
        validateUserJwt(userJwt)
    }

    document.getElementById('credForm').addEventListener('submit', function(event) {
        event.preventDefault();
      
        const username = document.querySelector('.login-input[placeholder="Username"]').value;
        const password = document.querySelector('.login-input[placeholder="Password"]').value;
    
        const authString = 'Basic ' + btoa(`${username}:${password}`);
      
        fetch('https://learn.zone01dakar.sn/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : authString
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            badCred.style.display = "block";

            
          }
          else {
            userJwt = data;
            localStorage.setItem('userJwt', JSON.stringify(userJwt)); // Store userJwt in localStorage
            student(userJwt);
          }
          // do something with the response data
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
    
    function validateUserJwt(newUserJwt) {
        if (!userJwt || JSON.stringify(newUserJwt) !== JSON.stringify(userJwt)) {
            localStorage.removeItem('userJwt');
            document.body.appendChild(mainLogin);
        } else {
            student(userJwt);
        }
    }
    
}

userLogin();
