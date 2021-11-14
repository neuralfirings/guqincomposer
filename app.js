var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
const { exec } = require('child_process');

var app = express();
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json());

var port = 5713;
var server = app.listen(port, function () {
  console.log(`HTTP listening on port ${port}.`);
});

app.use(express.static('public'))
app.use('/nltabfiles', express.static('music'))

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


function getTitle(sh) {
  sh2 = sh.split('title:')
  if (sh2.length > 1) {
    sh3 = sh2[1].split('\n')
    return sh3[0].split('\\n').join(' ').trim()
  }
  else {
    return 'Guqin music using NLTabs'
  }
} 

app.post('/renderly', function(req, res) {
  console.log('/renderly', req.body.ly)
  var ly = req.body.ly

  var tempId = makeid(7)
  fs.mkdirSync('./public/temp/' + tempId, { recursive: true });
  fs.writeFileSync('./public/temp/' + tempId + '/music.ly', ly)
  var bashScript = "lilypond -o ./public/temp/" + tempId + "/music --png --pdf -s ./public/temp/" + tempId + "/music.ly"

  console.log(bashScript)
  exec(bashScript, (err, stdout, stderr) => {
    if (err) {
      res.send({error: err, stdout: stdout, stderr: stderr})
      return
    }
    files = fs.readdirSync('./public/temp/' + tempId)
    pngs = []
    for (var i=0;i<files.length;i++) {
      if (files[i].indexOf('.png') > -1) 
        pngs.push(files[i])
    }
    res.send({error: err, stdout: stdout, stderr: stderr, tempId: tempId, pngs: pngs})
  })
})

app.get('/latest', function (req,res) {
  console.log('/latest', req.query)
  var id = req.query.id

  if (fs.existsSync('./music/' + id)) {
    var versions = fs.readdirSync('./music/' + id)
    var version = 0
    var imgurl = ''
    for (var i=0;i<versions.length;i++) {
      if (!isNaN(versions[i]))
        version = Math.max(version, Number(versions[i]))
    }
    if (fs.existsSync(`./music/${id}/${version}/music-page1.png`))
      imgurl = `./nltabfiles/${id}/${version}/music-page1.png`
    else
      imgurl = `./nltabfiles/${id}/${version}/music.png`
    gq = fs.readFileSync('./music/' + id + '/' + version + '/music.gq', 'utf-8')
    // console.log(gq)
    title = gq.split('title:')[1].split('\n')[0].trim()
    console.log('version', version)
    res.send({version: version, title: title, imgurl: imgurl, pdf: `./nltabfiles/${id}/${version}/music.pdf`})
  }
  else
    res.send({error: 'invalid id'})
})

app.post('/save', function(req, res) {
  console.log('/save', req.body.keepVersion)
  var id = req.body.id
  var oldId = req.body.id
  var makenew = req.body.makenew == "true" ? true : false
  var oldVersion = Number(req.body.version)
  var shortHandVal = req.body.shortHandVal
  var lilyPondVal = req.body.lilyPondVal
  var hasFiles = req.body.hasFiles == "true" ? true : false
  var tempId = req.body.tempId // temp music folder
  var keepVersion = req.body.keepVersion == undefined ? 'no' : req.body.keepVersion 

  var folder, version

  if (makenew) {
    console.log('make new')
    id = makeid(7)
    version = 1
    folder = './music/' + id + '/' + version
    fs.mkdirSync(folder, { recursive: true });
  }
  else {
    console.log('no make new')
    if (keepVersion == 'yes') {
      version = oldVersion
      folder = './music/' + id + '/' + version
    }
    else {
      var versions = fs.readdirSync('./music/' + id)
      version = 0
      for (var i=0;i<versions.length;i++) {
        if (!isNaN(versions[i]))
          version = Math.max(version, Number(versions[i]))
      }
      version++
      folder = './music/' + id + '/' + version
      fs.mkdirSync(folder, { recursive: true });
    }
  }
  fs.writeFileSync(folder + '/music.gq', shortHandVal)
  fs.writeFileSync(folder + '/music.ly', lilyPondVal)
  if (tempId != undefined) {
    var currFiles = fs.readdirSync(folder + '/')
    for (var i=0;i<currFiles.length;i++) {
      if (currFiles[i].indexOf('.png') > -1)
        fs.unlinkSync(folder + '/' + currFiles[i])
    }
    var tempFiles = fs.readdirSync('./public/temp/' + tempId)
    for (var i=0;i<tempFiles.length;i++) {
      fs.copyFileSync('./public/temp/' + tempId + '/' + tempFiles[i], folder + '/' + tempFiles[i])
    }
  }
  else if (hasFiles && keepVersion == 'no') {
    var oldFiles = fs.readdirSync(`./music/${oldId}/${oldVersion}`)
    for (var i=0;i<oldFiles.length;i++) {
      if (oldFiles[i].indexOf('.pdf') > -1 || oldFiles[i].indexOf('.midi') > -1 || oldFiles[i].indexOf('.png') > -1)
        fs.copyFileSync(`./music/${oldId}/${oldVersion}/${oldFiles[i]}`, folder + '/' + oldFiles[i])
    }
  }
  res.send({ id: id, version: version})
})

