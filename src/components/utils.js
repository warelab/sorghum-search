import { h } from 'preact'

export const getStatus = (cat, results, isChecked, toggle) => {
  const style = isChecked ? 'category-checked' : 'category-not-checked';
  const tally = results ? results.numFound : <img src="/static/images/dna_spinner.svg"/>;
  return (
    <li className='category-leaf'>
        <input type="checkbox" checked={isChecked} onChange={e => toggle(cat)}/>
        <a data-scroll href={`#${cat}`} className="nav-link active">{cat}<span style="float:right;">{tally}</span></a>
    </li>
  )
};
