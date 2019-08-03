//Canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  return this;
}


ctx.roundRect(canvas.width / 4 - 50, canvas.height / 4 - 30, canvas.width - 50, canvas.height / 2 + 40, 5);

ctx.fillStyle = "rgba(255,255,255, 0.7)";
ctx.fill();

//Audio Player
var imgSource
var songs = ["source1", "source2", "source3"]
var imgs = ["songImg1", "songImg2", "songImg3"]
var song = new Audio()
var count = 0;

function playSong() {
  song.src = "sources/" + songs[count] + ".mp3";
  imgSource = "images/" + imgs[count] + ".jpg"
  $(".musicImg img").attr("src", imgSource)
  $(".imgName p").html(songs[count])

}
window.onload = function () {
  song.src = "sources/" + songs[count] + ".mp3";
  $(".imgName p").html(songs[count])
  $(".allTime").html(song.duration)
  document.getElementById("volume").value = 10
  song.volume = document.getElementById("volume").value / 100
  song.pause()
};



$(".play").click(function(){
  if (song.paused) {
    song.play()
    $(this).html("<i class='fas fa-pause'></i>")
  }
  else {
    song.pause();
    $(this).html("<i class='fas fa-play'></i>")
  }
})

function Check(){
 if($(".play").html()=='<i class="fas fa-play"></i>'){
   song.pause()
 }
 else if($(".play").html()=='<i class="fas fa-pause"></i>'){
   song.play()
 }
}



$(".nextSong").click(function () {
  count = count + 1
  if (count > songs.length - 1) {
    count = 0;
  }
  playSong()
   Check()
})



$(".preSong").click(function () {
  count = count - 1
  if (count < 0) {
    count = songs.length - 1
  }
  playSong();
  Check()
})




$("#volume").change(function () {
  song.volume = document.getElementById("volume").value / 100
  console.log(song.currentTime)
})


var allTime
var increase
var insideBar = document.getElementById("inside")
song.onloadedmetadata = function () {
  allTime = song.duration
  var sec = Math.round(allTime) / 60
  sec = String(sec).split(".")
  $(".allTime").html(sec[0] + ":" + Math.round(allTime) % 60)
};

song.addEventListener('timeupdate', function () {
 increase = song.currentTime / song.duration
 insideBar.style.width = (increase * 100) + "%"
  Convert(Math.round(song.currentTime))
  
})


function Convert(second) {
  var min = Math.floor(second / 60)
  var sec = second % 60;
  if (sec < 10) {
    sec = "0" + sec
  }
  $(".currentTime").html("0"+min + ":" + sec)
}

