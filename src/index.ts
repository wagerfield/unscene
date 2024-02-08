import "./index.css"
import { renderer, clock } from "./sandbox"

const root = document.getElementById("root")

if (root) {
  root.appendChild(renderer.element)
  clock.start()
}
