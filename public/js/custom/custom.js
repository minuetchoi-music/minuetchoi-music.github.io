window.onload=function(){ setTimeout(function(){ window.scrollTo(0, 1); }, 0); }
$(document).ready(function () {

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
        $('.video-container').css('position', 'relative');
    }

    // 영상 strt
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
    // --영상 end


    // 북마크 strt
    $('.bookmark').magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<meta name="viewport" content="width=device-width; initial-scale=1.0, user-scalable=no">' +
                '<style>.mfp-iframe-holder .mfp-content {max-width: 100%;height:100%}</style>' +
                '<div class="mfp-iframe-scaler" >' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div></div>' +
                '<script>closeNav()</script>'
        }
    });
    // --북마크 end

    // marquee start
    if ($('.marquee').length > 0) {
        var location = window.location.pathname.split('/')[1];
        $.ajax({
            type: "GET",
            url: '/category/#' + location,
            cache: false,
            datatype: "html",
            success: function (data) {
                var strHtml = [];
                var tag;
                $(data).find('.post-content').find('a[href*="/' + location + '"]').each(function (index, element) {
                    tag = $(element).closest('li').html().replace(/<span.*>.*<\/span>/gi, '').replace(/\[.*\]/gi, '');
                    strHtml.push(tag.replace('post-link', 'marquee-link'));
                });
                $('.marquee').html('<marquee behavior="scroll" direction="left">' + shuffle(strHtml).join('') + '</marquee>');
            },
            error: function (xhr, status, error) {
                console.log("ERROR!!!");
            }
        });
    }
    // --marquee end
});

// 영상 셔플
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

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

// 북마크
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}