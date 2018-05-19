console.log("Before");
const p = getUser(1);

console.log("After");

// function getRepos(user) {
//     console.log(user);
//     getRespositories(user.gitHubUsername, getCommits);
// }

// function getCommits(repos) {
//     console.log(repos);
//     getCommitsFromDB(repos, displayCommits);
// }

// function displayCommits(commits) {
//     console.log(commits);
// }

p.then(user => getRepositories(user.gitHubUsername)).
then(repos => getCommitsFromDB(repos)).
then(commits => console.log(commits)).catch(err => console.log(err.message));



function getUser(id) {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({
                id: "1",
                gitHubUsername: "Taher"
            });
        }, 2000);
    });
    
}

function getCommitsFromDB(repos) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading commits from database...");
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Reading repositories from database for user ${username}`);
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    })
}