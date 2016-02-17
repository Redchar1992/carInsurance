$(function(){
var tabsSwiper = new Swiper('.swiper-container',{
	speed:500,
	onSlideChangeStart: function(){
		$(".tabs .active").removeClass('active');
		$(".tabs a").eq(tabsSwiper.activeIndex).addClass('active');
		console.log(tabsSwiper.activeIndex);
	}
});
$(".tabs a").on('touchstart mousedown',function(e){
	e.preventDefault()
	$(".tabs .active").removeClass('active');
	$(this).addClass('active');
	tabsSwiper.slideTo($(this).index());
});

$(".tabs a").click(function(e){
	e.preventDefault();
});

var h = document.documentElement.clientHeight-55 || document.body.clientHeight-55;
// $(".swiper-wrapper").css("height",h);

})