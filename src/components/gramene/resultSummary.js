import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({grameneGenes}) => {
  const status = grameneGenes
    ? (<span style="float:right;" class="badge badge-primary">{grameneGenes.response.numFound}</span>)
    : (<img src="//brie6:8081/static/images/dna_spinner.svg" />);
  return (
    <li class="active">
      <a href="#gramene" data-scroll="" class="nav-link active">
        Gramene Search &nbsp;&nbsp;{status}
      </a>
      <ul class="list-unstyled">
        <a>genes</a>
        <a>gene trees</a>
        <a>domains</a>
        <a>species</a>
      </ul>
    </li>
  )
}

export default connect(
  'selectGrameneGenes',
  ResultSummary
)
