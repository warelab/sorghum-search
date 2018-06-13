import { createAsyncResourceBundle, createSelector } from 'redux-bundler'

const bundle = createAsyncResourceBundle({
  name: 'gramene',
  actionBaseType: 'GRAMENE',
  getPromise: ({store}) =>
    fetch(`http://data.gramene.org/search?${store.selectQueryString()}`)
      .then(res => res.json())
});

bundle.reactGramene = createSelector(
  'selectGrameneShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return { actionCreator: 'doFetchGramene' }
    }
  }
);

export default bundle