YUI().use('node', 'event-hover',  'screenshot-view', function(Y)
{
	//------------ populate screen shots ---------------//
	var $screenThumbs = Y.all('.screenshot_thumb');
	var screenCount = $screenThumbs._nodes.length;
	
	Y.all('.screenshot_thumb').each(function($thumb)
		{
			var thumbId = $thumb.getAttribute('screenIndex');
			$thumb.on('click', function()
			{
				Y.SSView.openView(thumbId, $thumb);
				checkScrollBounds();
			});
		});
	
	/* - initialize thumbnail behavior and the scrolling screenshots section - */
	if(data.screenshots && data.screenshots.length > 0)
	{
		var $screens = document.getElementById("project_screens");
		$screens.scrollLeft = 0; //fix firefox
		
		//initialize screenshot viewer
		Y.SSView.init(data.screenshots);	
		
		//----------- scrolling on screenshots ------------//
		var $leftScrollArea = Y.one('#screens_overlay_l');
		var $rightScrollArea = Y.one('#screens_overlay_r');
		var scrollingLeft  = false;
		var scrollingRight = false;
		var maxScrollArea;

		var checkScrollBounds = function()
		{
			maxScrollArea =  $screens.scrollWidth - $screens.clientWidth; //recalculate maximum scrollable area
			if($screens.scrollLeft >= maxScrollArea)
			{
				scrollingRight = false;
				$rightScrollArea.hide();
			}
			else
			{
				$rightScrollArea.show();
			}

				if($screens.scrollLeft <= 0)
				{
					scrollingLeft = false;
					$leftScrollArea.hide();
			}
			else
			{
				$leftScrollArea.show();
			}
		};

		var that = this;
		window.addEventListener('resize', function()
			{	checkScrollBounds();  });
		Y.on('scroll', function()
		{ checkScrollBounds(); });

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
	});
