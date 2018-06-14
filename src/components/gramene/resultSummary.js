import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({gramene}) => (
  <a data-scroll="" href="#gramene" className="nav-link active">gramene search {gramene && gramene.response.numFound}</a>
)

export default connect(
  'selectGramene',
  ResultSummary
)
