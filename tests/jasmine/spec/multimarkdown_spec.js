define(['../../../dist/multimarkdown'], function(multimarkdown) {

    describe('multimarkdown', function() {
        it('should work with require.js', function() {
            expect(multimarkdown).toBeTruthy();
        });
    });

    describe('MultiMarkdown.Renderer', function() {
        var renderer = new multimarkdown.Renderer(multimarkdown.RendererType.MULTIMARKDOWN, {
            exportFormat: multimarkdown.MultiMarkdown.ExportFormat.HTML_FORMAT
        });
        it('should render MultiMarkdown', function() {
            var cases = {
                "**bold**": "<p><strong>bold</strong></p>"
            };
            for (var input in cases) {
                renderer.render(input, function(output) {
                    // console.log("input=" + input + " output=" + output);
                    expect(output).toEqual(cases[input]);
                });
            }
        });
        it('should return its metadata', function() {
            var md = renderer.metadata();
            console.log(md);
            expect(md).toBeTruthy();
        });
    });
});
