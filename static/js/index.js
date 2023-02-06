$(function(){
    $(".menu_list_normal").hover(
        function () {
            $(this).find("a").first().css("color","#187FC4");
            $(this).find("a").first().css("border-bottom","2px solid #187FC4");
            $(this).find("div").first().show();
        },function () {
            $(this).find("a").first().css("color","#333333");
            $(this).find("a").first().css("border-bottom","2px solid #FFFFFF");
            $(this).find("div").first().hide();
        }
    );
    /*// 鼠标移到菜单(スマートフォンアクセサリー)上触发事件
    $("#menu_list_accessories").hover(
        function() {
            $("#menu_list_accessories_a").css("color", "#187FC4");
            $("#menu_list_accessories_a").css("border-bottom", "2px solid #187FC4");
            $("#div_menu_accessories").show();
        },
        function() {
            $("#menu_list_accessories_a").css("color", "#333333");
            $("#menu_list_accessories_a").css("border-bottom", "0px solid #187FC4");
            $("#div_menu_accessories").hide();
        }
    );
    // 鼠标移到菜单(電源・充電器)上触发事件
    $("#menu_list_source").hover(
        function() {
            $("#menu_list_source_a").css("color", "#187FC4");
            $("#menu_list_source_a").css("border-bottom", "2px solid #187FC4");
            $("#div_menu_source").show();
        },
        function() {
            $("#menu_list_source_a").css("color", "#333333");
            $("#menu_list_source_a").css("border-bottom", "0px solid #187FC4");
            $("#div_menu_source").hide();
        }
    );*/
    // 子菜单的图标文字悬停变化
    $(".div_menu_a").hover(
        function () {
            var aId = $(this).attr("id");
            $(this).find("img").attr("src", "/img/menu/icon_" + aId + "_02.png");
            $(this).find("h6").css("color", "#187FC4");
        }, function () {
            var aId = $(this).attr("id");
            $(this).find("img").attr("src", "/img/menu/icon_" + aId + "_01.png");
            $(this).find("h6").css("color", "#333333");
        }
    );

    var hoverTimer, outTimer;
    // 鼠标移到banner缩略图
    $("#banner_thumbnail_01").hover(function(){
        clearTimeout(outTimer);
        hoverTimer = window.setTimeout(function(){
            $("#myCarousel").carousel(0);
        },200);
    },function() {
        clearTimeout(hoverTimer);
        outTimer = window.setTimeout(function(){
            $(this).css("border","");
        },200);
    });
    $("#banner_thumbnail_02").hover(function(){
        clearTimeout(outTimer);
        hoverTimer = window.setTimeout(function(){
            $("#myCarousel").carousel(1);
        },200);
    },function() {
        clearTimeout(hoverTimer);
        outTimer = window.setTimeout(function(){
            $(this).css("border","");
        },200);
    });
    $("#banner_thumbnail_03").hover(function(){
        clearTimeout(outTimer);
        hoverTimer = window.setTimeout(function(){
            $("#myCarousel").carousel(2);
        },200);
    },function() {
        clearTimeout(hoverTimer);
        outTimer = window.setTimeout(function(){
            $(this).css("border","");
        },200);
    });
    $("#banner_thumbnail_04").hover(function(){
        clearTimeout(outTimer);
        hoverTimer = window.setTimeout(function(){
            $("#myCarousel").carousel(3);
        },200);
    },function() {
        clearTimeout(hoverTimer);
        outTimer = window.setTimeout(function(){
            $(this).css("border","");
        },200);
    });
    $("#banner_thumbnail_05").hover(function(){
        clearTimeout(outTimer);
        hoverTimer = window.setTimeout(function(){
            $("#myCarousel").carousel(4);
        },200);
    },function() {
        clearTimeout(hoverTimer);
        outTimer = window.setTimeout(function(){
            $(this).css("border","");
        },200);
    });
    $("#banner_thumbnail_06").hover(function(){
        clearTimeout(outTimer);
        hoverTimer = window.setTimeout(function(){
            $("#myCarousel").carousel(5);
        },200);
    },function() {
        clearTimeout(hoverTimer);
        outTimer = window.setTimeout(function(){
            $(this).css("border","");
        },200);
    });
    $("#banner_thumbnail_07").hover(function(){
        clearTimeout(outTimer);
        hoverTimer = window.setTimeout(function(){
            $("#myCarousel").carousel(6);
        },200);
    },function() {
        clearTimeout(hoverTimer);
        outTimer = window.setTimeout(function(){
            $(this).css("border","");
        },200);
    });
    // 初始化轮播
    $('#myCarousel').carousel({
        interval: 4000
    });
    $('#myCarousel').on('slide.bs.carousel', function (event) {
        var $hoder = $('#myCarousel').find('.item'),
            $items = $(event.relatedTarget);
        //getIndex就是轮播到当前位置的索引
        var getIndex= $hoder.index($items);
        $("#banner_thumbnail_01").css("border","");
        $("#banner_thumbnail_02").css("border","");
        $("#banner_thumbnail_03").css("border","");
        $("#banner_thumbnail_04").css("border","");
        $("#banner_thumbnail_05").css("border","");
        $("#banner_thumbnail_06").css("border","");
        $("#banner_thumbnail_07").css("border","");
        $("#banner_thumbnail_01").css("opacity","0.4");
        $("#banner_thumbnail_02").css("opacity","0.4");
        $("#banner_thumbnail_03").css("opacity","0.4");
        $("#banner_thumbnail_04").css("opacity","0.4");
        $("#banner_thumbnail_05").css("opacity","0.4");
        $("#banner_thumbnail_06").css("opacity","0.4");
        $("#banner_thumbnail_07").css("opacity","0.4");
        switch (getIndex) {
            case 0: $("#banner_thumbnail_01").css("border", "solid #187FC4 2px");$("#banner_thumbnail_01").css("opacity","1");break;
            case 1: $("#banner_thumbnail_02").css("border", "solid #187FC4 2px");$("#banner_thumbnail_02").css("opacity","1");break;
            case 2: $("#banner_thumbnail_03").css("border", "solid #187FC4 2px");$("#banner_thumbnail_03").css("opacity","1");break;
            case 3: $("#banner_thumbnail_04").css("border", "solid #187FC4 2px");$("#banner_thumbnail_04").css("opacity","1");break;
            case 4: $("#banner_thumbnail_05").css("border", "solid #187FC4 2px");$("#banner_thumbnail_05").css("opacity","1");break;
            case 5: $("#banner_thumbnail_06").css("border", "solid #187FC4 2px");$("#banner_thumbnail_06").css("opacity","1");break;
            case 6: $("#banner_thumbnail_07").css("border", "solid #187FC4 2px");$("#banner_thumbnail_07").css("opacity","1");break;
        }
    });
    $(".start-slide").click(function(){
        $("#myCarousel").carousel('cycle');
    });
    // 停止轮播
    $(".pause-slide").click(function(){
        $("#myCarousel").carousel('pause');
    });
    // 循环轮播到上一个项目
    $("#banner_thumbnail_left").click(function(){
        $("#myCarousel").carousel('prev');
    });
    // 循环轮播到下一个项目
    $("#banner_thumbnail_right").click(function(){
        $("#myCarousel").carousel('next');
    });

    // 新品首发图片滚动初始化
    $("#myCarousel_new").carousel({
        interval: 0
    });
    $("#new_product_01").hover(
        function() {
            $("#new_product_img_01").attr("src", "/img/products/eb30.jpg");
            $("#new_product_name_01").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_01").attr("src", "/img/products/eb30.png");
            $("#new_product_name_01").css("background", "#FFFFFF");
        }
    );
    $("#new_product_02").hover(
        function() {
            $("#new_product_img_02").attr("src", "/img/products/vh-wl.jpg");
            $("#new_product_name_02").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_02").attr("src", "/img/products/vh-wl.png");
            $("#new_product_name_02").css("background", "#FFFFFF");
        }
    );
    $("#new_product_03").hover(
        function() {
            $("#new_product_img_03").attr("src", "/img/products/3life-fan.jpg");
            $("#new_product_name_03").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_03").attr("src", "/img/products/3life-fan.png");
            $("#new_product_name_03").css("background", "#FFFFFF");
        }
    );
    $("#new_product_04").hover(
        function() {
            $("#new_product_img_04").attr("src", "/img/products/sl-a2100.jpg");
            $("#new_product_name_04").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_04").attr("src", "/img/products/sl-a210.png");
            $("#new_product_name_04").css("background", "#FFFFFF");
        }
    );
    $("#new_product_05").hover(
        function() {
            $("#new_product_img_05").attr("src", "/img/products/airwheel-r6.jpg");
            $("#new_product_name_05").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_05").attr("src", "/img/products/airwheel-r6.png");
            $("#new_product_name_05").css("background", "#FFFFFF");
        }
    );
    $("#new_product_06").hover(
        function() {
            $("#new_product_img_06").attr("src", "/img/products/case-jsk.jpg");
            $("#new_product_name_06").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_06").attr("src", "/img/products/case-jsk.png");
            $("#new_product_name_06").css("background", "#FFFFFF");
        }
    );
    $("#new_product_07").hover(
        function() {
            $("#new_product_img_07").attr("src", "/img/products/solove-s3p.jpg");
            $("#new_product_name_07").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_07").attr("src", "/img/products/solove-s3p.png");
            $("#new_product_name_07").css("background", "#FFFFFF");
        }
    );
    $("#new_product_08").hover(
        function() {
            $("#new_product_img_08").attr("src", "/img/products/car-cup.jpg");
            $("#new_product_name_08").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_08").attr("src", "/img/products/car-cup.png");
            $("#new_product_name_08").css("background", "#FFFFFF");
        }
    );
    $("#new_product_09").hover(
        function() {
            $("#new_product_img_09").attr("src", "/img/products/12m-2in1.jpg");
            $("#new_product_name_09").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_09").attr("src", "/img/products/12m-2in1.png");
            $("#new_product_name_09").css("background", "#FFFFFF");
        }
    );
    $("#new_product_10").hover(
        function() {
            $("#new_product_img_10").attr("src", "/img/products/sl-aircase.jpg");
            $("#new_product_name_10").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_10").attr("src", "/img/products/sl-aircase.png");
            $("#new_product_name_10").css("background", "#FFFFFF");
        }
    );
    $("#new_product_11").hover(
        function() {
            $("#new_product_img_11").attr("src", "/img/products/iqos-sk.jpg");
            $("#new_product_name_11").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_11").attr("src", "/img/products/iqos-sk.png");
            $("#new_product_name_11").css("background", "#FFFFFF");
        }
    );
    $("#new_product_12").hover(
        function() {
            $("#new_product_img_12").attr("src", "/img/products/ysb-sk.jpg");
            $("#new_product_name_12").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_12").attr("src", "/img/products/ysb-sk.png");
            $("#new_product_name_12").css("background", "#FFFFFF");
        }
    );
    $("#new_product_13").hover(
        function() {
            $("#new_product_img_13").attr("src", "/img/products/iwalk-12.jpg");
            $("#new_product_name_13").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_13").attr("src", "/img/products/iwalk-12.png");
            $("#new_product_name_13").css("background", "#FFFFFF");
        }
    );
    $("#new_product_14").hover(
        function() {
            $("#new_product_img_14").attr("src", "/img/products/sk-qb.jpg");
            $("#new_product_name_14").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_14").attr("src", "/img/products/sk-qb.png");
            $("#new_product_name_14").css("background", "#FFFFFF");
        }
    );
    $("#new_product_15").hover(
        function() {
            $("#new_product_img_15").attr("src", "/img/products/ipfilm-4d.jpg");
            $("#new_product_name_15").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_15").attr("src", "/img/products/ipfilm-4d.png");
            $("#new_product_name_15").css("background", "#FFFFFF");
        }
    );
    $("#new_product_16").hover(
        function() {
            $("#new_product_img_16").attr("src", "/img/products/spovan-sb.jpg");
            $("#new_product_name_16").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_16").attr("src", "/img/products/spovan-sb.png");
            $("#new_product_name_16").css("background", "#FFFFFF");
        }
    );
    $("#new_product_17").hover(
        function() {
            $("#new_product_img_17").attr("src", "/img/products/zh.jpg");
            $("#new_product_name_17").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_17").attr("src", "/img/products/zh.png");
            $("#new_product_name_17").css("background", "#FFFFFF");
        }
    );
    $("#new_product_18").hover(
        function() {
            $("#new_product_img_18").attr("src", "/img/products/rs-w6.jpg");
            $("#new_product_name_18").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_18").attr("src", "/img/products/rs-w6.png");
            $("#new_product_name_18").css("background", "#FFFFFF");
        }
    );
    $("#new_product_19").hover(
        function() {
            $("#new_product_img_19").attr("src", "/img/products/sense-x.jpg");
            $("#new_product_name_19").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_19").attr("src", "/img/products/sense-x.png");
            $("#new_product_name_19").css("background", "#FFFFFF");
        }
    );
    $("#new_product_20").hover(
        function() {
            $("#new_product_img_20").attr("src", "/img/products/vvc-nsm.jpg");
            $("#new_product_name_20").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_20").attr("src", "/img/products/vvc-nsm.png");
            $("#new_product_name_20").css("background", "#FFFFFF");
        }
    );
    $("#new_product_21").hover(
        function() {
            $("#new_product_img_21").attr("src", "/img/products/bc-lxq.jpg");
            $("#new_product_name_21").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_21").attr("src", "/img/products/bc-lxq.png");
            $("#new_product_name_21").css("background", "#FFFFFF");
        }
    );
    $("#new_product_22").hover(
        function() {
            $("#new_product_img_22").attr("src", "/img/products/lana-mxd.jpg");
            $("#new_product_name_22").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_22").attr("src", "/img/products/lana-mxd.png");
            $("#new_product_name_22").css("background", "#FFFFFF");
        }
    );
    $("#new_product_23").hover(
        function() {
            $("#new_product_img_23").attr("src", "/img/products/emeet-m1.jpg");
            $("#new_product_name_23").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_23").attr("src", "/img/products/emeet-m1.png");
            $("#new_product_name_23").css("background", "#FFFFFF");
        }
    );
    $("#new_product_24").hover(
        function() {
            $("#new_product_img_24").attr("src", "/img/products/case-glo.jpg");
            $("#new_product_name_24").css("background", "#F5F8FA");
        }, function() {
            $("#new_product_img_24").attr("src", "/img/products/case-glo.png");
            $("#new_product_name_24").css("background", "#FFFFFF");
        }
    );
    // banner缩略图左键悬停
    $("#banner_thumbnail_left").hover(
        function () {
            $("#banner_thumbnail_left").attr("src", "/img/index/left_2-02.png");
        }, function () {
            $("#banner_thumbnail_left").attr("src", "/img/index/left_2-01.png");
        }
    );
    // banner缩略图右键悬停
    $("#banner_thumbnail_right").hover(
        function () {
            $("#banner_thumbnail_right").attr("src", "/img/index/right_2-02.png");
        }, function () {
            $("#banner_thumbnail_right").attr("src", "/img/index/right_2-01.png");
        }
    );
    // 新品首发左键悬停
    $("#new_product_left").hover(
        function () {
            $("#new_product_left").attr("src", "/img/index/left_1-02.jpg");
        }, function () {
            $("#new_product_left").attr("src", "/img/index/left_1-01.jpg");
        }
    );
    // 新品首发右键悬停
    $("#new_product_right").hover(
        function () {
            $("#new_product_right").attr("src", "/img/index/right_1-02.png");
        }, function () {
            $("#new_product_right").attr("src", "/img/index/right_1-01.png");
        }
    );
    // 评论左键悬停
    $("#comment_left").hover(
        function () {
            $("#comment_left").attr("src", "/img/index/left_1-02.png");
        }, function () {
            $("#comment_left").attr("src", "/img/index/left_1-01.png");
        }
    );
    // 评论右键悬停
    $("#comment_right").hover(
        function () {
            $("#comment_right").attr("src", "/img/index/right_1-02.png");
        }, function () {
            $("#comment_right").attr("src", "/img/index/right_1-01.png");
        }
    );
    $("#popularity_product").click(
        function () {
            $("#popularity_product").attr("class","small_blue_word_border");
            $("#shopkeeper").attr("class","small_black_word");
            $("#popularity_product_01").show();
            $("#popularity_product_02").hide();
        }
    );
    $("#shopkeeper").click(
        function () {
            $("#shopkeeper").attr("class","small_blue_word_border");
            $("#popularity_product").attr("class","small_black_word");
            $("#popularity_product_01").hide();
            $("#popularity_product_02").show();
        }
    );
    // 新品首发图片滚动初始化
    $("#myCarousel_comment").carousel({
        interval: 4000
    });

    // 搜索文本框输入事件
    $("#search_input").bind('input propertychange', function() {
        var length = $("#search_input").val().length;
        if (length > 0) {
            $("#placeholder").hide();
        } else {
            $("#placeholder").show();
        }
    });
    // 搜索文本框提示文字点击
    $("#placeholder").click(function () {
        $("#search_input").focus();
        $("#div_search_dropdownList").show();
    });
    // 搜索文本框鼠标定位事件
    $("#search_input").click(function () {
        $("#div_search_dropdownList").show();
    });
    // 鼠标移出区域，下拉框消失。
    $("#div_search").mouseleave(function () {
        $("#div_search_dropdownList").hide();
    });

    $(".search_button").hover(
        function () {
            $(".search_button").attr("src", "/img/index/search_02.png");
        }, function () {
            $(".search_button").attr("src", "/img/index/search_01.png");
        }
    );

    // head页面轮播图
    $("#myCarousel_head").carousel({
        interval: 3000
    });
    $("#head_menu_home").hover(
        function() {
            $("#head_menu_home").css("color", "#187FC4");
            $("#head_menu_home").css("border-bottom", "2px solid #187FC4");
        },
        function() {
            $("#head_menu_home").css("color", "#333333");
            $("#head_menu_home").css("border-bottom", "0px solid #187FC4");
        }
    );

    $("#head_qrcode").popover({
        html : true
    });
    $("#head_qrcode").hover(
        function () {
            $('#head_qrcode').popover('show');
        },function () {
            $('#head_qrcode').popover('hide');
        }
    );
});
