import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({sorghumContent}) => (
  <a data-scroll="" href="#sorghum" className="nav-link active">sorghum CMS {sorghumContent && sorghumContent.numFound}</a>
)

export default connect(
  'selectSorghumContent',
  ResultSummary
)
