##### redux简介
数据总是单向从顶层向下分发的

**Redux 有五个 API，分别是：**
* createStore(reducer, [initialState])
* combineReducers(reducers)
* applyMiddleware(...middlewares)
* bindActionCreators(actionCreators, dispatch)
* compose(...functions)

**createStore 生成的 store 是应用状态 state 的管理者，包含下列四个API：**
* getState() # 获取整个 state
* dispatch(action) # ※ 触发 state 改变的【唯一途径】※
* subscribe(listener) # 您可以理解成是 DOM 中的 addEventListener
* replaceReducer(nextReducer) # 一般在 Webpack Code-Splitting 按需加载的时候用
二者的关系是：state = store.getState()


* * *

##### 如何改变state（必须 dispatch 一个 action）
**action** ：
只是一个包含 **type** 属性的普通对象即可,例如 **{ type: 'INCREMENT' }**

**reducer** ：
用户每次 dispatch(action) 后，都会触发 reducer 的执行，reducer 的实质是一个函数，且里面不能存在异步，根据 action.type 来更新 state 并返回 nextState最后会用 reducer 的返回值 nextState 完全替换掉原来的 state (不能直接操作state，先深克隆一份)
```js
/** 本代码块记为 code-7 **/var initState = {
  counter: 0,
  todos: []
}

function reducer(state, action) {
  // ※ 应用的初始状态是在第一次执行 reducer 时设置的 ※
  if (!state) state = initState
  
  switch (action.type) {
    case 'ADD_TODO':
      var nextState = _.cloneDeep(state) // 用到了 lodash 的深克隆
      nextState.todos.push(action.payload) 
      return nextState

    default:
    // 由于 nextState 会把原 state 整个替换掉
    // 若无修改，必须返回原 state（否则就是 undefined）
      return state
  }
}
```


* * *

**经典案例**
```js
import { createStore } from 'redux'

const reducer = (state = {count: 0}, action) => {
  switch (action.type){
    case 'INCREASE': return {count: state.count + 1};
    case 'DECREASE': return {count: state.count - 1};
    default: return state;
  }
}

const actions = {
  increase: () => ({type: 'INCREASE'}),
  decrease: () => ({type: 'DECREASE'})
}

const store = createStore(reducer);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(actions.increase()) // {count: 1}
store.dispatch(actions.increase()) // {count: 2}
store.dispatch(actions.increase()) // {count: 3}
```

* * *
##### React-Redux
**react-redux 提供了两个方法： connect 和 Provider 。**

**Provider**: 这个方法是包裹在App外边，然后传递给其一个 store 这样所有其包裹的子组件都可以使用 store 上存储的数据了。

**connect**: 这个其实类似于Vuex中的 mapMutaion，mapGetter 。它接受2个参数，分别是: mapStateToProps 和 mapDispatchToProps 。
mapStateToProps 接收一个state，返回一个对象。 mapDispatchToProps 接收一个 dispatch 组成的对象
```js
// 装饰器模式构建
import { connect } from 'react-reudx'
import { changeUserName } from './redux'
@connect( state => state, { changeUserName } )

```

* * *


##### 流程总结：
用户在view层通过 store.dispatch 来发送 action ，当 store 接收到用户传递过来的 action 后，会把 state 和 action 传给 reducer ，而 reducer 会根据 action 的 type，来返回一个新的 state。而当 store 有变化的时候，store 就会调用监听函数 store.subscribe ，从而使得view层发生变化。
* * *
##### 总结
* store 由 Redux 的 createStore(reducer) 生成state 通过 store.getState() 获取，本质上一般是一个存储着整个应用状态的对象
* action 本质上是一个包含 type 属性的普通对象，
* 改变 state 必须 dispatch 一个 action
* reducer 本质上是根据 action.type 来更新 state 并返回 nextState 的函数
* reducer 必须返回值，否则 nextState 即为 undefined
* 实际上，state 就是所有 reducer 返回值的汇总（本教程只有一个 reducer，主要是应用场景比较简单）





* * *
#### 参考资料
[Redux 简明教程---重要](https://github.com/kenberkeley/redux-simple-tutorial)
[Redux 进阶教程](https://github.com/kenberkeley/redux-simple-tutorial/blob/master/redux-advanced-tutorial.md)
[掘金-react-redux一点就透，我这么笨都懂了！](https://juejin.im/post/5af00705f265da0ba60fb844)