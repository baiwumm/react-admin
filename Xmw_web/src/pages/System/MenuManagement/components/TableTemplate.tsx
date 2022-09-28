/*
 * @Description: 菜单管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-28 18:23:01
 */
// 引入第三方库
import { FC, useState, useRef } from 'react';
import { useIntl, useRequest, getLocale, useModel } from '@umijs/max'
import { ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns,ColumnsState } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, ClusterOutlined, createFromIconfontCN } from '@ant-design/icons' // antd 图标库
import { Space, Button, Modal, message, Dropdown, Menu,Tag } from 'antd' // antd 组件库
import moment from 'moment'

// 引入业务组件
import { getMenuList, delMenu } from '@/services/system/menu-management' // 菜单管理接口
import { getInternationalList } from '@/services/system/internationalization' // 国际化接口
import FormTemplate from './FormTemplate'  // 表单组件
import { formatMessage } from '@/utils' // 引入工具类
import {MENU_TYPE_TAGS} from '../utils/enum'

const TableTemplate: FC = () => {
    const intl = useIntl();
    // 初始化状态
    const { initialState } = useModel('@@initialState');
    // 使用 iconfont.cn 资源
    const IconFont = createFromIconfontCN({
        scriptUrl: process.env.ICONFONT_URL,
    });
    const oprationName = formatMessage('global.table.operation')
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    // 获取树形数据传递给modalForm
    const [treeData, setTreeData] = useState<API.MENUMANAGEMENT[]>([])
    // 获取树形数据传递给modalForm
    const [menuData, setMenuData] = useState<any>([])
    // 当前行数据
    const [record, setRecord] = useState<API.MENUMANAGEMENT>()
    // 判断是否是添加子级
    const [parent_id, set_parent_id] = useState<string | undefined>('')
    // 受控的表格设置栏
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        redirect: {
          show: false
        },
      });
    // 手动触发刷新表格
    function reloadTable() {
        tableRef?.current?.reload()
    }
    // 删除列表
    const handlerDelete = async (menu_id: string | undefined) => {
        Modal.confirm({
            title: intl.formatMessage({ id: 'global.message.delete.title' }),
            content: intl.formatMessage({ id: 'global.message.delete.content' }),
            onOk: async () => {
                if (menu_id) {
                    await delMenu(menu_id).then(res => {
                        if (res.resCode === 200) {
                            message.success(res.resMsg)
                            // 刷新表格
                            reloadTable()
                        }
                    })
                }
            }
        })

    }
    //    下拉框菜单渲染
    const DropdownMenu = (
        <Menu
            items={[
                {
                    label: <FormTemplate
                        treeData={treeData}
                        reloadTable={reloadTable}
                        parent_id={parent_id}
                        triggerDom={<Button type="text" size="small" icon={<ClusterOutlined />} block>{formatMessage('global.table.operation.add-child')}</Button>}
                        menuData={menuData}
                    />,
                    key: 'addChild',
                },
                {
                    label: <FormTemplate
                        treeData={treeData}
                        reloadTable={reloadTable}
                        formData={record}
                        triggerDom={<Button type="text" size="small" icon={<EditOutlined />} block>{formatMessage('global.table.operation.edit')}</Button>}
                        menuData={menuData}
                    />,
                    key: 'edit',
                },
                {
                    label: <Button block type="text" size="small" icon={<DeleteOutlined />} onClick={() => handlerDelete(record?.menu_id)} >{formatMessage('global.table.operation.delete')}</Button>,
                    key: 'delete',
                },
            ]}
        />
    );

    // 操作下拉框
    const dropdownMenuClick = (record: API.MENUMANAGEMENT) => {
        setRecord(record)
        set_parent_id(record?.menu_id)
    }
    /**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
    const columns: ProColumns<API.MENUMANAGEMENT>[] = [
        /* 菜单名称 */
        {
            title: formatMessage('pages.system.menu-management.name'),
            dataIndex: 'xmw_internationalization.zh-CN',
            ellipsis: true,
            hideInSearch: true,
            valueType: 'treeSelect',
            fieldProps: {
                allowClear: true,
                fieldNames: {
                    label: 'zh-CN',
                    value: 'id'
                },
                options: menuData,
                placeholder: formatMessage('global.form.placeholder.seleted')
            },
            render: (_, record) => {
                return record.redirect?
                <Tag>{formatMessage('pages.system.menu-management.redirect')}</Tag>:
                <Space>
                    <IconFont type={record.icon} style={{ color: initialState?.settings?.colorPrimary, fontSize: '16px' }} />
                    <span>{record[getLocale()]}</span>
                </Space>
            }
        },
         /* 菜单类型 */
        {
            title: formatMessage('pages.system.menu-management.menu_type'),
            dataIndex: 'menu_type',
            filters: true,
            onFilter: true,
            valueEnum: MENU_TYPE_TAGS,
            render: (_, record) => <Tag color={MENU_TYPE_TAGS[record.menu_type].color}>{MENU_TYPE_TAGS[record.menu_type].text}</Tag>
        },
        /* 路由地址 */
        {
            title: formatMessage('pages.system.menu-management.path'),
            dataIndex: 'path',
            ellipsis: true,
            hideInSearch: true,
        },
        /* 重定向 */
        {
            title: formatMessage('pages.system.menu-management.redirect'),
            dataIndex: 'redirect',
            ellipsis: true,
            hideInSearch: true,
        },
        /* 组件路径 */
        {
            title: formatMessage('pages.system.menu-management.component'),
            dataIndex: 'component',
            ellipsis: true,
            hideInSearch: true,
        },
        /* 权限标识 */
        {
            title: formatMessage('pages.system.menu-management.permission'),
            dataIndex: 'permission',
            ellipsis: true,
            hideInSearch: true,
            width:250,
            render: text => <Tag color="volcano">{text}</Tag>
        },
        /* 权限控制 */
        {
            title: formatMessage('pages.system.menu-management.access'),
            dataIndex: 'access',
            ellipsis: true,
            hideInSearch: true,
            width:160,
            render: text => <Tag color="geekblue">{text}</Tag>
        },
        /* 状态 */
        {
            title: formatMessage('global.status'),
            dataIndex: 'status',
            width: 100,
            filters: true,
            onFilter: true,
            valueEnum: {
                0: { text: formatMessage('global.status.disable'), status: 'Default' },
                1: { text: formatMessage('global.status.normal'), status: 'Processing' },
            },
        },
        /* 排序 */
        {
            title: formatMessage('global.table.sort'),
            dataIndex: 'sort',
            ellipsis: true,
            hideInSearch: true,
            sorter: true,
            width: 100,
            render: text => <Tag color="purple">{text}</Tag>
        },
        /* 创建时间 */
        {
            title: formatMessage('global.table.created_time'),
            dataIndex: 'created_time',
            valueType: 'date',
            hideInSearch: true,
            sorter: true,
            render: text => (
                <Space>
                    <ClockCircleOutlined /><span>{text}</span>
                </Space>
            )
        },
        {
            title: formatMessage('global.table.created_time'),
            dataIndex: 'created_time',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        start_time: moment(value[0]._d).format('YYYY-MM-DD 00:00:00'),
                        end_time: moment(value[1]._d).format('YYYY-MM-DD 23:59:59'),
                    };
                },
            },
        },
        {
            title: formatMessage('global.table.operation'),
            valueType: 'option',
            width: 120,
            align: 'center',
            key: 'option',
            render: (_, record) => [
                <Dropdown overlay={DropdownMenu} onOpenChange={() => dropdownMenuClick(record)} key="operation">
                    <Button size="small">
                        {oprationName}
                        <DownOutlined />
                    </Button>
                </Dropdown>
            ]
        },
    ]

    // 获取当前菜单数据
    useRequest(async () => await getInternationalList({ isMenu: true }), {
        onSuccess: (result) => {
            setMenuData(result)
        }
    })
    return (
        <ProTable<API.MENUMANAGEMENT>
            actionRef={tableRef}
            columns={columns}
            request={async params => {
                {
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    let result: any = {}
                    await getMenuList(params).then(res => {
                        result = res
                        setTreeData(result.resData)
                    })
                    return {
                        data: result.resData,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: result.resCode === 200,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        total: result.resData?.length,
                    }
                }
            }
            }
            rowKey="menu_id"
            pagination={false}
            columnsState={{
                value: columnsStateMap,
                onChange: setColumnsStateMap,
              }}
            // 工具栏
            toolBarRender={() => [
                <FormTemplate treeData={treeData} reloadTable={reloadTable} menuData={menuData} />
            ]}
        >

        </ProTable>
    )
}
export default TableTemplate