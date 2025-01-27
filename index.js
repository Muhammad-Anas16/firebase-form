import {
    auth,
    onAuthStateChanged,
    signOut,
} from "./firebase.js";

// Functions

const logOutAccount = () => { // Log_Out Account 

    signOut(auth).then(() => {

        window.location.assign("form/login/login.html");

    }).catch((error) => {

        alert(error.message);

    });

}

const checkUser = () => { // check if user sign In

    onAuthStateChanged(auth, (user) => {
        if (user) {

            // const user_login = user?.displayName;
            loginBtn.addEventListener("click", logOutAccount);
            loginBtn.innerText = `Sign Out`;
            console.log(user);

        } else {
            console.log("User Not Found");
            loginBtn.addEventListener("click", () => {
                window.location.assign("form/login/login.html");
            });
            loginBtn.innerText = `Sign In`;
        }
    });
}


// Call Functions

checkUser();

// Add Event 

let loginBtn = document.getElementById("sign_In"); // go to Login Page