import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from './components/Header'
import CategoriesList from './components/CategoriesList'
import ProjectList from './components/ProjectList'
import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAIURE',
  inProgress: 'INPROGRESS',
}

class App extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    projectList: [],
    category: 'ALL',
  }

  componentDidMount() {
    this.getApicalls()
  }

  getApicalls = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {category} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${category}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.projects.map(eachList => ({
        id: eachList.id,
        name: eachList.name,
        imageUrl: eachList.image_url,
      }))
      this.setState({
        projectList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value}, this.getApicalls)
  }

  onClickRetrybutton = () => {
    this.getApicalls()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetrybutton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {projectList} = this.state
    return (
      <ul className="project-list-container">
        {projectList.map(eachList => (
          <ProjectList key={eachList.id} projectDetails={eachList} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="showcase-container">
          <select className="select-input" onChange={this.onChangeCategory}>
            {categoriesList.map(eachList => (
              <CategoriesList key={eachList.id} categoriesList={eachList} />
            ))}
          </select>
          {this.renderApiStatusView()}
        </div>
      </div>
    )
  }
}

export default App
