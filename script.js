const songs = [ 
  { title: "Pushpa Pushpa", artist: "Song by Deepak Blue and Nakash Aziz", file: "songs/1.1.mp3", cover: "cover/1.1.jpeg" }, 
  { title: "Sooseki", artist: "Song by Shreya Ghoshal", file: "songs/2.2.mp3", cover: "cover/2.2.jpeg" }, 
  { title: "Kissik", artist: "Song by Sublahshini", file: "songs/3.3.mp3", cover: "cover/3.3.jpeg" }, 
  { title: "Peelings", artist: "Song by Kandukoori Shankar Babu and Laxmi Dasa", file: "songs/4.4.mp3", cover: "cover/4.4.jpeg" }, 
  { title: "Gango Renuka Thalli", artist: "Song by V.M. Mahalingam", file: "songs/5.5.mp3", cover: "cover/5.5.jpeg" }, 
  { title: "Dammunte Pattukora", artist: "Song by Allu Arjun", file: "songs/6.6.mp3", cover: "cover/6.6.jpeg" },
]; 


const audio = document.getElementById("audio"); 
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn"); 
const nextBtn = document.getElementById("nextBtn"); 
const songTitle = document.getElementById("songTitle"); 
const artistName = document.getElementById("artistName"); 
const coverImg = document.getElementById("coverImg"); 
const progress = document.getElementById("progress"); 
const progressContainer = document.getElementById("progressContainer"); 
const songList = document.getElementById("songList"); 
const shuffleBtn = document.getElementById("shuffleBtn"); 
const repeatBtn = document.getElementById("repeatBtn");
const volumeSlider = document.getElementById("volume");


let songIndex = 0;
let isShuffle = false  // shuffle mode flag 



function loadSong(index) { 
  const song = songs[index]; 
  songTitle.textContent = song.title; 
  artistName.textContent = song.artist; 
  coverImg.src = song.cover; 
  audio.src = song.file; 
} 


function playSong() { 
  audio.play();
  playPauseBtn.textContent = "⏸";
 }

 // Play next song automatically
 audio.addEventListener("ended", function (){
  songIndex++;
  if(songIndex >= songs.length) {
    songIndex = 0; //loop back to first song 
    }
   loadSong(songIndex);
    audio.play();
  });


 


 function pauseSong() {
  audio.pause(); 
  playPauseBtn.textContent = "▶️"; 
} 

playPauseBtn.addEventListener("click", () => { 
  if (audio.paused) { 
    playSong();
   } else {
     pauseSong(); 
    } 
  }); 
  
  prevBtn.addEventListener("click", () => { 
    songIndex = (songIndex - 1 + songs.length) % songs.length; 
    loadSong(songIndex); 
    playSong();
   }); 
   
   nextBtn.addEventListener("click", () => { 
    songIndex = (songIndex + 1) % songs.length; 
    loadSong(songIndex); 
    playSong();
    
   }); 


   
   
   audio.addEventListener("timeupdate", () => { 
    const progressPercent = (audio.currentTime / audio.duration) * 100; 
    progress.style.width = progressPercent + "%";
   }); 
   
   progressContainer.addEventListener("click", (e) => { 
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration; 
    audio.currentTime = (clickX / width) * duration; 
  });


  // Set initial volume
audio.volume = volumeSlider.value;

// Update volume on slider change
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

  

 // Populate song list with play buttons 

 songs.forEach((song, i) => { 
  const div = document.createElement("div"); 
  div.className = "song";
  div.innerHTML = ` 
  <span>${song.title} - ${song.artist}</span> 
  <button1>Play</button1>
   `;
   const btn = div.querySelector("button1"); 
   btn.addEventListener("click", () => { 
    songIndex = i;
    loadSong(songIndex); 
    playSong(); 
  });
  
  songList.appendChild(div); }); 
  


  // Load first song on page load 
  
  loadSong(songIndex);
