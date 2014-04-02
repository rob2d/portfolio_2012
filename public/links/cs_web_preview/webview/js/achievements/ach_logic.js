var achLogic = 
{
	aScrollIndex : 0,	//currently selected achievement's index on list
	animInProgress : false,	//whether or not an anim is still processing
	getAchSlot   : function(aIndex)
	{
		var achCount = achData.achievements.length;
		var achSlot = (aIndex - achLogic.aScrollIndex);
		
		//maintain bounds of slot
		if(achSlot < 0)
			achSlot += achCount;
		achSlot %= achCount;
		return achSlot;
	},
	selectAchievement : function(aIndex)
	{
		achLogic.animInProgress = true;
		$('#a_details_txt').text(achData.achievements[aIndex].getDesc());
		$('#lvl_progress').width(achData.achievements[aIndex].getLvlProgress());
		$("#a_details_img").css("background", "url('../gfx/achievements_scr/ach_art/" + (achData.achArt[aIndex] == null ? "no_art.png" : "fool_me_once.png") + "')");
		$("#a_details_img").css("background-size", "cover");
		$("#lvl_no_txt").text("Level " + achData.achievements[aIndex].getLevel());
		
		//highlight the current achievement; give it "af_selected" class
		$('.a_field').each(function()
		{
			var aIndexSlot = achLogic.getAchSlot(parseInt($(this).attr('ach_index')));
			var	offYTarget = aIndexSlot < 3 ? (aIndexSlot* 80) : 3 * 80;
			$(this).removeClass('af_selected');
			$(this).animate(
			{
				top: offYTarget + 'px',
				opacity: aIndexSlot < 3 ? 
							(1-offYTarget/200.0 + 0.1) : 0
			}, 
			{
				duration: 500, 
				queue: 	  false,
				complete: function(){ achLogic.animInProgress = false; }
			});
			
			$(this).css('z-index', 0);
		});
		
		var sAchievement = $('#a_field_' + aIndex)	
		
		sAchievement.addClass('af_selected');
		sAchievement.css('z-index', 100);
	}
};

$(document).ready(function()
{
	var VIEWPORT_HEIGHT = 480;

	//background animation
	var bgAngle = 0.0;
	var bgVPosition = 0.0;	
	setInterval(function()
	{
		$('#main_div').css("backgroundPosition", "0px " + bgVPosition + "px");
		bgAngle += 0.05;
		bgAngle %= 360;
		bgVPosition = Math.cos(bgAngle) * 25 - 200;
	}, 50);
	
	
	$('.a_field').click(
		function()
		{
			if(!achLogic.animInProgress)
			{
				var aIndex = $(this).attr('ach_index');
				achLogic.aScrollIndex = aIndex;
					achLogic.selectAchievement(aIndex);
			}
		}
	);
	
	$('#scroll_down').click(
		function()
		{
			if(!achLogic.animInProgress)
			{
				if(++achLogic.aScrollIndex < 0)
					achLogic.aScrollIndex = achData.achievements.length - 1;
				achLogic.aScrollIndex %= achData.achievements.length;
				achLogic.selectAchievement(achLogic.aScrollIndex);
			}
		}
	);
	
	$('#scroll_up').click(
		function()
		{
			if(!achLogic.animInProgress)
			{
				if(--achLogic.aScrollIndex < 0)
					achLogic.aScrollIndex = achData.achievements.length - 1;
				achLogic.aScrollIndex %= achData.achievements.length;
				achLogic.selectAchievement(achLogic.aScrollIndex);
			}
		}
	);	
});