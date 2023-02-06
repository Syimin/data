import mongoose from 'mongoose'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom'
import express from 'express'
import bodyParser from 'body-parser'
const DB = 'mongodb://localhost:27017/bbs'
import userAPIs from './api/users'
import discussAPIs from './api/discusses'
import commodityAPIs from './api/commodities'
import storeAPIs from './api/stores'
import groupbuyAPIs from './api/groupbuys'
import secondhandAPIs from './api/secondhands'
import HelpdisAPIs from './api/helpdiscusses'
import likedisAPIs from './api/likediscusses'
import unlikedisAPIs from './api/unlikediscusses'
import storecommodityAPIs from './api/storecommodities'
import plettersAPIs from './api/pletters'
import App from './jsx/App'


const template = (markup)=>{
    return(
        `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf8"/>
                <title>口袋嘉园</title>
                <link rel="stylesheet" href="/css/bootstrap.min.css">
                <link rel="stylesheet" href="/css/antd.min.css">
                <link rel="stylesheet" type="text/css" href="/css/index.css">
                <link rel="stylesheet" type="text/css" href="/css/foot.css">
                <script type="text/javascript" src="/js/jquery-1.11.0.min.js"></script>
                <script type="text/javascript" src="/js/bootstrap.min.js"></script>
            </head>
            <body>
            <div id="root">${markup}</div>
            <!--新品首发-->
<div>
	<div class="div_middle div_title">
		<div class="div_module_title_left">
			<p class="text-left" style="font-size: 30px;">新品推荐
				<small style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;♪近期热门新品♪</small>
			</p>
		</div>
		<div class="div_module_title_right">
			<a class="more_class" href="http://localhost:3000/commodities/" target="_blank">更多></a>
		</div>
	</div>
	<div id="myCarousel_new" class="carousel slide pad_010 b_k" data-ride="carousel">
		<!-- 轮播（Carousel）指标 -->
		<ol class="carousel-indicators" style="display: none;">
			<li data-target="#myCarousel_new" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel_new" data-slide-to="1"></li>
        </ol>
        <!-- 轮播（Carousel）项目左键 -->
		<div class="div_new_product_left">
			<a href="#myCarousel_new" data-slide="prev">
				<img id="new_product_left" src="/img/index/left_1-01.jpg">
			</a>
		</div>
		<!-- 轮播（Carousel）项目 -->
		<div class="carousel-inner bor_btm" style="float: left; width: 1090px;">
			<div class="item active" style="height: 335px;">
				<a id="new_product_01" href="#" target="_blank">
					<div class="div_new_product_margin">
						<img id="new_product_img_01" width="100%" src="/img/products/eb30.png">
						<div class="new_product_name" id="new_product_name_01">
							<h6 class="new_product_name_word_black">经典黑 蓝牙耳机</h6>
							<h6 class="new_product_name_word_red">￥359元 </h6>
						</div>
					</div>
				</a>
				<a id="new_product_02" href="https://item.rakuten.co.jp/happymao10/10000013/" target="_blank">
					<div class="div_new_product_margin">
						<img id="new_product_img_02" width="100%" src="/img/products/vh-wl.png">
						<div class="new_product_name" id="new_product_name_02">
							<h6 class="new_product_name_word_black">触屏式 充电器</h6>
							<h6 class="new_product_name_word_red">￥269元</h6>
						</div>
					</div>
				</a>
				<a id="new_product_03" href="https://item.rakuten.co.jp/happymao10/10000006/" target="_blank">
					<div class="div_new_product_margin">
						<img id="new_product_img_03" width="100%" src="/img/products/3life-fan.jpg">
						<div class="new_product_name" id="new_product_name_03">
							<h6 class="new_product_name_word_black">小型 风扇</h6>
							<h6 class="new_product_name_word_red">￥59元</h6>
						</div>
					</div>
				</a>
				<a id="new_product_04" href="https://item.rakuten.co.jp/happymao10/10000004/" target="_blank">
					<div class="div_new_product">
						<img id="new_product_img_04" width="100%" src="/img/products/sl-a210.png">
						<div class="new_product_name" id="new_product_name_04">
							<h6 class="new_product_name_word_black">充电宝 两用</h6>
							<h6 class="new_product_name_word_red">￥199元</h6>
						</div>
					</div>
				</a>
			</div>
            </div>
        </div>
    </div>

    <!--人气推荐-->
    <div class="bg_gray" style="height: 700px;">
        <div class="div_middle div_title">
            <div class="div_module_title_left">
                <p class="text-left" style="font-size: 30px;">人気商品推荐&nbsp;&nbsp;&nbsp;
                    <span id="popularity_product" class="small_blue_word_border">&nbsp;人气商品排行榜&nbsp;</span>
                    &nbsp;&nbsp;&nbsp;
                    <span id="shopkeeper" class="small_black_word">&nbsp;小施の推荐&nbsp;</span>
                </p>
            </div>
            <div class="div_module_title_right">
                <a class="more_class" href="http://localhost:3000/commodities/" target="_blank">更多></a>
            </div>
        </div>
    <!-- 人气排行 -->
        <div id="popularity_product_01" class="div_middle">
            <a href="http://localhost:3000/groupbuys/5f27f1ca4885e6039c4ac549" target="_blank">
                <div class="div_popularity_product_long">
                    <img width="100%" src="/img/products/jm-linen-1.png">
                    <div class="popularity_product_name_long">
                        <h6 class="small_black_word" style="font-size: 20px;">原宿爱心印花宽松长袖</h6>
                        <h6 class="new_product_name_word_red" style="font-size: 20px;">￥89元</h6>
                    </div>
                </div>
            </a>
        
            <a href="http://localhost:3000/secondhands/5fcbc8b41628a926e04850aa" target="_blank">
                <div class="div_popularity_product mar_right mar_bottom">
                    <img height="200px" width="220px" src="/img/products/jm-linen-3.png">
                    <div class="popularity_product_name">
                        <h6 class="small_black_word">日系针织堆堆帽</h6>
                        <h6 class="new_product_name_word_red">￥12元</h6>
                    </div>
                </div>
            </a>
            <a href="http://localhost:3000/commodities/5fd1839f9b22b031748fba7a" target="_blank">
                <div class="div_popularity_product mar_right mar_bottom">
                    <img height="200px" width="220px" src="/img/products/jm-linen-2.png">
                    <div class="popularity_product_name">
                        <h6 class="small_black_word">韩版睡衣女秋冬</h6>
                        <h6 class="new_product_name_word_red">￥35元</h6>
                    </div>
                </div>
            </a>
            <a href="https://item.rakuten.co.jp/happymao10/10000029/" target="_blank">
                <div class="div_popularity_product mar_bottom">
                    <img height="200px" width="220px" src="/img/products/jbam-1.jpg">
                    <div class="popularity_product_name">
                        <h6 class="small_black_word">羊羔毛茸茸外套</h6>
                        <h6 class="new_product_name_word_red">￥115元</h6>
                    </div>
                </div>
            </a>
            <a href="https://item.rakuten.co.jp/happymao10/10000004/" target="_blank">
                <div class="div_popularity_product mar_right">
                    <img height="200px" width="220px" src="/img/products/gm-pcbag.png">
                    <div class="popularity_product_name">
                        <h6 class="small_black_word">JK服 月下鹤</h6>
                        <h6 class="new_product_name_word_red">￥65元</h6>
                    </div>
                </div>
            </a>
            <a href="https://item.rakuten.co.jp/happymao10/10000008/" target="_blank">
                <div class="div_popularity_product mar_right">
                    <img height="200px" width="220px" src="/img/products/rs-w3.png">
                    <div class="popularity_product_name">
                        <h6 class="small_black_word">慵懒风纯色长袖毛衣</h6>
                        <h6 class="new_product_name_word_red">￥55.69元</h6>
                    </div>
                </div>
            </a>
            <a href="https://item.rakuten.co.jp/happymao10/10000021/" target="_blank">
                <div class="div_popularity_product">
                    <img height="200px" width="220px" src="/img/products/jbam-3.jpg">
                    <div class="popularity_product_name">
                        <h6 class="small_black_word">拼色羊羔绒外套</h6>
                        <h6 class="new_product_name_word_red">￥69.56元</h6>
                    </div>
                </div>
            </a>
        </div>
        <!-- 店长推荐 -->
	<div id="popularity_product_02" class="div_middle" style="display: none;">
		<a href="http://localhost:3000/groupbuys/5f27f1ca4885e6039c4ac549" target="_blank">
			<div class="div_popularity_product_long">
				<img width="100%" src="/img/products/sl-a5p-1.png">
				<div class="popularity_product_name_long">
					<h6 class="small_black_word" style="font-size: 20px;">原宿爱心印花宽松长袖</h6>
					<h6 class="new_product_name_word_red" style="font-size: 20px;">￥89元</h6>
				</div>
			</div>
		</a>
		<a href="http://localhost:3000/secondhands/5fcbc8b41628a926e04850aa" target="_blank">
			<div class="div_popularity_product mar_right mar_bottom">
				<img height="200px" width="220px" src="/img/products/sl-a5p-2.png">
				<div class="popularity_product_name">
					<h6 class="small_black_word">日系针织堆堆帽</h6>
					<h6 class="new_product_name_word_red">￥12元</h6>
				</div>
			</div>
		</a>
		<a href="http://localhost:3000/commodities/5fd1839f9b22b031748fba7a" target="_blank">
			<div class="div_popularity_product mar_right mar_bottom">
				<img height="200px" width="220px" src="/img/products/sl-a5p-3.png">
				<div class="popularity_product_name">
					<h6 class="small_black_word">韩版睡衣女秋冬</h6>
					<h6 class="new_product_name_word_red">￥35元</h6>
				</div>
			</div>
		</a>
		<a href="https://item.rakuten.co.jp/happymao10/10000029/" target="_blank">
			<div class="div_popularity_product mar_bottom">
				<img height="200px" width="220px" src="/img/products/jbam-1.png">
				<div class="popularity_product_name">
					<h6 class="small_black_word">羊羔毛茸茸外套</h6>
					<h6 class="new_product_name_word_red">￥115元</h6>
				</div>
			</div>
		</a>
		<a href="https://item.rakuten.co.jp/happymao10/10000004/" target="_blank">
			<div class="div_popularity_product mar_right">
				<img height="200px" width="220px" src="/img/products/sl-a210.jpg">
				<div class="popularity_product_name">
					<h6 class="small_black_word">JK服 月下鹤</h6>
					<h6 class="new_product_name_word_red">￥65元</h6>
				</div>
			</div>
		</a>
		<a href="https://item.rakuten.co.jp/happymao10/10000008/" target="_blank">
			<div class="div_popularity_product mar_right">
				<img height="200px" width="220px" src="/img/products/airwheel-r6.jpg">
				<div class="popularity_product_name">
					<h6 class="small_black_word">慵懒风纯色长袖毛衣</h6>
					<h6 class="new_product_name_word_red">￥55.69元</h6>
				</div>
			</div>
		</a>
		<a href="https://item.rakuten.co.jp/happymao10/10000021/" target="_blank">
			<div class="div_popularity_product">
				<img height="200px" width="220px" src="/img/products/jbam-4.jpg">
				<div class="popularity_product_name">
					<h6 class="small_black_word">拼色羊羔绒外套</h6>
					<h6 class="new_product_name_word_red">￥69.56元</h6>
				</div>
			</div>
		</a>
	</div>
</div>


<!--スマートフォンアクセサリー-->
<div class="div_middle">
    <div class="div_title">
        <div class="div_module_title_left">
            <p class="text-left" style="font-size: 30px;">LED 智能手机壳</p>
        </div>
    </div>
    <div class="div_middle" style="height: 665px;">
       <a href="https://item.rakuten.co.jp/happymao10/10000001/" target="_blank">
            <img class="mar_bottom" src="/img/index/banner/banner-iqos-c.jpg">
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000001/" target="_blank">
            <div class="div_general mar_right">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/case-i3p.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">经典黑 手机壳</h6>
                    <h6 class="new_product_name_word_red">￥57元</h6>
                </div>
            </div>
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000013/" target="_blank">
            <div class="div_general mar_right">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/b-lgm.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">防摔防震 钢化膜</h6>
                    <h6 class="new_product_name_word_red">￥29.9元</h6>
                </div>
            </div>
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000014/" target="_blank">
            <div class="div_general mar_right">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/bs-mfi.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">粉丝 USP充电线</h6>
                    <h6 class="new_product_name_word_red">￥19.5元</h6>
                </div>
            </div>
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000001/" target="_blank">
            <div class="div_general">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/solove-s3p.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">薄荷绿 充电宝</h6>
                    <h6 class="new_product_name_word_red">￥109元</h6>
                </div>
            </div>
        </a>
    </div>
</div>
<!--バッテリー・充電器-->
<div class="div_middle">
    <div class="div_title">
        <div class="div_module_title_left">
            <p class="text-left" style="font-size: 30px;">10000mAh 充电宝 少女粉</p>
        </div>
    </div>
    <div class="div_middle" style="height: 300px;">
       <a href="https://item.rakuten.co.jp/happymao10/10000007/" target="_blank">
            <img class="mar_bottom" src="/img/index/banner/banner-car-cup.jpg">
        </a>
    </div>
</div>
<!--日用品・生活雑貨-->
<div class="div_middle">
    <div class="div_title">
        <div class="div_module_title_left">
            <p class="text-left" style="font-size: 30px;">小型皮包 收纳用</p>
        </div>
    </div>
    <div class="div_middle" style="height: 665px;">
        <a href="https://item.rakuten.co.jp/happymao10/10000004/" target="_blank">
            <img class="mar_bottom" src="/img/index/banner/banner-jm-xp.jpg">
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000004/" target="_blank">
            <div class="div_general mar_right">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/spovan-sb.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">夜光手表</h6>
                    <h6 class="new_product_name_word_red">￥388元</h6>
                </div>
            </div>
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000019/" target="_blank">
            <div class="div_general mar_right">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/iw-b01.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">简约黑色 手表</h6>
                    <h6 class="new_product_name_word_red">￥170元</h6>
                </div>
            </div>
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000008/" target="_blank">
            <div class="div_general mar_right">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/fan-vh.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">黑旋风 小型风扇</h6>
                    <h6 class="new_product_name_word_red">￥249元</h6>
                </div>
            </div>
        </a>
        <a href="https://item.rakuten.co.jp/happymao10/10000007/" target="_blank">
            <div class="div_general">
                <div class="div_general_img">
                    <img class="general_img" src="/img/products/iqos-jm.png">
                </div>
                <div class="general_name">
                    <h6 class="small_black_word">男士钱包</h6>
                    <h6 class="new_product_name_word_red">￥499元</h6>
                </div>
            </div>
        </a>
    </div>
</div>
<!--精選品-->
    <div class="bg_gray">
        <div class="div_middle div_title">
            <div class="div_module_title_left">
                <p class="text-left" style="font-size: 30px;">精選品
                    <small style="font-size: 14px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;あなたのために、暮らしキラめく良品を♡</small>
                </p>
            </div>
        </div>
        <div class="div_middle" style="height: 460px; padding-bottom: 80px;">
            <div class="mar_right" style="width: 690px; height: 380px; float: left;">
                <a href="#">
                    <img style="width: 100%; height: 100%;" src="/img/index/selections/Selections_01.jpg">
                </a>
            </div>
            <div class="mar_bottom" style="width: 390px; height: 186px; float: left;">
                <a href="#">
                    <img style="width: 100%; height: 100%;" src="/img/index/selections/Selections_02.jpg">
                </a>
            </div>
            <div style="width: 390px; height: 186px; float: left;">
                <a href="#">
                    <img style="width: 100%; height: 100%;" src="/img/index/selections/Selections_03.jpg">
                </a>
            </div>
        </div>
    </div>


            <script src="/js/client.js"></script> 
            <script type="text/javascript" src="/js/index.js"></script>
            <script type="text/javascript">
            </body>
        </html>
        `
    )
}
const serverRender = (req,res,next)=>{
    const markup = (
        ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={{}}>
            <App/>
            </StaticRouter>
        )
    )
    res.status(200).send(template(markup))//中间键
    next()//继续运行下一个
}


mongoose.connect(DB,
    {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true},
    (err)=>{//err表示一旦发生错误就阻止程序进行
    if(err) throw err//阻止程序继续进行
    console.log('connected to database...')
    const app = express()//用app表示express的实例化
    app.use(express.static('static'))//将static(静态文件)交给express来托管
    app.use(bodyParser.json({limit : "2100000kb"}))  //解析通过json格式传递的数据
    userAPIs(app)
    discussAPIs(app)
    commodityAPIs(app)
    storeAPIs(app)
    groupbuyAPIs(app)
    HelpdisAPIs(app)
    likedisAPIs(app)
    unlikedisAPIs(app)
    secondhandAPIs(app)
    storecommodityAPIs(app)
    plettersAPIs(app)
    app.use(serverRender)
    app.listen(3000)
})