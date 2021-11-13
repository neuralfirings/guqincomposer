// { constants
  const lyMapAndExtract = ['~', "=", "/", "\\", ">", "<"]
  const lyMap = { 
    "0": { "type": "str", "value": 0 }, "1": { "type": "str", "value": 1 }, "2": { "type": "str", "value": 2 }, "3": { "type": "str", "value": 3 }, "4": { "type": "str", "value": 4 }, "5": { "type": "str", "value": 5 }, "6": { "type": "str", "value": 6 }, "7": { "type": "str", "value": 7 }, 
    "n": { "type": "rh", "value": "1v" }, "j": { "type": "rh", "value": "2v" }, "k": { "type": "rh", "value": "3v" }, "l": { "type": "rh", "value": "4v" }, ";": { "type": "rh", "value": "5v" }, 
    "h": { "type": "rh", "value": "1^" }, "u": { "type": "rh", "value": "2^" }, "i": { "type": "rh", "value": "3^" }, "o": { "type": "rh", "value": "4^" }, "p": { "type": "rh", "value": "5^" }, 
    "by": { "type": "rh", "value": "2^\"^\"3v" }, "yb": { "type": "rh", "value": "2^\"^\"3v" }, "b8": { "type": "rh", "value": "1^\"^\"3v" }, "8b": { "type": "rh", "value": "1^\"^\"3v" }, "b9": { "type": "rh", "value": "1v\"^\"3^" }, "9b": { "type": "rh", "value": "1v\"^\"3^" },  
    "g": { "type": "lh", "value": "1K" }, "w": { "type": "lh", "value": "4K" }, 
    "v": { "type": "lh", "value": 1 }, "f": { "type": "lh", "value": 2 }, "d": { "type": "lh", "value": 3 }, "s": { "type": "lh", "value": 4 }, "a": { "type": "lh", "value": 5 }, 
    "c": { "type": "lh", "value": "1v" }, "x": { "type": "lh", "value": "4G" }, "e": { "type": "lh", "value": "3^" }, 
    "V": { "type": "lh", "value": "1X" }, "F": { "type": "lh", "value": "2X" }, "D": { "type": "lh", "value": "3X" }, "S": { "type": "lh", "value": "4X" }, "A": { "type": "lh", "value": "5X" } 
  }
  const lyPitches = ['r', 'a','b','c','d','e','f','g']
  const lyFanYins = ['A','B','C','D','E','F','G']
  const lyBeats = ['1','2','3','4','5','6','7','8','9']
  const tuningEqual = [0,13.6,13.1,12.2,10.9,10.0,9.5,9.0,8.4,7.9,7.6,7.3,7.0,6.7,6.5,6.2,6.0,5.6,5.3,5.0,4.8,4.6,4.4,4.2,4.0,3.7,3.5,3.2,3.0,2.6,2.3,2.0,1.8,1.6,1.4,1.2,1.0]
  const tuningJust = [0,13.6,13.1,12.2,11.0,10.0,9.5,9.0,8.5,8.0,7.7,7.3,7.0,6.7,6.4,6.2,6.0,5.6,5.3,5.0,4.8,4.6,4.4,4.2,4.0,3.7,3.4,3.2,3.0,2.6,2.3,2.0,1.8,1.6,1.4,1.2,1.0]
  const harmonics = []
    harmonics[2*6]=[7]
    harmonics[2*9.5]=[5,9]
    harmonics[2*12]=[4,10]
    harmonics[2*14]=[3, 6, 8, 11,]
    harmonics[2*15.5]=[2,12]
    harmonics[2*17]=[1.4,4.4,6.3,7.7,9.6,12.6]
    harmonics[2*18]=[1,5.6,8.4,13]
    harmonics[2*19]=[0.9,3.4,6.4,7.6,10.6,13.1]
    harmonics[2*20]=[0.8,4.6,9.4,13.2]
  const lyStr1 = "% v9\nlm = #(define-music-function (note) (ly:music?) #{  \\override NoteHead.style = #'cross $note \\revert NoteHead.style #} )\nfy = #(define-music-function (pos note) ((number? 1) ly:music?) (let ( (stringNum (ly:prob-property (list-ref (ly:music-property note 'articulations) 0) 'string-number)) (tuning "
  const lyStr2 = ") (let ( (base (list-ref tuning stringNum)) ) (define noteP (ly:music-property note 'pitch)) (define baseP (ly:music-property base 'pitch)) (define intNote (ly:pitch-diff (ly:music-property base 'pitch) (ly:music-property note 'pitch) )) (define interval (ly:pitch-tones (ly:pitch-diff (ly:music-property note 'pitch) (ly:music-property base 'pitch)))) (cond ( (= interval 6 ) #{ \\transpose c f, { \\harmonicByFret #7 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 9.5 ) (= pos 5)) #{ \\transpose c g, { \\harmonicByFret #5 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 9.5 ) (= pos 9)) #{ \\transpose c ees, { \\harmonicByFret #9 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 9.5 ) (= pos 1)) #{ \\transpose c g, { \\harmonicByFret #5 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 12 ) (= pos 4)) #{ \\transpose c aes, { \\harmonicByFret #4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 12 ) (= pos 10)) #{ \\transpose c c'' { \\harmonicByFret #10 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 12 ) (= pos 1)) #{ \\transpose c aes, { \\harmonicByFret #4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 14 ) (= pos 3)) #{ \\transpose c a, { \\harmonicByFret #3 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 14 ) (= pos 6)) #{ \\transpose c e'' { \\harmonicByFret #6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 14 ) (= pos 8)) #{ \\transpose c e'' { \\harmonicByFret #8 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 14 ) (= pos 11)) #{ \\transpose c e'' { \\harmonicByFret #11 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 14 ) (= pos 1)) #{ \\transpose c e'' { \\harmonicByFret #6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 15.5 ) (= pos 2)) #{ \\transpose c f, { \\harmonicByFret #2 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 15.5 ) (= pos 12)) #{ \\transpose c g' { \\harmonicByFret #12 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 15.5 ) (= pos 1)) #{ \\transpose c f, { \\harmonicByFret #2 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 17 ) (= pos 1.4)) #{ \\transpose c bes'' { \\harmonicByFret #1.4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 17 ) (= pos 4.4)) #{ \\transpose c bes'' { \\harmonicByFret #4.4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 17 ) (= pos 6.3)) #{ \\transpose c bes'' { \\harmonicByFret #6.3 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 17 ) (= pos 7.7)) #{ \\transpose c bes'' { \\harmonicByFret #7.7 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 17 ) (= pos 9.6)) #{ \\transpose c bes'' { \\harmonicByFret #9.6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 17 ) (= pos 12.6)) #{ \\transpose c bes'' { \\harmonicByFret #12.6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 17 ) (= pos 1)) #{ \\transpose c bes'' { \\harmonicByFret #6.3 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 18 ) (= pos 1)) #{ \\transpose c c''' { \\harmonicByFret #1 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 18 ) (= pos 5.6)) #{ \\transpose c c''' { \\harmonicByFret #5.6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 18 ) (= pos 8.4)) #{ \\transpose c c''' { \\harmonicByFret #8.4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 18 ) (= pos 13)) #{ \\transpose c c''' { \\harmonicByFret #13 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 19 ) (= pos 0.9)) #{ \\transpose c d''' { \\harmonicByFret #0.9 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 19 ) (= pos 3.4)) #{ \\transpose c d''' { \\harmonicByFret #3.4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 19 ) (= pos 6.4)) #{ \\transpose c d''' { \\harmonicByFret #6.4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 19 ) (= pos 7.6)) #{ \\transpose c d''' { \\harmonicByFret #7.6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 19 ) (= pos 10.6)) #{ \\transpose c d''' { \\harmonicByFret #10.6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 19 ) (= pos 13.1)) #{ \\transpose c d''' { \\harmonicByFret #13.1 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 19 ) (= pos 1)) #{ \\transpose c d''' { \\harmonicByFret #6.4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 20 ) (= pos 0.8)) #{ \\transpose c e''' { \\harmonicByFret #0.8 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 20 ) (= pos 4.6)) #{ \\transpose c e''' { \\harmonicByFret #4.6 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 20 ) (= pos 9.4)) #{ \\transpose c e''' { \\harmonicByFret #9.4 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 20 ) (= pos 13.2)) #{ \\transpose c e''' { \\harmonicByFret #13.2 $(ly:music-transpose note intNote) } #} ) ( (and (= interval 20 ) (= pos 1)) #{ \\transpose c e''' { \\harmonicByFret #4.6 $(ly:music-transpose note intNote) } #} ) ( else #{ $note #} ) ) ) ) )"
  const lyStr3 = `tuningEqual = #'("0" "13.6"  "13.1"  "12.2"  "10.9"  "10"  "9.5"  "9"  "8.4"  "7.9"  "7.6"  "7.3"  "7"  "6.7"  "6.5"  "6.2"  "6"  "5.6"  "5.3"  "5"  "4.8"  "4.6"  "4.4"  "4.2"  "4"  "3.7"  "3.5"  "3.2"  "3"  "2.6"  "2.3"  "2"  "1.8"  "1.6"  "1.4"  "1.2"  "1")\ntuningJust = #'("0" "13.6" "13.1" "12.2" "11" "10" "9.5" "9" "8.5" "8" "7.7" "7.3" "7" "6.7" "6.4" "6.2" "6" "5.6" "5.3" "5" "4.8" "4.6" "4.4" "4.2" "4" "3.7" "3.4" "3.2" "3" "2.6" "2.3" "2" "1.8" "1.6" "1.4" "1.2" "1")`
  const lyStr4 = `\\layout { \\context { \\TabStaff stringTunings = \\stringTuning \\tuning fretLabels = \\tuningEqual }`
  const lyStr5 = `\\context { \\Score \\override RehearsalMark.self-alignment-X = #LEFT \\override RehearsalMark.font-size = #-1 } \\context { \\Staff \\hide TextScript \\override TrillSpanner.bound-details.left.text = ##f \\override Glissando.style = #'zigzag }`
  const lyStr6 = `\\context { \\TabStaff \\omit Clef \\omit ClefModifier \\revert TextScript.stencil \\override TextScript.font-size = #-3 \\override Glissando.style = #'zigzag \\override TabNoteHead.font-family = #'typewriter tablatureFormat = #fret-letter-tablature-format } \\textLengthOn \\omit Voice.StringNumber } \\midi {}`
  const lyStr7 = `<< \\new Staff  { \\song } \\new TabStaff { \\clef "moderntab" \\song } >>`
