/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-02-11 14:48:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-02-11 14:58:09
 * @Description: 验证码
 */
import { useRequest } from 'ahooks';
import { Spin } from 'antd';
import { get } from 'lodash-es';
import type { FC } from 'react';

import { getCaptcha } from '@/service/api';

const CaptchaCode: FC = () => {
  /** @description: 请求验证码 */
  const { data, loading, run } = useRequest(async () => get(await getCaptcha(), 'data', ''));
  return (
    <Spin spinning={loading}>
      <div
        className="cursor-pointer"
        dangerouslySetInnerHTML={{ __html: data || '' }}
        onClick={run}
      />
    </Spin>
  );
};
export default CaptchaCode;
