import qs from 'querystringify'

const isString = obj =>
  Object.prototype.toString.call(obj) === '[object String]'
const ensureString = input =>
  isString(input) ? input : qs.stringify(input);
const clearSuggestions = [
  {type: 'SORGHUM_POSTS_SUGGESTIONS_CLEARED'},
//   {type: 'SORGHUM_PROJECTS_SUGGESTIONS_CLEARED'},
//   {type: 'SORGHUM_LINKS_SUGGESTIONS_CLEARED'},
  {type: 'SORGHUM_EVENTS_SUGGESTIONS_CLEARED'},
//   {type: 'SORGHUM_PEOPLE_SUGGESTIONS_CLEARED'},
  {type: 'SORGHUM_PAPERS_SUGGESTIONS_CLEARED'},
  {type: 'GRAMENE_SUGGESTIONS_CLEARED'},
  {type: 'SUGGESTIONS_CLEARED'}
];
const UIbundle = {
  name: 'searchUI',
  getReducer: () => {
    const initialState = {
      suggestions_query: '',
      CMSTab: 'Posts'
    };
    return (state = initialState, {type, payload}) => {
      if (type === 'SUGGESTIONS_QUERY_CHANGED') {
        return Object.assign({}, state, {
          suggestions_query: payload.query
        });
      }
      if (type === 'SUGGESTIONS_CLEARED') {
        return Object.assign({}, state, {
          suggestions_query: ''
        });
      }
      if (type === 'CMS_TAB_CHANGED') {
        return Object.assign({}, state, {CMSTab:payload})
      }
      return state
    }
  },
  persistActions: ['SUGGESTIONS_CLEARED'],
  doChangeSuggestionsQuery: query => ({dispatch, getState}) => {
    dispatch({
      type: 'BATCH_ACTIONS', actions: [
        ...clearSuggestions,
        {type: 'SUGGESTIONS_QUERY_CHANGED', payload: {query: query.trim()}}
      ]
    });
  },
  doClearSuggestions: () => ({dispatch, getState}) => {
    document.getElementById('searchbar-parent').classList.remove('search-visible');
    dispatch({
      type: 'BATCH_ACTIONS', actions: clearSuggestions
    });
  },
  doAcceptSuggestion: suggestion => ({dispatch, getState}) => {
    document.getElementById('searchbar-parent').classList.remove('search-visible');
    dispatch({
      type: 'BATCH_ACTIONS', actions: [
        ...clearSuggestions
      ]
    });
  },
  doChangeSorghumTab: tab => ({dispatch}) => {
    dispatch({type: 'CMS_TAB_CHANGED', payload: tab})
  },
  selectSearchUI: state => state.searchUI,
  selectSuggestionsQuery: state => state.searchUI.suggestions_query,
  selectSuggestionsTab: state => state.searchUI.suggestions_tab,
  selectSorghumTab: state => state.searchUI.CMSTab,
  selectSorghumSuggestionsStatus: state => {
    let matches=0;
    let loading=0;
    if (state.sorghumPostsSuggestions && state.sorghumPostsSuggestions.data) matches += state.sorghumPostsSuggestions.data.numFound;
    else loading++;
//     if (state.sorghumProjectsSuggestions && state.sorghumProjectsSuggestions.data) matches += state.sorghumProjectsSuggestions.data.numFound;
//     else loading++;
//     if (state.sorghumLinksSuggestions && state.sorghumLinksSuggestions.data) matches += state.sorghumLinksSuggestions.data.numFound;
//     else loading++;
    if (state.sorghumEventsSuggestions && state.sorghumEventsSuggestions.data) matches += state.sorghumEventsSuggestions.data.numFound;
    else loading++;
    if (state.sorghumPapersSuggestions && state.sorghumPapersSuggestions.data) matches += state.sorghumPapersSuggestions.data.numFound;
    else loading++;
    return loading ? 'loading' : `${matches} match${matches !== 1 ? 'es' : ''}`;
  }
};

export default UIbundle;