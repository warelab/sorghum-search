import { h } from 'preact'

export const getStatus = (cat, results, isChecked, toggle) => {
  const style = isChecked ? 'category-checked' : 'category-not-checked';
  const tally = results ? results.numFound : <img src="//brie6:8081/static/images/dna_spinner.svg"/>;
  return (
    <li className={style}>
      <a onClick={e => toggle(cat)}>{cat}<span style="float:right;">{tally}</span></a>
    </li>
  )
};
