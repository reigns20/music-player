const songs = ["song1.mp3", "song2.mp3", "song3.mp3"];
let currentSongIndex = 0;

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(index) {
    audio.src = "songs/" + songs[index];
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playButton.innerText = "⏸️";
    } else {
        audio.pause();
        playButton.innerText = "▶️";
    }
}

function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
}

function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return ${min}:${sec < 10 ? "0" : ""}${sec};
}

playButton.addEventListener("click", playPause);
nextButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
});
prevButton.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
});
audio.addEventListener("timeupdate", updateProgress);

loadSong(currentSongIndex);
