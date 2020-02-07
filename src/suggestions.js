import {connect} from 'redux-bundler-react'
import React from 'react'

const getStatus = (cat, results, doClearSuggestions, doAcceptSorghumSuggestion, queryString) => {
  const tally = results ? results.numFound : <span>...</span>;
  return (
    <button type="button"
            className="btn btn-info mb5 btn-rounded"
            onClick={e => doAcceptSorghumSuggestion(`q=${queryString}`)}>
      {cat}&nbsp;{tally}
    </button>
  )
};

const total = (...args) => {
  let sum = 0;
  let done = true;
  args.forEach(type => {
    if (type) sum += type.numFound;
    else done = false
  });
  if (sum > 0 || done) return sum;
  return 'searching';//<img src="/static/images/dna_spinner.svg"/>;
};

const Suggestions = ({   suggestionsQuery,
                         sorghumPostsSuggestions, sorghumProjectsSuggestions, sorghumEventsSuggestions,
                         sorghumPeopleSuggestions, sorghumLinksSuggestions, sorghumPapersSuggestions,
                         doClearSuggestions, doAcceptSorghumSuggestion
                       }) => (
  <div className="container">
    <div className="row">
      <div className="col-md-1">{total(sorghumPostsSuggestions, sorghumProjectsSuggestions, sorghumEventsSuggestions,
        sorghumPeopleSuggestions, sorghumLinksSuggestions, sorghumPapersSuggestions)}
      </div>
      <div className="col-md-6">
        {getStatus('Posts', sorghumPostsSuggestions, doClearSuggestions, doAcceptSorghumSuggestion, suggestionsQuery)}
        {getStatus('Projects', sorghumProjectsSuggestions, doClearSuggestions, doAcceptSorghumSuggestion, suggestionsQuery)}
        {getStatus('Events', sorghumEventsSuggestions, doClearSuggestions, doAcceptSorghumSuggestion, suggestionsQuery)}
        {getStatus('People', sorghumPeopleSuggestions, doClearSuggestions, doAcceptSorghumSuggestion, suggestionsQuery)}
        {getStatus('Links', sorghumLinksSuggestions, doClearSuggestions, doAcceptSorghumSuggestion, suggestionsQuery)}
        {getStatus('Papers', sorghumPapersSuggestions, doClearSuggestions, doAcceptSorghumSuggestion, suggestionsQuery)}
      </div>
    </div>
  </div>
);

//   if (searchUI.sorghumbase) return (
//     <div className="col-lg-3">
//       <li className="active category-expanded">
//         <a onClick={e => doToggleCategory('sorghumbase')}>
//           website matches<span
//           style={{float:"right"}}>{total(sorghumPostsSuggestions, sorghumProjectsSuggestions, sorghumEventsSuggestions, sorghumJobsSuggestions, sorghumPeopleSuggestions, sorghumLinksSuggestions, sorghumPapersSuggestions)}</span>
//         </a>
//         <ul className="list-unstyled">
//           {getStatus('Posts', sorghumPostsSuggestions, doClearSuggestions, suggestionsQuery)}
//           {getStatus('Projects', sorghumProjectsSuggestions, doClearSuggestions, suggestionsQuery)}
//           {getStatus('Events', sorghumEventsSuggestions, doClearSuggestions, suggestionsQuery)}
//           {getStatus('Jobs', sorghumJobsSuggestions, doClearSuggestions, suggestionsQuery)}
//           {getStatus('People', sorghumPeopleSuggestions, doClearSuggestions, suggestionsQuery)}
//           {getStatus('Links', sorghumLinksSuggestions, doClearSuggestions, suggestionsQuery)}
//           {getStatus('Papers', sorghumPapersSuggestions, doClearSuggestions, suggestionsQuery)}
//         </ul>
//       </li>
//     </div>
//   );
//   else return (
//     <div className="col-lg-3">
//       <li className="active category-collapsed">
//         <a onClick={e => doToggleCategory('sorghumbase')}>
//           website matches<span
//           style={{float:"right"}}>{total(sorghumPostsSuggestions, sorghumProjectsSuggestions, sorghumEventsSuggestions, sorghumJobsSuggestions, sorghumPeopleSuggestions, sorghumLinksSuggestions, sorghumPapersSuggestions)}</span>
//         </a>
//       </li>
//     </div>
//   );
// };
//

export default connect(
  'selectSuggestionsQuery',
  'selectSorghumPostsSuggestions',
  'selectSorghumProjectsSuggestions',
  'selectSorghumEventsSuggestions',
  'selectSorghumPeopleSuggestions',
  'selectSorghumLinksSuggestions',
  'selectSorghumPapersSuggestions',
  'selectSearchUpdated',
  'doClearSuggestions',
  'doAcceptSorghumSuggestion',
  Suggestions
);
