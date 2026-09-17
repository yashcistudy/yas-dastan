import FigmaPrototype from './FigmaPrototype.jsx'

/** Micro Party Engine lives as a clickable prototype, so the prototype is the artifact. */
export default function PrototypeWorld({ project }) {
  return (
    <div className="world-body">
      <FigmaPrototype prototype={project.prototype} />
    </div>
  )
}
