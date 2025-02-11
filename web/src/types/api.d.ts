declare namespace Api {
  namespace Common {
    /** @description: 请求分页参数 */
    type PaginatingParams = {
      current: number; // 页码
      size: number; // 条数
    };
    /** @description: 分页响应体 */
    type PaginatingResponse = {
      total: number; // 总条数
    } & PaginatingParams;

    /** @description: 分页列表 */
    type PaginatingQueryRecord<T = any> = {
      records: T[];
    } & PaginatingResponse;

    /** @description: 查询时间 */
    type SearchTime = {
      // 开始时间
      endTime?: number;
      startTime?: number; // 结束时间
    };

    /** @description: 公共字段 */
    type ColumnId = {
      id: string; // 主键
    };
    type ColumnFields = {
      createdAt: string; // 创建时间
      updatedAt?: string; // 更新时间
    } & ColumnId;
    /** common record */
    type CommonRecord<T = any> = ColumnFields & T;
  }

  /** @description: 身份鉴权 */
  namespace Auth {
    /** @description: 登录 token */
    type LoginToken = {
      token: string;
    };

    /** @description: 登录用户信息 */
    type UserInfo = Omit<SystemManage.UserManage, 'password' | 'token'> & {
      buttons: string[]; // 按钮权限
      roles: string[]; // 角色编码
    };
    /** @description: 登录参数 */
    type LoginParams = {
      // 密码
      captchaCode: string; // 用户名
      password: string;
      userName: string; // 验证码
    };

    /** @description: 获取掘金文章参数 */
    type JuejinParams = {
      cursor: string;
      sort_type: number;
      user_id: string;
    };
  }

  /**
   * Namespace Route
   *
   * Backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      home: import('@elegant-router/types').LastLevelRouteKey;
      routes: MenuRoute[];
    }
  }

  /** @description: 系统管理 */
  namespace SystemManage {
    /** @description: 用户管理 */
    type UserManage = Common.CommonRecord<{
      // 城市
      address?: string; // 中文名
      avatar: string; // 标签
      city: string[]; // 密码
      cnName: string; // 电话号码
      email: string; // 登录次数
      lastIp?: string; // 最后一次登录 ip
      lastLoginAt?: string; // 排序
      loginCount: number; // 所属组织 id
      organization: Api.Administrative.Organization; // 所属角色
      orgId: string; // 用户名
      password?: string; // 头像
      phone: string; // 所属岗位 id
      post: Api.Administrative.PostManage; // 所属组织
      postId: string; // 所属角色 id
      role: RoleManage; // 详细地址
      roleId: string; // 邮箱
      sex: import('@/enum').SEX; // 所属岗位
      sort: number; // 性别
      status: import('@/enum').STATUS; // token
      tags: string[]; // 状态
      token?: string;
      userName: string; // 最后登录时间
    }>;
    /** @description: 查询参数 */
    type UserManageSearchParams = Partial<Pick<UserManage, 'status' | 'userName'>> & Api.Common.PaginatingParams;
    /** @description: 创建/更新用户 */
    type SaveUserManage = Pick<
      UserManage,
      | 'address'
      | 'avatar'
      | 'city'
      | 'cnName'
      | 'email'
      | 'password'
      | 'phone'
      | 'sex'
      | 'sort'
      | 'status'
      | 'tags'
      | 'userName'
    > &
      Partial<Pick<UserManage, 'orgId' | 'postId' | 'roleId'>> &
      Partial<Api.Common.ColumnId> & {
        confirmPassword?: string;
      };
    /** @description: 修改用户密码 */
    type ChangeUserPassword = {
      // 原密码
      newPassword: string;
      password: string; // 新密码
    };
    /** @description: 修改密码 */
    type EditPassword = {
      oldPassword: string; // 原密码
    } & Required<Pick<SaveUserManage, 'confirmPassword' | 'password'>>;

    /** @description: 菜单管理 */
    type MenuManage = Common.CommonRecord<{
      // 排序
      children?: MenuManage[]; // 路由路径
      component?: string; // 组件路径
      meta?: Pick<
        import('@ohh-889/react-auto-route').RouteMeta,
        | 'activeMenu'
        | 'constant'
        | 'fixedIndexInTab'
        | 'hideInMenu'
        | 'href'
        | 'i18nKey'
        | 'keepAlive'
        | 'multiTab'
        | 'order'
        | 'query'
      >; // 父级 id
      name?: string; // 菜单类型
      parentId: string | null; // 路由名称
      path?: string; // IframePage 参数
      permission?: string; // 路由元信息
      props?: {
        url: string;
      }; // 按钮权限
      sort: number;
      title: string; // 菜单名称
      type: import('@/enum').MENU_TYPE;
    }>;
    /** @description: 查询参数 */
    type MenuManageSearchParams = Partial<Pick<MenuManage, 'name' | 'title'>> & Api.Common.SearchTime;
    /** @description: 创建/更新菜单 */
    type SaveMenuManage = Omit<MenuManage, keyof Api.Common.ColumnFields | 'meta' | 'props' | 'children'> &
      Partial<Api.Common.ColumnId> &
      Required<Pick<MenuManage, 'meta' | 'props'>>;

    /** @description: 角色管理 */
    type RoleManage = Common.CommonRecord<{
      // 角色名称
      code: string; // 角色编码
      description?: string;
      name: string; // 排序
      permissions: string[]; // 角色描述
      sort: number; // 权限
    }>;
    /** @description: 查询参数 */
    type RoleManageSearchParams = Partial<Pick<RoleManage, 'code' | 'name'>> &
      Api.Common.SearchTime &
      Api.Common.PaginatingParams;
    /** @description: 创建/更新角色 */
    type SaveRoleManage = Omit<RoleManage, keyof Api.Common.ColumnFields | 'permissions'> &
      Partial<Api.Common.ColumnId> & {
        menus: string[];
      };

    /** @description: 国际化 */
    type Internalization = Common.CommonRecord<{
      // 繁体中文
      children?: Internalization[]; // 中文
      enUS: string | null; // 英文
      jaJP: string | null;
      name: string; // 国际化字段
      parentId: string | null; // 父级id
      zhCN: string | null; // 日文
      zhTW: string | null;
    }>;
    /** @description: 查询参数 */
    type InternalizationSearchParams = Partial<Pick<Internalization, 'name' | 'zhCN'>> & Api.Common.SearchTime;
    /** @description: 创建/更新国际化 */
    type SaveInternalization = Omit<Internalization, keyof Api.Common.ColumnFields> & Partial<Api.Common.ColumnId>;

    /** @description: 操作日志 */
    type OperationLog = Common.CommonRecord<{
      // ip
      action: string; // 所在城市
      adcode: string;
      // 操作系统
      browser: string; // 所在省份
      city: string;
      ip: string; // 请求动作
      method: import('@/enum').METHOD; // 请求参数
      os: string; // 请求方法
      params: Record<string, any>; // 浏览器
      province: string; // 关联用户 id
      user: UserManage;
      userId: string; // 城市编码
    }>;
    /** @description: 查询参数 */
    type OperationLogSearchParams = Partial<Pick<OperationLog, 'method' | 'userId'>> &
      Api.Common.SearchTime &
      Api.Common.PaginatingParams;
    /** @description: 删除参数 */
    type OperationLogDelParams = { ids: string[] };
  }

  /** @description: 智能行政 */
  namespace Administrative {
    /** @description: 消息公告 */
    type Message = Common.CommonRecord<{
      // 标题
      content: string;
      messageReads: MessageRead[]; // 状态
      pinned: boolean; // 内容
      status: import('@/enum').STATUS;
      title: string; // 用户 id
      user: SystemManage.UserManage;
      // 是否置顶
      userId: string; // 已读公告列表
    }>;
    /** @description: 消息公告 - 查询参数 */
    type MessageSearchParams = Partial<Pick<Message, 'status' | 'title' | 'userId'>> &
      Api.Common.SearchTime &
      Api.Common.PaginatingParams;
    /** @description: 创建/更新消息 */
    type SaveMessage = Pick<Message, 'content' | 'pinned' | 'status' | 'title'> & Partial<Api.Common.ColumnId>;
    /** @description: 消息公告 - 已读列表 */
    type MessageRead = Common.CommonRecord<{
      // 消息 id
      message: Message;
      messageId: string; // 用户 id
      user: SystemManage.UserManage; // 消息详情
      userId: string;
    }>;
    /** @description: 组织管理 */
    type Organization = Common.CommonRecord<{
      // 关联岗位
      children?: Organization[]; // 组织名称
      code: string; // 父级 id
      description?: string; // 组织描述
      icon?: string;
      name: string; // 组织编码
      parentId: string | null; // 排序
      posts?: PostManage[]; // 组织图标
      sort: number;
    }>;
    /** @description: 查询参数 */
    type OrganizationSearchParams = Partial<Pick<Organization, 'code' | 'name'>>;
    /** @description: 创建/更新组织 */
    type SaveOrganization = Omit<Organization, keyof Api.Common.ColumnFields | 'posts'> & Partial<Api.Common.ColumnId>;

    /** @description: 岗位管理 */
    type PostManage = Common.CommonRecord<{
      // 岗位描述
      children?: PostManage[]; // 排序
      description?: string;
      name: string; // 所属组织 id
      organization: Organization; // 父级 id
      orgId: string | null; // 岗位名称
      parentId: string | null; // 所属组织
      sort: number;
    }>;
    /** @description: 查询参数 */
    type PostManageSearchParams = Partial<Pick<PostManage, 'name' | 'orgId'>> & Api.Common.SearchTime;
    /** @description: 创建/更新岗位 */
    type SavePostManage = Omit<PostManage, keyof Api.Common.ColumnFields | 'organization'> &
      Partial<Api.Common.ColumnId>;
  }
}
