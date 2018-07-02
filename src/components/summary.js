import { h } from 'preact'
import { Provider } from 'redux-bundler-preact'
import Sorghum from './sorghum/resultSummary'
import Gramene from './gramene/resultSummary'

export default (store) => (
  <Provider store={store}>
    <ul class="list-unstyled category">
      <Sorghum />
      <Gramene />
    </ul>
  </Provider>
)
