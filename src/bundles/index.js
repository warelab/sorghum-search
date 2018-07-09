import { composeBundles, createCacheBundle } from 'redux-bundler'
import sorghumContent from './sorghumContent'
import grameneBundles from './gramene'
import UIbundle from './searchUI'
import cache from '../utils/cache'

const bundle = composeBundles(
  ...sorghumContent,
  ...grameneBundles,
  UIbundle,
  createCacheBundle(cache.set)
);


export default bundle;