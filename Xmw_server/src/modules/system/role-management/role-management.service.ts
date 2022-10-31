/*
 * @Description: RoleManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 17:39:28
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 17:02:43
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { cloneDeep } from 'lodash';
import { ResData, ResponseModel, PageResModel } from '@/global/interface'; // interface
import { XmwRole } from '@/models/xmw_role.model'; // 数据库实体
import { XmwPermission } from '@/models/xmw_permission.model';
import { ListRoleManagementDto, SaveRoleManagementDto } from './dto';

type permissionModel = {
  role_id: string;
  menu_id: string;
};

@Injectable()
export class RoleManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwRole)
    private readonly roleModel: typeof XmwRole,

    @InjectModel(XmwPermission)
    private readonly permissionModel: typeof XmwPermission,
  ) {}

  /**
   * @description: 获取角色管理列表
   * @return {*}
   * @author: Cyan
   */
  async getRoleList(roleInfo: ListRoleManagementDto): Promise<PageResModel> {
    // 解构参数
    const {
      role_name,
      role_code,
      status,
      start_time,
      end_time,
      pageSize,
      current,
    } = roleInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (role_name) where.role_name = { [Op.substring]: role_name };
    if (role_code) where.role_code = { [Op.substring]: role_code };
    if (status) where.status = { [Op.eq]: status };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 分页查询数据
    const { count, rows } = await this.roleModel.findAndCountAll({
      attributes: { exclude: ['updated_time'] },
      // 联表查询
      include: [
        {
          model: XmwPermission,
          as: 'permission',
          attributes: ['menu_id'],
        },
      ],
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      order: [
        ['sort', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
      distinct: true,
    });
    return { list: rows, total: count };
  }

  /**
   * @description: 创建角色数据
   * @return {*}
   * @author: Cyan
   */
  async createRole({
    menu_permission,
    ...roleInfo
  }: SaveRoleManagementDto): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { role_name, role_code } = roleInfo;
    // 角色名称和角色编码不能相同
    const exist = await this.roleModel.findOne({
      where: { [Op.or]: { role_name, role_code } },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return { data: {}, msg: '角色名称或角色编码已存在！', code: -1 };
    }
    // 此处需要添加事务操作，做个标记
    // 执行 sql insert 语句,插入数据到 xmw_role 表中
    const result = await this.roleModel.create(roleInfo);
    // 再把角色对应的权限插入到 xmw_permission 中
    const permissionData: permissionModel[] = menu_permission.map(
      (menu_id: string) => {
        return { role_id: result.role_id, menu_id };
      },
    );
    await this.permissionModel.bulkCreate(permissionData);
    return { data: result };
  }

  /**
   * @description: 更新角色数据
   * @return {*}
   * @author: Cyan
   */
  async updateRole(
    role_id: string,
    { menu_permission, ...roleInfo }: SaveRoleManagementDto,
  ): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { role_name, role_code } = roleInfo;
    // 角色名称和角色编码不能相同
    const exist = await this.roleModel.findOne({
      where: {
        [Op.or]: { role_name, role_code },
        role_id: { [Op.ne]: role_id },
      },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return { data: {}, msg: '角色名称或角色编码已存在！', code: -1 };
    }
    // 此处需要添加事务操作，做个标记
    // 先删除权限表相关的数据
    await this.permissionModel.destroy({ where: { role_id } });
    // 执行 sql update 语句,更新 xmw_role 表数据
    const result = await this.roleModel.update(roleInfo, {
      where: { role_id },
    });
    // 再把角色对应的权限插入到 xmw_permission 中
    const permissionData: permissionModel[] = menu_permission.map(
      (menu_id: string) => {
        return { role_id, menu_id };
      },
    );
    await this.permissionModel.bulkCreate(permissionData);
    return { data: result };
  }

  /**
   * @description: 删除角色数据
   * @return {*}
   * @author: Cyan
   */
  async deleteRole(role_id: string): Promise<ResponseModel<ResData | number>> {
    // 此处需要添加事务操作，做个标记
    // 先删除 xmw_permission 表关联的数据
    await this.permissionModel.destroy({ where: { role_id } });
    // 再删除 xmw_role 关联的数据
    const result = await this.roleModel.destroy({ where: { role_id } });
    return { data: result };
  }

  /**
   * @description: 更新角色状态
   * @return {*}
   * @author: Cyan
   */
  async updateRoleStatus(
    role_id: string,
    status: string,
  ): Promise<ResponseModel<ResData>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.roleModel.update(
      { status },
      { where: { role_id } },
    );
    return { data: result };
  }
}