// } end

// String extensions
String.prototype.has = function(thing) {
  if (this.indexOf(thing) > -1)
    return true
  else
    return false
}
String.prototype.getParentheticals = function() {
  var txt2 = this.split('(');
  var matches = []
  for (var i = 1; i < txt2.length; i++) {
      matches.push(txt2[i].split(')')[0]);
  }
  return matches
}
String.prototype.removeParentheses = function() {
  var txt2 = this.split('(');
  var newTxt = this
  var matches = []
  for (var i = 1; i < txt2.length; i++) {
      matches.push(txt2[i].split(')')[0]);
  }
  for (var i=0; i<matches.length;i++) {
    var rm = '(' + matches[i] + ')'
    newTxt = newTxt.split(rm).join('')
  }
  return newTxt
}
String.prototype.beginsWith = function(str) {
  if (this.substring(0, str.length) == str)
    return true;
  else
    return false
}

// Helper Functions
function getPressedPosition(note,str) {
  if (tuning == undefined || tuning == '')
    var tuning = ['g,', 'a,', 'c', 'd', 'e', 'g', 'a']
  var tuningMethod = tuningEqual
  var chromatic = {"ces": -1,"c": 0,"cis": 1 ,"des": 1,"d": 2,"dis": 3,"ees": 3,"e": 4,"eis": 5,"fes": 4,"f": 5,"fis": 6 ,"ges": 6,"g": 7,"aes": 8,"gis": 8 ,"a": 9,"ais": 10 ,"bes": 10,"b": 11,"bis": 12}

  var pitch = note.split("'")[0].split(',')[0]
  var octUp = note.split("'").length-1
  var octDown = note.split(",").length-1
  var pitchNum = chromatic[pitch] + octUp*12 - octDown*12

  var pitchStr = tuning[str-1].split("'")[0].split(',')[0]
  var pitchStrNum = chromatic[pitchStr] + (tuning[str-1].split("'").length-1)*12 - (tuning[str-1].split(',').length-1)*12

  var dist = pitchNum-pitchStrNum
  if (dist < 0 || dist >= tuningMethod.length) {
    return false
  }
  else {
    return tuningMethod[dist]
  }
}
function getHarmonicPositions(note,str,tuning) {
  note=note.toLowerCase()
  if (typeof tuning == "undefined")
    var tuning = ['g,', 'a,', 'c', 'd', 'e', 'g', 'a']
  var tuningMethod = harmonics
  var chromatic = {"ces": -1,"c": 0,"cis": 1 ,"des": 1,"d": 2,"dis": 3,"ees": 3,"e": 4,"eis": 5,"fes": 4,"f": 5,"fis": 6 ,"ges": 6,"g": 7,"aes": 8,"gis": 8 ,"a": 9,"ais": 10 ,"bes": 10,"b": 11,"bis": 12}

  var pitch = note.split("'")[0].split(',')[0]
  var octUp = note.split("'").length-1
  var octDown = note.split(",").length-1
  var pitchNum = chromatic[pitch] + octUp*12 - octDown*12

  var pitchStr = tuning[str-1].split("'")[0].split(',')[0]
  var pitchStrNum = chromatic[pitchStr] + (tuning[str-1].split("'").length-1)*12 - (tuning[str-1].split(',').length-1)*12

  var dist = pitchNum-pitchStrNum
  if (tuningMethod[dist] == undefined) {
    return []
  }
  else {
    if (tuningMethod)
    return tuningMethod[dist]
  }
}
function getNumOnly(str) {
  newStr = ""
  valNums = ['0','1','2','3','4','5','6','7','8','9']
  for (var i=0;i<str.length;i++) {
    if (valNums.indexOf(str[i]) > -1)
      newStr += str[i]
  }
  return newStr
}
function removeNums(str) {
  newStr = ""
  valNums = ['0','1','2','3','4','5','6','7','8','9']
  for (var i=0;i<str.length;i++) {
    if (valNums.indexOf(str[i]) == -1)
      newStr += str[i]
  }
  return newStr
}

