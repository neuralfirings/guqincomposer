$(document).ready(function() {
  var nav = `
      <a class="navbar-brand" href="/"><i class="fas fa-sliders-h"></i> Guqin Tablature Composer</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link" href="/nltabs/">New Score</a>
          <a class="nav-item nav-link" href="/library.html">Library</a>
          <a class="nav-item nav-link" href="/gettingstarted.html">Getting Started</a>
          <a class="nav-item nav-link" href="/help.html">Docs</a>
          <span class="show-on-score nav-item navbar-text">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <a class="show-on-score save save-new-version nav-item nav-link" href="javascript:void(0)">Save<span class="unsaved">*</span></a>
          <a class="show-on-score save save-keep-version nav-item nav-link" data-keep-version="yes" href="javascript:void(0)">Save (this version)</a>
          <a class="show-on-score save-new nav-item nav-link" href="javascript:void(0)">Save As New</a>
          <a class="show-on-score lock nav-item nav-link" href="javascript:void(0)">Set Password to Save</a>
          <a class="show-on-score unlock nav-item nav-link" href="javascript:void(0)">Unset PW</a>
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
  			
  			console.log(output.shorthand)
  			thisDiv.html(`
					<div class="row">
						<div class="col" style="width:50%">
							<h5>Shorthand</h5>
							<pre class="pre-ws-fix">` + output.shorthand + `</pre>
						</div>
						<div class="col" style="width:50%">
							<h5>Score Render</h5>
							<img src="/nltabfiles/${id}/${output.version}/music.png" class="gq-snippet-img" />
						</div>
					</div>
  			`)
  			if (thisDiv.attr('data-img-height') != undefined) {
  				thisDiv.find('.gq-snippet-img').css('height', thisDiv.attr('data-img-height') + 'px')
  			}
  			
  		}
  	})
  })
})