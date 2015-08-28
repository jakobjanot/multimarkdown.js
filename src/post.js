var MultiMarkdown = (function() {
  var ParserExtension = {
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

  var ExportFormat = {
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

  // var Renderer = function(opts) {
  //   this._parserExtensionsSum = 0;
  //   var format = 0 /* HTML_FORMAT */ ;
  //   if (opts.parserExtensions) {
  //       for (var i = opts.parserExtensions.length - 1; i >= 0; i--) {
  //           this._parserExtensionsSum =
  //               this._parserExtensionsSum | opts.parserExtensions[i];
  //       }
  //   }
  //   if (opts.exportFormat) {
  //       this._exportFormat = opts.exportFormat;
  //   }
  // };

  var c_render = Module.cwrap('render', 'string', ['string']);//, 'number', 'number']);
// var version = Module.cwrap('version', 'string', []);

  var render = function(input_str, callback) {
    // Allocate space for string and extra '0' at the end
    var input_str_ptr = Module._malloc(input_str.length+1);

    // Write the string to memory
    Module.writeStringToMemory(input_str, input_str_ptr);

    // We can now send input_str_ptr into a C function, it is just a normal char* pointer
    var result_str_ptr = render(input_str_ptr);  //, this._parserExtensionsSum, this._exportFormat));
    // var result_str_ptr = render(input_str_ptr);  //, this._parserExtensionsSum, this._exportFormat));
    Module._free(input_str_ptr);

    // Convert the resulting string to a JS string
    var result_str = Pointer_stringify(result_str_ptr);
    callback(result_str);
  };

// MultiMarkdown.Renderer.metadata = function() {
//     return {
//         url: "https://github.com/fletcher/MultiMarkdown-4",
//         version: version(),
//         id: "markdown/multimarkdown/" + version(),
//         name: "MultiMarkdown"
//     };
// };

  return {
    render: render,
    ParserExtension: ParserExtension,
    ExportFormat: ExportFormat
  };
})();
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
