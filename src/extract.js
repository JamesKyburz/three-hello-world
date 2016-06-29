var fs = require('fs')
var path = require('path')
var source = process.argv[2]
var prefix = path.basename(source.split('.')[0])
var content = fs.readFileSync(source, 'utf8')

console.log('extracting %s', source)

var count = 0

content = content.replace(/data:[^"]*/g, (uri) => {
  var parts = uri.split(',')
  var data = new Buffer(parts[1], 'base64')
  count++
  var name = prefix + '-' + count.toString() + '.' + (parts[0].match(/plain/) ? 'txt' : 'bin')
  console.log('writing to %s', name)
  fs.writeFileSync(name, data)
  return name
})

fs.writeFileSync(source, content)
