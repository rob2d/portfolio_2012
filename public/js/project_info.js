var urlParams = parseUrlParams();
var projectId = urlParams['pid'];
var data = projectData[projectId];
YUI().use('node', 'event-hover', function(Y)
{
	var $screens = document.getElementById("project_screens");
	//------------ thumbnail action on-click ---------------//
	Y.all('.screenshot_thumb').each(function(taskNode)
	{
		console.log(taskNode.getAttribute('thumb_id'));
	});


		//----------- scrolling on screenshots ------------//
		var $leftScrollArea = Y.one('#screens_overlay_l');
		var $rightScrollArea = Y.one('#screens_overlay_r');
		var scrollingLeft  = false;
		var scrollingRight = false;

		//calculate scrollable area
		var maxScrollArea =  $screens.scrollWidth - $screens.clientWidth;

		var checkScrollBounds = function()
		{
			if($screens.scrollLeft >= maxScrollArea)
			{
				scrollingRight = false;
				$rightScrollArea.hide();
			}
			else if($rightScrollArea.getAttribute('hidden') == 'true')
			{
				$rightScrollArea.show();
			}

			if($screens.scrollLeft <= 0)
			{
				scrollingLeft = false;
				$leftScrollArea.hide();
			}
			else if($leftScrollArea.getAttribute('hidden') == 'true')
			{
				$leftScrollArea.show();
			}
		};
		checkScrollBounds();

		//function to scroll left
		var scrollLFn = function()
		{
			$screens.scrollLeft -= 2;
			checkScrollBounds();
			if(scrollingLeft)
				requestAnimationFrame(scrollLFn);
		};
		$leftScrollArea.on('hover',
			function() 	//on hover
			{
				scrollingLeft = true;
				requestAnimationFrame(scrollLFn);
			},
			function() //on mouse-off
			{
				scrollingLeft = false;
			});
		//function to scroll right
		var scrollRFn = function()
		{
			$screens.scrollLeft += 2;
			checkScrollBounds();
			if(scrollingRight)
				requestAnimationFrame(scrollRFn);
		};
		$rightScrollArea.on('hover',
			function() //on hover
			{
				scrollingRight = true;
					requestAnimationFrame(scrollRFn);
			},
			function() //on mouseoff
			{
				scrollingRight = false;
			});
	}
	else
	{
		Y.one('#screens_section').hide();
	}

	Y.one('#left_info').removeClass('hidden_start');
	Y.one('#right_info').removeClass('hidden_start');
});
