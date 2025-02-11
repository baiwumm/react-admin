/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-02-10 15:57:52
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-02-11 15:12:33
 * @Description: 登录页
 */
import { Icon } from '@iconify/react';
import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';

import LangSwitch from '@/components/stateful/LangSwitch';
import SystemLogo from '@/components/stateless/common/SystemLogo';
import WaveBg from '@/components/stateless/custom/WaveBg';
import { ThemeContext, ThemeSchemaSwitch } from '@/features';
import { useLogin } from '@/hooks/common/login';
import { getThemeSettings } from '@/store/slice/theme';

import CaptchaCode from './components/CaptchaCode';

const COLOR_WHITE = '#ffffff';

function useBgColor() {
  const { darkMode } = useContext(ThemeContext);
  const { themeColor } = useAppSelector(getThemeSettings);

  const bgThemeColor = darkMode ? getPaletteColorByNumber(themeColor, 600) : themeColor;
  const ratio = darkMode ? 0.5 : 0.2;
  const bgColor = mixColor(COLOR_WHITE, themeColor, ratio);

  return {
    bgColor,
    bgThemeColor
  };
}

export function Component() {
  // 表单实例
  const [form] = Form.useForm<Api.Auth.LoginParams>();
  // 国际化
  const { t } = useTranslation();
  // 主题背景色
  const { bgColor, bgThemeColor } = useBgColor();
  // 登录 hook
  const { loading, toLogin } = useLogin();
  // 表单验证规则
  const {
    formRules: { pwd, userName: userNameRules }
  } = useFormRules();

  /** @description: 表单提交 */
  async function handleSubmit() {
    const params = await form.validateFields();
    toLogin(params);
  }

  /**
   * @param {any} enter
   * @description: 回车提交
   */
  useKeyPress('enter', () => {
    handleSubmit();
  });

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-layout"
      style={{ backgroundColor: bgColor }}
    >
      <WaveBg themeColor={bgThemeColor} />
      <div className="absolute right-2 top-2 z-50 flex">
        <ThemeSchemaSwitch
          className="text-20px lt-sm:text-18px"
          showTooltip={false}
        />
        <LangSwitch showTooltip={false} />
      </div>
      <Card
        bordered={false}
        className="relative z-4 w-auto rd-12px"
      >
        <div className="w-400px lt-sm:w-300px">
          <header className="flex-y-center justify-between">
            <SystemLogo className="text-64px text-primary lt-sm:text-48px" />
            <h3 className="text-28px text-primary font-500 lt-sm:text-22px">{t('system.title')}</h3>
          </header>
          <main className="pt-24px">
            <Form
              className="pt-24px"
              form={form}
              initialValues={{
                password: 'abc123456',
                userName: 'Admin'
              }}
            >
              <Form.Item
                name="userName"
                rules={userNameRules}
              >
                <Input
                  prefix={<Icon icon="ri:user-line" />}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={pwd}
              >
                <Input.Password
                  autoComplete="password"
                  prefix={<Icon icon="ri:lock-line" />}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="captchaCode"
                rules={[{ message: '请输入验证码', required: true }]}
              >
                <Row>
                  <Col flex="auto">
                    <Input
                      placeholder="请输入验证码"
                      size="large"
                    />
                  </Col>
                  <Col flex="132px">
                    {/* 图形验证码 */}
                    <CaptchaCode />
                  </Col>
                </Row>
              </Form.Item>
              <Space
                className="w-full"
                direction="vertical"
                size={24}
              >
                <Button
                  block
                  loading={loading}
                  shape="round"
                  size="large"
                  type="primary"
                  onClick={handleSubmit}
                >
                  {t('common.confirm')}
                </Button>
              </Space>
            </Form>
          </main>
        </div>
      </Card>
    </div>
  );
}
