console.log('Start');

function loginUser(email, password, callback) {
    setTimeout(() => {
        console.log('Now we have the data')
        callback({
            email: email
        });
    }, 2000);
}

function getVideos(email,
    callback) {
    setTimeout(() => {
        callback(["video1", "Video2"]);
    }, 2000);
}

const user = loginUser("oreolnoumodong@gmail", 123456, user => {
    console.log(user);
    getVideos(user.email, videos => {
        console.log(videos);
    })
});

console.log('End');