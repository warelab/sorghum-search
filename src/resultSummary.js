import {connect} from 'redux-bundler-react'
import React from 'react'

const getStatus = (cat, results, isChecked, toggle) => {
  const tally = results ? results.numFound : <img src="/static/images/dna_spinner.svg"/>;
  return (
    <li className='category-leaf'>
      <input type="checkbox" checked={isChecked} onChange={e => toggle(cat)}/>
      <a data-scroll href={`#${cat}`} className="nav-link active">{cat}<span style={{float:"right"}}>{tally}</span></a>
    </li>
  )
};

const total = (...args) => {
  let sum = 0;
  let done = true;
  args.forEach(type => {
    if (type) sum += type.numFound
    else done = false
  });
  if (sum > 0 || done) return sum;
  return <img src="/static/images/dna_spinner.svg"/>;
};

const ResultSummary = ({
                         sorghumPosts, sorghumProjects, sorghumEvents,
                         sorghumPeople, sorghumLinks, sorghumPapers,
                         searchUI, searchUpdated, doToggleCategory
                       }) => {
  if (searchUI.sorghumbase) return (
    <li className="active category-expanded">
      <a onClick={e => doToggleCategory('sorghumbase')}>
        Sorghumbase<span
        style={{float:"right"}}>{total(sorghumPosts, sorghumProjects, sorghumEvents, sorghumPeople, sorghumLinks, sorghumPapers)}</span>
      </a>
      <ul className="list-unstyled">
        {getStatus('Posts', sorghumPosts, searchUI.Posts, doToggleCategory)}
        {getStatus('Projects', sorghumProjects, searchUI.Projects, doToggleCategory)}
        {getStatus('Events', sorghumEvents, searchUI.Events, doToggleCategory)}
        {getStatus('People', sorghumPeople, searchUI.People, doToggleCategory)}
        {getStatus('Links', sorghumLinks, searchUI.Links, doToggleCategory)}
        {getStatus('Papers', sorghumPapers, searchUI.Papers, doToggleCategory)}
      </ul>
    </li>
  );
  else return (
    <li className="active category-collapsed">
      <a onClick={e => doToggleCategory('sorghumbase')}>
        Sorghumbase<span
        style={{float:"right"}}>{total(sorghumPosts, sorghumProjects, sorghumEvents, sorghumPeople, sorghumLinks, sorghumPapers)}</span>
      </a>
    </li>
  );
};


export default connect(
  'selectSorghumPosts',
  'selectSorghumProjects',
  'selectSorghumEvents',
  'selectSorghumPeople',
  'selectSorghumLinks',
  'selectSorghumPapers',
  'selectSearchUI',
  'selectSearchUpdated',
  'doToggleCategory',
  ResultSummary
);
