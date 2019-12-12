$(function(){
   
    // 判断游览器的类型是否为ie6 7 8 9
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        new WOW().init();
    }
    if ((/msie [9|10]/i.test(navigator.userAgent))){
        // $(".c4conboxstep").show();
        // $(".c4conbox").css({
        //     borderWidth: '1px',
        //     borderStyle: 'dashed',
        //     borderColor: '#b4daf8'
        // })
    }

    var wow = new WOW({
        boxClass: 'wow', 
        animateClass: 'animated', 
        offset: 20, 
        mobile: true, 
        live: true 
    })
    //增加wow方法
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (callback) {
                    callback();
                }
            });
            return this;
        }
    });
    $('.table tr td a').mouseenter(function(){
        $(this).animateCss('tada');
    })
    // 右侧
    $('.close').click(function () {
        $(this).parent().slideUp(300, function () {
            $('.online').slideDown();
        });
    });
    $('.online').click(function () {
        $('.online').slideUp(300, function () {
            $('.fixed_r').slideDown();
        });

    });
  
	//返回顶部
	$(".scr_top").click(function(){
                $("html,body").animate({scrollTop:0}, 500);
    })
    // a href 对应跳转位置的id
    $('.left_nav a,.dt3 a').click(function () {
        $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top-80+'px'
        }, 500);
        return false;
        });
    // top的固定
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop>1200){
            $(".zgHead").addClass('fixed');
        }else{
            $(".zgHead").removeClass('fixed');
        }
    })

    $(".m2r span").each(function(index){
        $(this).mouseenter(function(){
            $(this).addClass('on').siblings('.m2r span').removeClass('on');
             $(".m2l a").hide().stop().eq(index).slideDown(500);
        })
    })
    $(".tabs span").each(function(index){
        $(this).mouseenter(function(){
            $(this).addClass('on').siblings('span').removeClass('on');
             $(".tab1").hide().stop().eq(index).slideDown(200);
        })
    })
    $(".point1").click(function(){
        $("html , body").animate({scrollTop:$(".zgm1").offset().top},600);
    });
    $('.dt_close').click(function () {
        $('.dt').addClass("active")
    })
    $('.zg_deer').click(function () {
        if ($('.dt').hasClass('active')) {
            $('.dt').removeClass("active")
        }
        
    })
    $('.f_close').click(function () {
        $('.zg_frame,.mask').hide()
    })
})

