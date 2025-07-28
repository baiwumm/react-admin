/*
 * @Description: 公共页脚版权
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-11-18 13:42:48
 */
import { DefaultFooter } from '@ant-design/pro-components';
import { Icon } from '@umijs/max';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} 白雾茫茫丶 by baiwumm@foxmail.com`}
      links={[
        {
          key: '白雾茫茫丶',
          title: '白雾茫茫丶',
          href: 'https://baiwumm.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <Icon
              icon="ri:github-fill"
              style={{ display: 'inline-block', fontSize: 16, verticalAlign: 'middle' }}
            />
          ),
          href: 'https://github.com/baiwumm/react-admin/',
          blankTarget: true,
        },
        {
          key: 'Vue3 Admin',
          title: 'Vue3 Admin',
          href: 'https://github.com/baiwumm/vue3-admin/',
          blankTarget: true,
        },
        {
          key: 'Vue2 Admin',
          title: 'Vue2 Admin',
          href: 'https://github.com/baiwumm/vue2-admin/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
