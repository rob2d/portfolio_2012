var projectData = {
	sonic360:
	{
		title: "Sonic Physics Engine",
		platforms: ['windows'],
		stores   : [],
		description: 'A pixel perfect rendition of the physics found in SEGA\'s ' +
		             '\"Sonic the Hedgehog\" series. The project utilizes many concepts '+
					 'found in physics and applied trigonometric math to an MVC style game ' +
			         'architecture that is continually processing while responding to player '
					+'input. The test features running on loops/slopes accurately, swimming, ' +
			         'artificial intelligence for a second player, advanced camera effects ' +
			         'and a boss battle. This project was created in a scripting language ' +
		 			 'with a syntax very similar to JavaScript and C called \"GML\".',
		technologies: 'Game Maker, GML',
		platformtxt:  ['Windows 98/XP/7/8'],
		source: [
			{desc: 'GitHub', url: 'http://github.com/rob2d/sonic_gml'},
			{desc: 'Direct DL ( .gmk)', url: 'downloads/sonic360_gmdl.gmk'}],
		screenshots: [
			{url: 'img/projects/screens/sonic360/sonic360_01.png', desc: 'Pushing spikes underwater'},
			{url: 'img/projects/screens/sonic360/sonic360_02.png', desc: 'Speed!'},
			{url: 'img/projects/screens/sonic360/sonic360_03.png', desc: 'Customizing Controllers'},
			{url: 'img/projects/screens/sonic360/sonic360_04.png', desc: 'Swimming as Tails'}],
		videos: [{url: 'http://www.youtube.com/watch?v=zRZOLzTaJq4&feature=player_embedded#!', desc: 'See it on Youtube'}],
		documentation: [{ url: 'http://corruptedchaos.blogspot.com/',
							desc: 'Blog (BlogSpot)'}
		],
		releases: [{url: 'downloads/sonic360_demo.exe', desc:'Download Demo'}]
	},

	colorshafted:
	{
		title: 'Color Shafted!',
		platforms: ['android', 'gtv'],
		stores:    {gplay: 'https://play.google.com/store/apps/details?id=com.whateversoft.colorshafted&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS53aGF0ZXZlcnNvZnQuY29sb3JzaGFmdGVkIl0.',
					amazon: 'http://www.amazon.com/Whateversoft-Color-Shafted/dp/B00B72CEWC/ref=sr_1_1?ie=UTF8&qid=1392872956&sr=8-1&keywords=Color+Shafted'},
		description: 'An interactive original 2D game for Android with a 100% custom built ' +
		             'Android 2D Game API. It features a optimized user experience for GoogleTV ' +
	                 'users, many customizable options, 2 modes of gameplay, an interactive tutorial ' +
			         ' and an online competitive high score mode. ',
		technologies: 'Android SDK, Java, XML, JSON, PHP, MySQL',
		platformtxt:  ['Android 2.2 and Higher', 'GoogleTV'],
		screenshots: [
			{url: 'img/projects/screens/colorshafted/colorshafted_01.jpg',
			 desc: 'Title Screen'},
			{url: 'img/projects/screens/colorshafted/colorshafted_02.jpg',
			 desc: 'Setting off a Bomb'},
			{url: 'img/projects/screens/colorshafted/colorshafted_03.jpg',
			 desc: 'High Score Mode'},
			{url: 'img/projects/screens/colorshafted/colorshafted_04.jpg',
			 desc: 'Breaking things down in Tutorial Mode'}
			],
		source: [
			{
				'desc': 'GitHub (earlier release)',
				'url': 'https://github.com/rob2d/color-shafted/tree/master/src/com/whateversoft'
			}],
		videos: [{url: 'http://www.youtube.com/watch?v=6iOen-STr4k',
				  desc: 'See it on Youtube'}
				],
		links : [{desc: 'GTV Friends Article',
				  url: 'http://gtvfriends.com/color-shafted-for-google-tv/'}
			   ]
	},

	csachievements:
	{
		title: 'CS Achievements',
		platforms: ['android', 'web'],
		description: 'An Achievements Mode Website for Color Shafted designed to run within the WebView of an Android ' +
		'Application. It receives JSON-formatted data from the Android application to conveniently ' +
		'interface with the app and dynamically generates content to browse within the web view. ' +
		'<br/><br/><i>[note: the version in this portfolio is using mock-data in the same format to display what ' +
		'it would be like when interfacing with the app. It is not designed for traditional browsers hence the small view area.]</i>',
		technologies: 'HTML5, CSS3, JavaScript (+jQuery)',
		platformtxt: ['Android 2.2 and Higher', 'GoogleTV'],
		screenshots: [
			{   url: 'img/projects/screens/csa/csa_01.png',
			   desc: 'Achievements Listings'
			}],
		links: [{ url: 'links/cs_web_preview/webview/achievements.html',
			     desc: 'View Project Online'
				}]
	},

	cpo:
	{
		title: 'Chinese Poker Online',
		platforms: ['android'],
		description: 'An interactive and animated rendition of "Big Two" card game a.k.a. "Chinese Poker" ' +
		'for Android. This was created for my undergraduate seminar project and is my first standalone ' +
		'Android App. It features are real-time online play(though not handled by sockets, but via dynamically ' +
		'changing MySQL tables), intuitive touch screen interface and beautiful graphics.',
		technologies: 'Android SDK, Java, XML, JSON, HTML, JavaScript, PHP, MySQL',
		platformtxt: ['Android 2.2 and Higher'],
		screenshots: [
					  {	url: 'img/projects/screens/cpo/cpo_01.png',
			   			desc: 'Title Screen'},
					  { url: 'img/projects/screens/cpo/cpo_02.png',
					    desc: 'Welcome Menu'},
					  { url: 'img/projects/screens/cpo/cpo_03.png',
					  	desc: 'Start of a new game'},
					  { url: 'img/projects/screens/cpo/cpo_04.png',
					   desc: 'Managing a hand for a play'}
					 ],
		videos:     [{ url: 'http://www.youtube.com/watch?v=F91K9oWimSg',
			           desc: 'See it on Youtube'}],
		source:     [{ url: 'https://github.com/rob2d/cpo_android',
					  desc: 'GitHub'},
					 { url: 'downloads/chinesepokeronlineSrcFolder.zip',
					   desc: 'Download(.zip)'
					 }]
	},
	sprite_edit:
	{
		title: 'Sprite Editor/.js Generator',
		description: 'A browser-based utility app created for the Browser Application Multimedia Framework. ' +
		'It allows you to construct animations -- including the images themselves and meta data, then ' +
		'allowing you to save and load data locally and export javascript code to use for projects utilizing the API. ',
		technologies: 'HTML5(Canvas, File), CSS3(+PureCSS), JavaScript (+YUI3, +JSZip)',
		platforms: ['web'],
		platformtxt: ['Web (Chrome, Firefox, IE)'],
		screenshots: [
			{	url: 'img/projects/screens/sprite_edit/sprite_edit_01.png',
				desc: 'Custom Dialog Boxes'},
			{ url: 'img/projects/screens/sprite_edit/sprite_edit_02.png',
				desc: 'Working with image frames for animations'}
		],
		source:[
			{   url: 'https://github.com/rob2d/bamf/tree/master/js/edit',
				desc: 'GitHub(.js code)'
			}],
		documentation: [
		{   url: 'doc/bamf_midterm_presentation.ppt',
			desc:'Midterm Presentation'
		}],
		links: [
			{ url: 'http://bamfapi.appspot.com/wip_versions/v2/editor/web/sprite_editor.html',
			  desc: 'View Project Online'
			}]
	},
	bamf:
	{
		title: 'B.A.M.F. Web Framework',
		description: 'The Browser-Based Application Multimedia Framework(or BAMF for short) ' +
					 ' was created to address the need for more open-source cohesive web APIs ' +
					 'for dealing with multimedia. It supports 2D, 3D(using a Three.js wrapper) and sound.' +
					 'It is efficient, simple, consistent, extensible and supports all modern browsers.',
		technologies:  'HTML5, JavaScript (+require.js, three.js), WebGL',
		platforms:  ['web'],
		platformtxt:['Web (Chrome, Firefox, IE)'],
		screenshots: [
			{	url: 'img/projects/screens/bamf/bamf_01.png',
				desc: 'early 3D app tech demo'},
			{ 	url: 'img/projects/screens/bamf/bamf_02.png',
				desc: 'general API structure overview'},
			{ 	url: 'img/projects/screens/bamf/bamf_03.png',
				desc: 'easy 2D apps' +
					'(early prototype)'},
			{	url: 'img/projects/screens/bamf/bamf_04.png',
				desc: 'An anim editor for framework apps'}
					 ],
		source:[
			{   url:'https://github.com/rob2d/bamf',
			   desc:'GitHub'
			}],
		links: [
			{
				url:'http://whateversoftweb.appspot.com/demo/cs3d/web/cs3d.html',
				desc:'3D TechDemo(W.I.P.)'
			}
		],
		documentation: [
			{
				url: 'doc/bamf_midterm_presentation.ppt',
				desc: 'Early Dev (.ppt)'
			},
			{
				url: 'doc/bamf_final_presentation.pptx',
				desc: 'Project Overview(.pptx)'
			}]
	}
};