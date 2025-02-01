const songs = [
    { title: "NightFall", src: "1111 (1).mp3" },
    { title: "Lost in Dreams", src: "1111 (2).mp3" },
    { title: "Crazy space", src: "1111 (3).mp3" }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const songList = document.getElementById("song-list");

// Load and display playlist
function loadPlaylist() {
    songList.innerHTML = "";
    songs.forEach((song, index) => {
        let li = document.createElement("li");
        li.innerText = song.title;
        li.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audioPlayer.play();
        });
        songList.appendChild(li);
    });
}

// Load a song
function loadSong(index) {
    songTitle.innerText = songs[index].title;
    audioPlayer.src = songs[index].src;
    progressBar.value = 0;
}

// Play or Pause
playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.innerHTML = '<img src="bbbb.png" alt="Pause">';
    } else {
        audioPlayer.pause();
        playButton.innerHTML = '<img src="aaaa.png" alt="Play">';
    }
});

// Next and Previous
prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
});

nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
});

// Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {
    let progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress || 0;
});

// Seek using Progress Bar
progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Volume Control
volumeSlider.addEventListener("input", () => {
    audioPlayer.volume = volumeSlider.value;
});

// Auto-play next song
audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
});

// Initial Load
loadSong(currentSongIndex);
loadPlaylist();