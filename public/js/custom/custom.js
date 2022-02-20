$(document).ready(function(){

    var $video = $('video');

    if ($video.length > 0) {

        $.ajax({
            type: "GET",
            url: $video.data('json'),
            cache: false,
            datatype: "JSON",
            success: function (arr) {
               var player = videojs('player', {
                    autoplay: true,
                    loop: true,
                    muted: true,
                    preload: true,
                    controls: true
                });
                player.playlist(shuffle(arr));
                player.playlist.autoadvance(0);
                player.playlist.repeat(true);
            },
            error: function (xhr, status, error) {
                console.log("ERROR!!!"); 
            }
        });
    }
});

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}