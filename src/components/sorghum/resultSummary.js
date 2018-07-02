import {connect} from 'redux-bundler-preact'
import {h} from 'preact'

const getStatus = (cat,results) => {
  const style = cat === 'Posts' ? 'category-checked' : 'category-not-checked';
  if (results) {
    if (results.numFound > 0) {
      return <li className={style}><a href="#" data-scroll="">{cat}<span style="float:right;">{results.numFound}</span></a></li>;
    }
    else {
      return <li className={style}><a href="#">{cat}<span style="float:right;">{results.numFound}</span></a></li>
    }
  }
  else {
    return <li className={style}><a href="#">{cat}<span style="float:right;"><img src="//brie6:8081/static/images/dna_spinner.svg" /></span></a></li>
  }
};

const total = (...args) => {
  let sum = 0;
  let done = true;
  args.forEach(type => {
    if (type) sum += type.numFound
    else done = false
  });
  if (sum > 0 || done) return sum;
  return <img src="//brie6.cshl.edu:8081/static/images/dna_spinner.svg" />
};

const ResultSummary = ({sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers, showSorghum, doToggleShowSorghum}) => {
  if (showSorghum) return (
    <li className="active category-expanded">
      <a onClick={e => doToggleShowSorghum()}>
        Sorghumbase<span style="float:right;">{total(sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers)}</span>
      </a>
      <ul className="list-unstyled">
        <li className="category-checked">{getStatus('Posts',sorghumPosts)}</li>
        <li className="category-checked">{getStatus('Events',sorghumEvents)}</li>
        <li className="category-checked">{getStatus('Jobs',sorghumJobs)}</li>
        <li>{getStatus('People',sorghumPeople)}</li>
        <li>{getStatus('Links',sorghumLinks)}</li>
        <li>{getStatus('Papers',sorghumPapers)}</li>
      </ul>
    </li>
  );
  else return (
    <li className="active category-collapsed">
      <a onClick={e => doToggleShowSorghum()}>
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
  'selectShowSorghum',
  'doToggleShowSorghum',
  ResultSummary
)
