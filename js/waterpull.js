$(function(){
	/*瀑布流开始*/
	var container = $('.waterfull ul');
	var loading=$('#imloading');
	// 初始化loading状态
	loading.data("on",true);
	/*判断瀑布流最大布局宽度，最大为1280*/
	function tores(){
		var tmpWid=$(window).width();
		if(tmpWid>1280){
			tmpWid=1280;
		}else{
			var column=Math.floor(tmpWid/320);
			tmpWid=column*320;
		}
		$('.waterfull').width(tmpWid);
	}
	tores();
	$(window).resize(function(){
		tores();
	});
	container.imagesLoaded(function(){
	  container.masonry({
		columnWidth: 320,
		itemSelector : '.item',
		isFitWidth: true,//是否根据浏览器窗口大小自动适应默认false
		isAnimated: true,//是否采用jquery动画进行重拍版
		isRTL:false,//设置布局的排列方式，即：定位砖块时，是从左向右排列还是从右向左排列。默认值为false，即从左向右
		isResizable: true,//是否自动布局默认true
		animationOptions: {
			duration: 800,
			queue: false//是否队列，从一点填充瀑布流
		}
	  });
	});
	/*模拟从后台获取到的数据*/
	var sqlJson=[{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司1','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司2','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司3','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司4','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司5','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司6','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司7','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司8','statu':'已承保'},
		{'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司9','statu':'已承保'}
		// {'carPic':'images/bao.jpg','orderNum':'273838383838','insurer':'太平洋保险公司10','statu':'已承保'}
	];
	var sl = 0;//数据编号
	var dLast = sqlJson.length%5;//取余后最后一次获取的数据数量
	var lei = 5;//每次刷新展示的数据量（默认5）
	console.log(sqlJson.length);
	/*本应该通过ajax从后台请求过来类似sqljson的数据然后，便利，进行填充，这里我们用sqlJson来模拟一下数据*/
	$(window).scroll(function(){
		if(!loading.data("on")) return;

		// 计算所有瀑布流块中距离顶部最大，进而在滚动条滚动时，来进行ajax请求，方法很多这里只列举最简单一种，最易理解一种
		var itemNum=$('#waterfull').find('.item').length;
		var itemArr=[];
		itemArr[0]=$('#waterfull').find('.item').eq(itemNum-1).offset().top+$('#waterfull').find('.item').eq(itemNum-1)[0].offsetHeight;
		var maxTop=Math.max.apply(null,itemArr);
		if(maxTop<=$(window).height()+$(document).scrollTop()){
			console.log("go");
			//加载更多数据
			loading.data("on",false).fadeIn(800);
			(function(sqlJson){
				/*这里会根据后台返回的数据来判断是否你进行分页或者数据加载完毕这里假设大于30就不在加载数据*/
				if(itemNum>(10+sqlJson.length-1)){
					loading.text('就有这么多了！');
				}
				else if(itemNum<=10+sqlJson.length){//默认展示10
					var html="";
					if(sqlJson.length<5){//获取的新数据不到5个
						for(var i=0;i<sqlJson.length;i++){
							html+="<li class='car clearfix item'><div class='carPic'><img src="+sqlJson[i].carPic+"></div>";
							html+=" <div class='info'><p class='orderNum'>订单号：<span>"+sqlJson[i].orderNum+"</span></p><p class='insurer'>保险公司：<span>"+sqlJson[i].insurer+"</span></p>";
							html+="<p class='statu'>状态：<span>"+sqlJson[i].statu+"</span></div>";
							html+="<div class='arrow fr'><a href='detailed.html'></a></div>";
							html+="</li>";
						}
					}
					else{
						for(var i=sl;i<lei+sl;i++){
							console.log(i);
							html+="<li class='car clearfix item'><div class='carPic'><img src="+sqlJson[i].carPic+"></div>";
							html+=" <div class='info'><p class='orderNum'>订单号：<span>"+sqlJson[i].orderNum+"</span></p><p class='insurer'>保险公司：<span>"+sqlJson[i].insurer+"</span></p>";
							html+="<p class='statu'>状态：<span>"+sqlJson[i].statu+"</span></div>";
							html+="<div class='arrow fr'><a href='detailed.html'></a></div>";
							html+="</li>";
						}
						sl+=5;
						if(dLast==0) lei=5;
						else lei=dLast;
					}
					/*模拟ajax请求数据时延时800毫秒*/
					var time=setTimeout(function(){
						var $newElems = $(html).css({ opacity: 0}).appendTo(container);
						$newElems.imagesLoaded(function(){
							$newElems.animate({ opacity: 1},800);
							container.masonry( 'appended', $newElems,true);
							loading.data("on",true).fadeOut();
							clearTimeout(time);
						});
					},800)
				}
			})(sqlJson);
		}
		else{
			console.log($(window).height()+$(document).scrollTop());
			console.log("!!!"+maxTop);
		}

		//保险公司名称长度限制
		$(".insurer span").each(function(){
			// console.log("长度："+$(this).html().length);
			if($(this).html().length>7){
				var insr = $(this).html();
				$(this).html(insr.substr(0,7)+"...");
			}
		})
	});
})