const invalidValues = ["linebreak", "time", "tempo", "clef", "mark", "fyhuirange", "ly", "|", "$", "="]
function getNextNote(song, i) {
  if (i == song.length-1)
    return "end"
  else {
    for (var j=i+1; j<song.length; j++) {
      var isNote = true
      for (var k=0;k<invalidValues.length;k++) {
        if (song[j].beginsWith(invalidValues[k]))
          isNote = false
      }
      if (isNote)
        return song[j]
      else if (j==song.length-1)
        return "end"
    }
  }
}
function getPrevNote(song, i) {
  if (i == 0)
    return "start"
  else {
    for (var j=i-1; j>-1; j--) {
      var isNote = true
      for (var k=0;k<invalidValues.length;k++) {
        if (song[j].beginsWith(invalidValues[k]))
          isNote = false
      }
      if (isNote)
        return song[j]
      else if (j<=0)
        return "start"
    }
  }
}

// Main Translation Functions
function shortHandToGuqinJSON(shortHand) {
  var shortHandLines = shortHand.split('\n')
  var tuning=''
  var composer='' 
  var title=''
  var endnote=''
  var bars=''
  var showtimesig=''
  var guqin = []

  // { parse the song
    var song = []
    var songLineIdx = []
    nCtr = 0
    fCtr = 0
    for (var i=0;i<shortHandLines.length;i++) {
      // shortHandLines[i] = shortHandLines[i].split("|").join(' ')
      if (shortHandLines[i].split('//').length>1)
        shortHandLines[i] =   shortHandLines[i].split('//')[0]
      if (shortHandLines[i].trim() != "") {
        if (shortHandLines[i].beginsWith("tuning:")) {
          var tuningStr = shortHandLines[i].split('tuning:')[1]
          tuning = tuningStr.trim().split(' ')
        }
        else if (shortHandLines[i].beginsWith('showtimesig:')) {
          showtimesig = shortHandLines[i].split('showtimesig:')[1].trim()
        }
        else if (shortHandLines[i].beginsWith("bars:")) {
          var barsString = shortHandLines[i].split('bars:')[1]
          bars = barsString.trim()
        }
        else if (shortHandLines[i].beginsWith("composer:")) {
          composer = shortHandLines[i].substr(shortHandLines[i].split(':')[0].length+1).trim()
          // composer = '\\markup \\right-column {"' + composer.split('\\n').join('" "') + '" }'
        }
        else if (shortHandLines[i].beginsWith("tuninglabel:")) {
          tuninglabel = shortHandLines[i].substr(shortHandLines[i].split(':')[0].length+1).trim()
          // tuninglabel = '\\markup \\left-column {"' + tuninglabel.split('\\n').join('" "') + '" }'
        }
        else if (shortHandLines[i].beginsWith("title:")) {
          title = shortHandLines[i].substr(shortHandLines[i].split(':')[0].length+1).trim()
          // title = '\\markup \\center-column {"' + title.split('\\n').join('" "') + '" }'
        }
        else if (shortHandLines[i].beginsWith("endnote:")) {
          endnote = shortHandLines[i].substr(shortHandLines[i].split(':')[0].length+1).trim()
          // endnote = '\\markup \\center-column {"' + endnote.split('\\n').join('" "') + '" }'
          // endnote = '\\markup \\center-column {"' + shortHandLines[i].split('endnote:')[1].trim().split('\\n').join('" "') + '" }'
        }
        // else if (shortHandLines[i].beginsWith("title:")) {
        //   var titleStr = shortHandLines[i].split('title:')[1]
        //   title = titleStr.trim()
        // }
        else if (shortHandLines[i].beginsWith('time:')) {
          song.push("time:" + shortHandLines[i].split('time:')[1].trim())
          songLineIdx.push(i)
          nCtr++
          fCtr++
        }
        else if (shortHandLines[i].beginsWith('tempo:')) {
          song.push("tempo:" + shortHandLines[i].split('tempo:')[1].trim())
          songLineIdx.push(i)
          nCtr++
          fCtr++
        }
        else if (shortHandLines[i].beginsWith('clef:')) {
          song.push("clef:" + shortHandLines[i].split('clef:')[1].trim())
          songLineIdx.push(i)
          nCtr++
          fCtr++
        }
        else if (shortHandLines[i].beginsWith('mark:')) {
          song.push("mark:" + shortHandLines[i].split('mark:')[1].trim())
          songLineIdx.push(i)
          nCtr++
          fCtr++
        }
        else if (shortHandLines[i].beginsWith('ly:')) {
          song.push("ly:" + shortHandLines[i].split('ly:')[1].trim())
          songLineIdx.push(i)
          nCtr++
          fCtr++
        }
        else if (shortHandLines[i].beginsWith('fyhuirange:')) {
          song.push("fyhuirange:" + shortHandLines[i].split('fyhuirange:')[1].trim())
          songLineIdx.push(i)
          nCtr++
          fCtr++
        }
        else if (shortHandLines[i].beginsWith("n:")) {
          var noteStr = shortHandLines[i].split('n:')[1]
          // noteStr = noteStr.split('-').join(' -')
          noteStr = noteStr.replace(/ +(?= )/g,'');
          var notes = noteStr.trim().split(' ') //split(/[\s-]+/) 
          for (var j=0; j<notes.length; j++) {
            song[nCtr] = (song[nCtr] == undefined ?  notes[j] : notes[j] + ':' + song[nCtr])
            songLineIdx[nCtr] = i
            nCtr++
          }
        }
        else if (shortHandLines[i].beginsWith("f:")) {
          var fingerStr = shortHandLines[i].split('f:')[1]
          // fingerStr = fingerStr.split('-').join(' -')
          fingerStr = fingerStr.replace(/ +(?= )/g,'');
          var fingers = fingerStr.trim().split(' ')
          for (var j=0; j<fingers.length; j++) {
            song[fCtr] = (song[fCtr] == undefined ? fingers[j] : song[fCtr] + ':' + fingers[j])
            songLineIdx[fCtr] = i
            fCtr++
          }
        }
      }
      else {
        song.push('linebreak')
        songLineIdx.push(i)
        fCtr++
        nCtr++
      }
    }
  // }

  // { error check the song
    for (var i=0; i<song.length; i++) {
      if (song[i].beginsWith('|:') && song[i] != '|:|') {
        alert(`Oops! Something looks fishy on line ${songLineIdx[i]}. There's a bar mistmatch between note line and finger line.`)
        return false
      }
      else if (song[i].beginsWith('||:') && song[i] != '||:||') {
        alert(`Oops! Something looks fishy on line ${songLineIdx[i]}. There's a bar mistmatch between note line and finger line.`)
        return false
      }
      else if (song[i].beginsWith('$:') && song[i] != '$:$') {
        alert(`Oops! Something looks fishy on line ${songLineIdx[i]}. There's a glissando ($) mistmatch between note line and finger line.`)
        return false
      }

      var notePart = song[i].split(':')[0]
      var validNote = false
      if (notePart.indexOf('|') > -1)
        validNote = true
      else if (notePart.indexOf('=') > -1)
        validNote = true 
      else if (notePart.indexOf('$') > -1)
        validNote = true 
      else {
        for (var j=0; j<lyPitches.length; j++) {
          if (notePart.indexOf(lyPitches[j]) > -1) {
            validNote = true
            break
          }
        }
        if (!validNote) {
          for (var j=0; j<lyFanYins.length; j++) {
            if (notePart.indexOf(lyFanYins[j]) > -1) {
              validNote = true
              break
            }
          }
        }
      }
      if (!validNote) {
        alert(`Oops! Something looks fishy on line ${songLineIdx[i]} (${song[i]}). Looks like an invalid entry in the note line.`)
        return false
      }
    }
  // }

  var fyhuirange = [7,4]

  if (tuning == undefined || tuning == '')
    tuning = ['g,', 'a,', 'c', 'd', 'e', 'g', 'a']

  var prevStr
  var firstNote = true
  var startSlur = false
  var inSlur = false
  var endSlur = false
  var startGliss = false
  var inGliss = false
  var endGliss = false
  var prevRHF = -1

  for (var i=0; i<song.length; i++) {
    if (song[i] == 'linebreak') {
      guqin[i] = 'linebreak'
    }
    else if (song[i].beginsWith('time:')) {
      var time = song[i].split('time:')[1]
      guqin[i] = {"type": "time", "value": time}
    }
    else if (song[i].beginsWith('tempo:')) {
      var tempo = song[i].split('tempo:')[1]
      guqin[i] = {"type": "tempo", "value": tempo}
    }
    else if (song[i].beginsWith('clef:')) {
      var clef = song[i].split('clef:')[1]
      guqin[i] = {"type": "clef", "value": clef}
    }
    else if (song[i].beginsWith('mark:')) {
      var mark = song[i].split('mark:')[1]
      guqin[i] = {"type": "mark", "value": mark}
    }
    else if (song[i].beginsWith('fyhuirange:')) {
      var fyhuirange = song[i].split('fyhuirange:')[1].split('-')
      guqin[i] = {"type": "fyhuirange", "value": fyhuirange}
    }
    else if (song[i].beginsWith('ly:')) {
      var lycode = song[i].split('ly:')[1]
      guqin[i] = {"type": "lilypond", "value": lycode}
    }
    else {  
      guqin[i] = {
        type: "note",
        note: [],
        beat: [],
        str: [],
        rh: [],
        lh: [],
        fyHuis: [],
        slur: [],
        grace: [],

      }
      var note = song[i]
      var notePart = song[i].split(':')
      var n = notePart[0]
      var gq = notePart[1]
      if (n == '|') { 
        guqin[i] = {"type": "bar", "value": "single"}
      } 
      else if (n == '||') {
        guqin[i] = {"type": "bar", "value": "double"}
      }
      else if (n == '$') {
        guqin[i] = {"type": "glissando", "value": ""}
      }
      else if (n == '=') {
        guqin[i] = {"type": "tie", "value": ""}
      }
      else { // actual note
        if (firstNote) {
          if (getNumOnly(n) == '')
            n = n + "4"
          firstNote = false
        }
        if (typeof gq == 'undefined') {
          console.log('error', i, song[i])
          alert(`error parsing note on line ${songLineIdx[i]+1} with note/finger combo: ${song[i]}.\n\nThere's likely a mismatch between note and finger positions.`)
          $('.rendering').hide()
          return
        }

        if (note.indexOf('-') > -1) { 
          isMiddle = true
          if (getPrevNote(song, i).indexOf('-') == -1) {
            guqin[i].slur.push('start')
            isMiddle = false
          }
          if (getNextNote(song, i).indexOf('-') == -1) {
            guqin[i].slur.push('end')
            isMiddle = false
          }
          if (isMiddle)
            guqin[i].slur.push('middle')
        }

        if (note.indexOf('*') > -1) { 
          isMiddle = true
          if (getPrevNote(song, i).indexOf('*') == -1) {
            guqin[i].grace.push('start')
            isMiddle = false
          }
          if (getNextNote(song, i).indexOf('*') == -1) {
            guqin[i].grace.push('end')
            isMiddle = false
          }
          if (isMiddle)
            guqin[i].grace.push('middle')
        }

        if (gq.indexOf('!') > -1) {
          guqin[i].lhstr = 'show'
        }
      
      // {split note into chords (n --> noteArr)
        var noteArr = []
        var pitchArr = []
        var beatArr = []
        var rhythm = ""
        var noteSplitStr = n 
        for (var j=0;j<lyPitches.length;j++) {
          noteSplitStr = noteSplitStr.split(lyPitches[j]).join("+" + lyPitches[j])
        }
        for (var j=0;j<lyFanYins.length;j++) {
          noteSplitStr = noteSplitStr.split(lyFanYins[j]).join("+" + lyFanYins[j])
        }
        var idxBeat = -1
        for (var j=0;j<noteSplitStr.length;j++) {
          if (lyBeats.indexOf(noteSplitStr[j]) > -1) {
            if (idxBeat == -1)
              idxBeat = j 
            else
              idxBeat = Math.min(j, idxBeat)
          }
        }
        if (idxBeat > -1)
          noteSplitStr = noteSplitStr.substr(0,idxBeat) + "+" + noteSplitStr.substr(idxBeat, noteSplitStr.length)

        // combine sharps and flats
        noteSplitStr = noteSplitStr.split('+es').join('es')
          .split('+is').join('is')
          .split('+ES').join('ES')
          .split('+IS').join('IS')
        noteArr = noteSplitStr.split('+')
        for (var j=0;j<noteArr.length;j++) {
          if (noteArr[j] != '') {
            if (lyBeats.indexOf(noteArr[j][0]) > -1) {
              guqin[i].beat.push(noteArr[j].split('*').join(''))
            }
            else if (lyPitches.indexOf(noteArr[j][0])> -1) {
              guqin[i].note.push(noteArr[j].split('*').join(''))
            }
            else if (lyFanYins.indexOf(noteArr[j][0])> -1) {
              guqin[i].note.push(noteArr[j].split('*').join(''))
            }
          }
        }
      // } end

      // { split guqin part into hands & strings (rh, lh, str array)
        var gq3 = ''
        var gq2 = ''
        var gq1 = ''

        if (typeof gq != 'string')
          console.log('error gq is not a string', song, note, i, gq, k)
        else {
          // { Custom RH/LH Lines
            var customLH = false
            var customRH = false
            if (gq.indexOf('(l=') > -1) { // custom LH
              customLH = true
              customLHStr = gq.split('(l=')[1].split(')')[0].trim()
              gq = gq.split(customLHStr).join('')
              guqin[i].lh.push(customLHStr.split('_').join(' '))
            }
            if (gq.indexOf('(r=') > -1) { // custom RH
              customRH = true
              customRHStr = gq.split('(r=')[1].split(')')[0].trim()
              gq = gq.split(customRHStr).join('')
              guqin[i].rh.push(customRHStr.split('_').join(' '))
            }
          // }

          // { FY Hui Pos
            // if (gq.indexOf('()') > -1) 
            //   prevFYHui = []
            guqin[i].fyHuis = gq.getParentheticals()
            gq = gq.removeParentheses()

          // }

          // { lyMapAndExtract (/, ~, etc.)
            for (var j=0;j<gq.length;j++) {
              if (lyMapAndExtract.indexOf(gq[j]) > -1 && gq2 == '')
                gq1 += gq[j] == '\\' ? '\\\\' : gq[j]
              else if (lyMapAndExtract.indexOf(gq[j]) > -1 && gq2 != '')
                gq3 += gq[j] == '\\' ? '\\\\' : gq[j]
              else
                gq2 += gq[j] == '\\' ? '\\\\' : gq[j]
            }
            if (gq1 != '' && !customLH)
              guqin[i].lh.push(gq1)
            for (var k in lyMap) {
              if (gq2.has(k)) {
                if (lyMap[k].type == 'rh' && !customRH) {
                  guqin[i].rh.push(lyMap[k].value)
                }
                else if (lyMap[k].type == 'lh' && ! customLH) {
                  guqin[i].lh.push(lyMap[k].value)
                }
                else if (lyMap[k].type == 'str') {
                  guqin[i].str.push(lyMap[k].value)
                }
              }
            }
            if (gq3 != '' && !customLH)
              guqin[i].lh.push(gq3)
          // }

        }
        if (guqin[i].str.length == 0) 
          guqin[i].str = prevStr
        prevStr = guqin[i].str
      // } end
      }
    }
  }

  return {
    tuning: tuning,
    title: title,
    composer: composer,
    endnote: endnote,
    showtimesig: showtimesig,
    bars: bars,
    song: guqin
  }
}
function guqinToLilyPond(guqinJSON) {
  var guqin = JSON.parse(JSON.stringify(guqinJSON))
  var ly = ""

  // { Fanyin & Left Mute method def
    ly += lyStr1 + ' '
    ly+='(list #{c\\0#} ' //#{g'\6#} #{a'\7#} ))'
    var tuning = guqin.tuning
    for (var j=0;j<tuning.length;j++) {
      if (guqin.fyraiseoctave) {
        var notePlusOct
        if (tuning[j].length == 2 && tuning[j][1] == ",") {
          notePlusOct = tuning[j][0]
        }
        else if (tuning[j][1] == ',') {
          notePlusOct = tuning[j].substring(0, tuning[j].length-1)
        }
        else {
          notePlusOct = tuning[j] + "'"
        }
        ly+='#{' + notePlusOct + '\\' + (j+1) + '#} '
      }
      else {
        ly+='#{' + tuning[j] + '\\' + (j+1) + '#} '
      }
    }
    ly += ')) ' + lyStr2 + '\n'  
  // }

  // { Tuning
    var tunReverse = JSON.parse(JSON.stringify(tuning)).reverse()
    ly += 'tuning = <' + tunReverse.join(' ') + '>\n\n'
  // }

  // { Headers definitino
    ly += `#(set-default-paper-size "letter") \\header {\n`
    if (guqin.title != undefined) {
      ly += '  title = \\markup \\center-column {"' + guqin.title.split('\\n').join('" "') + '" }\n'
    }
    if (guqin.composer != undefined) {
      ly += '  composer = \\markup \\right-column {"' + guqin.composer.split('\\n').join('" "') + '" }\n'
    }
    if (guqin.endnote != undefined) {
      ly += '  tagline = \\markup \\center-column {"' + guqin.endnote.split('\\n').join('" "') + '" }\n'
    }
    else {
      ly += '  tagline = "engraved by LilyPond using NL Tabs format (guqin.nyl.io)"\n'
    }
    if (guqin.tuninglabel != undefined) {
      ly += '  poet = \\markup \\left-column {"' + guqin.tuninglabel.split('\\n').join('" "') + '" }\n'
    }
    else {
      var tuninglabel = "Tuning: " 
      for (var j=0;j<guqin.tuning.length;j++) {
        tuninglabel+=guqin.tuning[j].toUpperCase() + ' '
      }
      ly += '  poet = \\markup \\column {"' + tuninglabel + '"}\n'
    }
    ly+= '}\n\n'
  // }

  // { Song
    var startSlur = false
    var inSlur = false
    var endSlur = false
    var startGliss = false
    var inGliss = false
    var endGliss = false
    var prevRHF = -1
    var prevStr
    var firstNote = true
    var measure = 2

    ly += 'song = {\n'
    ly += '  \\clef "bass"\n'
    ly += '  \\set Score.barNumberVisibility = #all-bar-numbers-visible\n  '
    var song = guqin.song
    var fyhuirange = [7,4]
    for (var i=0; i<song.length; i++) {
      if (song[i] == 'linebreak') {
        ly += '\n  '
      }
      else if (song[i].type == 'time') {
        ly += "\\time " + song[i].value + "\n  "
      }
      else if (song[i].type == 'tempo') {
        ly += "\\tempo " + song[i].value + "\n  "
      }
      else if (song[i].type == 'clef') {
        ly += "\\clef \"" + song[i].value + "\"\n  "
      }
      else if (song[i].type == 'mark') {
        ly += '\\mark \\markup \\left-column {"' + song[i].value.split('\\n').join('" "') + '" }\n'
      }
      else if (song[i].type == 'lilypond') {
        ly += song[i].value + "\n  "
      }
      else if (song[i].type == 'fyhuirange') {
        fyhuirange = song[i].value
      }
      else {  
        if (song[i].type == 'bar') {
          // if (guqin.bars == 'manual') {
          //   ly += ' \\set Score.currentBarNumber = #' + measure + ' '
          //   measure++
          // }
          if (song[i].value == 'double') {
            ly += ' \\bar "||" '
          }
          else {
            ly += ' \\bar "|" '
          }
        }
        else if (song[i].type == 'glissando') {
          ly += ' \\glissando '
        }
        else if (song[i].type == "tie") {
          ly += ' ~ '
        }
        else { // actual note
          if (song[i].note[0] == undefined) {
            console.log('error', i, song[i])
            alert(`error parsing note on line ${songLineIdx[i]+1}: ${song[i]}`)
            $('.rendering').hide()
            return
          }

          // encapsulation starts (grace or slurs)
          if (song[i].slur != undefined && song[i].slur.indexOf('start') > -1) {
            ly += " ( "
          }
          if (song[i].grace != undefined && song[i].grace.indexOf('start') > -1) {
            ly += " \\grace { "
          }
          if (song[i].lh != undefined && song[i].lh.length > 0 && String(song[i].lh[0]).indexOf('X') > -1) { 
            // TODO: the lh[0] only looks at first note, so chords not supported
            ly += ' \\lm '
          }

          // the meat
          if (lyPitches.indexOf(song[i].note[0][0]) > -1) {
            if (song[i].note.length > 1) { // Chord
              ly += '<'
              for (var j=0;j<song[i].note.length;j++) {
                ly += song[i].note[j] + '\\' + song[i].str[j]
              }
              ly += '>'
              ly += song[i].beat.length > 0 ? song[i].beat[0] : ""
            }
            else if (song[i].note.length == 1) { // Single Note
              ly += song[i].note[0] 
              ly += song[i].beat.length > 0 ? song[i].beat[0] : "" 
              ly += '\\' + song[i].str[0]
            }
            if (song[i].rh.length > 0) {
              var currRFH = song[i].rh.join('')
              if ((song[i].lhstr == undefined || song[i].lhstr != 'show') && getNumOnly(currRFH) == prevRHF) {
                ly +=  '^"' + removeNums(currRFH)  + '"'
              }
              else {
                ly +=  '^"' + currRFH + '"'
                prevRHF = getNumOnly(currRFH)
              }
            }
            ly +=  song[i].lh.length > 0 ? '_"' + song[i].lh.join('') + '"' : ""
          }
          else if (lyFanYins.indexOf(song[i].note[0][0]) > -1)  {
            if (song[i].note.length > 1) { // Fan Yin Chord
              ly += '<<'
              for (var j=0;j<song[i].note.length;j++) { 
                ly += ' \\fy '
                if (song[i].fyHuis[j] != undefined) 
                  ly += '#' + song[i].fyHuis[j] + ' '
                else {
                  var fyhPossibilities = getHarmonicPositions(song[i].note[j], song[i].str[j], guqin.tuning)
                  var fyrMin = Math.min.apply(Math, fyhuirange) 
                  var fyrMax = Math.max.apply(Math, fyhuirange) 
                  var fyHuiPos = ''
                  for (var k=0;k<fyhPossibilities.length;k++) {
                    if (fyhPossibilities[k]>=fyrMin && fyhPossibilities[k]<=fyrMax)
                      fyHuiPos = '#' + fyhPossibilities[k]
                  }
                  ly += fyHuiPos + ' '
                }
                ly += song[i].note[j].toLowerCase()
                if (j==0)
                  ly += song[i].beat.length > 0 ? song[i].beat[0] : "" 
                ly += '\\' + song[i].str[j]
                if (j==0) {
                  if (song[i].rh.length > 0) {
                    var currRFH = song[i].rh.join('')
                    if ((song[i].lhstr == undefined || song[i].lhstr != 'show') && getNumOnly(currRFH) == prevRHF) {
                      ly +=  '^"' + removeNums(currRFH)  + '"'
                    }
                    else {
                      ly +=  '^"' + currRFH + '"'
                      prevRHF = getNumOnly(currRFH)
                    }
                  }
                  ly +=  song[i].lh.length > 0 ? '_"' + song[i].lh.join('') + '"' : ""
                }
              }
              ly += '>>'
            }
            else if (song[i].note.length == 1) { // Fan Yin Solo Note
              ly += ' \\fy '
              if (song[i].fyHuis.length > 0)
                ly += '#' + song[i].fyHuis[0] + ' '
              else {
                var fyhPossibilities = getHarmonicPositions(song[i].note[0], song[i].str[0], guqin.tuning)
                // console.log(song[i], fyhPossibilities)
                var fyrMin = Math.min.apply(Math, fyhuirange) 
                var fyrMax = Math.max.apply(Math, fyhuirange) 
                var fyHuiPos = ''
                if (fyhPossibilities != undefined)
                  for (var k=0;k<fyhPossibilities.length;k++) {
                    if (fyhPossibilities[k]>=fyrMin && fyhPossibilities[k]<=fyrMax)
                      fyHuiPos = '#' + fyhPossibilities[k]
                  }
                ly += fyHuiPos + ' '
              }
              // if (fyhuirange != 0 && fyhuirange != "auto") {
              //   ly += '#' + fyhuirange + ' '
              // }
              ly += song[i].note[0].toLowerCase()
              ly += song[i].beat.length > 0 ? song[i].beat[0] : "" 
              ly += '\\' + song[i].str[0]
              if (song[i].rh.length > 0) {
                var currRFH = song[i].rh.join('')
                if ((song[i].lhstr == undefined || song[i].lhstr != 'show')  && getNumOnly(currRFH) == prevRHF) {
                  ly +=  '^"' + removeNums(currRFH)  + '"'
                }
                else {
                  ly +=  '^"' + currRFH + '"'
                  prevRHF = getNumOnly(currRFH)
                }
              }
              ly +=  song[i].lh.length > 0 ? '_"' + song[i].lh.join('') + '"' : ""
            }
          }

          // encapsulation ends (grace or slurs)
          if (song[i].grace != undefined && song[i].grace.indexOf('end') > -1) {
            ly += ' } '
          }
          if (song[i].slur != undefined && song[i].slur != undefined && song[i].slur.indexOf('end') > -1) {
            ly += " ) "
          }

          // space between notes
          ly += ' '
        }


      }
    }
    ly += '\n\n  \\bar "|."\n\n}\n\n'
    // edge case correction
    ly = ly
      .split('\\bar "|"  (').join('( \\bar "|" ')
      .split('\\bar "||"  (').join('( \\bar "||" ')
    //add manual bar numbers
    if (guqin.bars == 'manual') {
      lyBars = ly.split('\\bar')
      for (var i=0; i<lyBars.length-1; i++) {
        lyBars[i] = lyBars[i] + '\\set Score.currentBarNumber = #' + (i+2) + ' ' 
      }
      ly = lyBars.join('\\bar')
    }
  // }

  // { Tuning, score layouts
    ly +=lyStr3 + '\n\n'
    ly += `\\score {\n  ` + lyStr4 + '\n'
    if (guqin.showtimesig == 'no') {
      ly += `  \\context { \\Staff \\omit TimeSignature }\n`
    }
    if (guqin.bars == 'manual') {
      ly += `  \\context { \\Score automaticBars = ##f }\n`
    }
    ly +='  ' + lyStr5 + '\n  ' + lyStr6 + '\n  ' + lyStr7 + '\n}\n'
  // }

  return ly
}









