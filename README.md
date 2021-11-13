# Guqin Tablature Composer

## Brief Intro to NL Tabs
Create Guqin music with the NLTabs (Numeric Linear Tablature) system. This creates Guqin music with a simple entry method. Guqin Notation traditionally has been a bit tricky to read. It's efficient in that it compresses a bunch of playing instructions into characters. However, it has a rather steep learning curve, and more importantly I could not find a way to write scores in the traditional notation on a computer. I don't really own paper anymore, so..... I created my own system for writing Guqin music! 

NLTabs basically converts the finger positions into a more visual schema, using lines to represent lines (crazy!) of the Guqin, and numbers to represent which position along the line to press or touch. The text above the 7 line tabs represent what you do with your right hand and which finger to use, and the text below represent what you do with your left. 

Here's a comparison between traditional format and NL Tabs. 

| Traditional Notation      | NLTabs Notation            |
| --------------------------| ---------------------------|
| ![old style](https://guqin.nyl.io/geese1.png) | ![new style](https://guqin.nyl.io/geese2.png)  |

Check out my blog post for [more information](https://blog.nyl.io/guqin-part-3-tablature-old-and-new/) on the NLTabs notation.

**Interested in seeing some music in this format?** [Browse the Guqin Tabs Library <i class="fas fa-arrow-circle-right"></i>](https://guqin.nyl.io/library.html)

## Composing and Rendering Scores

To make it easier for me to write music, I also developed a shorthand which converts into the tablature format you see above. A "减字谱" (jianzipu) if you will, or 减字Tabs. 

The shorthand is broken into `n:` lines (notes) and `f:` lines (finger positions). The note lines follows your basic LilyPond flavor notation, where notes are represeted by `a`-`g` (FanYin represented by capitalized `A`-`G`). Rhythms are represented by numbers (`4` is a quarter note, `2` is a half note). So `c4` is a bass c quarter note. 

The finger lines has three main parts. (1) The number `1`-`7` represents which string to use. (2) Left hand positions are represented by `s` (4th finger/ring), `d` (3rd finger/middle), `f` (2nd finger/index), `v` (1st finger/thumb). Because this is where they rest on the US keyboard. (3) Right hand positions, similarly based on where fingers rest on the keyboard follows as such: `n` (thumb plucking inward), `j` (index plucking inward), `k` (middle plucking inward), `h` (thumb plucking outward), etc. There are also options for characters like `~` to represent vibratos; `/` and `\` to represent sliding in and out of a note.

Here's a quick example:

**Shorthand**
```
title: Getting Started
tuning: g, a, c d e g a

n: g,4. a,8 c2 | g4. a8 c'2 | 
f: 1 2 3 | 1vk 3s 4uv |

n: cc'2. g,4 $ |  g4 g' e' d'8 c' | cc'4 C'8 G C'2
f: by35v~~ 1j $ |  6 6v - - wc | /35bys v3u 1di vu3
```

**Tabs Generated**

<img src="https://guqin.nyl.io/gettingstartedtabs.png" width="600">

**Want a full analysis of what is going on here?** [Check out the Getting Started Page <i class="fas fa-arrow-circle-right"></i>](https://guqin.nyl.io/gettingstarted.html)

**Want to write something?** [Start composing <i class="fas fa-arrow-circle-right"></i>](https://guqin.nyl.io/nltabs)

# Run this Website Locally

1. Clone repo
2. `npm install`
3. create folders: `/music` and `/public/temp` and `/errorlogs`
4. Install LilyPond command line (lilypond.org)
5. `node app.js`
