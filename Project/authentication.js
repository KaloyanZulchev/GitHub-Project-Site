// import {elements} from "./elements.js"
// elements.registrationButton().addEventListener('click', register);
// elements.logInButton().addEventListener('click', userLogin);
// elements.logOutButton().addEventListener('click', userLogout);
const auth = firebase.auth();

async function register(email, password) {
  let response = await auth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      const uid = response.user.uid;
      const name = email.split('@')[0];

      firebase.database()
        .ref('personalInformation')
        .child(uid)
        .set({ name });
    })
    .catch();

  return response;
}

async function userLogin(email, password) {
  let response = await auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      if (response) {
        return response
      }

      Promise.reject(response);
    })
    .catch();

  return response;
}
async function userLogout() {
  let resoonse = await auth.signOut();

  return resoonse;
}

export const authenticationFunctions = {
  register,
  userLogin,
  userLogout
};

// function displayErrorMessage(message) {
//   elements.errorMessage().style.display = 'block';
//   elements.errorMessage().textContent = message;

//   setTimeout(() => {
//     elements.errorMessage().style.display = 'none';
//     elements.errorMessage().textContent = '';
//   }, 2500);
// }