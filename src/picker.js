var THREE = require('three')
var objects = []

module.exports = (app) => {
  var shift
  var selection = []
  var selectionBox = {
    update (object) {
      var box = new THREE.EdgesHelper(object, new THREE.Color('rgba(255, 0, 0, 0.8)'))
      if (!shift) {
        selection.forEach((x) => app.scene.remove(x))
        selection = []
      }
      selection.push(box)
      box.material.depthTest = false
      box.material.transparent = false
      app.scene.add(box)
    }
  }
  var container = { dom: app.engine.canvas }

  var raycaster = new THREE.Raycaster()
  var mouse = new THREE.Vector2()

  function getIntersects (point, objects) {
    mouse.set((point.x * 2) - 1, -(point.y * 2) + 1)

    raycaster.setFromCamera(mouse, app.camera)

    return raycaster.intersectObjects(objects)
  }

  var onDownPosition = new THREE.Vector2()
  var onUpPosition = new THREE.Vector2()
  var onDoubleClickPosition = new THREE.Vector2()

  function getMousePosition (dom, x, y) {
    var rect = dom.getBoundingClientRect()
    return [ (x - rect.left) / rect.width, (y - rect.top) / rect.height ]
  }

  function handleClick () {
    if (onDownPosition.distanceTo(onUpPosition) === 0) {
      var intersects = getIntersects(onUpPosition, objects)

      if (intersects.length > 0) {
        var object = intersects[ 0 ].object

        selectionBox.update(object)

        console.log('object selected!', object.parent.name)

        if (object.userData.object !== undefined) {
          // helper

          // editor.select( object.userData.object )

        } else {
          // editor.select( object )

        }
      } else {
        // editor.select( null )

      }
    }
  }

  function onMouseDown (event) {
    event.preventDefault()

    var array = getMousePosition(container.dom, event.clientX, event.clientY)
    onDownPosition.fromArray(array)

    document.addEventListener('mouseup', onMouseUp, false)
  }

  function onMouseUp (event) {
    var array = getMousePosition(container.dom, event.clientX, event.clientY)
    onUpPosition.fromArray(array)

    handleClick()

    document.removeEventListener('mouseup', onMouseUp, false)
  }

  function onTouchStart (event) {
    var touch = event.changedTouches[ 0 ]

    var array = getMousePosition(container.dom, touch.clientX, touch.clientY)
    onDownPosition.fromArray(array)

    document.addEventListener('touchend', onTouchEnd, false)
  }

  function onTouchEnd (event) {
    var touch = event.changedTouches[ 0 ]

    var array = getMousePosition(container.dom, touch.clientX, touch.clientY)
    onUpPosition.fromArray(array)

    handleClick()

    document.removeEventListener('touchend', onTouchEnd, false)
  }

  function onDoubleClick (event) {
    var array = getMousePosition(container.dom, event.clientX, event.clientY)
    onDoubleClickPosition.fromArray(array)
    getIntersects(onDoubleClickPosition, objects)
  }

  function onKeyDown (e) { shift = e.shiftKey }
  function onKeyUp (e) { shift = false }

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  container.dom.addEventListener('mousedown', onMouseDown, false)
  container.dom.addEventListener('touchstart', onTouchStart, false)
  container.dom.addEventListener('dblclick', onDoubleClick, false)
}

module.exports.addModel = (model) => model.traverse((child) => objects.push(child))
module.exports.clear = () => { objects = [] }
