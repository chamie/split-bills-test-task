import { DeepReadonly } from "../utils/utils";

// Action Creator type
type Action<T, P = undefined> = P extends undefined
  ? { type: T }
  : { type: T; payload: P };

export type PayloadAction<T> = Action<string, T>;

// createSlice options interface
type SliceOptions<State, Reducers> = {
  name: string;
  initialState: State;
  reducers: Reducers;
}

// Utility to infer the type of actions from the reducers
type ActionsFromReducers<Reducers> = {
  [K in keyof Reducers]: Reducers[K] extends (state: any, action: infer A) => any
    ? A extends { payload: infer P }
      ? (payload: P) => Action<K, P>
      : () => Action<K>
    : never;
};

// Core createSlice function without Immer
export const createSlice = <State, Reducers extends Record<string, (state: DeepReadonly<State>, action: any) => DeepReadonly<State>>>(
  options: SliceOptions<DeepReadonly<State>, Reducers>
) => {
  const { name, initialState, reducers } = options;

  // Reducer function
  const reducer = (state: DeepReadonly<State> = initialState, action: Action<string, any>): DeepReadonly<State> => {
    const handler = reducers[action.type];
    if (handler) {
      return handler(state, action);
    }
    return state;
  };

  // Action creators
  const actions = {} as ActionsFromReducers<Reducers>;
  for (const key in reducers) {
    (actions as any)[key] = (payload: any) =>
      payload === undefined ? { type: key } : { type: key, payload };
  }

  const getInitialState = () => initialState;

  return { reducer, actions, name, getInitialState };
}