/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-27 16:05:18
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 14:57:36
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@/dto/response.dto';
import { ResData } from '@/global/interface';

/**
 * @description: 菜单列表 Dto
 * @return {*}
 * @author: Cyan
 */
export class ResponseMenuManagementDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: [
      {
        menu_id: '12373f1b-ae2a-48e7-ac06-ad4f15bb4975',
        name: 'ceca59e9-005c-42da-83e3-415fac994fac',
        menu_type: 'dir',
        path: '/dashboard',
        icon: 'icon-dashboard',
        component: null,
        redirect: null,
        parent_id: null,
        target: null,
        permission: 'dashboard',
        access: 'normalRouteFilter',
        layout: null,
        navTheme: null,
        headerTheme: null,
        hideChildrenInMenu: 0,
        hideInMenu: 0,
        hideInBreadcrumb: 0,
        headerRender: 1,
        footerRender: 1,
        menuRender: 1,
        menuHeaderRender: 1,
        flatMenu: 0,
        fixedHeader: 1,
        fixSiderbar: 1,
        founder: null,
        sort: 1,
        status: 1,
        created_time: '2022-10-27 15:42:56',
        updated_time: '2022-10-27 15:42:56',
        'zh-CN': '指示面板',
        'en-US': 'Dashboard',
        'ja-JP': '指示パネル',
        'zh-TW': '指示面板',
        children: [],
      },
    ],
  })
  data: ResData[];
}

/**
 * @description: 创建菜单数据 Dto
 * @return {*}
 * @author: Cyan
 */
export class CreateMenuManagementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      menu_type: 'menu',
      parent_id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
      name: '0c01ef7d-2f6f-440a-b642-62564d41f473',
      path: '/system/menu-management',
      component: './System/MenuManagement',
      redirect: null,
      icon: 'icon-menu-management',
      access: 'normalRouteFilter',
      permission: 'system:menu-management',
      layout: 'side',
      navTheme: 'light',
      headerTheme: 'light',
      target: '_blank',
      hideChildrenInMenu: 0,
      hideInMenu: 0,
      hideInBreadcrumb: 0,
      headerRender: 1,
      footerRender: 1,
      menuRender: 1,
      menuHeaderRender: 1,
      flatMenu: 0,
      fixedHeader: 1,
      fixSiderbar: 1,
      sort: 1,
      status: 1,
      created_time: '2022-11-09T06:45:01.108Z',
      updated_time: '2022-11-09T06:45:01.108Z',
    },
  })
  data: ResData;
}
