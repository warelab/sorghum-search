import {createAsyncResourceBundle, createSelector} from 'redux-bundler'
// const API = 'http://brie6:8081/search_api';
// const API = 'http://127.0.0.1:5000/search_api';
// const API = '/search_api';
const API = 'https://www.sorghumbase.org/search_api';

const sorghumPosts = createAsyncResourceBundle({
  name: 'sorghumPosts',
  actionBaseType: 'SORGHUM_POSTS',
  persist: false,
  getPromise: ({store}) =>
    fetch(`${API}/posts?${store.selectQueryString()}&rows=${store.selectRows()['Posts'] * 3}`)
      .then(res => res.json())
});

sorghumPosts.reactSorghumPosts = createSelector(
  'selectSorghumPostsShouldUpdate',
  'selectQueryString',
  'selectPathname',
  (shouldUpdate, queryString, path) => {
    if (shouldUpdate && queryString && (path === '/search' || path === '/search.html')) {
      return {actionCreator: 'doFetchSorghumPosts'}
    }
  }
);

// const sorghumProjects = createAsyncResourceBundle({
//   name: 'sorghumProjects',
//   actionBaseType: 'SORGHUM_PROJECTS',
//   persist: false,
//   getPromise: ({store}) =>
//     fetch(`${API}/project?${store.selectQueryString()}&rows=${store.selectRows()['Projects'] * 3}`)
//       .then(res => res.json())
// });
//
// sorghumProjects.reactSorghumProjects = createSelector(
//   'selectSorghumProjectsShouldUpdate',
//   'selectQueryString',
//   'selectPathname',
//   (shouldUpdate, queryString, path) => {
//     if (shouldUpdate && queryString && (path === '/search' || path === '/search.html')) {
//       return {actionCreator: 'doFetchSorghumProjects'}
//     }
//   }
// );
//
// const sorghumLinks = createAsyncResourceBundle({
//   name: 'sorghumLinks',
//   actionBaseType: 'SORGHUM_LINKS',
//   persist: false,
//   getPromise: ({store}) =>
//     fetch(`${API}/resource-link?${store.selectQueryString()}&rows=${store.selectRows()['Links'] * 3}`)
//       .then(res => res.json())
// });
//
// sorghumLinks.reactSorghumLinks = createSelector(
//   'selectSorghumLinksShouldUpdate',
//   'selectQueryString',
//   'selectPathname',
//   (shouldUpdate, queryString, path) => {
//     if (shouldUpdate && queryString && (path === '/search' || path === '/search.html')) {
//       return {actionCreator: 'doFetchSorghumLinks'}
//     }
//   }
// );
//
// const sorghumPeople = createAsyncResourceBundle({
//   name: 'sorghumPeople',
//   actionBaseType: 'SORGHUM_PEOPLE',
//   persist: false,
//   getPromise: ({store}) =>
//     fetch(`${API}/users?${store.selectQueryString()}&rows=${store.selectRows()['People'] * 3}`)
//       .then(res => res.json())
// });
//
// sorghumPeople.reactSorghumPeople = createSelector(
//   'selectSorghumPeopleShouldUpdate',
//   'selectQueryString',
//   'selectPathname',
//   (shouldUpdate, queryString, path) => {
//     if (shouldUpdate && queryString && (path === '/search' || path === '/search.html')) {
//       return {actionCreator: 'doFetchSorghumPeople'}
//     }
//   }
// );

const sorghumEvents = createAsyncResourceBundle({
  name: 'sorghumEvents',
  actionBaseType: 'SORGHUM_EVENTS',
  persist: false,
  getPromise: ({store}) =>
    fetch(`${API}/event?${store.selectQueryString()}&rows=${store.selectRows()['Events'] * 3}`)
      .then(res => res.json())
});

