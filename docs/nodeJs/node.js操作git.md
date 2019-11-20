
### node 操作git
```js
const git = require('simple-git')('../dist') // ../dist 是你需要操作的git本地目录
let currentTime = new Date().toLocaleString().replace(/[-:\s]+/g, '')
console.log('....................开始进行git操作....................')
git.pull(() => console.log('git pull done'))
  .add('./*', () => console.log('git add done'))
  .commit(`auto push at ${currentTime}`, () => console.log('git commit done'))
  .push(['-u', 'origin', 'master'], () => console.log('git push done'));
```