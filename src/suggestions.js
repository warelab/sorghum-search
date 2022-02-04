import {connect} from 'redux-bundler-react'
import React from 'react'
import {Button, Nav, Tabs, Tab, CardColumns, Card} from 'react-bootstrap'

const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
};
function createMarkup(content) {
  return {__html: content}
}
const PostsCmp = ({sorghumPostsSuggestions, doAcceptSuggestion}) => (
  <CardColumns>
    {sorghumPostsSuggestions && sorghumPostsSuggestions.docs.map((post,idx) =>
      <Card key={idx} bg='light' text='dark' border='dark'>
        <Card.Body>
          <Card.Title dangerouslySetInnerHTML={createMarkup(post.title.rendered)}/>
          <Card.Text dangerouslySetInnerHTML={createMarkup(post.excerpt.rendered)}/>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {formatDate(post.date)}
          </small>
          <a href={`/post/${post.slug}`} style={{float:'right'}} onClick={doAcceptSuggestion}>
            Read more
          </a>
        </Card.Footer>
      </Card>
    )}
  </CardColumns>
);
// const ProjectsCmp = ({sorghumProjectsSuggestions, doAcceptPostSuggestion}) => (
//   <CardColumns>
//     {sorghumProjectsSuggestions && sorghumProjectsSuggestions.docs.map((post,idx) =>
//       <Card key={idx} bg='light' text='dark' border='dark'>
//         <Card.Body>
//           <Card.Title>{post.title.rendered}</Card.Title>
//           <Card.Text>{post._embedded.author[0].name}</Card.Text>
//         </Card.Body>
//         <Card.Footer>
//           <small className="text-muted">
//             {formatDate(post.date)}
//           </small>
//           <a href={`/project/${post.slug}`} style={{float:'right'}}>
//             Read more
//           </a>
//         </Card.Footer>
//       </Card>
//     )}
//   </CardColumns>
// );
const EventsCmp = ({sorghumEventsSuggestions, doAcceptSuggestion}) => (
  <CardColumns>
    {sorghumEventsSuggestions && sorghumEventsSuggestions.docs.map((event,idx) =>
      <Card key={idx} bg='light' text='dark' border='dark'>
        <Card.Body>
          <Card.Title dangerouslySetInnerHTML={createMarkup(event.title.rendered)}/>
          <Card.Text dangerouslySetInnerHTML={createMarkup(event.content.rendered)}/>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {formatDate(event.start_date)}
          </small>
          <a href={`/events#${event.s.id}`} style={{float:'right'}} onClick={doAcceptSuggestion}>
            Details
          </a>
        </Card.Footer>
      </Card>
    )}
  </CardColumns>
);
// const LinksCmp = ({sorghumLinksSuggestions, doAcceptLinkSuggestion}) => (
//   <div>
//     {sorghumLinksSuggestions && sorghumLinksSuggestions.docs.map((link,idx) =>
//       <Button key={idx}>{link.slug}</Button>
//     )}
//   </div>
// );
const PapersCmp = ({sorghumPapersSuggestions, sorghumTags, doAcceptSuggestion}) => (
  <CardColumns>
    {sorghumPapersSuggestions && sorghumPapersSuggestions.docs.map((paper,idx) =>
      <Card key={idx} bg='light' text='dark' border='dark'>
        <Card.Body>
          <Card.Title dangerouslySetInnerHTML={createMarkup(paper.title.rendered)}/>
          <Card.Text>
              {paper.paper_authors}<br />
            <small>
              {paper.tags.map(t => sorghumTags[t]).join(', ')}
            </small>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {formatDate(paper.publication_date)}
          </small>
          <a href={`/paper/${paper.slug}`} style={{float:'right'}}>
            Read more
          </a>
        </Card.Footer>
      </Card>
    )}
  </CardColumns>
);

const Posts = connect(
  'selectSorghumPostsSuggestions',
  'doAcceptSuggestion',
  PostsCmp
);
// const Projects = connect(
//   'selectSorghumProjectsSuggestions',
//   'doAcceptProjectSuggestion',
//   ProjectsCmp
// );
const Events = connect(
  'selectSorghumEventsSuggestions',
  'doAcceptSuggestion',
  EventsCmp
);
// const Links = connect(
//   'selectSorghumLinksSuggestions',
//   'doAcceptLinkSuggestion',
//   LinksCmp
// );
const Papers = connect(
  'selectSorghumPapersSuggestions',
  'selectSorghumTags',
  'doAcceptSuggestion',
  PapersCmp
);

const makeNavItem = (category, results) => (
  <Nav.Item>
    <Nav.Link eventKey={category}>
      <div className="suggestions-tab">
        {category}{' '}{ results ? results.numFound : <span>...</span>}
      </div>
    </Nav.Link>
  </Nav.Item>
);

const status = (results) => {
  return results ? results.numFound : "..."
};

const Suggestions = ({   sorghumPostsSuggestions, sorghumEventsSuggestions,
                         sorghumPapersSuggestions,
                         sorghumTab, doChangeSorghumTab
                       }) => (
  <Tabs
    id="cms-tabs"
    activeKey={sorghumTab}
    onSelect={(k) => doChangeSorghumTab(k)}>
    <Tab eventKey='Posts' title={`Posts ${status(sorghumPostsSuggestions)}`}><Posts/></Tab>
    {/*<Tab eventKey='Projects' title={`Projects ${status(sorghumProjectsSuggestions)}`}><Projects/></Tab>*/}
    <Tab eventKey='Events' title={`Events ${status(sorghumEventsSuggestions)}`}><Events/></Tab>
    {/*<Tab eventKey='Links' title={`Links ${status(sorghumLinksSuggestions)}`}><Links/></Tab>*/}
    <Tab eventKey='Papers' title={`Papers ${status(sorghumPapersSuggestions)}`}><Papers/></Tab>
  </Tabs>
);

export default connect(
  'selectSorghumPostsSuggestions',
  // 'selectSorghumProjectsSuggestions',
  'selectSorghumEventsSuggestions',
  // 'selectSorghumLinksSuggestions',
  'selectSorghumPapersSuggestions',
  'selectSorghumTab',
  'doChangeSorghumTab',
  Suggestions
);