sorghumEvents.reactSorghumEvents = createSelector(
  'selectSorghumEventsShouldUpdate',
  'selectQueryString',
  'selectPathname',
  (shouldUpdate, queryString, path) => {
    if (shouldUpdate && queryString && (path === '/search' || path === '/search.html')) {
      return {actionCreator: 'doFetchSorghumEvents'}
    }
  }
);

const sorghumPapers = createAsyncResourceBundle({
  name: 'sorghumPapers',
  actionBaseType: 'SORGHUM_PAPERS',
  persist: false,
  getPromise: ({store}) =>
    fetch(`${API}/scientific_paper?${store.selectQueryString()}&rows=${store.selectRows()['Papers'] * 3}`)
      .then(res => res.json())
});

sorghumPapers.reactSorghumPapers = createSelector(
  'selectSorghumPapersShouldUpdate',
  'selectQueryString',
  'selectPathname',
  (shouldUpdate, queryString, path) => {
    if (shouldUpdate && queryString && (path === '/search' || path === '/search.html')) {
      return {actionCreator: 'doFetchSorghumPapers'}
    }
  }
);

const sorghumPostsSuggestions = createAsyncResourceBundle({
  name: 'sorghumPostsSuggestions',
  actionBaseType: 'SORGHUM_POSTS_SUGGESTIONS',
  persist: false,
  getPromise: ({store}) =>
    fetch(`${API}/posts?q=${store.selectSuggestionsQuery()}&rows=100`)
      .then(res => res.json())
      .then(posts => {
        const q = store.selectSuggestionsQuery()
        return q === posts.q ? posts : store.selectPostsSuggestions()
      })
});

sorghumPostsSuggestions.reactSorghumPostsSuggestions = createSelector(
  'selectSorghumPostsSuggestionsShouldUpdate',
  'selectSuggestionsQuery',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString.length > 1) {
      return {actionCreator: 'doFetchSorghumPostsSuggestions'}
    }
  }
);

// const sorghumProjectsSuggestions = createAsyncResourceBundle({
//   name: 'sorghumProjectsSuggestions',
//   actionBaseType: 'SORGHUM_PROJECTS_SUGGESTIONS',
//   persist: false,
//   getPromise: ({store}) =>
//     fetch(`${API}/project?q=${store.selectSuggestionsQuery()}&rows=100`)
//       .then(res => res.json())
// });
//
// sorghumProjectsSuggestions.reactSorghumProjectsSuggestions = createSelector(
//   'selectSorghumProjectsSuggestionsShouldUpdate',
//   'selectSuggestionsQuery',
//   (shouldUpdate, queryString) => {
//     if (shouldUpdate && queryString.length > 1) {
//       return {actionCreator: 'doFetchSorghumProjectsSuggestions'}
//     }
//   }
// );
//
// const sorghumLinksSuggestions = createAsyncResourceBundle({
//   name: 'sorghumLinksSuggestions',
//   actionBaseType: 'SORGHUM_LINKS_SUGGESTIONS',
//   persist: false,
//   getPromise: ({store}) =>
//     fetch(`${API}/resource-link?q=${store.selectSuggestionsQuery()}&rows=100`)
//       .then(res => res.json())
// });
//
// sorghumLinksSuggestions.reactSorghumLinksSuggestions = createSelector(
//   'selectSorghumLinksSuggestionsShouldUpdate',
//   'selectSuggestionsQuery',
//   (shouldUpdate, queryString) => {
//     if (shouldUpdate && queryString.length > 1) {
//       return {actionCreator: 'doFetchSorghumLinksSuggestions'}
//     }
//   }
// );
//
// const sorghumPeopleSuggestions = createAsyncResourceBundle({
//   name: 'sorghumPeopleSuggestions',
//   actionBaseType: 'SORGHUM_PEOPLE_SUGGESTIONS',
//   persist: false,
//   getPromise: ({store}) =>
//     fetch(`${API}/users?q=${store.selectSuggestionsQuery()}&rows=100`)
//       .then(res => res.json())
// });
//
// sorghumPeopleSuggestions.reactSorghumPeopleSuggestions = createSelector(
//   'selectSorghumPeopleSuggestionsShouldUpdate',
//   'selectSuggestionsQuery',
//   (shouldUpdate, queryString) => {
//     if (shouldUpdate && queryString.length > 1) {
//       return {actionCreator: 'doFetchSorghumPeopleSuggestions'}
//     }
//   }
// );

