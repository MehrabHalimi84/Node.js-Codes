const p = new Promise((resolve, reject) => {
    //Kick off some async work
    //...
    setTimeout(() => {
        resolve(1);                  // pending => resolved, fulfilled
    }, 2000);
    // reject(new Error('message')); // pending => rejected
});

p
    .then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));

// این کد برای زمانیه که مطمعنی خطا نداری 

// اگه بخوای هر دو رو داشته باشی اگرم ارور داد بفهمی

const promise = new Promise((resolve, reject) => {
    let success = false;

    setTimeout(() => {
        if (success) {
            resolve('موفقیت!');
        } else {
            reject('خطا رخ داد!');
        }
    }, 1000);
});

promise
    .then(result => console.log('نتیجه:', result))
    .catch(error => console.log('خطا:', error));



//کد هایی که تو قسمت 
// call back هستن رو میاریم اینجا 
// تا با پرامیس باهاشون کار کنیم که تفاوتشو بفهمیم




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

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'Mehrab' });
        }, 3000);
    });
}

function getRepositories(usename) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API....');
            resolve(['repo1', 'repo2', 'repo3', 'repo4', 'repo5']);
        }, 2000)
    })

}