import {composeBundles} from 'redux-bundler'
import sorghumContent from './sorghumContent'
import grameneBundles from './gramene'
import qs from 'querystringify'

const isString = obj =>
  Object.prototype.toString.call(obj) === '[object String]'
const ensureString = input =>
  isString(input) ? input : qs.stringify(input)

const bundle = composeBundles(
  ...sorghumContent,
  ...grameneBundles,
  {
    name: 'meta',
    doUpdateTheQueries: query => ({dispatch, getState}) => {
      const url = new URL(getState().url.url);
      url.search = ensureString(query);
      dispatch({type: 'BATCH_ACTIONS', actions: [
          {type: 'SORGHUM_POSTS_CLEARED'},
          {type: 'SORGHUM_LINKS_CLEARED'},
          {type: 'SORGHUM_JOBS_CLEARED'},
          {type: 'SORGHUM_EVENTS_CLEARED'},
          {type: 'SORGHUM_PEOPLE_CLEARED'},
          {type: 'SORGHUM_PAPERS_CLEARED'},
          {type: 'GRAMENE_GENES_CLEARED'},
          {type: 'GRAMENE_TAXONOMY_CLEARED'},
          {type: 'GRAMENE_DOMAINS_CLEARED'},
          {type: 'GRAMENE_PATHWAYS_CLEARED'},
          {type: 'URL_UPDATED', payload: {url: url.href, replace: false}}
        ]});
    }
  }
);


export default bundle;