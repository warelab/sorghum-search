import { render } from 'preact'
import getStore from './bundles'
import summary from './components/summary'
import results from './components/results'

const store = getStore()
render(summary(store), document.getElementById('search-summary'));
render(results(store), document.getElementById('search-results'));