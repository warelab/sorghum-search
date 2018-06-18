import {connect} from 'redux-bundler-preact'
import {h} from 'preact'

function pluralize(word) {
  if (word.endsWith('s')) return word;
  return word + 's'
}
const ResultSummary = ({sorghumContent}) => {
  const status = sorghumContent
    ? <span style="float:right;" class="badge badge-primary">{sorghumContent.numFound}</span>
    : <img src="//brie6:8081/static/images/dna_spinner.svg"/>;

  return (
    <li class="active">
      <a href="#sorghum" data-scroll="" class="nav-link active">
        Sorghum CMS &nbsp;&nbsp;{status}
      </a>
      <ul class="list-unstyled categories">
      {sorghumContent && sorghumContent.categories && Object.entries(sorghumContent.categories).map(([name,hits]) => (
        <a>{pluralize(name)}<span style="float:right;" class="badge badge-primary">{hits.numFound}</span></a>
      ))}
      </ul>
    </li>
  )
};

export default connect(
  'selectSorghumContent',
  ResultSummary
)
