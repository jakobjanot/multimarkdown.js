#include "parser.h"

#ifdef EMSCRIPTEN
#include <emscripten.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif

char *render(char *markdown)
{
  return markdown_to_string(markdown, 1, 1);
}

#ifdef __cplusplus
}
#endif
