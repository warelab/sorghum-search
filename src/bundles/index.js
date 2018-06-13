import { composeBundles } from 'redux-bundler'
import sorghumContent from './sorghumContent'
import gramene from './gramene'

export default composeBundles(
  sorghumContent,
  gramene
)
