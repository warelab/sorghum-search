import React from 'react'
import { Provider, connect } from 'redux-bundler-react'
import { render } from 'react-dom'
import { composeBundles, createCacheBundle } from "redux-bundler";
import { getConfiguredCache } from 'money-clip';
import { DebounceInput } from 'react-debounce-input'
import { Nav, Tab, Row, Col } from 'react-bootstrap'
import bundles from './bundles';
import UIbundle from './UIbundle';
import SorghumSummary from './suggestions';
const cache = getConfiguredCache({
  maxAge: 100 * 60 * 60,
  version: 1
});

const initialState = {
  ensemblSite: '//banon:88',
  grameneData: 'https://data.sorghumbase.org/sorghum2',
  targetTaxonId: 4558
};

const config = {
  name: 'config',
  getReducer: () => {
    return (state = initialState, {type, payload}) => {
      return state;
    }
  },
  selectEnsemblURL: state => state.config.ensemblSite,
  selectGrameneAPI: state => state.config.grameneData,
  selectTargetTaxonId: state => state.config.targetTaxonId
};

const getStore = composeBundles(
  ...bundles,
  UIbundle,
  config,
  createCacheBundle(cache.set)
);


const handleKey = (e, props) => {
  if (e.key === "Escape") {
    props.doClearSuggestions();
  }
  if (e.key === "Tab") {
    e.preventDefault();
    document.getElementById('0-0').focus();
  }
};

const SearchBarCmp = props =>
  <DebounceInput
    minLength={0}
    debounceTimeout={300}
    onChange={e => props.doChangeSuggestionsQuery(e.target.value)}
    onKeyDown={e => handleKey(e, props)}
    // onKeyUp={e => handleKey(e.key,props)}
    className="form-control"
    value={props.suggestionsQuery || ''}
    placeholder="Search"
    id="search-input"
    autoComplete="off"
    spellCheck="false"
  />;

const SearchBar = connect(
  'selectSuggestionsQuery',
  'doChangeSuggestionsQuery',
  'doClearSuggestions',
  // 'doAcceptSorghumSuggestion',
  SearchBarCmp
);

const SuggestionsCmp = props => {
  if (props.suggestionsQuery) {
    const spinner = <img src="/static/images/dna_spinner.svg"/>;

    // let genesStatus = props.grameneSuggestionsStatus === 'loading' ? spinner : props.grameneSuggestionsStatus;
    let siteStatus = props.sorghumSuggestionsStatus === 'loading' ? spinner : props.sorghumSuggestionsStatus;
    return (
      <div className="search-suggestions">
        <Tab.Container id="controlled-search-tabs" activeKey='sorghumbase'>
          <Row>
            <Col>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="sorghumbase">
                    <div className="suggestions-tab">Website {siteStatus}</div>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="sorghumbase">
                  <SorghumSummary/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
  return null;
};

const Suggestions = connect(
  'selectSuggestionsQuery',
  'selectSorghumSuggestionsStatus',
  SuggestionsCmp
);

const SearchUI = (store) => (
  <Provider store={store}>
    <div>
      <SearchBar/>
      <Suggestions/>
    </div>
  </Provider>
);

cache.getAll().then(initialData => {
  if (initialData) {
    if (initialData.hasOwnProperty('searchUI')) initialData.searchUI.suggestions_query="";
    console.log('starting with locally cached data:', initialData)
  }
  const store = getStore(initialData);
  let element = document.getElementById('searchbar');
  element && render(SearchUI(store), element);
});
