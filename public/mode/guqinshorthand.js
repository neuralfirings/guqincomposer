CodeMirror.defineSimpleMode("guqinshorthand", {
  start: [
    {regex: /\/\/.*/, token: "comment"},
    {regex: /jianzipu (.*):|jianzipu:|title:|composer:|timesig:|tuninglabel:|voice:|fyhuirange:|tuning:|temperament:|showtimesig:|showtabs:|showjianzipu:|bars:|key:|time:|clef:|tempo:|mark:/, token: "keyword"},
    {regex: /n:/, token: "notes"},
    {regex: /f:/, token: "fingers"},
    {regex: /j:/, token: "keyword"},
    {regex: /\||\.|\|\||\.\||\.\.|\|\.\||\|.|\.\|\:|\:\.\.\:|\:\|\.\|\:|\:\.\|\.\:|\[\|\:|\:\|\]\[\|\:|\:\|\]|\:\|\./, token: "bars"},
    {regex: /\|$|\.$|\|\|$|\.\|$|\.\.$|\|\.\|$|\|.$|\.\|\:$|\:\.\.\:$|\:\|\.\|\:$|\:\.\|\.\:$|\[\|\:$|\:\|\]\[\|\:$|\:\|\]$|\:\|\./, token: "bars"},
    {regex: /\\n/, token: "endl"},
    {regex: /\?/, token: "uncertainty"},
    {regex: /\[\[/, token: "jzpbrackets", mode: {spec: "guqinjzp", end: /\]\]/}},
    // {regex: /f:/, token: "jzpbrackets", mode: {spec: "guqinjzp", end: /$/}},
  ],
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});

CodeMirror.defineSimpleMode("guqinjzp", {
  start: [
    // {regex: /\/\/.*/, token: "comment"},
    {regex: /\?/, token: "uncertainty"},
    {regex: /D|F|S|V|c|d|f|g|h|i|j|k|l|n|o|s|u|v|w|x|by|yb|b9|9b|b8|8b|H|U|I|O/, token: "jzp"},
    {regex: /\||\.|\|\||\.\||\.\.|\|\.\||\|.|\.\|\:|\:\.\.\:|\:\|\.\|\:|\:\.\|\.\:|\[\|\:|\:\|\]\[\|\:|\:\|\]|\:\|\./, token: "bars"},
    {regex: /\|$|\.$|\|\|$|\.\|$|\.\.$|\|\.\|$|\|.$|\.\|\:$|\:\.\.\:$|\:\|\.\|\:$|\:\.\|\.\:$|\[\|\:$|\:\|\]\[\|\:$|\:\|\]$|\:\|\./, token: "bars"},
    {regex: /\"|\“|\”/, token: "jzpbrackets", mode: {spec: "text", end: /\"|\“|\”/}},
    {regex: /\'|\’|\‘/, token: "jzpbrackets", mode: {spec: "text", end: /\'|\’|\‘/}},
  ]
});


/* Example definition of a simple mode that understands a subset of
 * JavaScript:
 */

CodeMirror.defineSimpleMode("javascript", {
  // The start state contains the rules that are initially used
  start: [
    {regex: /\/\/.*/, token: "comment"},
    // You can embed other modes with the mode property. This rule
    // causes all code between << and >> to be highlighted with the XML
    // mode.
    {regex: /<</, token: "meta", mode: {spec: "xml", end: />>/}},
    // The regex matches the token, the token property contains the type
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    // You can match multiple tokens at once. Note that the captured
    // groups must span the whole string in this case
    {regex: /(function)(\s+)([a-z$][\w$]*)/,
     token: ["keyword", null, "variable-2"]},
    // Rules are matched in the order in which they appear, so there is
    // no ambiguity between this one and the one above
    {regex: /(?:function|var|return|if|for|while|else|do|this)\b/,
     token: "keyword"},
    {regex: /true|false|null|undefined/, token: "atom"},
    {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
     token: "number"},
    {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
    // A next property will cause the mode to move to a different state
    {regex: /\/\*/, token: "comment", next: "comment"},
    {regex: /[-+\/*=<>!]+/, token: "operator"},
    // indent and dedent properties guide autoindentation
    {regex: /[\{\[\(]/, indent: true},
    {regex: /[\}\]\)]/, dedent: true},
    {regex: /[a-z$][\w$]*/, token: "variable"},
  ],
  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});