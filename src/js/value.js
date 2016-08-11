/**
 * Created by xuelei.kong on 2016/8/4.
 */

function valuePointProgress(){
    var fullDeg=200;
    var percent=1;
    var maxDeg=-(fullDeg)*percent;
    var startDeg=10;
    var x = -Math.cos(Math.PI * startDeg / 180) * 120+120;
    var y = Math.sin(Math.PI * startDeg / 180) * 120+120;
    console.log(x);
    console.log(y);
    setInterval(function () {
        startDeg-=1;
        if(startDeg<maxDeg+10) return
        console.log(startDeg);
        x = -Math.cos(Math.PI * startDeg / 180) * 120+120;
        y = Math.sin(Math.PI * startDeg / 180) * 120+120;
        $('.ball').css({
            left:x,
            top:y
        })
    },5)

    $('.run-board span').each(function (idx) {
        $(this).css({
            "transform":"rotate("+(idx-1)*10+"deg)"
        })
    })

    var idx=21*percent;
    var i=0;
    setInterval(function () {
        i++;
        if(i>idx+1){return}
        $('.run-board span').eq(parseInt(i-1)).addClass('curr');
    },60)

}
function showValuePoint(){
    var oSpan=document.getElementById("value");
    var d=$(oSpan).data('value');//跳动到最后的数字
    var s= parseInt(oSpan.innerHTML);//起始起始值 一般是 0 或其他
    var time=1200;  //所用时间 1000毫秒（ 在1秒内 数值增加到d）;
    var outTime=0;  //所消耗的时间
    var interTime=30;
    var timer = setInterval(function(){
        outTime+=interTime;
        if(outTime<time){
            oSpan.innerHTML= parseInt(d/time*outTime);
        }else{
            oSpan.innerHTML=d;
        }
    },interTime);
}
valuePointProgress();
showValuePoint();


$.fn.slider = function (options) {
    var list = [];
    this.each(function(i, me){

        list.push(new Slider(me, options));
    });
    return list;
};
function Slider(elem,options) {
    this.$el=$(elem);
    this.$sliderElem=this.$el.find('.slider_elem');
    this.init(options);
}

Slider.prototype={
    init:function (options) {
        var me = this;
        me.opts = $.extend({}, {
            width:me.$el.width(),
            height:me.$el.width(),
            li:me.$sliderElem.find('li'),
            len:me.$sliderElem.find('li').length,
            imgs:me.$sliderElem.find("img"),
            prevBtn: ".prevIcon",
            nextBtn: ".nextIcon",
            effect:'fade',
            _idx:0,
            timerSlider:null,
            timerResize:null,
            intervalTime:3000,
            hoverStop: true,
            autoPlay: true,
            val:"",
            callback : function(){}
        }, options);
        me.$prevBtn=$(me.opts.prevBtn);
        me.$nextBtn=$(me.opts.nextBtn);
        me.initiaStyle();
        me.start();
        // me.resize();
        me.$prevBtn.click(function () {
            if(isUlAniamted()){
                me.opts._idx--;
                me.opts._idx == -1 ? me.goToLast() : me.play();
            }

        });
        me.$nextBtn.click(function () {
            if(isUlAniamted()){
                me.opts._idx++;
                console.log(me.opts._idx);
                console.log(me.opts.len);
                me.opts._idx == me.opts.len ? me.goToFirst() : me.play();
            }
        });
        this.$el.hover(function(){
            console.log(0);
            me.opts.hoverStop?clearInterval(me.opts.timerSlider):null;
        },function(){
            if(me.opts.hoverStop){
                clearInterval(me.opts.timerSlider);
                me.opts.autoPlay?me.start():null;
            }
        })

        function isUlAniamted(){
            return !me.$sliderElem.is(":animated");
        }
    },
    initiaStyle:function () {
        switch (this.opts.effect) {
            case "fade":
                this.opts.li.css({"position": "absolute", "z-index": 9}).eq(0).css({"opacity": 1}).siblings().css({"opacity": 0, "z-index": 1});
                break;
            case "vertical":
                break;
            case "level":
                this.opts.imgs.width(this.opts.width);
                this.opts.li.css({"float": "left"});
                this.$sliderElem.width((this.opts.len + 1) * this.opts.width).css({"position": "absolute", "left": 0, "top": 0});
        }
    },
    start:function () {
        var me=this;
        this.opts.timerSlider = setInterval(function () {
            me.opts._idx++;
            me.play();

        }, me.opts.intervalTime);
    },
    play:function () {
        if(arguments.length){
            this.opts._idx=arguments[0]
        };
        console.log(this.opts._idx);
        switch (this.opts.effect) {
            case "fade":
                if ( this.opts._idx ==  this.opts.len) {
                    this.opts._idx=0;
                }
                this.opts.li.eq(this.opts._idx).stop(false,false).animate({"opacity": 1}, 700,function () {
                    $(this).css("z-index", 9)
                }).siblings().stop().animate({"opacity": 0}, 700, function () {
                    $(this).css("z-index", 1)
                });
                break;
            case "vertical":

                break;
            case "level":
                if ( this.opts._idx ==  this.opts.len) {
                    this.goToFirst();
                }else{
                    this.$sliderElem.stop().animate({"left": -this.opts._idx * this.opts.width}, 700, function () {
                    });
                }
        }

        this.opts.callback && typeof this.opts.callback==='function' && this.opts.callback(this.opts._idx);

    },
    goTo:function (idx) {
        console.log(idx);
        this.play(idx);
    },
    goToFirst:function () {
        var me=this;
        me.opts._idx=0;
        me.$sliderElem.find('li').first().css({"position":"relative","left":me.opts.width*me.opts.len});
        me.$sliderElem.animate({"left": -me.opts.len * me.opts.width}, 700, function () {
            me.$sliderElem.find("li").first().attr("style","").css("float","left");
            me.$sliderElem.css("left", 0);
        });
    },
    goToLast:function () {
        var me=this;
        me.opts._idx = me.opts.len - 1;
        me.$sliderElem.find('li').last().css({"position":"relative","left":-me.opts.width*me.opts.len});
        me.$sliderElem.animate({"left": me.opts.width}, 700, function () {
            me.$sliderElem.find("li").last().attr("style","").css("float","left");
            me.$sliderElem.css("left", -me.opts._idx * me.opts.width);
        });
    },

    resize:function () {
        var me=this;

        $(window).resize(function () {
            me.opts.width=me.$el.width();
            clearInterval(me.opts.timerSlider);
            clearInterval(me.opts.timerResize);
            me.opts.imgs.width(me.opts.width);
            me.$sliderElem.width(me.opts.width*me.opts.len).css({'left':-me.opts._idx*me.opts.width});
            me.opts.timerResize=setTimeout(function () {
                me.start();
            },500)
        })
    }

}
var timer;
$('.ach-list a').hover(function () {
    var idx=$(this).parents("li").index();
    clearTimeout(timer);
    timer=setTimeout(function () {
        $('.ach-desc').stop(false,true).show();
    },10)
    $('.ach-desc').find("li").eq(idx).addClass('curr').siblings().removeClass('curr')
}, function () {
    clearTimeout(timer)
    $('.ach-desc').stop(false,true).hide();
})
$('#index-slider').slider({
    effect:'level',
    callback: function (i) {

    }
})



