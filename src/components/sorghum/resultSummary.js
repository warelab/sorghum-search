import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({sorghumContent}) => (
  <li>Sorghum CMS {sorghumContent && sorghumContent.numFound}</li>
)

export default connect(
  'selectSorghumContent',
  ResultSummary
)
