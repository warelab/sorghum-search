import {createAsyncResourceBundle, createSelector} from 'redux-bundler'
// const API = 'http://brie6:8081/search_api';
// const API = 'http://localhost:5000/search_api';
// const API = '/search_api';
const API = 'http://www.sorghumbase.org/search_api';

const sorghumPosts = createAsyncResourceBundle({
  name: 'sorghumPosts',
  actionBaseType: 'SORGHUM_POSTS',
  getPromise: ({store}) =>
    fetch(`${API}/posts?${store.selectQueryString()}`)
      .then(res => res.json())
});

sorghumPosts.reactSorghumPosts = createSelector(
  'selectSorghumPostsShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return {actionCreator: 'doFetchSorghumPosts'}
    }
  }
);

const sorghumLinks = createAsyncResourceBundle({
  name: 'sorghumLinks',
  actionBaseType: 'SORGHUM_LINKS',
  getPromise: ({store}) =>
    fetch(`${API}/resource-link?${store.selectQueryString()}`)
      .then(res => res.json())
});

sorghumLinks.reactSorghumLinks = createSelector(
  'selectSorghumLinksShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return {actionCreator: 'doFetchSorghumLinks'}
    }
  }
);

const sorghumPeople = createAsyncResourceBundle({
  name: 'sorghumPeople',
  actionBaseType: 'SORGHUM_PEOPLE',
  getPromise: ({store}) =>
    fetch(`${API}/users?${store.selectQueryString()}`)
      .then(res => res.json())
});

sorghumLinks.reactSorghumPeople = createSelector(
  'selectSorghumPeopleShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return {actionCreator: 'doFetchSorghumPeople'}
    }
  }
);

const sorghumJobs = createAsyncResourceBundle({
  name: 'sorghumJobs',
  actionBaseType: 'SORGHUM_JOBS',
  getPromise: ({store}) =>
    fetch(`${API}/job?${store.selectQueryString()}`)
      .then(res => res.json())
});

sorghumJobs.reactSorghumJobs = createSelector(
  'selectSorghumJobsShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return {actionCreator: 'doFetchSorghumJobs'}
    }
  }
);

const sorghumEvents = createAsyncResourceBundle({
  name: 'sorghumEvents',
  actionBaseType: 'SORGHUM_EVENTS',
  getPromise: ({store}) =>
    fetch(`${API}/event?${store.selectQueryString()}`)
      .then(res => res.json())
});

sorghumEvents.reactSorghumEvents = createSelector(
  'selectSorghumEventsShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return {actionCreator: 'doFetchSorghumEvents'}
    }
  }
);

const sorghumPapers = createAsyncResourceBundle({
  name: 'sorghumPapers',
  actionBaseType: 'SORGHUM_PAPERS',
  getPromise: ({store}) =>
    fetch(`${API}/scientific_paper?${store.selectQueryString()}`)
      .then(res => res.json())
});

sorghumPapers.reactSorghumPapers = createSelector(
  'selectSorghumPapersShouldUpdate',
  'selectQueryString',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString) {
      return {actionCreator: 'doFetchSorghumPapers'}
    }
  }
);

export default [sorghumPosts, sorghumLinks, sorghumPeople, sorghumJobs, sorghumEvents, sorghumPapers];
