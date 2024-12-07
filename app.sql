CREATE DATABASE share_web;
USE share_web;

--- wx用户表 ---
CREATE TABLE `scene` (
  `id` INT NOT NULL auto_increment,
  `openId` VARCHAR(64) DEFAULT NULL COMMENT '发送方账号（一个OpenID）',
  `scene` VARCHAR(64) DEFAULT NULL COMMENT '场景值ID（判断哪个用户扫码）',
  `qrcodeRandom` VARCHAR(10) DEFAULT NULL COMMENT '获取二维码随机数',
  `qrcodeTime` TIMESTAMP DEFAULT NULL COMMENT '获取二维码时间',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 comment='用户表';

--- 用户表 ---
CREATE TABLE `user` (
  `id` INT NOT NULL auto_increment,
  `username` VARCHAR(20) DEFAULT NULL COMMENT '用户名',
  `password` VARCHAR(64) DEFAULT NULL COMMENT '密码',
  `avatar` TEXT COMMENT '头像',
  `phone` VARCHAR(20) DEFAULT NULL COMMENT '电话',
  `sign` VARCHAR(300) DEFAULT NULL COMMENT '用户签名',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  `updateTime` TIMESTAMP DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 comment='用户表';


--- 视频课程表格 ---
CREATE TABLE `video` (
  `id` INT NOT NULL auto_increment,
  `title` VARCHAR(200) DEFAULT NULL COMMENT '视频名称',
  `cover` VARCHAR(400) DEFAULT NULL COMMENT '视频封面',
  `author` VARCHAR(64) DEFAULT NULL COMMENT '视频作者',
  `keywords` VARCHAR(200) DEFAULT NULL COMMENT '关键词',
  `description` VARCHAR(500) DEFAULT NULL COMMENT '视频简介',
  `url` VARCHAR(200) DEFAULT NULL COMMENT '链接',
  `code` VARCHAR(64) DEFAULT NULL COMMENT '链接提取码',
  `content` TEXT DEFAULT NULL COMMENT '视频介绍',
  `showCount` INT DEFAULT NULL COMMENT '展示次数',
  `price` INT DEFAULT NULL COMMENT '价格',
  `type` INT DEFAULT NULL COMMENT '视频类型',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 comment='视频课程表格';

--- 电子书表格 ---
CREATE TABLE `ebook` (
  `id` INT NOT NULL auto_increment,
  `title` VARCHAR(200) DEFAULT NULL COMMENT '电子书名称',
  `cover` VARCHAR(400) DEFAULT NULL COMMENT '电子书封面',
  `author` VARCHAR(64) DEFAULT NULL COMMENT '作者',
  `keywords` VARCHAR(200) DEFAULT NULL COMMENT '关键词',
  `description` VARCHAR(500) DEFAULT NULL COMMENT '电子书简介',
  `content` TEXT DEFAULT NULL COMMENT '电子书介绍',
  `url` VARCHAR(200) DEFAULT NULL COMMENT '百度链接',
  `code` VARCHAR(64) DEFAULT NULL COMMENT '链接提取码',
  `showCount` INT DEFAULT NULL COMMENT '展示次数',
  `price` INT DEFAULT NULL COMMENT '价格',
  `type` INT DEFAULT NULL COMMENT '电子书类型',
  `createTime` TIMESTAMP DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY(`id`)
)engine=InnoDB auto_increment=1 DEFAULT charset=utf8 comment='电子书表格';
