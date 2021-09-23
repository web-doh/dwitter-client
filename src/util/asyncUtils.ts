import { AsyncActionCreatorBuilder, getType } from "typesafe-actions";
import { call, ForkEffect, put } from "redux-saga/effects";

type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// promise를 기다렸다가 결과를 dispatch하는 사가
export function createAsyncSaga<
  RequestType,
  RequestPayload,
  SuccessType,
  SuccessPayload,
  FailureType,
  FailurePayload
>(
  asyncAction: AsyncActionCreatorBuilder<
    [RequestType, [RequestPayload, undefined]],
    [SuccessType, [SuccessPayload, undefined]],
    [FailureType, [FailurePayload, undefined]]
  >,
  asyncFunction: PromiseCreatorFunction<RequestPayload, SuccessPayload>,
  successFunc?: any,
  failureFunc?: any
) {
  return function* saga(action: ReturnType<typeof asyncAction.request>) {
    try {
      const response: SuccessPayload = yield call(
        asyncFunction,
        (action as any).payload
      );
      yield put(asyncAction.success(response)); // dispatch

      if (successFunc) {
        yield call(successFunc, response);
      }
    } catch (err) {
      yield put(asyncAction.failure(err as FailurePayload));
      if (failureFunc) {
        yield call(successFunc, err);
      }
    }
  };
}

// combine sagas
export const combineSagas = (param: { [key: string]: ForkEffect<never>[] }) =>
  function* () {
    const targetSagas = Object.values(param).flat();

    for (let i = 0; i < targetSagas.length; i += 1) {
      yield targetSagas[i];
    }
  };

// Async reducer 공통 부분 작성 함수
type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;

export function createAsyncReducer<S, AC extends AnyAsyncActionCreator>(
  asyncActionCreator: AC
) {
  const { request, failure } = asyncActionCreator;
  const requestType = getType(request);
  const failureType = getType(failure);

  return {
    [requestType]: (state: S) => ({
      ...state,
      isLoading: true,
      errorMessage: null,
    }),
    [failureType]: (
      state: S,
      action: ReturnType<typeof asyncActionCreator.failure>
    ) => ({
      ...state,
      isLoading: false,
      errorMessage: action.payload.message,
    }),
  };
}
