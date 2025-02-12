/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-02-10 15:57:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-02-12 13:47:40
 * @Description: 顶部头像
 */
import { useRoute } from '@sa/simple-router';
import { Avatar, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useSubmit } from 'react-router-dom';

import { selectToken, selectUserInfo } from '@/store/slice/auth';

const UserAvatar = memo(() => {
  const token = useAppSelector(selectToken);
  const { t } = useTranslation();
  const userInfo = useAppSelector(selectUserInfo);
  const submit = useSubmit();
  const route = useRoute();
  const router = useRouterPush();

  function logout() {
    window?.$modal?.confirm({
      cancelText: t('common.cancel'),
      content: t('common.logoutConfirm'),
      okText: t('common.confirm'),
      onOk: () => {
        let needRedirect = false;
        if (!route.meta?.constant) needRedirect = true;
        submit({ needRedirect, redirectFullPath: route.fullPath }, { action: '/logout', method: 'post' });
      },
      title: t('common.tip')
    });
  }

  function onClick({ key }: { key: string }) {
    if (key === '1') {
      logout();
    } else {
      router.routerPushByKey('user-center');
    }
  }
  function loginOrRegister() {
    router.routerPushByKey('login');
  }

  const items: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <div className="flex-center gap-8px">
          <SvgIcon
            className="text-icon"
            icon="ri:id-card-line"
          />
          {t('common.userCenter')}
        </div>
      )
    },
    {
      type: 'divider'
    },
    {
      key: '1',
      label: (
        <div className="flex-center gap-8px">
          <SvgIcon
            className="text-icon"
            icon="ph:sign-out"
          />
          {t('common.logout')}
        </div>
      )
    }
  ];
  return token ? (
    <Dropdown
      menu={{ items, onClick }}
      placement="bottomRight"
      trigger={['click']}
    >
      <div>
        <ButtonIcon className="px-12px">
          <Avatar src={userInfo.avatar} />
          <span className="text-16px font-medium">{userInfo.cnName}</span>
        </ButtonIcon>
      </div>
    </Dropdown>
  ) : (
    <Button onClick={loginOrRegister}>{t('page.login.common.loginOrRegister')}</Button>
  );
});

export default UserAvatar;
