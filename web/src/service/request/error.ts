import type { FlatRequestInstance } from '@sa/axios';
import { BACKEND_ERROR_CODE } from '@sa/axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { $t } from '@/locales';
import { store } from '@/store';
import { resetStore } from '@/store/slice/auth';

import { showErrorMsg } from './shared';
import type { RequestInstanceState } from './type';

/** - 后端错误处理 */
export async function backEndFail(
  response: AxiosResponse<App.Service.Response<unknown>, any>,
  instance: AxiosInstance,
  request: FlatRequestInstance<RequestInstanceState, App.Service.Response<unknown>>
) {
  const responseCode = String(response.data.code);

  function handleLogout() {
    store.dispatch(resetStore());
  }

  function logoutAndCleanup() {
    handleLogout();
    window.removeEventListener('beforeunload', handleLogout);

    request.state.errMsgStack = request.state.errMsgStack.filter(msg => msg !== response.data.msg);
  }

  // 当后端返回的 code 在 `modalLogoutCodes` 中时，表示用户需要退出登录，通过弹窗形式提醒
  const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
  if (modalLogoutCodes.includes(responseCode) && !request.state.errMsgStack?.includes(response.data.msg)) {
    request.state.errMsgStack = [...(request.state.errMsgStack || []), response.data.msg];

    // 防止用户刷新页面
    window.addEventListener('beforeunload', handleLogout);

    window.$modal?.error({
      content: response.data.msg,
      keyboard: false,
      maskClosable: false,
      okText: $t('common.confirm'),
      onClose() {
        logoutAndCleanup();
      },
      onOk() {
        logoutAndCleanup();
      },
      title: $t('common.error')
    });

    return null;
  }

  return null;
}

/** - 网络错误处理 */
export function handleError(
  error: AxiosError<App.Service.Response<unknown>, any>,
  request: FlatRequestInstance<RequestInstanceState, App.Service.Response<unknown>>
) {
  // when the request is fail, you can show error message

  let message = error.message;
  let backendErrorCode = '';

  // get backend error message and code
  if (error.code === BACKEND_ERROR_CODE) {
    message = error.response?.data?.msg || message;
    backendErrorCode = String(error.response?.data?.code || '');
  }

  // the error message is displayed in the modal
  const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
  if (modalLogoutCodes.includes(backendErrorCode)) {
    return;
  }

  showErrorMsg(request.state, message);
}
