import { h } from 'preact'
import { Provider } from 'redux-bundler-preact'
import Sorghum from './sorghum/resultSummary'
import Gramene from './gramene/resultSummary'

export default (store) => (
  <Provider store={store}>
    <div id="accordion" class="mb70" role="tablist" aria-multiselectable="true">
      <Sorghum />
      <Gramene />
    </div>
  </Provider>
)
