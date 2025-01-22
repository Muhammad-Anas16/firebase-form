import {
    auth,
    onAuthStateChanged,
    signOut,
} from "./firebase.js";

// Functions

const checkUser = () => { // check if user sign In

    onAuthStateChanged(auth, (user) => {
        if (user) {

            console.log(user);
            const user_login = user?.displayName;

            document.getElementById("UserName").innerText = user_login;
            document.getElementById("userName_In_Menu").innerText = user_login;

            logOutBtn.style.display = "block";
            loginBtn.style.display = "none";

        } else {
            console.log("User Not Found");

            document.getElementById("UserName").innerText = "Navigation";
            document.getElementById("userName_In_Menu").innerText = "User";

            loginBtn.style.display = "block";
            logOutBtn.style.display = "none";
        }
    });
}

const logOutAccount = () => { // Log_Out Account 

    signOut(auth).then(() => {

        window.location.assign("form/login/login.html");

    }).catch((error) => {

        alert(error.message);

    });

}

// Call Functions

checkUser();

// Add Event 

let loginBtn = document.getElementById("sign_In"); // go to Login Page
loginBtn.addEventListener("click", () => {
    window.location.assign("form/login/login.html");
});


let logOutBtn = document.getElementById("sign_Out"); // For Log_Out Account
logOutBtn.addEventListener("click", logOutAccount);

