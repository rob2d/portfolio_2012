/** Object which stores data pertaining to the current
 *  achievements listed on screen */
var AchievementData = function()
{
	this.achCount        = 0;
	this.achStarCount    = 0;
	this.achMaxStarCount = 0;
	this.achievements    = []; //achievement objs created
	this.achPrintCount   = 0; //how many were printed so far
	var that             = this;
	
	return{
		achievements    : that.achievements,
		achCount        : that.achCount,
		achMaxStarCount : that.achMaxStarCount,
		achStarCount    : that.achStarCount,
		achPrintCount   : that.achPrintCount
	};
}
//a singleton instance of our achievement data
var achData = new AchievementData();
//*******************************************//

/** ADT to represent an achievement recorded 
 *  parameters: name, 
 *  			desc, 
 *  			level, 
 *  			lvlCount, 
 *  			lvlReqs, 
 *  			lvlProgress
 * */
var Achievement = function(params)
{
	this.name        = params.name;
	this.desc        = params.desc;
	this.level 	     = params.level,
	this.lvlCount    = params.lvlCount;
	this.lvlReqs     = params.lvlReqs || [];
	this.lvlProgress = params.lvlProgress;
	this.aIndex   = achData.achCount++;
	var that = this;

	achData.achStarCount += this.level;
	achData.achMaxStarCount += this.lvlCount;
	
	return {
				setName : function(aN)
				{
					that.name = aN;
				},
				getName : function()
				{
					return that.name;
				},
				setLevel : function(aL)
				{
					that.level = aL;
				},
				getLevel : function()
				{
					return that.level;
				},
				getLvlCount : function()
				{
					return that.lvlCount;
				},
				getLvlProgress : function()
				{
					return (that.lvlProgress / that.lvlReqs[that.level-1]) * 100 + "%";
				},
				setDesc : function(aD)
				{
					that.desc = aD;
				},
				getDesc : function()
				{
					var strDesc = that.desc;
					strDesc = strDesc.replace("_X", that.lvlReqs[that.level-1]);
					return strDesc;
				},
				getIndex : function()
				{
					return that.aIndex;
				}
			};
}