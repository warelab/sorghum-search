import {connect} from 'redux-bundler-preact'
import {h} from 'preact'

const ResultSummary = ({sorghumCounts}) => {
  const status = sorghumCounts
    ? <span class="badge badge-primary">{sorghumCounts.total}</span>
    : <img src="//brie6:8081/static/images/dna_spinner_sm.svg"/>;

  const categories = sorghumCounts
    ? (
      <ul class="list-unstyled categories">
        {
          Object.entries(sorghumCounts.types).map(([name,count]) => (
            <li>{name}s <span class="badge badge-primary">{count}</span></li>
          ))
        }
      </ul>
    )
    : '';

  return (
    <li class="active">
      <a href="#sorghum" data-scroll="" class="nav-link active">
        Sorghum CMS &nbsp;&nbsp;{status}
      </a>
      {categories}
    </li>
  )
};

export default connect(
  'selectSorghumCounts',
  ResultSummary
)
