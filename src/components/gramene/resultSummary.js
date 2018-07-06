import { connect } from 'redux-bundler-preact'
import { h } from 'preact'
import {getStatus} from '../utils'


const ResultSummary = ({grameneGenes, gramenePathways, grameneDomains, grameneTaxonomy, searchUI, searchUpdated, doToggleCategory}) => {
  const status = grameneGenes ?
    grameneGenes.numFound:
    <img src="/static/images/dna_spinner.svg"/>;
  if (searchUI.Gramene) return (
    <li className="active category-expanded">
      <a onClick={e => doToggleCategory('Gramene')}>
        Gramene Search<span style="float:right;">{status}</span>
      </a>
      <ul className="list-unstyled">
        {getStatus('Genes', grameneGenes, searchUI.Genes, doToggleCategory)}
        {getStatus('Domains', grameneDomains, searchUI.Domains, doToggleCategory)}
        {getStatus('Pathways', gramenePathways, searchUI.Pathways, doToggleCategory)}
        {getStatus('Species', grameneTaxonomy, searchUI.Species, doToggleCategory)}
      </ul>
    </li>
  );
  else return (
    <li className="active category-collapsed">
      <a onClick={e => doToggleCategory('Gramene')}>
        Gramene Search<span
        style="float:right;">{status}</span>
      </a>
    </li>
  );
};

export default connect(
  'selectGrameneGenes',
  'selectGramenePathways',
  'selectGrameneDomains',
  'selectGrameneTaxonomy',
  'selectSearchUI',
  'selectSearchUpdated',
  'doToggleCategory',
  ResultSummary
)
