import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({gramene}) => {
  const status = gramene
    ? (<span class="badge badge-primary">{gramene.response.numFound}</span>)
    : (<img src="//brie6:8081/static/images/dna_spinner_sm.svg" />);
  return (
    <li class="active">
      <a href="#gramene" data-scroll="" class="nav-link active">
        Gramene Search &nbsp;&nbsp;{status}
      </a>
      <ul class="list-unstyled">
        <li>genes</li>
        <li>gene trees</li>
        <li>domains</li>
        <li>species</li>
      </ul>
    </li>
  )
}

export default connect(
  'selectGramene',
  ResultSummary
)
