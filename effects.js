// MOSNE FUNCTIONS
$(function () {
   
    $(window)._scrollable();
    var History = window.History;
    var $container = $('#pool');
    var tgt = $('#tgt');
    var scll = 0;
    var off = 0;
    var ea = 'easeInOutQuad';
    var $gridz = 240;
    
    
    magic = (Modernizr.mq('only all and (max-width: 767px)')) ? true : false;
   
    if (magic!=true){
   
    $container.isotope({
            itemSelector: '.box',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.innerWidth() / $gridz
            }
        });
   
    $('#pool').imagesLoaded(function () {
        var $all=  $(".box",'#pool');
        $('#pool').empty();

        
        $container.append($all).isotope( 'insert', $all).removeClass("prepare");
        
    });
  
    }else{
  
    $container.addClass("no-transition").imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.box',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.innerWidth() / $gridz
            }
        });
        
        setTimeout(function(){
            $container.removeClass("prepare");
        },200);
        
    });
    
    };
  
    $("#bd").bind("initscripts", function (e, who) {
        $('.gallery').flexslider({
            animation: "slide",
            animationLoop: true,
            slideshowSpeed: 3000,
            controlNav: false,
            directionNav: true,
            smoothHeight: false,
            itemMargin: 0,
            itemWidth: 0,
            minItems: 1,
            maxItems: 2
        });
    });
  
    if ($("body").hasClass("single")) {
        $('#tgt .toslide:eq(0)').slideDown(function(){
            $("#bd").trigger("initscripts", tgt);
        });
    }
    if ($("body").hasClass("page")) {
        $('#tgt .toslide:eq(0)').slideDown();
    }
  
    $(".menu-item-63 a:eq(0)").toggle(function (e) {
        e.preventDefault();
        $(this).addClass("active").parent().find(".sub-menu").slideDown("fast");
    }, function (e) {
        e.preventDefault();
        $(this).removeClass("active").parent().find(".sub-menu").slideUp("fast");
    });
  
    $('#pool .post').quicksearch({
        position: 'prepend',
        attached: '#menu-item-64',
        labelText: 'Search'
    });
  
    $container.bind("scoreup", function () {
        $container.addClass("noluck");
        $container.isotope({
            filter: '.score'
        });
        $("#bd").trigger("mosne_relayout");
    });
  
    $(".menu-item-64 a:eq(0)").toggle(function (e) {
        e.preventDefault();
        $(this).addClass("active").parent().find("input").addClass("large").select();
    }, function (e) {
        e.preventDefault();
        $(this).removeClass("active").parent().find("input").removeClass("large").blur();
    });
 
    $(".menu-item-62 a:eq(0)").toggle(function (e) {
        e.preventDefault();
        $(this).text("G");
        $container.addClass("makerow");
        setTimeout(function () {
            //$container.isotope('reLayout');
            $("#bd").trigger("mosne_relayout");
        }, 200);
    }, function (e) {
        $(this).text("L");
        $container.removeClass("makerow");
        $container.isotope('reLayout');
        setTimeout(function () {
            //$container.isotope('reLayout');
            $("#bd").trigger("mosne_relayout");
        }, 200);
    });
 
    $('.sub-menu a').click(function (e) {
        e.preventDefault();
        $.scrollTo('#header', 600, {
            easing: ea,
            offset: off
        });
        
        $("#menu-menu_nav .current-menu-item").removeClass("current-menu-item");
        $("#menu-item-39").addClass("current-menu-item");
            
        $(".sub-menu .current-menu-item").removeClass("current-menu-item");
        $(this).parent().addClass("current-menu-item");
        $(".sub-menu:visible").parent().find('a.active').trigger("click");
        var selector = "." + $(this).text();
        if (selector == ".All") {
            selector = "*";
            $container.removeClass("noluck");
        } else {
            $container.addClass("noluck");
        }
        $container.isotope({
            filter: selector
        });
        History.pushState(null, null, "/");
    });
 
    $("#bd").bind("mosne_relayout", function(){
        
        History.pushState(null, null, "/");
         //$('#tgt .toslide:visible').slideUp();
            
        $container.isotope({
            masonry: {
                columnWidth: $container.width() / $gridz
            }
        });
    });


    $(window).smartresize(function () {
        $container.isotope({
            masonry: {
                columnWidth: $container.width() / $gridz
            }
        });
     });
 
    $("#bd").bind("openlink", function (e, the_link) {
        $("#loading,#logo").addClass("loading");
        //tgt.slideUp();
        $('#tgt .toslide:hidden').remove();
        $.scrollTo('#header', 600, {
            easing: ea,
            onAfter: function () {
                $.get(the_link, function (data) {
                    var ok = $(data).find("#aj");
                    tgt.prepend(ok);
                    
                    $('#tgt .toslide:eq(0)').slideDown(function(){
                    $("#bd").trigger("initscripts", $("#tgt .toslide:eq(0)"));
                    setTimeout(function () {
                            $('#tgt .toslide:eq(1)').slideUp();
                        }, 300);
                    });
                    $("#loading,#logo").removeClass("loading");
                    // Google Analytics
                    //console.log(window.location.pathname);
                    _gaq.push(['_setDomainName', 'mosne.it']);
                    _gaq.push(['_trackPageview',window.location.pathname]);
                });
            }
        });
    });
 
    $("a.dx").live("click",function(e){
      e.preventDefault();
      current = $("#pool article.current");
      pool = $("#pool article").not('.isotope-hidden');
      index = $(pool).index(current)+1;
      if (index==pool.length){ index = 0;}
      //console.log(pool.length,index);
      pool.eq(index).find("a.open").trigger("click");
    });
   
    $("#bd a.open").live("click", function (e) {
        e.preventDefault();
        var who = this;
        $container.find(".current").removeClass("current");
        var link = $(who).attr("href");
        History.pushState(null, null, link);
        $(who).parent().parent().addClass("current");
    });
  
    $("#bd a.close").live("click", function (e) {
        e.preventDefault();
        //$(this).parent().parent().parent().parent().parent().parent().parent().slideUp();
        History.pushState(null, null, "/");
    });
 
    History.Adapter.bind(window, 'statechange', function () {
        var State = History.getState();
        if (State.hash == "/") {
            $("#menu-menu_nav .current-menu-item").removeClass("current-menu-item");
            $("#menu-item-39").addClass("current-menu-item");
            $.scrollTo('#header', 600, { easing: ea, offset: off});
            $("#aj").slideUp();
           
            
        } else {
            $("#bd").trigger("openlink", State.url);
            }
    });
   
    
    
    
}); //scope