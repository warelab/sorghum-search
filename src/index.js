import { render } from 'preact'
import getStore from './bundles'
import Summary from './components/summary'
import Results from './components/results'
import SearchBox from './components/searchbox'

const store = getStore()
render(Summary(store), document.getElementById('search-summary'));
render(Results(store), document.getElementById('search-results'));
render(SearchBox(store), document.getElementById('search-box'));