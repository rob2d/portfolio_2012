YUI.add('screenshot-view', function(Y)
{
	/* -----------------< Screenshot Overlay >--------------------*/
	Y.SSView =
	{
		initialized : false,
		screenshots : undefined,
		srcList     : undefined,
		currentImage: new Image(),
		viewIndex   : undefined,
		/* pre-fetched YUI Nodes */
		N :
		{
			$sectionContent: Y.one('.project_info_box'),
			$screenOverlay : Y.one('#screenshot_overlay'),
			$screenBox  : Y.one("#screenshot_box"),
			$screenImg  : Y.one('.screenshot_img'),
			$screenDesc : Y.one('#screen_desc p'),
			$selectors: Y.one('#screen_selector_circles'),
			$closeBtn       : Y.one('#screenshot_close_btn'),
			$thumbsBox: Y.one('#project_screens'),
			$thumbOverlayL : Y.one("#screens_overlay_l"),
			$thumbOverlayR : Y.one("#screens_overlay_r")
		},
		/* resize the overlay and components when either the screensize is changed or the user scrolls */
		updateView      : function()
		{
			var sectionContentTop = this.N.$sectionContent.getY() - 12;
			//place overlay under project title
			var overlayTop = (sectionContentTop - window.pageYOffset) > 0 ? (sectionContentTop - window.pageYOffset) : 0;
			//find out how much space there is for scrolling left
			var yScrollSpace= document.body.clientHeight - window.pageYOffset;
			
			var yOverlaySpace= (window.innerHeight - overlayTop);
			this.N.$screenOverlay.setStyle('top', overlayTop);
			//the overlay's height
			var overlayH = yOverlaySpace - 60;

			this.N.$screenOverlay.setStyle('height', overlayH + 'px');


			if(this.N.$screenImg.get('src'))  //fetch when we have an image loaded
			{
				//check heights of screenshot vs overlay height
				var screenshotWidth  = parseInt(this.N.$screenImg.getStyle('width'));
				var screenshotHeight = parseInt(this.N.$screenImg.getStyle('height'));
				var overlayHeight =    parseInt(this.N.$screenOverlay.getStyle('height'));

				if(screenshotHeight <= overlayHeight &&  screenshotWidth < window.innerWidth)
				{
					this.N.$screenImg.set('width', '90%');
					this.N.$screenImg.set('height', 'auto');
				}
				else if(screenshotHeight > overlayHeight || screenshotWidth >= window.innerWidth)
				{   //set style of screenshot to stretch vertically and auto width adjust...
					this.N.$screenImg.setStyle('width', 'auto');
					this.N.$screenImg.setStyle('height', '100%');
				}
			}
		},
		// screenNumber -> index of the screenshot to open
		//screenCoords -> coordinates of the launching image
		openView   : function(screenNumber, $thumbNode)
		{
			var that = this;
			if(!this.initialized)	//initialize if neccessary
				this.init();
			this.setScreenIndex(screenNumber);
			this.setEnabled(true);	//enable the view
			var $spinNode = Y.Node.create('<img>');
			$spinNode.setAttribute('index', screenNumber + ""); //track index of the spinning image
			$spinNode.addClass('spinning_thumb');
			$spinNode.set('src', $thumbNode.get('src'));

			//get position of the thumbnail coordinates on page(body's absolute pos),
			//apply them to spinning image's position, then save it's attribute
			// to 'originX' and 'originY'
			var originX = $thumbNode.getX(),
				originY = $thumbNode.getY(),
				originW = $thumbNode.get('width'),
				originH = $thumbNode.get('height');
			$spinNode.setAttribute('originX', originX);
			$spinNode.setAttribute('originY', originY);
			$spinNode.setStyle('left', originX);
			$spinNode.setStyle('top',  originY);
			$spinNode.set('width', $thumbNode.get('width'));
			$spinNode.set('height', $thumbNode.get('height'));

			$spinNode.set('src', $thumbNode.get('src'));

			//add the node to the body and initially set as transparent
			$spinNode.appendTo(window.document.body);
			$thumbNode.setStyle('opacity', '0');
			var that = this;
			//must animate in a time-out to allow the browser a transition			
			window.setTimeout(function(){
				var $screenImg = that.N.$screenImg;
				$spinNode.addClass('spinning_thumb_anim');
				that.updateView();
				$spinNode.setStyle('left',   $screenImg.getX());
				$spinNode.setStyle('top',    $screenImg.getY());
				$spinNode.setStyle('width',  $screenImg.get('width'));
				$spinNode.setStyle('height', $screenImg.get('height'));
			}, 100);
		},
		setScreenIndex : function(index)
		{

			Y.all('.selected').each(function(taskNode)
			{
				taskNode.removeClass('selected');
			});
			Y.one('#screen_selector_' + index).addClass('selected');
			this.viewIndex = index;     //update index
			this.N.$screenImg.set('src', this.srcList[index].url);
			this.N.$screenDesc.set('innerHTML', this.srcList[index].desc);
		},
		setEnabled : function(enabled)
		{

			var that = this;
			var overlayTransitionedFn = function()
			{
				that.N.$screenOverlay.setStyle('z-index', '-1');
				that.N.$screenOverlay.setStyle('display', 'none');

				that.N.$screenOverlay._node.removeEventListener('transitionend', overlayTransitionedFn);
			};

			if(enabled) //allow for the spinning thumbnail to be viewed
			{
				this.N.$screenImg.set('width', '90%');
				this.N.$screenImg.set('height', 'auto');
				this.N.$screenOverlay.setStyle('display', 'block');
				that.N.$thumbOverlayL.setStyle('opacity', '0');
				that.N.$thumbOverlayR.setStyle('opacity', '0');
				window.setTimeout(function(){
					that.N.$screenOverlay.setStyle('opacity', '1');
					that.updateView();	//first call
				}, 10);
				this.N.$screenOverlay.setStyle('z-index', '500');
			}
			else
			{
				Y.all('.spinning_thumb').each(function($n){
					$n.removeClass('spinning_thumb_anim');
					$n.setStyle('width', $n.getAttribute('originW'));
					$n.setStyle('height', $n.getAttribute('originH'));
					$n.setStyle('left', $n.getAttribute('originX'));
					$n.setStyle('top', $n.getAttribute('originY'));

					$n._node.addEventListener('transitionend', function(){
						var $originThumb = Y.one('#screenshot_thumb_' + $n.getAttribute('index'));
						if($originThumb) //when the spinning thumbnail gets back in place, reset things...
						{
							$originThumb.setStyle('opacity', '1');
							that.N.$thumbOverlayL.setStyle('opacity', '1');
							that.N.$thumbOverlayR.setStyle('opacity', '1');
							$n.remove({destroy: true});
						}
					});
				});
				this.N.$screenOverlay._node.addEventListener('transitionend', overlayTransitionedFn);
				this.N.$screenOverlay.setStyle('opacity', '0');
				this.N.$thumbsBox.setStyle('opacity', '1');
			}
		},
		init : function(srcList, screenNumber)
		{
			var that = this;
			this.N.$screenOverlay.setStyle('visibility','visible');
			this.N.$screenOverlay.setStyle('z-index','-1');
			this.N.$screenOverlay.setStyle('opacity','0');

			if(!this.initialized)	//if not the first time running, mark it
				this.initialized = true;

			/** initialize the list of files */
			if(srcList)
			{
				this.srcList = srcList;
				for(var i= 0,n=srcList.length; i < n; i++)
				{
					var $newCircle = Y.Node.create('<div>');
					$newCircle.addClass('screen_selector');
					$newCircle.set('id', 'screen_selector_' + i);
					$newCircle.appendTo(this.N.$selectors);
				}

				if(screenNumber)
				{   //set the current image
					this.setScreenIndex(screenNumber);
					Y.one('#screen_selector_' + screenNumber).addClass('selected');
				}
			}

			//----- updating the component -----//
			//add event listeners to update the component
			window.addEventListener('resize', function()
			{
				that.N.$screenImg.set('width', '90%');
				that.N.$screenImg.set('height', 'auto');
				that.updateView(); });
			Y.on('scroll', function() {
				that.N.$screenImg.set('width', '90%');
				that.N.$screenImg.set('height', 'auto');
				that.updateView();});

			this.N.$closeBtn.on('click', function()
			{
				that.setEnabled(false);
			});

			Y.all('.screen_selector').each(function($n)
			{
				var $thisN = $n;
				$n.on('hover', function()
				{
					var id = $thisN.get('id');
					that.setScreenIndex(id.substr(id.length-1));
				});
			});
			this.updateView();
		}
	}
	},
	'0.0.1', 			   //version number
	{requires: ['node', 'event-hover']}  //list of dependency modules
);