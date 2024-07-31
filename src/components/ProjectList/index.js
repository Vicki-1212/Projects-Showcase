import './index.css'

const ProjectList = props => {
  const {projectDetails} = props
  const {id, name, imageUrl} = projectDetails
  return (
    <li className="project-list-item">
      <img src={imageUrl} alt={name} className="project-image" />
      <p className="project-name">{name}</p>
    </li>
  )
}

export default ProjectList
