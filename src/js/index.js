/**
 * Created by tina.wang on 2016/8/9.
 */
$(function(){
    //LEAD BOARD tab切换
    var $div_li3=$(".menu-tabs li");
    var index=$div_li3.index(this);
    $div_li3.click(function(){
        $(this).addClass("list-selected").siblings().removeClass("list-selected");
        $("div.ranktabAll>.rankDiv").hide().eq($(this).index()).show();
    });
    //TIPS的tab切换
    var $li=$(".tips-menu li");
    var tipsIndex=$li.index(this);
    $li.click(function(){
        $(this).addClass("tips-selected").siblings().removeClass("tips-selected");
        $("div.tips-all>.tips-list1").hide().eq($(this).index()).show();
    });
    //VALUE BILL的tab切换
    var $valueLi=$(".value-menu li");
    var valueIndex=$valueLi.index(this);
    $valueLi.click(function(){
        $(this).addClass("value-selected").siblings().removeClass("value-selected");
        $("div.value-lists>.value-list1").hide().eq($(this).index()).show();
    });
    //前20名显示隐藏
    $(".rank-top20").click(function(){
       $(".rankDiv:visible .top20-lists").slideToggle(1000);
    });
    //滚动条插件调用
    $('.teams-ul').niceScroll(
        {
            arrows: false,
            touchbehavior: false,
            cursorcolor: "#12d3c7",
            cursorborder: "none",
            cursorwidth: "3px",
        }
    );
    $('.rankDiv').niceScroll(
        {
            arrows: false,
            touchbehavior: false,
            cursorcolor: "#12d3c7",
            cursorborder: "none",
            cursorwidth: "3px",
        }
    );
});