const sorghumEventsSuggestions = createAsyncResourceBundle({
  name: 'sorghumEventsSuggestions',
  actionBaseType: 'SORGHUM_EVENTS_SUGGESTIONS',
  persist: false,
  getPromise: ({store}) =>
    fetch(`${API}/event?q=${store.selectSuggestionsQuery()}&rows=100`)
      .then(res => res.json())
      .then(events => {
        const q = store.selectSuggestionsQuery()
        return q === events.q ? events : store.selectEventsSuggestions()
      })
      .then(events => {
        // filter out past events
        const now = new Date();
        events.docs = events.docs.filter(e => new Date(e.start_date) > now);
        events.numFound = events.docs.length;
        return events;
      })
});

sorghumEventsSuggestions.reactSorghumEventsSuggestions = createSelector(
  'selectSorghumEventsSuggestionsShouldUpdate',
  'selectSuggestionsQuery',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString.length > 1) {
      return {actionCreator: 'doFetchSorghumEventsSuggestions'}
    }
  }
);

const sorghumPapersSuggestions = createAsyncResourceBundle({
  name: 'sorghumPapersSuggestions',
  actionBaseType: 'SORGHUM_PAPERS_SUGGESTIONS',
  persist: false,
  getPromise: ({store}) =>
    fetch(`${API}/scientific_paper?q=${store.selectSuggestionsQuery()}&rows=100`)
      .then(res => res.json())
      .then(papers => {
        const q = store.selectSuggestionsQuery()
        return q === papers.q ? papers : store.selectPapersSuggestions()
      })
});

sorghumPapersSuggestions.reactSorghumPapersSuggestions = createSelector(
  'selectSorghumPapersSuggestionsShouldUpdate',
  'selectSuggestionsQuery',
  (shouldUpdate, queryString) => {
    if (shouldUpdate && queryString.length > 1) {
      return {actionCreator: 'doFetchSorghumPapersSuggestions'}
    }
  }
);

const sorghumTags = createAsyncResourceBundle( {
  name: 'sorghumTags',
  actionBaseType: 'SORGHUM_TAGS',
  persist: false,
  getPromise: ({store}) =>
    fetch(`${API}/tags`)
      .then(res => res.json())
});

sorghumTags.reactSorghumTags = createSelector(
  'selectSorghumTagsShouldUpdate',
  (shouldUpdate) => {
    if (shouldUpdate) {
      return {actionCreator: 'doFetchSorghumTags'}
    }
  }
);

// sorghumPostsSuggestions.doAcceptPostSuggestion = post => {
//   console.log(post)
// };
//
// sorghumPapersSuggestions.doAcceptPaperSuggestion = paper => {
//   console.log(paper)
// };
// sorghumEventsSuggestions.doAcceptEventSuggestion = event => {
//   console.log(event)
// };
// sorghumLinksSuggestions.doAcceptLinkSuggestion = link => {
//   console.log(link)
// };
// sorghumProjectsSuggestions.doAcceptProjectSuggestion = project => {
//   console.log(project)
// };
export default [
  sorghumPosts,
  // sorghumProjects,
  // sorghumLinks,
  // sorghumPeople,
  sorghumEvents,
  sorghumPapers,
  sorghumTags,
  sorghumPostsSuggestions,
  // sorghumProjectsSuggestions,
  // sorghumLinksSuggestions,
  // sorghumPeopleSuggestions,
  sorghumEventsSuggestions,
  sorghumPapersSuggestions
];
