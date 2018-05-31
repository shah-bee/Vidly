console.log("Before");
const user = getUser(1, getRepos);

console.log("After");

function getRepos(user) {
    console.log(user);
    getRespositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
    console.log(repos);
    getCommitsFromDB(repos, displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}


function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({
            id: "1",
            gitHubUsername: "Taher"
        });
    }, 2000);
}

function getCommitsFromDB(repos, callback) {
    setTimeout(() => {
        console.log("Reading commits from database...");
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}

function getRespositories(username, callback) {
    setTimeout(() => {
        console.log(`Reading repositories from database for user ${username}`);
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}