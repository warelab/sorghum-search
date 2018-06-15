import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({gramene}) => {
  const status = gramene
    ? (<span class="badge badge-primary">{gramene.response.numFound}</span>)
    : (<img src="//brie6:8081/static/images/dna_spinner_sm.svg" />);
  return (
    <div class="card mb10">
      <div class="card-header accordion-header" role="tab" id="headingGramene">
        <h5 class="mb-0">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseGramene" aria-expanded="false" aria-controls="collapseGramene" class="collapsed">
            Gramene Search &nbsp;&nbsp;{status}
          </a>
        </h5>
      </div>

      <div id="collapseGramene" class="collapse" role="tabpanel" aria-labelledby="headingGramene" style="">
        <div class="card-body">
          <a data-scroll="" href="#gramene" className="nav-link active">facets</a>
        </div>
      </div>
    </div>
  )
}

export default connect(
  'selectGramene',
  ResultSummary
)
