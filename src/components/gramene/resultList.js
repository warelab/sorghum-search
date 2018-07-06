import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const Genes = results => (
  <p id="Genes">show Genes here</p>
);
const Pathways = results => (
  <p id="Pathways">show Pathways here</p>
);
const Domains = results => (
  <p id="Domains">show Domains here</p>
);
const Species = results => (
  <p id="Species">show Species here</p>
);

const ResultsList = ({grameneGenes, grameneDomains, gramenePathways, grameneTaxonomy, searchUI, searchUpdated}) => (
  <div id="gramene" class="pt50 row">
    <div class="col">
      <div>
        {searchUI.Genes && Genes(grameneGenes)}
        {searchUI.Domains && Domains(grameneDomains)}
        {searchUI.Pathways && Pathways(gramenePathways)}
        {searchUI.Species && Species(grameneTaxonomy)}
      </div>
    </div>
  </div>
)

export default connect(
  'selectGrameneGenes',
  'selectGrameneDomains',
  'selectGramenePathways',
  'selectGrameneTaxonomy',
  'selectSearchUI',
  'selectSearchUpdated',
  ResultsList
)
