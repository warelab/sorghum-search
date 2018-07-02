import { connect } from 'redux-bundler-preact'
import { h } from 'preact'

const ResultSummary = ({grameneGenes, showGramene, doToggleShowGramene}) => {
  const status = grameneGenes
    ? grameneGenes.response.numFound
    : <img src="//brie6:8081/static/images/dna_spinner.svg" />;
  if (showGramene) return (
    <li className="active category-expanded">
      <a onClick={e => doToggleShowGramene()}>
        Gramene Search<span style="float:right;">{status}</span>
      </a>
      <ul className="list-unstyled category-leaf">
        <li><a href="#gramene">Genes<span style="float:right;">{status}</span></a></li>
        <li><a>domains</a></li>
        <li><a>pathways</a></li>
        <li><a>species</a></li>
      </ul>
    </li>
  );
  return (
    <li className="active category-collapsed">
      <a onClick={e => doToggleShowGramene()}>
        Gramene Search<span
        style="float:right;">{status}</span>
      </a>
    </li>
  );
};

export default connect(
  'selectGrameneGenes',
  'selectShowGramene',
  'doToggleShowGramene',
  ResultSummary
)
