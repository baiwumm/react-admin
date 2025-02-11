import { createSelector } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { forIn } from 'lodash-es';

import { fetchGetUserInfo, fetchLogin, getLocales } from '@/service/api';
import { localStg } from '@/utils/storage';

import type { AppThunk } from '../..';
import { createAppSlice } from '../../createAppSlice';
import { resetRouteStore } from '../route';
import { cacheTabs } from '../tab';

import { clearAuthStorage, getToken, getUserInfo } from './shared';

const initialState = {
  token: getToken(),
  userInfo: getUserInfo()
};

export const authSlice = createAppSlice({
  initialState,
  name: 'auth',
  reducers: create => ({
    login: create.asyncThunk(
      async (params: Api.Auth.LoginParams) => {
        const { data: loginToken, error } = await fetchLogin(params);
        // 1. stored in the localStorage, the later requests need it in headers
        if (!error) {
          localStg.set('token', loginToken.token);

          const { data: info, error: userInfoError } = await fetchGetUserInfo();

          if (!userInfoError) {
            // 2. store user info
            localStg.set('userInfo', info);
            return {
              token: loginToken.token,
              userInfo: info
            };
          }
        }

        return false;
      },

      {
        fulfilled: (state, { payload }) => {
          if (payload) {
            state.token = payload.token;
            state.userInfo = payload.userInfo;
          }
        }
      }
    ),
    resetAuth: create.reducer(() => initialState)
  }),
  selectors: {
    selectToken: auth => auth.token,
    selectUserInfo: auth => auth.userInfo
  }
});
export const { selectToken, selectUserInfo } = authSlice.selectors;
export const { login, resetAuth } = authSlice.actions;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const getUerName = (): AppThunk<string> => (_, getState) => {
  const pass = selectToken(getState());

  return pass ? selectUserInfo(getState()).userName : '';
};

/** is super role in static route */

export const isStaticSuper = (): AppThunk<boolean> => (_, getState) => {
  const { roles } = selectUserInfo(getState());

  const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;
  return VITE_AUTH_ROUTE_MODE === 'static' && roles.includes(VITE_STATIC_SUPER_ROLE);
};

/** Reset auth store */
export const resetStore = (): AppThunk => dispatch => {
  clearAuthStorage();

  dispatch(resetAuth());

  dispatch(resetRouteStore());

  dispatch(cacheTabs());
};

/** Is login */
export const getIsLogin = createSelector([selectToken], token => Boolean(token));

/** @description: 初始化多语言数据 */
export const initLocales = () => async () => {
  const { data, error } = await getLocales();
  if (!error) {
    forIn(data, (value, key) => {
      i18n.addResourceBundle(key, 'translation', value);
    });
  }
};
