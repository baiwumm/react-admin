/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-02-12 16:55:55
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-02-13 10:32:48
 * @Description: 抽屉表单
 */
import { Button, Drawer, Flex, Form, Input, TreeSelect } from 'antd';
import type { FC } from 'react';

import { I18nEntry, I18nInternalization, I18nSelect } from '@/constants/i18n';
import { I18N_FORM } from '@/enum/i18n';

type RuleKey = Extract<keyof Api.SystemManage.SaveInternalization, 'name'>;

type DrawerFormProps = Page.OperateDrawerProps & {
  readonly treeData: Api.SystemManage.Internalization[];
};

const DrawerForm: FC<DrawerFormProps> = ({ form, handleSubmit, onClose, open, operateType, treeData }) => {
  const { t } = useTranslation();

  const { defaultRequiredRule } = useFormRules();

  const rules: Record<RuleKey, App.Global.FormRule> = {
    name: defaultRequiredRule
  };

  return (
    <Drawer
      open={open}
      title={I18nInternalization(`${operateType}Internalization`)}
      footer={
        <Flex justify="space-between">
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </Button>
        </Flex>
      }
      onClose={onClose}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label={t(I18N_FORM.PARENT)}
          name="parentId"
          tooltip={t(I18N_FORM.PARENT_TIP)}
        >
          <TreeSelect
            allowClear
            showSearch
            fieldNames={{ label: 'name', value: 'id' }}
            placeholder={I18nSelect()}
            treeData={treeData}
            treeNodeFilterProp="name"
          />
        </Form.Item>
        <Form.Item
          label={I18nInternalization('name')}
          name="name"
          rules={[rules.name]}
        >
          <Input
            allowClear
            showCount
            maxLength={32}
            placeholder={I18nEntry(I18nInternalization('name'))}
          />
        </Form.Item>
        {...['zhCN', 'enUS', 'jaJP', 'zhTW'].map(lang => (
          <Form.Item
            key={lang}
            label={I18nInternalization(lang)}
            name={lang}
          >
            <Input
              allowClear
              showCount
              maxLength={500}
              placeholder={I18nEntry(I18nInternalization(lang))}
            />
          </Form.Item>
        ))}
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
