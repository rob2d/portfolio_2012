
/*
 * GET home page.
 */

exports.index = function(req, res)
{
  res.render('about', { title: 'About' });
};

exports.projects = function(req, res)
{
  res.render('projects', { title: 'Browse Projects' });
};

exports.cv = function(req, res)
{
  res.render('resume', { title: 'CV' });
};

exports.view_project = function(req, res)
{
	console.log(req.params);
	req.query.pid = req.params.project_id;
	res.render('view_project', {title: "Viewing a Project...", project_id : req.params.project_id});
};