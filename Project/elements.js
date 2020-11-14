export const elements = {
    registrationButton: () => document.getElementById('register-button'),
    logInButton: () => document.getElementById('login-button'),
    logOutButton: () => document.getElementById('logout-button'),
    loadTasksButton: () => document.getElementById('load-tasks'),
    addTaskButton: () => document.getElementById('add-tasks'),
    finishTaskButton: () => document.getElementById('finish-tasks'),
    deleteTaskButton: () => document.getElementById('delete-tasks'),
    registrationEmail: () => document.getElementById('username-inputReg'),
    registrationPassword: () => document.getElementById('password-inputReg'),
    //registrationPasswordConfirn = () => document.getElementById('register-button'),
    logInEmail: () => document.getElementById('username-input'),
    logInPasswrd: () => document.getElementById('password-input'),
    taskHeader: () => document.getElementById('task-header-input'),
    taskDescription: () => document.getElementById('task-description-input'),
    errorMessage: () => document.querySelector('.error-message')
}
