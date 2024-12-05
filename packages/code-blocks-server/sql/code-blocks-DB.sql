/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80011 (8.0.11)
 Source Host           : localhost:3306
 Source Schema         : code-blocks-DB

 Target Server Type    : MySQL
 Target Server Version : 80011 (8.0.11)
 File Encoding         : 65001

 Date: 05/12/2024 18:28:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for edit_package
-- ----------------------------
DROP TABLE IF EXISTS `edit_package`;
CREATE TABLE `edit_package` (
  `edit_id` varchar(36) NOT NULL,
  `content` json NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` varchar(36) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`edit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of edit_package
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for edit_page
-- ----------------------------
DROP TABLE IF EXISTS `edit_page`;
CREATE TABLE `edit_page` (
  `edit_id` varchar(36) NOT NULL,
  `content` json NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` varchar(36) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`edit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of edit_page
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imgUrl` varchar(255) NOT NULL DEFAULT '/user.png',
  `is_status` tinyint(4) NOT NULL DEFAULT '1',
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`user_id`, `username`, `password`, `imgUrl`, `is_status`, `role`, `create_time`, `update_time`, `phone`) VALUES ('9d768a4f-b337-4708-a3a5-b9aafe2aceb4', '15583251761', '202cb962ac59075b964b07152d234b70', '/user.png', 1, 'admin', '2024-12-05 15:34:56.503488', '2024-12-05 15:35:34.057223', '15583251761');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
