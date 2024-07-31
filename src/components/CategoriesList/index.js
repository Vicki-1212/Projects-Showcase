import './index.css'

const CategoriesList = props => {
  const {categoriesList} = props
  const {id, displayText} = categoriesList
  return (
    <>
      <option value={id}>{displayText}</option>
    </>
  )
}

export default CategoriesList
