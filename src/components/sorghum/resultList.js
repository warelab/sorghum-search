import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultsList = ({sorghumContent}) => (
  <div>
    {!sorghumContent && (
      <img src="//localhost:5000/static/images/dna_spinner.svg" />
    )}
    {sorghumContent && (
      <code>{JSON.stringify(sorghumContent)}</code>
    )}
  </div>
)

export default connect(
  'selectSorghumContent',
  ResultsList
)
