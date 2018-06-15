import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultsList = ({gramene}) => (
  <div id="gramene" class="pt50 row">
    <div class="col">
      <div>
        {!gramene && (
          <pre>searching</pre>
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
