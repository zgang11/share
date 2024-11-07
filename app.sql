CREATE DATABASE share_web;
USE share_web;

--- 用户表 ---
CREATE TABLE `scene` (
  `id` INT NOT NULL auto_increment,
  `openId` VARCHAR(64) DEFAULT NULL COMMENT '发送方账号（一个OpenID）',
  `scene` VARCHAR(64) DEFAULT NULL COMMENT '场景值ID（判断哪个用户扫码）',
  `qrcodeRandom` VARCHAR(10) DEFAULT NULL COMMENT '获取二维码随机数',
  `qrcodeTime` TIMESTAMP DEFAULT NULL COMMENT '获取二维码时间',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 comment='用户表';
