/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-02-12 14:38:58
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-02-13 09:54:36
 * @Description: 顶部搜索
 */
import { Button, DatePicker, Flex, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { assign } from 'lodash-es';

import { I18nEntry, I18nInternalization } from '@/constants/i18n';
import { I18N_COMMON } from '@/enum/i18n';

const { RangePicker } = DatePicker;

type HeaderSearchProps = Page.SearchProps & {
  updateSearchParams: (value: Api.SystemManage.InternalizationSearchParams) => void;
};

const HeaderSearch: FC<HeaderSearchProps> = memo(({ form, reset, updateSearchParams }) => {
  const { t } = useTranslation();

  /** @description: 搜索回调 */
  const handleSearch = () => {
    const { createdAt, name, zhCN } = form.getFieldsValue();
    const params: Api.SystemManage.InternalizationSearchParams = {
      name,
      zhCN
    };
    if (createdAt?.length) {
      assign(params, {
        endTime: dayjs(createdAt[1]).endOf('day').valueOf(),
        startTime: dayjs(createdAt[0]).startOf('day').valueOf()
      });
    } else {
      assign(params, {
        endTime: undefined,
        startTime: undefined
      });
    }
    updateSearchParams(params);
  };
  return (
    <Form
      form={form}
      layout="inline"
    >
      <Flex
        wrap
        gap="small"
      >
        <Form.Item
          label={I18nInternalization('name')}
          name="name"
        >
          <Input placeholder={I18nEntry(I18nInternalization('name'))} />
        </Form.Item>
        <Form.Item
          label={I18nInternalization('zhCN')}
          name="zhCN"
        >
          <Input placeholder={I18nEntry(I18nInternalization('zhCN'))} />
        </Form.Item>
        <Form.Item
          label={t(I18N_COMMON.CREATEDAT)}
          name="createdAt"
        >
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Flex
            align="center"
            gap={12}
            justify="end"
          >
            <Button
              icon={<IconIcRoundRefresh />}
              onClick={reset}
            >
              {t('common.reset')}
            </Button>
            <Button
              ghost
              icon={<IconIcRoundSearch />}
              type="primary"
              onClick={handleSearch}
            >
              {t('common.search')}
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
});

export default HeaderSearch;
