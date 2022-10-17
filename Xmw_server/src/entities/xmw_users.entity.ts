/*
 * @Description: XmwUsers Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-14 14:18:28
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 18:17:32
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'xmw_users' })
export class XmwUsers {
  //用户id
  @PrimaryGeneratedColumn('uuid', { comment: '用户id' })
  user_id: string;

  //用户名
  @Column('varchar', {
    length: 20,
    comment: '用户名',
  })
  user_name: string;

  //用户工号
  @Column('varchar', {
    length: 20,
    comment: '用户工号',
  })
  work_no: string;

  //密码(加密)
  @Column('varchar', {
    length: 200,
    select: false,
    comment: '密码(加密)',
  })
  password: string;

  //中文名
  @Column('varchar', {
    length: 20,
    comment: '中文名',
  })
  cn_name: string;

  //英文名
  @Column('varchar', {
    length: 20,
    nullable: true,
    comment: '英文名',
  })
  en_name: string;

  //年龄
  @Column('int', {
    comment: '年龄',
  })
  age: number;

  //电子邮箱
  @Column('varchar', {
    length: 50,
    nullable: true,
    comment: '电子邮箱',
  })
  email: string;

  //电话号码
  @Column('char', {
    length: 11,
    comment: '电话号码',
  })
  phone: string;

  //头像地址
  @Column('varchar', {
    length: 200,
    nullable: true,
    comment: '头像地址',
  })
  avatar_url: string;

  //用户性别
  @Column('enum', {
    enum: [0, 1],
    comment: '用户性别（0:女，1:男）',
  })
  sex: string;

  //排序
  @Column('int', {
    comment: '排序',
  })
  sort: number;

  //用户状态
  @Column('tinyint', {
    comment: '用户状态（0:禁用，1:正常）',
  })
  status: number;

  //token
  @Column('varchar', {
    length: 200,
    nullable: true,
    comment: 'token',
  })
  token: string;

  //座右铭
  @Column('varchar', {
    length: 32,
    nullable: true,
    comment: '座右铭',
  })
  motto: string;

  //人物标签
  @Column('simple-array', {
    nullable: true,
    comment: '人物标签',
  })
  tags: string[];

  //所属城市
  @Column('simple-array', {
    comment: '所属城市',
  })
  city: string[];

  //详细地址
  @Column('varchar', {
    length: 200,
    comment: '详细地址',
  })
  address: string;

  //岗位id
  @Column('char', {
    length: 36,
    comment: '岗位id',
  })
  jobs_id: string;

  //组织id
  @Column('char', {
    length: 36,
    comment: '组织id',
  })
  org_id: string;

  //角色id
  @Column('char', {
    length: 36,
    comment: '角色id',
  })
  role_id: string;

  //创建人
  @Column('char', {
    length: 36,
    comment: '创建人',
  })
  founder: string;

  //登录次数
  @Column('int', {
    comment: '登录次数',
  })
  login_num: number;

  //最后一次登录ip
  @Column('varchar', {
    length: 20,
    nullable: true,
    comment: '最后一次登录ip',
  })
  login_last_ip: number;

  //最后一次登录时间
  @Column('datetime', {
    nullable: true,
    comment: '最后一次登录时间',
  })
  login_last_time: Date;

  // 创建时间
  @CreateDateColumn({ comment: '创建时间' })
  created_time: Date;

  // 最后一次更新时间
  @UpdateDateColumn({ nullable: true, comment: '最后一次更新时间' })
  updated_time: Date;
}
