import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultsList = ({sorghumContent}) => (
  <div id="sorghum" class="pt50 row">
    <div class="col">
      <div>
        {!sorghumContent && (
          <img src="//brie6:8081/static/images/dna_spinner.svg" />
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
