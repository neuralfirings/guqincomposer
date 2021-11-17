CodeMirror.defineSimpleMode("guqinjzp", {
  start: [
    {regex: /D|F|S|V|c|d|f|g|h|i|j|k|l|n|o|s|u|v|w|x/, token: "jzp"},
    {regex: / \| | \. | \|\| | \.\| | \.\. | \|\.\| | \|. | \.\|\: | \:\.\.\: | \:\|\.\|\: | \:\.\|\.\: | \[\|\: | \:\|\]\[\|\: | \:\|\] | \:\|\. /, token: "bars"},
    {regex: / \|$| \.$| \|\|$| \.\|$| \.\.$| \|\.\|$| \|.$| \.\|\:$| \:\.\.\:$| \:\|\.\|\:$| \:\.\|\.\:$| \[\|\:$| \:\|\]\[\|\:$| \:\|\]$| \:\|\./, token: "bars"},
    {regex: /(?:function|var|return|if|for|while|else|do|this)\b/, token: "keyword"},
  ]
});
