const showHiddenPass1 = (loginPass, loginEye) =>{
    const input1 = document.getElementById(loginPass),
        iconEye1 = document.getElementById(loginEye)

    iconEye1.addEventListener('click', () =>{
        if(input1.type === 'password'){
            input1.type = 'text'

            iconEye1.classList.add('ri-eye-line')
            iconEye1.classList.remove('ri-eye-off-line')
        } else{

            input1.type = 'password'

            iconEye1.classList.remove('ri-eye-line')
            iconEye1.classList.add('ri-eye-off-line')
        }
    })
}

showHiddenPass1('login-pass','login-eye')


const showHiddenPass2 = (signupPass, signupEye) =>{
    const input2 = document.getElementById(signupPass),
        iconEye2 = document.getElementById(signupEye)

    iconEye2.addEventListener('click', () =>{
        if(input2.type === 'password'){
            input2.type = 'text'

            iconEye2.classList.add('ri-eye-line')
            iconEye2.classList.remove('ri-eye-off-line')
            console.log("pass")
        } else{

            input2.type = 'password'

            iconEye2.classList.remove('ri-eye-line')
            iconEye2.classList.add('ri-eye-off-line')

            console.log("fail")
        }
    })
}

showHiddenPass2('signup-pass1','signup-eye1')
const showHiddenPass3 = (signupPass, signupEye) =>{
    const input2 = document.getElementById(signupPass),
        iconEye2 = document.getElementById(signupEye)

    iconEye2.addEventListener('click', () =>{
        if(input2.type === 'password'){
            input2.type = 'text'

            iconEye2.classList.add('ri-eye-line')
            iconEye2.classList.remove('ri-eye-off-line')
            console.log("pass")
        } else{

            input2.type = 'password'

            iconEye2.classList.remove('ri-eye-line')
            iconEye2.classList.add('ri-eye-off-line')

            console.log("fail")
        }
    })
}

showHiddenPass3('signup-pass2','signup-eye2')

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const correctUsername = "Tutu";
    const correctPassword = "1234";

    const enteredUsername = document.getElementById("login-userName").value;
    const enteredPassword = document.getElementById("login-pass").value;

    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        localStorage.setItem("isLoggedIn", "true");
        // Redirect to index.html
        window.location.assign('../index.html');
    } else {
        alert("Incorrect username or password!");
    }
});

window.onpopstate = function(event) {
    if (localStorage.getItem("isLoggedIn") === "true") {
        history.go(0);
    }
};





document.addEventListener("DOMContentLoaded", function () {
    const loginAccessRegister = document.getElementById('LoginSingUpRegister'),
        buttonRegister = document.querySelector('.login__register a'),
        buttonAccess = document.querySelector('.signup__register a'),
        loginForm = document.getElementById('loginForm'),
        signupForm = document.getElementById('signupForm');

    buttonRegister.addEventListener('click', (event) => {
        event.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    buttonAccess.addEventListener('click', (event) => {
        event.preventDefault();  // Prevents page reload
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    });
});