app.get('/shorthand/:id/:version', function (req, res) {
  var id = req.params.id 
  var version = req.params.version

  if (fs.existsSync('./music/' + id + "/" + version + "/music.gq")) {
    var gq = fs.readFileSync('./music/' + id + "/" + version + "/music.gq", "utf-8")
    res.send({shorthand: gq})
  }
  else {
    res.send({error: 'no file found'})
  }
})

app.get('/shorthand/:id', function (req, res) {
  var id = req.params.id 
  var versions = fs.readdirSync('./music/' + id)
  var version = 0
  for (var i=0;i<versions.length;i++) {
    if (!isNaN(versions[i]))
      version = Math.max(version, Number(versions[i]))
  }

  if (fs.existsSync('./music/' + id + "/" + version + "/music.gq")) {
    var gq = fs.readFileSync('./music/' + id + "/" + version + "/music.gq", "utf-8")
    res.send({shorthand: gq, version: version})
  }
  else {
    res.send({error: 'no file found'})
  }
})

app.get('/nltabs', function(req,res) {
  console.log('/nltabs')
  var session = {
    id: "new",
    version: 0,
    shortHandVal: `title: Lorem Ipsum\ntuning: g, a, c d e g a\n\nn: g,4. a,8 c2 | cc'2. g,4 $ | g4 g' e' d'8 c' | cc'4 C'8 G C'2\nf: 1 2 3 | by35v~~ 1j $ | 6 6v - - wc | /35bys v3u 1di vu3`,
    lilyPondVal: "",
    hasPDF: false,
    hasMIDI: false,
    hasPNG: false
  }

  var index = fs.readFileSync('./nltabs.html', 'utf-8')
  index = index
    .split('{{variables}}').join("session = " + JSON.stringify(session))
    .split('{{ogtitle}}').join('Compose Guqin music using NLTabs')
    .split('{{ogdescription}}').join('.. an alternative to traditional guqin notation')
    .split('{{ogimgurl}}').join('https://guqin.nyl.io/thumbnail.jpg')

  res.send(index)
})

app.get('/nltabs/:id', function(req,res) {
  console.log('/nltabs/:id', id)
  var id = req.params.id
  var versions = fs.readdirSync('./music/' + id)
  console.log('versions', versions)
  var version = 0
  for (var i=0;i<versions.length;i++) {
    if (!isNaN(versions[i]))
      version = Math.max(version, Number(versions[i]))
  }

  var session = {
    id: id,
    version: version,
    shortHandVal: fs.readFileSync('./music/' + id + "/" + version + "/music.gq", "utf-8"),
    lilyPondVal: fs.readFileSync('./music/' + id + "/" + version + "/music.ly", "utf-8"),
    hasPDF: false,
    hasMIDI: false,
    hasPNG: false,
    PNGs: []
  }
  var files = fs.readdirSync('./music/' + id + '/' + version)
  for (var i=0;i<files.length;i++) {
    if (files[i].indexOf('.pdf') > -1)
      session.hasPDF = true
    if (files[i].indexOf('.midi') > -1)
      session.hasMIDI = true
    if (files[i].indexOf('.png') > -1) {
      session.hasPNG = true
      session.PNGs.push(files[i])
    }
  }

  var index = fs.readFileSync('./nltabs.html', 'utf-8')
  index = index
    .split('{{variables}}').join("session = " + JSON.stringify(session))
    .split('{{ogtitle}}').join(getTitle(session.shortHandVal))
    .split('{{ogdescription}}').join('Guqin music using NLTabs, an alternative to traditional guqin notation')
    .split('{{ogimgurl}}').join('/nltabfiles/' + session.id + '/' + session.version + '/' + (session.PNGs[0] == undefined ? '/thumbnail.jpg' : session.PNGs[0]))
  res.send(index)
})

