
import {

    auth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    provider,
    signInWithPopup,

} from "../../firebase.js";


// Function

const checkUser = () => { // check if user sign In

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Check User =>", user)
            window.location.replace("/index.html");

        } else {
            console.log("User Not Found");
        }
    });
}

const signIn_User = async (event) => {

    event.preventDefault();

    let email = event.target[0].value;
    let password = event.target[1].value;
    let btn = event.target[2];

    btn.disabled = true;
    btn.innerText = "Loading..."

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            btn.disabled = false;
            btn.innerText = "Submit"
        })
        .catch((error) => {
            // alert(error.message);
            console.log(error.message);

            btn.disabled = false;
            btn.innerText = "Submit"

        });



}

const logInWithGoogleFunc = () => { // Function To Login with Google
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(credential);
        }).catch((error) => {
            alert(error.message)

            // The email of the user's account used.
            const email = error.customData.email;
            console.log(email);
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential);
        });
}

const forgetPass = () => {
    console.log("forget");
}

// Call Function

checkUser();

// Add Event Listener

const signIn_Btn = document.getElementById("signIn_form");
signIn_Btn.addEventListener("submit", signIn_User);

const google_Btn = document.getElementById("google");
google_Btn.addEventListener("click", logInWithGoogleFunc);

const forget_Pass_Btn = document.getElementById("forgetPassword");
forget_Pass_Btn.addEventListener("click", forgetPass);