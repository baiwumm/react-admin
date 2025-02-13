/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-11-26 17:41:12
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-02-12 14:20:41
 * @Description: 按钮权限
 */
/** @description: 智能行政 - 消息公告 */
export enum MESSAGE {
  ADD = 'administrative:message:add',
  DELETE = 'administrative:message:delete',
  EDIT = 'administrative:message:edit'
}

/** @description: 智能行政 - 组织管理 */
export enum ORGANIZATION {
  ADD = 'administrative:organization:add',
  DELETE = 'administrative:organization:delete',
  EDIT = 'administrative:organization:edit'
}

/** @description: 智能行政 - 岗位管理 */
export enum POST {
  ADD = 'administrative:post-manage:add',
  DELETE = 'administrative:post-manage:delete',
  EDIT = 'administrative:post-manage:edit'
}

/** @description: 系统管理 - 菜单管理 */
export enum USER {
  ADD = 'system-manage:user-manage:add',
  DELETE = 'system-manage:user-manage:delete',
  EDIT = 'system-manage:user-manage:edit'
}

/** @description: 系统管理 - 菜单管理 */
export enum MENU {
  ADD = 'system-manage:menu-manage:add',
  DELETE = 'system-manage:menu-manage:delete',
  EDIT = 'system-manage:menu-manage:edit'
}

/** @description: 系统管理 - 角色管理 */
export enum ROLE {
  ADD = 'system-manage:role-manage:add',
  DELETE = 'system-manage:role-manage:delete',
  EDIT = 'system-manage:role-manage:edit'
}

/** @description: 系统管理 - 国际化 */
export enum INTERNALIZATION {
  ADD = 'system-manage:internalization:add',
  DELETE = 'system-manage:internalization:delete',
  EDIT = 'system-manage:internalization:edit'
}

/** @description: 系统管理 - 操作日志 */
export enum OPERATION_LOG {
  BATCH_DELETE = 'system-manage:operation-log:batch-delete',
  DELETE = 'system-manage:operation-log:delete'
}
