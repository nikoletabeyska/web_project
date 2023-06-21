-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: filemeup
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB
-- Table structure for table `files`
DROP TABLE IF EXISTS `permissions`;
DROP TABLE IF EXISTS `files`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL UNIQUE,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'niki','n','b','nik@abv.bg','hi'),(2,'alex','a','z','a@z.bg','bye'),(3,'beyska','beyska','Бейска','nikolet.b@abv.bg','$2y$10$jAKOCubwDnQD9cUOfTod6.UZOvf1W5c6ggmG/W/stzVF9WNLMVGBG'),(4,'nikii','nikoleta','Бейска','alex@abv.bg','$2y$10$Ypj/wT1W.UrFksUDVuqR2.dTJGtC.3tN4geHX.5grsbCSgLXKQhzW');
UNLOCK TABLES;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `size` bigint(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `owner` int(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `files_FK_1` (`owner`),
  CONSTRAINT `files_FK_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Dumping data for table `files`

LOCK TABLES `files` WRITE;
INSERT INTO `files` VALUES (145,'1.jpg',10811,'image/jpeg','2023-06-20 17:55:36',1,'uploads/1.jpg'),(146,'2.jpg',7785,'image/jpeg','2023-06-20 17:55:36',1,'uploads/2.jpg'),(147,'2-1 (1).webp',59226,'image/webp','2023-06-20 17:55:48',1,'uploads/2-1 (1).webp'),(148,'2-1.webp',59226,'image/webp','2023-06-20 17:55:48',1,'uploads/2-1.webp'),(149,'Екранна снимка 2021-10-23 213258.png',207393,'image/png','2023-06-20 17:56:03',1,'uploads/Екранна снимка 2021-10-23 213258.png'),(150,'Екранна снимка 2021-10-23 214007.png',210563,'image/png','2023-06-20 17:56:03',1,'uploads/Екранна снимка 2021-10-23 214007.png'),(151,'Екранна снимка 2022-10-07 222608.jpg',224315,'image/jpeg','2023-06-20 17:56:03',1,'uploads/Екранна снимка 2022-10-07 222608.jpg'),(152,'Екранна снимка 2022-11-12 194419.jpg',106885,'image/jpeg','2023-06-20 17:56:03',1,'uploads/Екранна снимка 2022-11-12 194419.jpg');
UNLOCK TABLES;

-- Table structure for table `permissions`
CREATE TABLE `permissions` (
  `permision_id` int(255) NOT NULL AUTO_INCREMENT,
  `file_id` int(255) NOT NULL,
  `granted_by` int(255) NOT NULL,
  `granted_to` int(255) NOT NULL,
  PRIMARY KEY (`permision_id`),
  KEY `permision_FK_1` (`file_id`),
  KEY `permissions_FK_2` (`granted_by`),
  KEY `permissions_FK_3` (`granted_to`),
  CONSTRAINT `permision_FK_1` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permissions_FK_2` FOREIGN KEY (`granted_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permissions_FK_3` FOREIGN KEY (`granted_to`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
LOCK TABLES `permissions` WRITE;
UNLOCK TABLES;
-- Table structure for table `users`
-- Dumping data for table `users`
--Dump completed on 2023-06-20 18:11:15