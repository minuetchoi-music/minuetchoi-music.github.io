window.onload=function(){ setTimeout(function(){ window.scrollTo(0, 1); }, 0); }
$(document).ready(function () {

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (!isMobile) {
        $('.video-container').css('position', 'relative');
    } else {
        $('.video-container').css('position', 'sticky');
    }

    // 영상 strt
    var $video = $('video');

    if ($video.length > 0) {

        var lyricsChar = '';
        var lyricsCnt = 0;
        var fillCnt= 35;
        var fillChar = '\n';
        for (var i = lyricsCnt; i < fillCnt; i++) {
            lyricsChar = lyricsChar + fillChar;
        }
        $('.highlighter-rouge').find('code').html(lyricsChar);
        openMenuNav();
        /*
        var location = window.location.pathname.split('/')[1];

        $.ajax({
            type: "GET",
            url: '/category/#' + location,
            cache: false,
            datatype: "html",
            success: function (data) {
                var strHtml = [];
                var tag;
                var title;
                $(data).find('.post-content').find('a[href*="/' + location + '"]').each(function (index, element) {
                    tag = $(element).closest('li').html().replace(/<span.*>.*<\/span>/gi, '').replace(/\[.*\]/gi, '');
                    title = $(element).closest('li').find('a').html();
                    if ($.trim($('.post-title').html()) == $.trim(title)) {
                        strHtml.push(tag.replace('post-link', 'wrap-vertical-link2'));
                    } else {
                        strHtml.push(tag.replace('post-link', 'wrap-vertical-link'));
                    }
                });
                var width = $('.video-container').width();
                $('.highlighter-rouge').before('<div class="wrap-vertical" id="musicList" style="width: '+ width + 'px;">' + shuffle(strHtml).join('') + '</div>');
                setTimeout(function () {
                    $('.wrap-vertical').animate({ scrollLeft: $( '.wrap-vertical-link2' ).offset().left - 20}, 400, function () {
                        $('html, body').animate({ scrollTop: $('.post-content').offset().top}, 2000);
                    });
                }, 3000);
            },
            error: function (xhr, status, error) {
                console.log("ERROR!!!");
            }
        });
        */

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

                var lyrics = {};
                for (var i = 0; i < arr.length; i++) {
                    lyrics[arr[i].sources[0].src] = arr[i].sources[0].lyrics;
                }

                $('.highlighter-rouge').find('pre').on('doubleTap dblclick', function (e) {
                    e.preventDefault();
                    if (player.muted()) {
                        player.muted(false);
                    } else {
                        player.muted(true);
                    }
                });

                var previousSrc = '';
                var currentSrc = '';
                player.on('timeupdate', function () {
                    currentSrc = player.currentSrc();
                    if (previousSrc != currentSrc) {
                        lyricsChar = lyrics[currentSrc];
                        lyricsCnt = lyricsChar.split(fillChar).length - 1
                        for (var i = lyricsCnt; i < fillCnt; i++) {
                            lyricsChar = lyricsChar + fillChar;
                        }
                        previousSrc = currentSrc;
                        $('.highlighter-rouge').find('code').html(lyricsChar);
                    }
                });
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
// 북마크
function openMenuNav() {
    var addWidth;
    if(document.getElementById("sidebar").style.display == 'none') { 
        document.getElementById("sidebar").style.display = '';
        if ($('.container').width() > 576) {
            addWidth = 196;
        } else {
            addWidth = 0;
        }
    } else {
        document.getElementById("sidebar").style.display = 'none';
        addWidth = 0;
    }
    var location = window.location.pathname.split('/')[1];

    $.ajax({
        type: "GET",
        url: '/category/#' + location,
        cache: false,
        datatype: "html",
        success: function (data) {
            var strHtml = [];
            var tag;
            var title;
            $(data).find('.post-content').find('a[href*="/' + location + '"]').each(function (index, element) {
                tag = $(element).closest('li').html().replace(/<span.*>.*<\/span>/gi, '').replace(/\[.*\]/gi, '');
                title = $(element).closest('li').find('a').html();
                if ($.trim($('.post-title').html()) == $.trim(title)) {
                    strHtml.push(tag.replace('post-link', 'wrap-vertical-link2'));
                } else {
                    strHtml.push(tag.replace('post-link', 'wrap-vertical-link'));
                }
            });
            var width = $('.video-container').width() - addWidth;
            $('#musicList').remove();
            $('.post-title').hide();
            $('.post-date').hide();
            $('.highlighter-rouge').before('<div class="wrap-vertical" id="musicList" style="width: '+ width + 'px;">' + shuffle(strHtml).join('') + '</div>');
            $('.wrap-vertical').animate({ scrollLeft: $( '.wrap-vertical-link2' ).offset().left - 30 - addWidth}, 400, function () {});
        },
        error: function (xhr, status, error) {
            console.log("ERROR!!!");
        }
    });
}
function closeMenuNav() {
    document.getElementById("sidebar").style.display = 'none';
}