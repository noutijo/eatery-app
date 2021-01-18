console.log('Start');

function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Now we have the data')
            resolve({
                email: email
            });
        }, 2000);
    })
}

function getVideos(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["video1", "Video2"]);
        }, 2000);
    })
}

function videosDetails(video) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Title of thr video");
        }, 2000);
    })
}

/*
loginUser("email@noutijo.com", 123)
    .then(user => getVideos(user.email))
    .then(videos => videosDetails(videos[0]))
    .then(detail => console.log(detail))
*/

async function displayUser() {
    let userLog = await loginUser("@x.com", 123456);
    let videos = await getVideos(userLog.email);
    let detail = await videosDetails(videos[0]);

    console.log(detail)
}

displayUser();

console.log('End');