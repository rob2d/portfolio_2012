/**
 * Contains functions to parse URL parameters from a string as well as a convenient method or the window document URL
 * original parse code written by Jai on StackOverflow(http://stackoverflow.com/users/270836/jai),
 * modified by Robert Concepcion III */
var parseParams = function(url)
{
	var parse = function(params, pairs)
	{
		var pair = pairs[0];
		var parts = pair.split('=');
		var key = decodeURIComponent(parts[0]);
		var value = decodeURIComponent(parts.slice(1).join(''));

		// Handle multiple parameters of the same name
		if (typeof params[key] === "undefined") {
			params[key] = value;
		} else {
			params[key] = [].concat(params[key], value);
		}

		return pairs.length == 1 ? params : parse(params, pairs.slice(1))
	}

	// Get rid of leading ?
	return url.length == 0 ? {} : parse({}, url.substr(1).split('&'));
};

var parseUrlParams = function()
{
	return parseParams(location.search);
};