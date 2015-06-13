// == REQUIRES ==
'use strict';
require(['../dist/multimarkdown'], function (multimarkdown) {

    var i,
        input = document.getElementById("in"),
        iframe = document.getElementById("out"),
        render,
        renderer = new multimarkdown.Renderer(multimarkdown.RendererType.MULTIMARKDOWN, {
            parserExtensions: [multimarkdown.MultiMarkdown.EXT_SMART]
        }),
        els = document.querySelectorAll("#sidebar div");
    for (i = 0; i < els.length; i++) {
        els[i].onclick = (function (el) {
            return function () {
                renderer = new multimarkdown.Renderer(el.textContent, {});
                console.log("changing renderer to " + el.textContent);
                render(input.value);
            };
        })(els[i]);
    }

    var render = function (input) {
        renderer.render(input, function (s) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(s);
            iframe.contentWindow.document.close();
        });

    };

    input.onkeyup = function (e) {
        render(e.target.value);
    }
});
