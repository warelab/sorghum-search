import {connect} from 'redux-bundler-preact'
import {h} from 'preact'

const stripImages = (text) => {
  return text.replace(/<figure.*figure>/, ' ')
};

const Post = ({doc}) => (
  <div className="col-md-4 mb30">
    <div className="card card-body">
      <h4 className="card-title">
        {doc.title.rendered}
      </h4>
      <p className="card-text" dangerouslySetInnerHTML={{__html: stripImages(doc.excerpt.rendered)}}/>
      <a href={`/post/${doc.slug}`} className="btn btn-primary">read more</a>
    </div>
  </div>
);

const Event = ({doc}) => (
  <div className="col-md-4 mb30">
    <div className="card card-body">
      <h4 className="card-title">
        {doc.title.rendered}
      </h4>
      <p class="card-text">{doc.start_date}</p>
      <p class="card-text" dangerouslySetInnerHTML={{__html: stripImages(doc.content.rendered)}}/>
      <a href={`/events#${doc.title.rendered}`} class="btn btn-primary">view event</a>
    </div>
  </div>
);

const Job = ({doc}) => (
  <div className="col-md-4 mb30">
    <div className="card card-body">
      <h4 className="card-title">
        {doc.title.rendered}
      </h4>
      <p className="card-text">{doc.company}</p>
      <p className="card-text" dangerouslySetInnerHTML={{__html: stripImages(doc.content.rendered)}}/>
      <a href={doc.job_url} className="btn btn-primary">view job posting</a>
    </div>
  </div>
);

const Person = ({doc}) => (
  <div className="col-md-4 mb30">
    <div className="card card-body">
      <h4 className="card-title">
        <img src={doc.avatar_urls[96]} className="img-fluid rounded-circle centered"/>
      </h4>
      <p className="card-text text-center">{doc.name}</p>
    </div>
  </div>
);

const Link = ({doc}) => (
  <div className="col-md-4 mb30">
    <div className="card card-body">
      <h4 className="card-title">
        {doc.title.rendered}
      </h4>
      <p class="card-text" dangerouslySetInnerHTML={{__html: stripImages(doc.content.rendered)}}/>
      <a href={doc.resource_url} class="btn btn-primary">Visit resource</a>
    </div>
  </div>
);

const Paper = ({doc}) => (
  <div className="card card-inverse bg-dark mb30">
    <div className="card-body">
      <h3 className="card-title">
        {doc.title.rendered}
      </h3>
      <p className="card-text" dangerouslySetInnerHTML={{__html: doc.paper_authors}}/>
      <a href={doc.source_url} className="btn btn-primary">read more</a>
    </div>
  </div>
);

const ResultType = (cmp, id, label, results, doChangeQuantity) => {
  if (results && results.numFound > 0) {
    const moreButton = (results.numFound > results.docs.length)
      ? <button onClick={e => doChangeQuantity(id,3)}>more</button>
      : '';
    const fewerButton = (results.docs.length > 3)
      ? <button onClick={e => doChangeQuantity(id,-3)}>fewer</button>
      : '';
    return (
      <div id={id} className="container mb40 anchor">
        <div className="fancy-title mb40">
          <h4>{label}</h4>
        </div>
        <div className="row">
          {results.docs.map(doc => h(cmp,{doc}))}
        </div>
        <div className="row">
          {fewerButton}{moreButton}
        </div>
      </div>
    )
  }
};

const ResultList = ({
                       sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers,
                       searchUI, searchUpdated, doChangeQuantity
                     }) => (
  <div id="sorghum" className="row">
    {searchUI.sorghumbase && searchUI.Posts  && ResultType(Post,   'Posts',  'Blog/News',       sorghumPosts,  doChangeQuantity)}
    {searchUI.sorghumbase && searchUI.Events && ResultType(Event,  'Events', 'Events',          sorghumEvents, doChangeQuantity)}
    {searchUI.sorghumbase && searchUI.Jobs   && ResultType(Job,    'Jobs',   'Jobs',            sorghumJobs,   doChangeQuantity)}
    {searchUI.sorghumbase && searchUI.People && ResultType(Person, 'People', 'People',          sorghumPeople, doChangeQuantity)}
    {searchUI.sorghumbase && searchUI.Links  && ResultType(Link,   'Links',  'Resource Links',  sorghumLinks,  doChangeQuantity)}
    {searchUI.sorghumbase && searchUI.Papers && ResultType(Paper,  'Papers', 'Research Papers', sorghumPapers, doChangeQuantity)}
  </div>
);


export default connect(
  'selectSorghumPosts',
  'selectSorghumEvents',
  'selectSorghumJobs',
  'selectSorghumPeople',
  'selectSorghumLinks',
  'selectSorghumPapers',
  'selectSearchUI',
  'selectSearchUpdated',
  'doChangeQuantity',
  ResultList
);
