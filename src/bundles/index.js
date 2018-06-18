import { composeBundles } from 'redux-bundler'
import sorghumContent from './sorghumContent'
import grameneBundles from './gramene'

export default composeBundles(
  sorghumContent,
  ...grameneBundles
)
