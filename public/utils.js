$(document).ready(function() {
	// var newBodyHTML = $('.jzpify').html().split('[[').join('<span class="jzp">').split(']]').join('</span>')
 //  $('.jzpify').html(newBodyHTML)
    		

  var nav = `
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a class="navbar-brand" href="/"><i class="fas fa-sliders-h"></i> Guqin Music Using NLTabs</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link" href="/nltabs/">Compose</a>
          <a class="nav-item nav-link" href="/library.html">Library</a>
          <a class="nav-item nav-link" href="/gettingstarted.html">Getting Started</a>
          <a class="nav-item nav-link" href="/docs.html">Docs</a>
          <a class="nav-item nav-link" href="/contact.html">Contact</a>
          <a class="nav-item nav-link" href="https://blog.nyl.io">Blog</a>
          <a class="nav-item nav-link" href="https://github.com/neuralfirings/guqincomposer"><i class="fab fa-github"></i></a>
        </div>
      </div>`
  $('.nav').addClass('navbar navbar-expand-lg navbar-dark bg-dark header').html(nav)
  if (window.location.pathname.substr(0, 7) == '/nltabs') {
  	$('.show-on-score').show()
  }

	$('.markdown').each(function() {
		var md = $(this).html()
		var mdLines = md.split('\n')
		// console.log(mdLines.join('\n'))
		var ws = ''
		var i=0
		do {
			if (mdLines[i] != '')
				ws = mdLines[i].split(mdLines[i].trim())[0]
			i++
		} while (i < mdLines.length && ws == '')
		
		for (var i=0;i<mdLines.length;i++) {
			if (mdLines[i].substr(0, ws.length) == ws) {
				mdLines[i] = mdLines[i].substr(ws.length)
			}
		}
		// console.log(mdLines.join('\n'))
    marked.setOptions({
      gfm: true
    })
		$(this).html(marked.parse(mdLines.join('\n')))

    $(this).find('table').each(function() {
      $(this).addClass('table table-sm')
    })
	})

  $('.gq-snippet').each(function() {
  	var thisDiv = $(this)
  	var id = $(this).attr('data-id') 
  	var version = $(this).attr('data-version') 
  	$.ajax({
  		url: 'shorthand/' + id,
  		success: function(output) {
  			if (output.error) {
  				console.log(output.error)
  				return
  			}
  			
  			// console.log(output.shorthand)
  			thisDiv.html(`
					<div class="row">
						<div class="col" style="width:50%">
							<h5>Shorthand</h5>
							<pre class="gq-snippet-sh pre-ws-fix">` + output.shorthand.jzp({brackets: 'keep'}) + `</pre>
						</div>
						<div class="col" style="width:50%">
							<h5>Score</h5>
							<img src="/nltabfiles/${id}/${output.version}/music.png" class="gq-snippet-img" />
						</div>
					</div>
					<div class="row">
						<div class="col"><h5><a class="gq-snippet-link"></a></h5></div>
					</div>
  			`)
  			if (thisDiv.attr('data-img-height') != undefined) {
  				thisDiv.find('.gq-snippet-img').css('height', thisDiv.attr('data-img-height') + 'px')
  			}
  			if (thisDiv.attr('data-shorthand-height') != undefined) {
  				thisDiv.find('.gq-snippet-sh').css('height', thisDiv.attr('data-shorthand-height') + 'px')
  			}
  			if (thisDiv.attr('data-link') != undefined) {
  				thisDiv.find('.gq-snippet-link').attr('href', '/nltabs/' + id).text(thisDiv.attr('data-link'))
  			}
  			
  		}
  	})
  })
})

String.prototype.jzp = function(obj) {
	if (typeof obj != 'undefined' && obj.brackets == "keep")
		return this.split('[[').join('[[<span class="jzp">').split(']]').join('</span>]]')
	else
		return this.split('[[').join('<span class="jzp">').split(']]').join('</span>')
}

function errorLog(str, includeLy) {
  var err = new Error();
  console.log('error', str, err.stack)
  // alert(str)
  var errorInfo = {
  	id: session.id,
  	version: session.version,
  	url: window.location.href,
  	shorthand: shCodeMirror.getValue()
  }
  if (typeof includeLy != "undefined" && includeLy == true) {
  	errorInfo.ilypond = lyCodeMirror.getValue()
  }
  $.ajax({
  	url: '/errorlog',
  	method: 'POST',
  	data: {error: errorInfo},
  	success: function(output) {
  		console.log('error logged', output.log)
  		alert('Error ID: ' + output.log + '\n\n' + str)
  	}
  })
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-5HRDLPY0K8');