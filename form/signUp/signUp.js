
import {

    auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    db,
    collection,
    doc,
    addDoc,
    setDoc,
    updateProfile,

} from "../../firebase.js";


// Function

let checkUser = () => { // check if user sign In

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("Check User =>", user);
            
            window.location.replace("/index.html");

        } else {
            console.log("User Not Found");
        }
    });
}

checkUser();

let signUp_User = async (event) => {

    event.preventDefault();

    let btn = (event.target[5]);
    btn.disabled = true;
    btn.innerText = "Loading..."

    let firstName = (event.target[0].value);
    let lastName = (event.target[1].value);
    let email = (event.target[2].value);
    let phone = (event.target[3].value);
    let password = (event.target[4].value);


    try {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const { uid } = userCredential?.user

        await setDoc(doc(db, `users`, uid), {
            displayName: `${firstName} ${lastName}`,
            email: email,
            phoneNumber: phone,
        });

        await updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            photoURL: "https://www.stickpng.com/img/icons-logos-emojis/users/circled-user-icon"
        });
        console.log("Profile updated successfully!");

        btn.disabled = false;
        btn.innerText = "Submit"

        window.location.replace("/index.html");

    } catch (err) {
        alert(err.message);
        // console.log(err.message);
        btn.disabled = false;
        btn.innerText = "Submit"
    }

    firstName = "";
    lastName = "";
    email = "";
    phone = "";
    password = "";

}

const signUp = document.getElementById("signUp_form");
signUp.addEventListener("submit", signUp_User);