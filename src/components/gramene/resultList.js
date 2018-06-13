import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultsList = ({gramene}) => (
  <div>
    {!gramene && (
      <img src="//localhost:5000/static/images/dna_spinner.svg" />
    )}
    {gramene && (
      <code>{JSON.stringify(gramene)}</code>
    )}
  </div>
)

export default connect(
  'selectGramene',
  ResultsList
)
