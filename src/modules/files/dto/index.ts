/*
 * @Description: 上传文件 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-25 10:34:23
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-07-28 11:02:05
 */
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: String,
    description: '文件流',
    format: 'binary',
  })
  file: any;
}
