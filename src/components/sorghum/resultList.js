import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultsList = ({sorghumContent}) => (
  <div id="sorghum" class="pt50 row">
    <div class="col">
      <div>
        {!sorghumContent && (
          <pre>searching</pre>
        )}
        {sorghumContent && (
          <code>{JSON.stringify(sorghumContent)}</code>
        )}
      </div>
    </div>
  </div>
)

export default connect(
  'selectSorghumContent',
  ResultsList
)
