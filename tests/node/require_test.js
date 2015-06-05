// Just ensure that we can load the node module
var multimarkdown = require('../../dist/multimarkdown.js');
if (!multimarkdown) {
	console.log("unable to load node module");
	process.exit(1);
}

var r = new multimarkdown.Renderer(multimarkdown.RendererType.MULTIMARKDOWN, {});
r.render("**bold**", function(html){
	console.log("**bold** => " + html);
})
