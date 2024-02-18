import {
  Clock,
  Scene,
  Vector,
  Ellipse,
  Rectangle,
  Superellipse,
  Canvas2DRenderer,
  type FillStyle,
} from "./lib"

const box1 = new Rectangle({
  width: 200,
  height: 120,
  radius: 10,
  x: 200,
  y: 200,
})

const box2 = new Rectangle({
  width: 80,
  height: 80,
  radius: 10,
  x: 200,
  y: 0,
})

const oval = new Ellipse({
  originY: -40,
  radiusX: 60,
  radiusY: 40,
  x: 80,
  y: 80,
})

const squircle = new Superellipse({
  fillStyle: "ivory",
  rotation: 20,
  divisions: 32,
  originX: -100,
  originY: -100,
  radiusX: 100,
  radiusY: 100,
  x: 200,
  y: 200,
})

const mouse = new Vector()
const scene = new Scene()

scene.addChild(squircle)
scene.addChild(box1)
box1.addChild(box2)
box2.addChild(oval)

export const renderer = new Canvas2DRenderer({
  fillStyle: "#222",
  width: innerWidth,
  height: innerHeight,
})

export const clock = new Clock({
  autostart: false,
})

function onMouseMove(event: MouseEvent) {
  mouse.set(event.x, event.y).scale(renderer.scale)
}

clock.on("start", () => {
  addEventListener("mousemove", onMouseMove)
})

clock.on("stop", () => {
  removeEventListener("mousemove", onMouseMove)
})

clock.on("tick", ({ time }) => {
  const cx = renderer.width / 2
  const cy = renderer.height / 2

  const rx = (renderer.width - box1.width) / 2
  const ry = (renderer.height - box1.height) / 2

  const defaultFillStyle: FillStyle = "ivory"
  const activeFillStyle: FillStyle = "tomato"

  // box1.x = cx + Math.cos(time / 1600) * rx
  // box1.y = cy + Math.sin(time / 1900) * ry
  box1.x = cx
  box1.y = cy

  box1.rotation = time / 20
  box2.rotation = time / 30
  oval.rotation = time / 40

  squircle.x = cx + Math.cos(time / 1600) * rx
  squircle.y = cy + Math.sin(time / 1900) * ry
  squircle.exponent = 4 + Math.sin(time / 1000) * 4
  squircle.rotation = time / 20

  box1.fillStyle = box1.contains(mouse) ? activeFillStyle : defaultFillStyle
  box2.fillStyle = box2.contains(mouse) ? activeFillStyle : defaultFillStyle
  oval.fillStyle = oval.contains(mouse) ? activeFillStyle : defaultFillStyle
  squircle.fillStyle = squircle.contains(mouse)
    ? activeFillStyle
    : defaultFillStyle

  renderer.render(scene)
})
