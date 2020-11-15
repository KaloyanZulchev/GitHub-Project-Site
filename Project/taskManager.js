async function deleteTask(url){
    const uid = firebase.auth().currentUser.uid;

    // url = baseUrl + `personalInformation/${uid}/tasks/${key}.json`

    let response = await fetch(url, {method: "DELETE"});

    return response;
}

async function getTasks(url){
    const uid = checkForUser();

    if (uid == undefined) {
        return undefined;
    }

    let response = await fetch(url);

    return response;
}

async function addTask(taskHeader, taskDescription, url){
    const uid = checkForUser();
    
    const taskObj = {
        header: taskHeader,
        description: taskDescription,
        state: 'To Do'
    }

    // url = baseUrl + `personalInformation/${uid}/tasks.json`

    let response = await fetch(url, {method: "POST", body: JSON.stringify(taskObj)});
    
    return response;
}

async function updateTaskState(state, url){
    const uid = firebase.auth().currentUser.uid;

    const requestObj = {method: "PATCH", body: JSON.stringify({state})};
    // url = baseUrl + `personalInformation/${uid}/tasks/${key}.json`
    
    let response = await fetch(url,requestObj)

    return response;
}

function checkForUser(){
    const user = firebase.auth().currentUser;

    if (user == null) {
        return undefined;
    }

    return user.uid;
}

const tasksFunctions = {
    updateTaskState,
    addTask,
    deleteTask,
    getTasks
}

export default tasksFunctions;