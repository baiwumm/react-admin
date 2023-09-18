/*
 * @Description: 活动公告 DTO
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 16:36:19
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-25 16:59:19
 */
import { ListAnnouncementDto } from './list.announcement.dto'; // 查询活动公告列表 DTO
import {
  ResponseAnnouncementDto,
  CreateAnnouncementDto,
} from './response.announcement.dto'; // 查询列表返回响应体 Dto
import { SaveAnnouncementDto, UpdatePinnedDto } from './save.announcement.dto'; // 保存活动公告数据 DTO

export {
  ListAnnouncementDto,
  ResponseAnnouncementDto,
  SaveAnnouncementDto,
  CreateAnnouncementDto,
  UpdatePinnedDto,
};