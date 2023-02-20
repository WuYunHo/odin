import { Effect, ImmerReducer, Reducer, Subscription } from '@umijs/max';

const TestModel = {
  namespace: 'user',

  state: 100,

  //异步数据
  effects: {
    *query({ payload }, { call, put }) { },
  },
  //同步数据
  reducers: {
    save(state, action) {
      return {
        ...state,
      }
    },
    increment(state: number, action: { payload: any; }) {
      let n = action.payload ? action.payload : 0
      return state + n
    },
    testChange(state: number, action: { payload: any }) {
      state = action.payload
      console.log(state)
      return state
    }
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  //订阅（快捷方式）
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        // if (pathname === '/product/home') {
        //   dispatch({
        //     type: 'save',
        //   });
        // }
        if(pathname === '/home'){
          dispatch({
            type: 'testChange',
          })
        }
      });
    },
  },

  testChange(state: number, action: { payload: any }) {
    state = action.payload
    console.log(state)
  },

  increment(state: number, action: { payload: any; }) {
    let n = action.payload ? action.payload : 0
    return state + n
  },
};

export default TestModel;