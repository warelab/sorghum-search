import {connect} from 'redux-bundler-preact'
import {h} from 'preact'
import {getStatus} from '../utils'

const total = (...args) => {
  let sum = 0;
  let done = true;
  args.forEach(type => {
    if (type) sum += type.numFound
    else done = false
  });
  if (sum > 0 || done) return sum;
  return <img src="//brie6.cshl.edu:8081/static/images/dna_spinner.svg"/>
};

const ResultSummary = ({
                         sorghumPosts, sorghumEvents, sorghumJobs,
                         sorghumPeople, sorghumLinks, sorghumPapers,
                         searchUI, searchUpdated, doToggleCategory
                       }) => {
  if (searchUI.sorghumbase) return (
    <li className="active category-expanded">
      <a onClick={e => doToggleCategory('sorghumbase')}>
        Sorghumbase<span
        style="float:right;">{total(sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers)}</span>
      </a>
      <ul className="list-unstyled">
        {getStatus('Posts', sorghumPosts, searchUI.Posts, doToggleCategory)}
        {getStatus('Events', sorghumEvents, searchUI.Events, doToggleCategory)}
        {getStatus('Jobs', sorghumJobs, searchUI.Jobs, doToggleCategory)}
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
        style="float:right;">{total(sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers)}</span>
      </a>
    </li>
  );
};


export default connect(
  'selectSorghumPosts',
  'selectSorghumEvents',
  'selectSorghumJobs',
  'selectSorghumPeople',
  'selectSorghumLinks',
  'selectSorghumPapers',
  'selectSearchUI',
  'selectSearchUpdated',
  'doToggleCategory',
  ResultSummary
)
