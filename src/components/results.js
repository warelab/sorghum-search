import { h } from 'preact'
import { Provider } from 'redux-bundler-preact'
import Sorghum from './sorghum/resultList'
import Gramene from './gramene/resultList'

export default (store) => (
  <Provider store={store}>
    <div>
      <Sorghum />
      <Gramene />
    </div>
  </Provider>
)
