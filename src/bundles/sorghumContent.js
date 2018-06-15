import {createAsyncResourceBundle, createSelector} from 'redux-bundler'

const bundle = createAsyncResourceBundle({
  name: 'sorghumContent',
  actionBaseType: 'SORGHUM_CMS',
  getPromise: ({store}) =>
    fetch(`http://brie6:8081/search_api/Sorghumbase?${store.selectQueryString()}`)
      .then(res => res.json())
});

bundle.selectSorghumCounts = createSelector(
  'selectSorghumContent',
  content => {
    if (!content) return false;
    let counts = {}
    content.docs.forEach(d => {
      if (!counts.hasOwnProperty(d.type)) {
        counts[d.type] = 1;
      }
      else {
        counts[d.type]++;
      }
    });
    return {
      total: content.numFound,
      types: counts
    }
  }
);

bundle.reactSorghumContent = createSelector(
  'selectSorghumContentShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return {actionCreator: 'doFetchSorghumContent'}
    }
  }
);

export default bundle