import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const Posts = results => {
  if (results && results.numFound > 0) {
    return (
      <div id="sorghumPosts" class="container mb40">
        <div class="fancy-title mb40">
          <h4>Posts</h4>
        </div>
        <div class="row">
          {results.docs.map(doc => (
            <div class="col-md-4 mb30">
              <div class="card card-body">
                <h4 class="card-title">
                  {doc.title.rendered}
                </h4>
                <p class="card-text" dangerouslySetInnerHTML={{__html: doc.excerpt.rendered}} />
                <a href={`/post/${doc.slug}`} class="btn btn-primary">read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const Events = results => {
  if (results && results.numFound > 0) {
    return (
      <div id="sorghumEvents" class="container mb40">
        <div class="fancy-title mb40">
          <h4>Events</h4>
        </div>
        <div class="row">
          {results.docs.map(doc => (
            <div class="col-md-4 mb30">
              <div class="card card-body">
                <h4 class="card-title">
                  {doc.title.rendered}
                </h4>
                <p class="card-text">{doc.start_date}</p>
                <p class="card-text">{doc.event_description}</p>
                <a href={doc.event_url} class="btn btn-primary">read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const Jobs = results => {
  if (results && results.numFound > 0) {
    return (
      <div id="sorghumJobs" class="container mb40">
        <div class="fancy-title mb40">
          <h4>Jobs</h4>
        </div>
        <div class="row">
          {results.docs.map(doc => (
            <div class="col-md-4 mb30">
              <div class="card card-body">
                <h4 class="card-title">
                  {doc.title.rendered}
                </h4>
                <p class="card-text">{doc.company}</p>
                <p class="card-text">{doc.job_description}</p>
                <a href={doc.job_url} class="btn btn-primary">read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const People = results => {
  if (results && results.numFound > 0) {
    return (
      <div id="sorghumPeople" class="container mb40">
        <div class="fancy-title mb40">
          <h4>People</h4>
        </div>
        <div class="row">
          {results.docs.map(doc => (
            <div class="col-md-4 mb30">
              <div class="card card-body">
                <h4 class="card-title">
                  <img src={doc.avatar_urls[96]} class="img-fluid rounded-circle centered"/>
                </h4>
                <p class="card-text text-center">{doc.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const Links = results => {
  if (results && results.numFound > 0) {
    return (
      <div id="sorghumLinks" class="container mb40">
        <div class="fancy-title mb40">
          <h4>Resource Links</h4>
        </div>
        <div class="row">
          {results.docs.map(doc => (
            <div class="col-md-4 mb30">
              <div class="card card-body">
                <h4 class="card-title">
                  {doc.resource_name}
                </h4>
                <p class="card-text">{doc.resource_blurb}</p>
                <a href={doc.resource_url} class="btn btn-primary">read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const Papers = results => {
  if (results && results.numFound > 0) {
    return (
      <div id="sorghumPapers" class="container mb40">
        <div class="fancy-title mb40">
          <h4>Research Papers</h4>
        </div>
        <div class="row">
          {results.docs.map(doc => (
            <div class="card card-inverse bg-dark mb30">
              <div class="card-body">
                <h3 class="card-title">
                  {doc.paper_title}
                </h3>
                <p class="card-text" dangerouslySetInnerHTML={{__html: doc.paper_authors}}/>
                <a href={doc.source_url} class="btn btn-primary">read more</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
};

const ResultsList = ({sorghumPosts, sorghumEvents, sorghumJobs, sorghumPeople, sorghumLinks, sorghumPapers}) => (
  <div id="sorghum" class="pt50 row">
    {Posts(sorghumPosts)}
    {Events(sorghumEvents)}
    {Jobs(sorghumJobs)}
    {People(sorghumPeople)}
    {Links(sorghumLinks)}
    {Papers(sorghumPapers)}
  </div>
);


export default connect(
  'selectSorghumPosts',
  'selectSorghumEvents',
  'selectSorghumJobs',
  'selectSorghumPeople',
  'selectSorghumLinks',
  'selectSorghumPapers',
  ResultsList
)
