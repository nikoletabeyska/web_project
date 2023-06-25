-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: filemeup
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB
-- Table structure for table `files`
DROP DATABASE IF EXISTS `filemeup`;
CREATE DATABASE `filemeup`;
USE `filemeup`; 
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
INSERT INTO `users` (`id`, `username`, `name`, `surname`, `email`, `password`) VALUES
(1, 'niki', 'n', 'b', 'nik@abv.bg', 'hi'),
(2, 'alex', 'a', 'z', 'a@z.bg', 'bye'),
(3, 'beyska', 'beyska', 'Бейска', 'nikolet.b@abv.bg', '$2y$10$jAKOCubwDnQD9cUOfTod6.UZOvf1W5c6ggmG/W/stzVF9WNLMVGBG'),
(4, 'nikii', 'nikoleta', 'Бейска', 'alex@abv.bg', '$2y$10$Ypj/wT1W.UrFksUDVuqR2.dTJGtC.3tN4geHX.5grsbCSgLXKQhzW'),
(5, 'm', 'Писна', 'Ми', 'mih1711@abv.bg', '$2y$10$gfC7JudIZ62EYl1n3U2KYeYqfAUvcoU0H2jbfaK39V3hulmmdSu/.')
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
INSERT INTO `files` (`id`, `name`, `size`, `type`, `date`, `owner`, `path`) VALUES
('$2y$10$.7CMLl17q0z9KGLbvdwDOOV38MODoRaKppdNulkroBYhHnhgxgxqq', '07.jpg', 1353084, 'image/jpeg', '2023-06-25 04:16:04', 12, 'web_project/uploads/07.jpg'),
('$2y$10$.GTCvAsItRr8yFWUX1UNNOsJ7lYEXPS8rvbBLwqO/8YoRFyzY9Yaa', '62550_Mihaela_Ilieva.css', 597, 'text/css', '2023-06-25 04:16:04', 12, 'web_project/uploads/62550_Mihaela_Ilieva.css'),
('$2y$10$.kW1.iibjls.MlnuvPaQ0O4g2hy9lA4d8N3Hh3NsCfA.LOnHoRtNy', 'UserDocumentation.docx', 527721, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2023-06-25 01:09:30', 5, 'web_project/uploads/UserDocumentation.docx'),
('$2y$10$/0UuvOQ8rmDYk6y93xiYsOahhUttmO3209NnrQAikhqK0UkEwNI3K', 'User.php', 1030, 'application/octet-stream', '2023-06-25 01:09:46', 5, 'web_project/uploads/User.php'),
('$2y$10$1DuNHcacP5gegZ6mXQ79u.z.qWuq2/nulzkSIQOlIpeMlSukMiOlK', 'sendRequestUtility.js', 2221, 'text/javascript', '2023-06-25 02:04:50', 11, 'web_project/uploads/sendRequestUtility.js'),
('$2y$10$2x3LFELzIJWK61f1jTjYFeRhVc6YkRPYhTEI/KJ35o1X2uE7KhHMO', 'uploadRequestUtility.js', 2600, 'text/javascript', '2023-06-25 02:04:50', 11, 'web_project/uploads/uploadRequestUtility.js'),
('$2y$10$B6Vsw1xuOOPJJ34F94C/M.MrQf7sPYHMxhbKKnRm1FOpObsVUuty6', 'output.json', 59, 'application/json', '2023-06-25 03:35:37', 5, 'web_project/uploads/output.json'),
('$2y$10$C9GAOPKSHKvtSuDDFJt/ZudGw3RAeUCdSy2HbYu0VbNtq36Gg0APy', 'wheather.png', 49260, 'image/png', '2023-06-25 02:30:14', 5, 'web_project/uploads/wheather.png'),
('$2y$10$emf.UYXfMq6r6X3EXdv5F.hVekd07x4SEXha2hwkLLQW2UKGdYQNm', '6490e3f0130162.09135654.md', 131, 'application/octet-stream', '2023-06-25 03:45:58', 5, 'web_project/uploads/6490e3f0130162.09135654.md'),
('$2y$10$I2v8agPcrLNhlxjnylC6CeDylygyRslAwwlyHhD6K8bu7x0yTi/fS', 'User.php', 1030, 'application/octet-stream', '2023-06-25 03:45:58', 5, 'web_project/uploads/User.php'),
('$2y$10$jb3yxf9ngNIDi0Pn6PO5SejjU81EtPcYISe5RF8HM7UHDg0wMpvxG', 'singlefile.php', 1142, 'application/octet-stream', '2023-06-25 03:29:58', 5, 'web_project/uploads/singlefile.php'),
('$2y$10$jlYdu8tBAFDrYatKCYlbke6GXB3t7MpE1Pb8G/AgQNIPvZDQuLrXW', 'UserDocumentation.docx', 527721, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2023-06-25 01:09:46', 5, 'web_project/uploads/UserDocumentation.docx'),
('$2y$10$k0oQbci5Y4u7eKc2O0ms2.k3xi3vCAf5/k7YtTQd6iuaRgy069edi', 'Db.php', 661, 'application/octet-stream', '2023-06-25 03:45:58', 5, 'web_project/uploads/Db.php'),
('$2y$10$KMicFJUpJ2a7A2zIEjIhveWcVWkX7A3L1bWfWl0IUpmp1BRMxSQB.', '6490dead5b6557.55799225.avif', 15084, 'image/avif', '2023-06-25 03:45:58', 5, 'web_project/uploads/6490dead5b6557.55799225.avif'),
('$2y$10$L2KyMyvT7at7JJnmPGThf.pI6lFV.OxGq9B6sapsUGTKSw5abGKMO', 'trying.txt', 133, 'text/plain', '2023-06-25 04:01:18', 5, 'web_project/uploads/trying.txt'),
('$2y$10$LHVBlv6COuiL0zSTHnX3IeTywPRZjzSjChSn4M7q2OkUlRAgQdVn.', 'UserRequestHandler.php', 1534, 'application/octet-stream', '2023-06-25 01:09:46', 5, 'web_project/uploads/UserRequestHandler.php'),
('$2y$10$m0IEh3dh5SoV/hRqdcMLj./C3Q36XG55chzhWdpYpG9l.Owf4V38q', 'UserDocumentation.docx', 527721, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2023-06-25 01:20:45', 5, 'web_project/uploads/UserDocumentation.docx'),
('$2y$10$m582WvLtOQXRH3nONZTcH..kMA7eQUHRSOKyETopeMmZiwU6ha.JG', 'singlefile.php', 1150, 'application/octet-stream', '2023-06-25 03:37:17', 5, 'web_project/uploads/singlefile.php'),
('$2y$10$NvwfXk9YnLkzsDtzL8sqNOcS4slm4av5TQjNwr2c.NWfvsl1giwWa', 'HW3_Mihaela_Ilieva_62550.php', 469, 'application/octet-stream', '2023-06-25 03:24:38', 5, 'web_project/uploads/HW3_Mihaela_Ilieva_62550.php'),
('$2y$10$ohG8BhmPhnZhgZQSgisCluLJkXeG5C9dB7O60gpJxDd6qucvpTTFW', 'singlefile.php', 1152, 'application/octet-stream', '2023-06-25 03:29:21', 5, 'web_project/uploads/singlefile.php'),
('$2y$10$pW.Hy3qcBWH5J/gy66h.fuVUSSOfMUXNfQpTez6t9bH411plLFOPO', '6490ab2a0f4ec2.43212631.txt', 0, 'text/plain', '2023-06-25 03:45:58', 5, 'web_project/uploads/6490ab2a0f4ec2.43212631.txt'),
('$2y$10$QITgN5kPCoTL.dqHxihuW.wkP5.xM3y/TkbRgGdUqnEaSDjevWDWS', 'UserRequestHandler.php', 11092, 'application/octet-stream', '2023-06-23 19:53:10', 5, 'web_project/uploads/UserRequestHandler.php'),
('$2y$10$RkD9g3lyAqFKxl1Uv1PEK.NZ6nKAIvJ.iA8lP/LKejfhxu7I0F6Xi', '62550_Mihaela_Ilieva.html', 1594, 'text/html', '2023-06-25 02:20:45', 5, 'web_project/uploads/62550_Mihaela_Ilieva.html'),
('$2y$10$Uk2PJipVnAT56ni4zMgsN.eeS13IIWgtGRMdJqwB4KTCAtpabMRxW', 'displaySingleFile.php', 1148, 'application/octet-stream', '2023-06-25 03:45:58', 5, 'web_project/uploads/displaySingleFile.php'),
('$2y$10$uqzpADy3mtYQbSf1PUxcleoiZmiw8JirmyjfoG1GdoYKIoT77Rj2u', 'displaySingleFile.php', 1148, 'application/octet-stream', '2023-06-25 03:30:53', 5, 'web_project/uploads/displaySingleFile.php'),
('$2y$10$xhfSZevnSTUcr/1dixEjeudZyJBFupxGl9GcZJg3EYM5VpvDLHVvK', 'Referat_Posledno_Opravqne.pdf', 479085, 'application/pdf', '2023-06-25 01:21:33', 5, 'web_project/uploads/Referat_Posledno_Opravqne.pdf'),
('$2y$10$yK9x9Ry3D8467K12uEEYnen6fr88K0jNWTfih9dPLVg62AfiHWiHW', 'dump.sql', 3616, 'application/octet-stream', '2023-06-25 03:23:58', 5, 'web_project/uploads/dump.sql'),
('$2y$10$zdvcTkhekvm5kKPps2dTyOmi/NUgppRqM5N7GxAkCGVAMJbFiMQ2S', '62550_Mihaela_Ilieva.html', 1594, 'text/html', '2023-06-25 04:16:04', 12, 'web_project/uploads/62550_Mihaela_Ilieva.html'),
('$2y$10$ZQCKQ./iVLamnq788S6g6OP0YZP.6ts7whxBy4FlGYKh2RG7n.7iu', 'UserRequestHandler.php', 11092, 'application/octet-stream', '2023-06-25 02:04:50', 11, 'web_project/uploads/UserRequestHandler.php');
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