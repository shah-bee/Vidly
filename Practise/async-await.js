console.log("Before");

console.log("After");

async function displayCommits(){
const user = await getUser(1);
const repos = await getRepositories(user.gitHubUsername);
const commits = await getCommitsFromDB(repos);
console.log(commits);
}

displayCommits();

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