import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultsList = ({grameneGenes}) => (
  <div id="gramene" class="pt50 row">
    <div class="col">
      <div>
        {!grameneGenes && (
          <pre>searching</pre>
        )}
        {grameneGenes && (
          <code>render the genes here</code>
        )}
      </div>
    </div>
  </div>
)

export default connect(
  'selectGrameneGenes',
  ResultsList
)
