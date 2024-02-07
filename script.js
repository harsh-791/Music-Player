let songs = [
    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        source: "Songs/spotifydown.com - Blinding Lights.mp3",
        thumbnail: "Thumbanails/blindingLights.jpeg"
    },
    {
        name: "All I Want",
        artist: "Kodaline",
        source: "Songs/spotifydown.com - All I Want.mp3",
        thumbnail: "Thumbanails/AllIWant.jpeg"
    },
    {
        name: "Everything I Wanted",
        artist: "Billie Eilish",
        source: "Songs/spotifydown.com - everything i wanted.mp3",
        thumbnail: "Thumbanails/everythingIWanted.jpeg"
    },
    {
        name: "Sometimes - Acoustic",
        artist: "Kodaline",
        source: "Songs/spotifydown.com - Sometimes - Acoustic.mp3",
        thumbnail: "Thumbanails/Sometimes.jpeg"
    },
    {
        name: "Starboy",
        artist: "The Weeknd",
        source: "Songs/spotifydown.com - Starboy.mp3",
        thumbnail: "Thumbanails/starboy.jpeg"
    }
];

let progress = document.querySelector("#progress");
let song = document.querySelector("#song");
let ctrlIcon = document.querySelector("#ctrlIcon");
let currentSongIndex = 0;
let songImg = document.querySelector(".song-img");
let songTitle = document.querySelector("h1");
let songArtist = document.querySelector("p");
let progressInterval;

function loadSong(index) {
    let currentSong = songs[index];
    song.src = currentSong.source;
    songImg.src = currentSong.thumbnail;
    songTitle.textContent = currentSong.name;
    songArtist.textContent = currentSong.artist;
}

function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause(){
    if(ctrlIcon.classList.contains("fa-pause")){
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        clearInterval(progressInterval); // Clear interval when song is paused
    }
    else{
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
        progressInterval = setInterval(function(){ // Set interval when song is playing
            progress.value = song.currentTime; 
        },500);
    }
}

// Listen for the 'ended' event of the audio element
song.addEventListener('ended', function() {
    // When the current song ends, play the next song
    playNext();
});

progress.onchange = function(){
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

document.getElementById("nextBtn").addEventListener("click", playNext);
document.getElementById("previousBtn").addEventListener("click", playPrevious);

// Update current time and duration below the progress bar
song.ontimeupdate = function() {
    document.getElementById("currentTime").textContent = formatTime(song.currentTime);
    document.getElementById("totalDuration").textContent = formatTime(song.duration);
};

// Function to format time (convert seconds to mm:ss format)
function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return pad(minutes) + ":" + pad(seconds);
}

// Function to pad single digits with leading zero
function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

// Load the first song
loadSong(0);
