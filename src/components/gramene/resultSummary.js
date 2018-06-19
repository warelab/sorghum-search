import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({grameneGenes}) => {
  const status = grameneGenes
    ? grameneGenes.response.numFound
    : <img src="//brie6:8081/static/images/dna_spinner.svg" />;
  return (
    <li class="active">
      <a href="#gramene" data-scroll="" class="nav-link active">
        Gramene Search
      </a>
      <ul class="list-unstyled">
        <li><a>Genes<span style="float:right;">{status}</span></a></li>
        <li><a>domains</a></li>
        <li><a>pathways</a></li>
        <li><a>species</a></li>
      </ul>
    </li>
  )
}

export default connect(
  'selectGrameneGenes',
  ResultSummary
)
