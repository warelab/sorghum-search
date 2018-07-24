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

const defaultImg = "http://content.sorghumbase.org/wordpress/wp-content/uploads/2018/05/sorghum-grains_1920x1000.jpg";
const Link = ({doc}) => {
  const a_content = doc.resource_image
    ? <img src={doc.resource_image[0].guid} style="width:100%; max-height: 150px;"/>
    : <h4 dangerouslySetInnerHTML={{__html: doc.title.rendered}}/>;
  return (
    <div className="col-md-4 mb20 card">
      <a href={doc.resource_url}>
        {a_content}
      </a>
      <div className="card-body" dangerouslySetInnerHTML={{__html: stripImages(doc.content.rendered)}}/>
    </div>
  );
};

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

const ResultType = (cmp, id, label, results, searchUI, doChangeQuantity) => {
  if (searchUI[id] && results && results.numFound > 0) {
    const moreButton = (results.numFound > searchUI.rows[id])
      ? <button onClick={e => doChangeQuantity(id,3)}>More</button>
      : '';
    const fewerButton = (searchUI.rows[id] > 3)
      ? <button onClick={e => doChangeQuantity(id,-3)}>Fewer</button>
      : '';
    const docsToShow = results.docs.slice(0, searchUI.rows[id]);
    return (
      <div id={id} className="container mb40 anchor">
        <div className="fancy-title mb40">
          <h4>{label}</h4>
        </div>
        <div className="row special-feature mb50">
          {docsToShow.map(doc => h(cmp,{doc}))}
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
                     }) => {
  if (searchUI.sorghumbase) {
    return (
      <div id="sorghum" className="row">
        <div className="fancy-title pt50">
          <h3>Sorghumbase search results</h3>
        </div>
        {ResultType(Post,   'Posts',  'Blog/News',       sorghumPosts,  searchUI, doChangeQuantity)}
        {ResultType(Event,  'Events', 'Events',          sorghumEvents, searchUI, doChangeQuantity)}
        {ResultType(Job,    'Jobs',   'Jobs',            sorghumJobs,   searchUI, doChangeQuantity)}
        {ResultType(Person, 'People', 'People',          sorghumPeople, searchUI, doChangeQuantity)}
        {ResultType(Link,   'Links',  'Resource Links',  sorghumLinks,  searchUI, doChangeQuantity)}
        {ResultType(Paper,  'Papers', 'Research Papers', sorghumPapers, searchUI, doChangeQuantity)}
      </div>
    );
  }
}


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
