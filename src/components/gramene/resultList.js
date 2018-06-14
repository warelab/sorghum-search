import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultsList = ({gramene}) => (
  <div id="gramene" class="pt50 row">
    <div class="col">
      <div>
        {!gramene && (
          <img src="//brie6:8081/static/images/dna_spinner.svg" />
        )}
        {gramene && (
          <code>{JSON.stringify(gramene)}</code>
        )}
      </div>
    </div>
  </div>
)

export default connect(
  'selectGramene',
  ResultsList
)
