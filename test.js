import {elements} from "./elements.js"

const auth = firebase.auth();

elements.registrationButton().addEventListener('click', register);
elements.logInButton().addEventListener('click', userLogin);
elements.logOutButton().addEventListener('click', userLogout);
elements.tasksButton().addEventListener('click', getTasks);

function register(){
    const email = elements.registrationEmail().value;
    const password = elements.registrationPassword().value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        elements.registrationEmail().value = '';
        elements.registrationPassword().value = '';

        const uid = response.user.uid;
        const name = email.split('@')[0];

        firebase.database()
          .ref('personalInformation')
          .child(uid)
          .set({name});
      })
      .catch(error => displayErrorMessage(error.message));
}

function displayErrorMessage(message){
  elements.errorMessage().style.display = 'block';
  elements.errorMessage().textContent = message;

  setTimeout(() => {
    elements.errorMessage().style.display = 'none';
    elements.errorMessage().textContent = '';
  }, 2500);
}

function userLogin(){
  const email = elements.logInEmail().value;
  const password = elements.logInPasswrd().value;

  auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      if (response) {
        return response
      }

      Promise.reject(response);
    })
    .then(res => {
      elements.logInEmail.value = '';
      elements.logInPasswrd.value = '';
    })
    .catch(error => displayErrorMessage(error.message));
}

function userLogout(){
  auth.signOut();
}

function getTasks(){
  console.log(auth.currentUser);
}