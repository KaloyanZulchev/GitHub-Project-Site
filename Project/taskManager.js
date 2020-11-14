import {elements} from "./elements.js"

const baseUrl = 'https://github---site.firebaseio.com/';

elements.loadTasksButton().addEventListener('click', getTasks)
elements.addTaskButton().addEventListener('click', addTask)
//elements.updateTaskButton().addEventListener('click', updateTask)
elements.finishTaskButton().addEventListener('click', () => {
    

    //to do
})

elements.deleteTaskButton().addEventListener('click', () => {
   

    //to do
})

function deleteTask(key){
    const uid = firebase.auth().currentUser.uid;

    fetch(baseUrl + `personalInformation/${uid}/tasks/${key}.json`,{method: "DELETE"})
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

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
            console.log(tasks); //to do
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
        header: taskHeader,
        description: taskDescription,
        state: 'To Do'
    }

    fetch(baseUrl + `personalInformation/${uid}/tasks.json`,
        {method: "POST", body: JSON.stringify(taskObj)})
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            Promise.reject(response);
        })
        .then(key => {
            elements.taskHeader().value = '';
            elements.taskDescription().value = '';
        })
        .catch(error => {
            console.log(error);// To do send error message
        })
}

function updateTaskState(key, state){
    const uid = firebase.auth().currentUser.uid;

    const requestObj = {method: "PATCH", body: JSON.stringify({state})};

    fetch(baseUrl + `personalInformation/${uid}/tasks/${key}.json`,requestObj)
        .then(response => {
            //to do
        })
        .catch(error => {
            // to do
        });
}

function checkForUser(){
    const user = firebase.auth().currentUser;

    if (user == null) {
        return undefined;
    }

    return user.uid;
}