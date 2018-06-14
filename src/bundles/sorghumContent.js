import { createAsyncResourceBundle, createSelector } from 'redux-bundler'

const bundle = createAsyncResourceBundle({
  name: 'sorghumContent',
  actionBaseType: 'SORGHUM_CMS',
  getPromise: ({store}) =>
    fetch(`http://brie6:8081/search_api/Sorghumbase?${store.selectQueryString()}`)
      .then(res => res.json())
});

bundle.reactSorghumContent = createSelector(
  'selectSorghumContentShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return { actionCreator: 'doFetchSorghumContent' }
    }
  }
);

export default bundle