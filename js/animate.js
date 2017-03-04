/*---------------------------------------------------
			ANIMATE SCROLL
--------------------------------------------------*/
var array=[];
$(document).ready(function(){
	if($(window).width()>1200){
		$("*").each(function(){
			var attr = $(this).attr('data-animate');
			if (typeof attr !== typeof undefined && attr !== false) {
				array.push($(this));
				if(attr.split("-").length>1){
					$(this).children().css("opacity","0");
				}
				else{
					$(this).css("opacity","0");
				}
			}
		});
	}
});

$(window).on("load scroll",function(){
	if($(window).width()>1200){
		var window_offset_top = $(window).scrollTop();
		var window_offset_bottom =$(window).scrollTop() + $(window).height();
		var elementRemoveArray=[];
		var timeRunAnimate=0;
		for(var i=0;i<array.length;i++){
			var currentElement = array[i];
			var animateCss = array[i].attr("data-animate");
			var split = animateCss.split("-");
			//scroll show
			var element_offset_top = currentElement.offset().top;
			var element_offset_bottom= currentElement.offset().top + currentElement.height();
			if(element_offset_top >= window_offset_top && element_offset_top <= window_offset_bottom || element_offset_bottom <= window_offset_bottom && element_offset_bottom >= window_offset_top)
			{
				if(split.length>1){
					for(var j=0;j<currentElement.children().length ;j++){
						showSort(currentElement.children().eq(j),split[0],timeRunAnimate);
						timeRunAnimate+=200;
						removeClassAnimate(currentElement.children(),split[0]);
					}
					elementRemoveArray.push(i);
				}
				else{
					currentElement.removeAttr("style").addClass('animated '+animateCss);
					elementRemoveArray.push(i);
					removeClassAnimate(currentElement,animateCss);
				}
			}
		}
		for(var i=elementRemoveArray.length - 1;i >= 0;i--){
			array.splice(elementRemoveArray[i], 1);
		}
	}
});

function removeClassAnimate(id,animateCss){
	setTimeout(function(){
		id.removeClass("animated "+animateCss);
	}, 3000);
};

function showSort(currentElement,animateCss,timeRunAnimate){
	setTimeout(function(){
		currentElement.removeAttr("style").addClass('animated '+animateCss);
	},timeRunAnimate);
	
};
/*---------------------------------------------------
			END ANIMATE SCROLL
--------------------------------------------------*/