app.get('/nltabs/:id/:version', function(req,res) {
  var id = req.params.id
  var version = req.params.version
  var session = {
    id: id,
    version: version,
    shortHandVal: fs.readFileSync('./music/' + id + "/" + version + "/music.gq", "utf-8"),
    lilyPondVal: fs.readFileSync('./music/' + id + "/" + version + "/music.ly", "utf-8"),
    hasPDF: false,
    hasMIDI: false,
    hasPNG: false,
    PNGs: []
  }
  var files = fs.readdirSync('./music/' + id + '/' + version)
  for (var i=0;i<files.length;i++) {
    if (files[i].indexOf('.pdf') > -1)
      session.hasPDF = true
    if (files[i].indexOf('.midi') > -1)
      session.hasMIDI = true
    if (files[i].indexOf('.png') > -1) {
      session.hasPNG = true
      session.PNGs.push(files[i])
    }
  }

  var index = fs.readFileSync('./nltabs.html', 'utf-8')
  index = index
    .split('{{variables}}').join("session = " + JSON.stringify(session))
    .split('{{ogtitle}}').join(getTitle(session.shortHandVal))
    .split('{{ogdescription}}').join('Guqin music using NLTabs, an alternative to traditional guqin notation')
    .split('{{ogimgurl}}').join('/nltabfiles/' + session.id + '/' + session.version + '/' + (session.PNGs[0] == undefined ? '/thumbnail.jpg' : session.PNGs[0]))
  res.send(index)
})

app.post('/password/exists', function(req,res) {
  console.log('/password/exists', req.body)
  var id = req.body.id

  if (!fs.existsSync('./.passwords')) {
    fs.writeFileSync('./.passwords', '{}')
    res.send({status: 'no'})
  }
  else {
    var passwords = JSON.parse(fs.readFileSync('./.passwords', 'utf-8'))
    if (passwords[id] == undefined) 
      res.send({status: 'no'})
    else
      res.send({status: 'yes'})
  }
})

app.post('/password/set', function(req,res) {
  var id = req.body.id
  var newPW = req.body.newPW 
  var oldPW = req.body.oldPW

  if (!fs.existsSync('./.passwords')) {
    fs.writeFileSync('./.passwords', '{}')
  }

  var passwords = JSON.parse(fs.readFileSync('./.passwords', 'utf-8'))
  if (passwords[id] == undefined) {
    passwords[id] = newPW
    fs.writeFileSync('./.passwords', JSON.stringify(passwords))
    res.send({success: 'password set'})
  }
  else {
    if (passwords[id] == oldPW) {
      passwords[id] = newPW
      fs.writeFileSync('./.passwords', JSON.stringify(passwords))
      res.send({success: 'password set'})
    }
    else {
      res.send({error: 'current password incorrect'})
    }
  }
})


app.post('/password/unset', function(req,res) {
  var id = req.body.id
  var pw = req.body.pw

  var passwords = JSON.parse(fs.readFileSync('./.passwords', 'utf-8'))
  if (passwords[id] == pw) {
    passwords[id] = undefined
    fs.writeFileSync('./.passwords', JSON.stringify(passwords))
    res.send({success: 'password unset'})
  }
  else {
    res.send({error: 'current password incorrect'})
  }
})

app.post('/password/check', function(req,res) {
  var id = req.body.id
  var pw = req.body.pw 

  var passwords = JSON.parse(fs.readFileSync('./.passwords', 'utf-8'))
  if (passwords[id] == pw) {
    res.send({success: 'valid'})
  }
  else {
    res.send({error: 'current password incorrect'})
  }
})

app.post('/errorlog', function(req, res) {
  console.log('/errorlog')
  var error = req.body.error == undefined ? {} : req.body.error
  var errorStr = JSON.stringify(error, null, 2)
  var id = error.id == undefined ? 'noId' : error.id
  var version = error.version == undefined ? 'noVersion' : error.version
  var errorFileName = id + '.' + version + '.' + Number(new Date()).toString(36)
  var errorFileNameWithExt = errorFileName + '.log'
  fs.writeFileSync('./errorlogs/' + errorFileNameWithExt, errorStr)
  res.send({'log': errorFileName})
})

app.get('/test', function (req, res) {
  res.send('hello world: ' + JSON.stringify(req.query) + '!');
})

app.get('/test/:id', function (req, res) {
  res.send('id: ' + req.params.id)
})

app.post('/test', function (req, res) {
  res.send('hello world: ' + JSON.stringify(req.body) + '!');
})


