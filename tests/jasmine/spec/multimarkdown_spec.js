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

    describe('TaskPaper.Renderer', function() {
        var renderer = new multimarkdown.Renderer(multimarkdown.RendererType.TASKPAPER, {});
        it('should render TaskPaper', function() {
            var cases = {
                "project 1:\n -task1\n -task2": '<ul class="taskpaper"><li class="taskpaper-project">project 1</li>\n\n' + ' <li class="taskpaper-note">-task1</li>\n\n' + ' <li class="taskpaper-note">-task2</li>\n\n' + '</ul>'
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

    describe('Textile.Renderer', function() {
        var renderer = new multimarkdown.Renderer(multimarkdown.RendererType.TEXTILE, {});
        it('should render Textile', function() {
            var cases = {
                '*bold*': '<p><strong>bold</strong></p>'
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
