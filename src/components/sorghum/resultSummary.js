import {connect} from 'redux-bundler-preact'
import {h} from 'preact'

const getStatus = (cat,results) => {
  if (results) {
    if (results.numFound > 0) {
      return <a href={`#sorghum${cat}`} data-scroll="" class="nav-link active">{cat}<span style="float:right;">{results.numFound}</span></a>;
    }
    else {
      return <a>{cat}<span style="float:right;">{results.numFound}</span></a>
    }
  }
  else {
    return <a>{cat}<span style="float:right;"><img src="//brie6:8081/static/images/dna_spinner.svg" /></span></a>
  }
};

const total = (...args) => {
  let sum = 0;
  args.forEach(type => {
    if (type) sum += type.numFound
  });
  if (sum > 0) return sum;
  return <img src="//brie6:8081/static/images/dna_spinner.svg" />
};

const ResultSummary = ({sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers}) => (
  <li class="active">
    <a href="#sorghum" data-scroll="" class="nav-link active">
      Sorghum CMS<span style="float:right;">{total(sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers)}</span>
    </a>
    <ul class="list-unstyled categories">
      <li>{getStatus('Posts',sorghumPosts)}</li>
      <li>{getStatus('Events',sorghumEvents)}</li>
      <li>{getStatus('Jobs',sorghumJobs)}</li>
      <li>{getStatus('People',sorghumPeople)}</li>
      <li>{getStatus('Links',sorghumLinks)}</li>
      <li>{getStatus('Papers',sorghumPapers)}</li>
    </ul>
  </li>
);


export default connect(
  'selectSorghumPosts',
  'selectSorghumEvents',
  'selectSorghumJobs',
  'selectSorghumPeople',
  'selectSorghumLinks',
  'selectSorghumPapers',
  ResultSummary
)
