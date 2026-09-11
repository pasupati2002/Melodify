let songIndex = 0;

let audioElement = new Audio();

const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const masterSongName = document.getElementById("masterSongName");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const songItems = Array.from(
    document.getElementsByClassName("songItem")
);
const songPlayButtons = Array.from(
    document.getElementsByClassName("songItemPlay")
);

const songs = [
    {
        songName: "Gehra Hua",
        filePath: "songs/Gehra Hua.mp3",
        coverPath: "cover/1.jpg"
    },

    {
        songName: "Kanha",
        filePath: "songs/Kanha.mp3",
        coverPath: "cover/2.jpg"
    },

    {
        songName: "Jab Se",
        filePath: "songs/Jab se.mp3",
        coverPath: "cover/3.jpg"
    },

    {
        songName: "Vibe",
        filePath: "songs/Vibe.mp3",
        coverPath: "cover/4.jpg"
    },

    {
        songName: "Teri Khamoshi",
        filePath: "songs/Teri Khamoshi.mp3",
        coverPath: "cover/5.jpg"
    }
];

songItems.forEach((item, index) => {
    const image = item.querySelector("img");
    const name = item.querySelector(".songName");
    image.src = songs[index].coverPath;
    name.innerText = songs[index].songName;
});

function makeAllPlays() {
    songPlayButtons.forEach(button => {
        button.classList.remove("fa-circle-pause");
        button.classList.add("fa-circle-play");
    });
}

function updateMasterPlay(isPlaying) {
    if (isPlaying) {
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = "1";
    } else {
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = "0";
    }
}

function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    songPlayButtons[songIndex].classList.remove(
        "fa-circle-play"
    );
    songPlayButtons[songIndex].classList.add(
        "fa-circle-pause"
    );
    myProgressBar.value = 0;
    audioElement.play()
        .then(() => {
            updateMasterPlay(true);
        })
        .catch(error => {
            console.log("Audio could not be played:", error);
            updateMasterPlay(false);
        });
}

masterPlay.addEventListener("click", () => {
    if (audioElement.paused) {
        audioElement.play()
            .then(() => {
                songPlayButtons[songIndex].classList.remove(
                    "fa-circle-play"
                );
                songPlayButtons[songIndex].classList.add(
                    "fa-circle-pause"
                );
                updateMasterPlay(true);
            })
            .catch(error => {
                console.log("Playback error:", error);
            });
    } else {
        audioElement.pause();
        songPlayButtons[songIndex].classList.remove(
            "fa-circle-pause"
        );
        songPlayButtons[songIndex].classList.add(
            "fa-circle-play"
        );
        updateMasterPlay(false);
    }
});

songPlayButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        if (
            songIndex === index &&
            !audioElement.paused
        ) {
            audioElement.pause();
            button.classList.remove(
                "fa-circle-pause"
            );
            button.classList.add(
                "fa-circle-play"
            );
            updateMasterPlay(false);
            return;
        }
        playSong(index);
    });
});

audioElement.addEventListener("timeupdate", () => {
    if (!isNaN(audioElement.duration) && audioElement.duration > 0) {
        const progress =
            (audioElement.currentTime /
            audioElement.duration) * 100;
        myProgressBar.value = progress;
    }
});

myProgressBar.addEventListener("input", () => {
    if (
        !isNaN(audioElement.duration) &&
        audioElement.duration > 0
    ) {
        audioElement.currentTime =
            (myProgressBar.value / 100) *
            audioElement.duration;
    }
});

next.addEventListener("click", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    playSong(songIndex);
});

previous.addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex--;
    }
    playSong(songIndex);
});

audioElement.addEventListener("ended", () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    playSong(songIndex);
});


audioElement.addEventListener("play", () => {
    updateMasterPlay(true);
});


audioElement.addEventListener("pause", () => {
    updateMasterPlay(false);
});

