import { URLS } from './urlRepositories.js';

let { baseUrl, ...restUrls } = URLS;

const getInformationButton = document.getElementById('get-information-github');
getInformationButton.addEventListener('click', getGitHubInformation);

function getGitHubInformation() {
  Object.values(restUrls).forEach(url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let encodedText = atob(data.content);
        //For now the data is just console logged
        console.log(encodedText);

        //Here we are appending the data content in the HTML
        //Testing
        let ulElement = document.getElementById('TestingPurposes');
        let liElement = document.createElement('li');
        liElement.textContent = encodedText;

        ulElement.appendChild(liElement);
        //Testing
      });
  })
}
