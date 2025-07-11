console.log('Before');
// getUser(1, (user) => {
//     console.log('User', user);

//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos, (commits) => {
//         })
//     })
// });
getUser(1, getRepositories);
console.log('After');

//
function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    getCommits(repos, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}
//

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'Mehrab' });
    }, 3000);
    return 1
}

function getRepositories(usename, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API....');
        callback(['repo1', 'repo2', 'repo3', 'repo4', 'repo5']);
    }, 2000)
}