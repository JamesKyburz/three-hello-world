require('./reporterrors')

var THREE = require('three')
require('three-obj-loader')(THREE)
var OrbitViewer = require('three-orbit-viewer')

function pleaseRemoveLater () {
  var scripts = ['glTF-parser', 'glTFLoader', 'glTFLoaderUtils', 'glTFAnimation', 'glTFShaders']
  var pending = scripts.length
  scripts.forEach((s) => {
    var script = window.document.createElement('script')
    script.src = 'gltf/' + s + '.js'
    window.document.body.appendChild(script)
    script.onload = done
  })
  function done () {
    --pending
    if (!pending) {
      run()
    }
  }
  window.top.THREE = THREE
}

pleaseRemoveLater()

function run () {
  var app = OrbitViewer(THREE)({
    clearColor: 'rgba(255, 255, 255, 0.7)',
    clearAlpha: 1.0,
    fov: 65,
    far: 10000,
    once: false,
    position: new THREE.Vector3(570.565, -2235.66, 961.08),
    target: new THREE.Vector3(0, 0, 0),
    contextAttributes: {
      antialias: false,
      alpha: false
    }
  })
  app.renderer.setSize(window.innerWidth, window.innerHeight)

  window.app = app

  app.scene.add(new THREE.AmbientLight(0x222222))

  var dir = new THREE.DirectionalLight(0xdddddd)
  dir.position.set(0, 0, 1).normalize()
  app.scene.add(dir)

  var parent = new THREE.Object3D()
  app.scene.add(parent)

  // var loader = new THREE.glTFLoader()
  // loader.load('models/test.gltf', (model) => {
  //   parent.add(model.scene)
  //   var box = getCompoundBoundingBox(model.scene)
  //   var diagonal = box.size().length()
  //   var position = app.camera.position
  //   var newDelta = new THREE.Vector3(0, 0, 0)
  //   newDelta
  //     .sub(app.camera.position)
  //     .normalize()
  //     .multiplyScalar(diagonal)

  //   var newCenter = box.center().clone()
  //   newCenter.sub(newDelta)

  //   app.camera.position.copy(newCenter)
  //   app.camera.lookAt(box.center())
  //   app.renderer.setSize(window.innerWidth, window.innerHeight)

  //   debugger
  //   //var defaultCamera = (model.cameras || [])[0]
  //   //if (defaultCamera) {
  //   //  debugger
  //   //}
  // })

  var loader = new THREE.OBJLoader()
  loader.load('teapot.obj', (model) => {
    parent.add(model)
    window.top.model = model
    app.renderer.setSize(window.innerWidth, window.innerHeight)

    var box = getCompoundBoundingBox(model)
    var diagonal = box.size().length()
    var newDelta = new THREE.Vector3(0, 0, 0)
      .sub(app.camera.position)
      .normalize()
      .multiplyScalar(diagonal)

    var newCenter = box.center().clone()
    newCenter.sub(newDelta)

    app.camera.position.copy(newCenter)
    app.camera.lookAt(box.center())
  })

  window.top.p = parent
}

function getCompoundBoundingBox (object3D) {
  var box = null
  object3D.traverse(function (obj3D) {
    var geometry = obj3D.geometry
    if (geometry === undefined) return
    geometry.computeBoundingBox()
    if (box === null) {
      box = geometry.boundingBox
    } else {
      box.union(geometry.boundingBox)
    }
  })
  return box
}
