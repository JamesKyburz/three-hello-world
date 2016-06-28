window.addEventListener('error', function catchError (e) {
  var html = `<pre>
    message: ${e.message}
    file: ${e.filename}
    line: ${e.lineno}
    col: ${e.colno}
  </pre>`
  if (catchError.html === html) return
  var el = window.document.querySelector('html')
  el.innerHTML = html
})
