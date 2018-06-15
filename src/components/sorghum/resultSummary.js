import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({sorghumContent}) => {
  const status = sorghumContent
    ? (<span class="badge badge-primary">{sorghumContent.numFound}</span>)
    : (<img src="//brie6:8081/static/images/dna_spinner_sm.svg" />);
  return (
    <div class="card mb10">
      <div class="card-header accordion-header" role="tab" id="headingSorghum">
        <h5 class="mb-0">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapseSorghum" aria-expanded="false" aria-controls="collapseSorghum" class="collapsed">
            Sorghum CMS &nbsp;&nbsp;{status}
          </a>
        </h5>
      </div>

      <div id="collapseSorghum" class="collapse" role="tabpanel" aria-labelledby="headingSorghum" style="">
        <div class="card-body">
          <a data-scroll="" href="#sorghum" className="nav-link active">link to results of a given type</a>
        </div>
      </div>
    </div>
  )
}

export default connect(
  'selectSorghumContent',
  ResultSummary
)
