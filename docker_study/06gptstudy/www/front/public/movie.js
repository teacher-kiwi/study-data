if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    window.location = 'microsoft-edge:' + window.location;

    setTimeout(function() {
      window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
    }, 1);
}

$(function(){
    $('.data').mouseover(function(e) { // mouse hover 醫뚰몴
        $(this).mousemove(function(e) {
            var idx = $(this).attr("idx");
            $('#divLayer_' + idx + ' #content').empty().append($(this).text());

            var t=e.pageY-15;
            var l=e.pageX+20;
            $('#divLayer_'+idx).css({"top":t, "left":l,"position":"absolute","opacity":"0,8" }).show();
        });
    });

    $('.data').mouseout(function() {
        var idx = $(this).attr("idx");
        $('#divLayer_'+idx).hide();
    });
});

$( function() {
  $( '#background' ).YTPlayer();
});