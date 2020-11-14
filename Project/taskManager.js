import {elements} from "./elements.js"

const baseUrl = 'https://github---site.firebaseio.com/';

elements.tasksButton().addEventListener('click', getTasks)
elements.addTaskButton().addEventListener('click', addTask)

function getTasks(){
    const uid = checkForUser();

    if (uid == undefined) {
        // To do send error message
        return;
    }

    fetch(baseUrl + `personalInformation/${uid}/tasks.json`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            Promise.reject(response);
        })
        .then(tasks => {
            console.log(tasks);
        })
        .catch(error => console.log(error)); // to do send error message
}

function addTask(){
    const uid = checkForUser();
    const taskHeader = elements.taskHeader().value;
    const taskDescription = elements.taskDescription().value;

    if (uid == undefined || taskHeader == '' || taskDescription == '') {
        // To do send error message
        return;
    }
    
    const taskObj = {
        description: taskDescription,
        state: 'To Do'
    }

    firebase.database()
        .ref(`personalInformation/${uid}/tasks`)
        .child(taskHeader)
        .set(taskObj)
        .then(response => {
            elements.taskHeader().value = '';
            elements.taskDescription().value = '';
        })
        .catch(error => {
            console.log(error);// To do send error message
        })
}

function checkForUser(){
    const user = firebase.auth().currentUser;

    if (user == null) {
        return undefined;
    }

    return user.uid;
}