/* Projects' On-Click Action & On Hover Overlays */
YUI().use('node', 'event-hover', 'event-mouseenter', 'node-event-simulate', function(Y)
{
	//get each project container
	var projects = Y.all('.project_container');
	var $originOverlay = Y.one('#origin_overlay');  //grab overlay on page to copy

	/* enables a mouse out trigger on overlay after a transition to show it */
	var enableMouseOut = function($overlay, $mouseOut)
	{
			console.log('enable mouse out is running');
			$mouseOut.show();
			$overlay.setAttribute('transitioning', 'no');
			$overlay._node.removeEventListener('transitionend', enableMouseOut);
	};

	var overlayDisplayNone = function($overlay, $mouseOut)
	{
		console.log('overlayDisplayNone() called');
		if($overlay.getAttribute('hidden'))
		{
			console.log('overlayDisplayNone() running');
			$overlay.setStyle('display', 'none');
			$overlay.setStyle('z-index', '-1');
			$overlay.setAttribute('transitioning', 'no');
			$mouseOut.hide();
			$overlay._node.removeEventListener('transitionend', overlayDisplayNone);
		}
	};

	var populateOverlayData = function($overlay, pID)
	{
		$overlay.one('.tech_txt').set('innerHTML', projectData[pID].technologies);
		$overlay.one('.platform_txt').set('innerHTML', projectData[pID].platformtxt);
	};

	var shiftInOverlay = function($overlay, $mouseOut, direction)
	{
		$mouseOut.hide();
		$overlay.setStyle('opacity', '1.0');

		switch(direction)
		{
			case 'left':
				$overlay.setStyle('right', ( '210px'));
				$overlay.addClass('r_overlay');
				break;
			case 'right':
			default:
				$overlay.setStyle('left', ( '210px'));
				$overlay.removeClass('r_overlay');
				break;
		}
		$overlay.setAttribute('transitioning', 'yes');
		$overlay.setStyle('top', '-20px');
		$overlay.setStyle('width', '400px');
		window.setTimeout(function(){
			$overlay._node.addEventListener('transitionend', enableMouseOut($overlay, $mouseOut));
		}, 250);

	};

	var setOverlayReady = function($overlay, $mouseOut, direction)
	{
		switch(direction)
		{
			case 'left':
				$overlay.setStyle('right', '90px');
				$overlay.setStyle('left', 'auto');
				$overlay.addClass('r_overlay');
				break;
			case 'right':
			default:
				$overlay.setStyle('left', '90px');
				$overlay.setStyle('right', 'auto');
				$overlay.removeClass('r_overlay');
				break;
		}

		$overlay.setStyle('top', '-20px');
		$overlay.setStyle('width', '0px');
		$mouseOut.hide();
		$overlay.setAttribute('transitioning', 'yes');
		$overlay._node.addEventListener('transitionend', overlayDisplayNone($overlay, $mouseOut));
	};


	projects.each(function(taskNode) 	//for each project clone them and create
	{                                   //an overlay with its appropriate behavior
		var $overlay = $originOverlay.cloneNode(true);
		populateOverlayData($overlay, taskNode.getAttribute('pid'));
		var direction = (taskNode.getX() <= document.body.clientWidth / 2) ?
			'right' : 'left';  			//direction overlay will come in towards
		var $mouseOut = $overlay.one('.trigger_mouseout');

		setOverlayReady($overlay, $mouseOut, direction);

		$mouseOut.on('mouseover', function()
		{
			if($overlay.getAttribute('transitioning') != 'yes' && !$mouseOut.getAttribute('hidden'))
			{
				var direction = (taskNode.getX() <= document.body.clientWidth / 2) ?
					'right' : 'left';  			//direction overlay will come in towards
				setOverlayReady($overlay, $mouseOut, direction);	//append for left direction
			}
		});

		taskNode.on('click', function()
		{
			var projectId = taskNode.getAttribute('pid');
			window.location.href="projects/" + projectId;
		});

		taskNode.on('mouseleave', function()
		{
			$overlay.setStyle('opacity', '0');
			var direction = (taskNode.getX() <= document.body.clientWidth / 2) ?
				'right' : 'left';  			//direction overlay will come in towards
			setOverlayReady($overlay, $mouseOut, direction);
		});

		taskNode.on('mouseenter', function()
		{
			if(document.body.clientWidth >= 680)
			{
				$overlay.setStyle('display', 'block');
				$overlay.setStyle('z-index', 500);
				$mouseOut.hide();
				window.setTimeout(function() //the usual fix for aftesr 'block' to opacity transition
				{
					var direction = (taskNode.getX() <= document.body.clientWidth / 2) ?
						'right' : 'left';  			//direction overlay will come in towards
					shiftInOverlay($overlay, $mouseOut, direction);
				}, 20);
			}
		});
		//append this new node to the project div
		$overlay.appendTo(taskNode);
	});
	$originOverlay.remove({destroy: true});   //destroy the original overlay
	                                          //since it's not being used
});