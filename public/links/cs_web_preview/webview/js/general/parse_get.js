//load GET url data into an array called GETDATA
//get all data following the ? after the URL
var sGet = decodeURI(window.location.search);
sGet.replace(/"/g, "");
GETDATA = Array();
if(sGet)	//if we retrieved some value...
{
	sGet = sGet.substr(1);	//drop leading ?
	
	//split string based on ?s
	var sNVPairs = sGet.split("&");
	
	for(var i = 0; i < sNVPairs.length; i++)
	{
		//look at currently retrieved pair and split it
		var sNV = sNVPairs[i].split("=");

		//assign the first pair to GETDATA array
		var sName = sNV[0];
		var sValue= sNV[1];
		GETDATA[sName] = sValue;
	}
}