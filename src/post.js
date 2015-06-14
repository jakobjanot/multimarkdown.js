(function() {

    /*****************
     * MULTIMARKDOWN *
     *****************/
    // Create wrapped versions of the functions exported by libmultimarkdown
    var markdown_to_string = Module.cwrap('markdown_to_string', 'string', ['string', 'number', 'number']);
    var mmd_version = Module.cwrap('mmd_version', 'string', []);

    var MultiMarkdown = {};

    MultiMarkdown.ParserExtension = {
        "COMPATIBILITY": 1 << 0,
        "COMPLETE": 1 << 1,
        "SNIPPET": 1 << 2,
        "SMART": 1 << 4,
        "NOTES": 1 << 5,
        "NO_LABELS": 1 << 6,
        "FILTER_STYLES": 1 << 7,
        "FILTER_HTML": 1 << 8,
        "PROCESS_HTML": 1 << 9,
        "NO_METADATA": 1 << 10,
        "OBFUSCATE": 1 << 11,
        "CRITIC": 1 << 12,
        "CRITIC_ACCEPT": 1 << 13,
        "CRITIC_REJECT": 1 << 14,
    };

    MultiMarkdown.ExportFormat = {
        "HTML": 0,
        "TEXT": 1,
        "LATEX": 2,
        "MEMOIR": 3,
        "BEAMER": 4,
        "OPML": 5,
        "ODF": 6,
        "RTF": 7,
        "CRITIC_ACCEPT": 9,
        "CRITIC_REJECT": 10,
        "CRITIC_HTML_HIGHLIGHT": 11,
    };

    MultiMarkdown.Renderer = function(opts) {
        this._parserExtensionsSum = 0;
        var format = 0 /* HTML_FORMAT */ ;
        if (opts.parserExtensions) {
            for (var i = opts.parserExtensions.length - 1; i >= 0; i--) {
                this._parserExtensionsSum =
                    this._parserExtensionsSum | opts.parserExtensions[i];
            };
        }
        if (opts.exportFormat) {
            this._exportFormat = opts.exportFormat;
        }
    }

    MultiMarkdown.Renderer.render = function(input, cb) {
        cb(markdown_to_string(input, this._parserExtensionsSum, this._exportFormat));
    };

    MultiMarkdown.Renderer.metadata = function() {
        return {
            url: "https://github.com/fletcher/MultiMarkdown-4",
            version: mmd_version(),
            id: "markdown/multimarkdown/" + mmd_version(),
            name: "MultiMarkdown"
        };
    };

    // see https://github.com/umdjs/umd
    if (typeof module === "object" && module.exports) {
        // CommonJS (Node)
        module.exports = MultiMarkdown;
    } else if (typeof define === "function" && define.amd) {
        // AMD
        define(function() {
            return MultiMarkdown;
        });
    }
})();
