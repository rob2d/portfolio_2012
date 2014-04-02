YUI().use('node', function(Y)
{
	var $skyline = Y.one('#skyline'),
		$skylineBottom = Y.one('#skyline_bottom');
	$skylineBottom.setStyle('height', '100%');	//init height
	
	//set height proportionalally to the skyline/window width
	$skyline.setStyle('height', $skyline._node.clientWidth /3.415);
	var topOffset = parseInt($skyline.getStyle('top'));
	var scrollSpeed = 0.125;	//adjust for parallax of cityscape

	var parallaxFn = function()
	{
		$skyline.setStyle('height', $skyline._node.clientWidth /3.415);
		//parallax of the top city section
		var skylineTop = Math.round(topOffset + (-window.pageYOffset * scrollSpeed));
		$skyline.setStyle('top', skylineTop + 'px');
		//now take the bottom segment and resize/position it relative to the top and the window
		var skylineBottom = skylineTop + parseInt($skyline._node.clientHeight) - 1;
		console.log(skylineBottom);
		$skylineBottom.setStyle('top', skylineBottom + 'px');
		var skylineBottomHeight = (window.innerHeight-skylineBottom);
	};

	Y.on('scroll', parallaxFn);
	Y.on('resize', parallaxFn);
	parallaxFn();	//initial call to parallax function
});