/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-02-12 11:17:31
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-02-13 15:03:24
 * @Description: 国际化
 */
import { Suspense, lazy } from 'react';

import TableHeaderOperation from '@/components/advanced/TableHeaderOperation';
import { I18nInternalization } from '@/constants/i18n';
import { UNIFORM_TEXT } from '@/enum';
import {
  createInternalization,
  delInternalization,
  getInternalizationList,
  updateInternalization
} from '@/service/api/system-manage/internalization';

import HeaderSearch from './components/HeaderSearch';

const DrawerForm = lazy(() => import('./components/DrawerForm'));

export function Component() {
  // 国际化
  const { t } = useTranslation();

  const { scrollConfig, tableWrapperRef } = useTableScroll();

  // 是否移动端
  const isMobile = useMobile();

  /** @description: 表格 Hook */
  const { columnChecks, data, run, searchProps, setColumnChecks, tableProps, updateSearchParams } = useTable(
    {
      apiFn: getInternalizationList,
      apiParams: {
        endTime: undefined,
        name: '',
        startTime: undefined,
        zhCN: ''
      },
      columns: () => [
        {
          align: 'center',
          dataIndex: 'name',
          key: 'name',
          title: I18nInternalization('name')
        },
        {
          align: 'center',
          dataIndex: 'zhCN',
          ellipsis: true,
          key: 'zhCN',
          render: text =>
            text ? (
              <ATooltip
                placement="topLeft"
                title={text}
              >
                {text}
              </ATooltip>
            ) : (
              UNIFORM_TEXT.NULL
            ),
          title: I18nInternalization('zhCN')
        },
        {
          align: 'center',
          dataIndex: 'enUS',
          ellipsis: true,
          key: 'enUS',
          render: text =>
            text ? (
              <ATooltip
                placement="topLeft"
                title={text}
              >
                {text}
              </ATooltip>
            ) : (
              UNIFORM_TEXT.NULL
            ),
          title: I18nInternalization('enUS')
        },
        {
          align: 'center',
          dataIndex: 'jaJP',
          ellipsis: true,
          key: 'jaJP',
          render: text =>
            text ? (
              <ATooltip
                placement="topLeft"
                title={text}
              >
                {text}
              </ATooltip>
            ) : (
              UNIFORM_TEXT.NULL
            ),
          title: I18nInternalization('jaJP')
        },
        {
          align: 'center',
          dataIndex: 'zhTW',
          ellipsis: true,
          key: 'zhTW',
          render: text =>
            text ? (
              <ATooltip
                placement="topLeft"
                title={text}
              >
                {text}
              </ATooltip>
            ) : (
              UNIFORM_TEXT.NULL
            ),
          title: I18nInternalization('zhTW')
        },
        {
          align: 'center',
          key: 'operate',
          render: (_, record) => (
            <div className="flex-center gap-8px">
              <AButton
                ghost
                size="small"
                type="primary"
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                onClick={() => handleEdit(record.id)}
              >
                {t('common.edit')}
              </AButton>
              <APopconfirm
                title={t('common.confirmDelete')}
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                onConfirm={() => handleDelete(record.id)}
              >
                <AButton
                  danger
                  size="small"
                >
                  {t('common.delete')}
                </AButton>
              </APopconfirm>
            </div>
          ),
          title: t('common.operate'),
          width: 195
        }
      ]
    },
    { showQuickJumper: true }
  );

  /**
   * @param {any} useTableOperate
   * @description: 表格操作
   */
  const { editingData, generalPopupOperation, onAdd, onDeleted, onEdit } = useTableOperate(
    data,
    run,
    async (res, type) => {
      if (type === 'add') {
        const { error } = await createInternalization(res);
        return error;
      }
      const { error } = await updateInternalization({ ...res, id: editingData?.id });
      return error;
    }
  );

  /**
   * @param {string} id
   * @description: 删除回调
   */
  const handleDelete = async (id: string) => {
    const { error } = await delInternalization(id);
    if (!error) {
      onDeleted();
    }
  };

  /**
   * @param {string} id
   * @description: 编辑回调
   */
  const handleEdit = (id: string) => {
    onEdit(id);
  };
  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      {/* 搜索栏 */}
      <ACollapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
        items={[
          {
            children: (
              <HeaderSearch
                updateSearchParams={updateSearchParams}
                {...searchProps}
              />
            ),
            key: '1',
            label: t('common.search')
          }
        ]}
      />
      {/* 表格 */}
      <ACard
        bordered={false}
        className="flex-col-stretch sm:flex-1-hidden card-wrapper"
        ref={tableWrapperRef}
        title={t('route.system-manage_internalization')}
        extra={
          <TableHeaderOperation
            add={onAdd}
            columns={columnChecks}
            loading={tableProps.loading}
            refresh={run}
            setColumnChecks={setColumnChecks}
            showBatchDelete={false}
          />
        }
      >
        <ATable
          scroll={scrollConfig}
          size="small"
          {...tableProps}
          pagination={false}
        />
        <Suspense>
          <DrawerForm
            {...generalPopupOperation}
            treeData={data}
          />
        </Suspense>
      </ACard>
    </div>
  );
}
