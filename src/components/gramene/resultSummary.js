import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({gramene}) => (
  <li>Gramene {gramene && gramene.response.numFound}</li>
)

export default connect(
  'selectGramene',
  ResultSummary
)
