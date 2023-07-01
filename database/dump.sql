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
DROP TABLE IF EXISTS `sharedfiles`;


CREATE TABLE `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
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
(5, 'm', 'Писна', 'Ми', 'mih1711@abv.bg', '$2y$10$gfC7JudIZ62EYl1n3U2KYeYqfAUvcoU0H2jbfaK39V3hulmmdSu/.'),
(6, 'mmm', 'Писна', 'Ми', 'mih1711mvi1711@abv.bg', '$2y$10$ahGXJ4E/fLPLJ5doxWo.Yuefkm1aAvnfUSUPgUuq1ovhZ7k94j1TG');
UNLOCK TABLES;

CREATE TABLE `files` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `size` bigint(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `owner` int(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
--  KEY `files_FK_1` (`owner`),
  CONSTRAINT `files_FK_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
INSERT INTO `files` (`id`, `name`, `size`, `type`, `date`, `owner`, `path`) VALUES
('$2y$10$/80W2pCTE8TSSrvixCc2sO.yrT53Ky3hYxI3flhA7VqqqKtmSdXz.', 'README.txt', 650, 'text/plain', '2023-07-01 23:17:00', 5, 'uploads/README.txt'),
('$2y$10$1qv38WujGtC3fzO/tpYXr.1j5HQFG9zbO3GWljhgGFBIrjxh4ycIi', 'My recording 8.mp3', 122654, 'audio/mpeg', '2023-06-25 15:15:34', 5, 'uploads/My recording 8.mp3'),
('$2y$10$6ATlHIReJX4V4yGCY3PBnul7kJubVBNwqRUPnAjY8.yodfGZDgXsS', 'addCateg.png', 40769, 'image/png', '2023-07-01 23:17:00', 5, 'uploads/addCateg.png'),
('$2y$10$a8PLf7RRvAeXbALTXjR9Qelvdn8JeHug9G.KexCU/5.SYJSoUTtIu', 'User.php', 1030, 'application/octet-stream', '2023-07-01 23:17:01', 5, 'uploads/User.php'),
('$2y$10$biConjLhPqiW6ZL6aJsP9utGuZr0ohzp6tmSKxRuWeJ07203phbE2', 'Sound_Task_Mihaela_Ognyan.mp4', 16837680, 'video/mp4', '2023-06-25 15:15:34', 5, 'uploads/Sound_Task_Mihaela_Ognyan.mp4'),
('$2y$10$K21yaMso85WKCjNPLikf6O9/j9fIvgAYQwxGj7TKrrdj9WVrqI1Oi', 'zad1.xml', 718, 'text/xml', '2023-07-01 23:19:03', 5, 'uploads/zad1.xml'),
('$2y$10$kKmjKW9JcwGgDFSyiSFHVeCWMP.MuTvSctkjxb7gem/E0N9ifkNfi', '6490de57d30c60.82517700.html', 1252, 'text/html', '2023-07-02 00:14:28', 6, 'uploads/6490de57d30c60.82517700.html'),
('$2y$10$Kof8hAjlWWNA.wMhPCOZtO/JJn157m5spr30X76Tljt6ytbHfBz82', '62550_Mihaela_Ilieva.html', 1594, 'text/html', '2023-07-01 23:17:00', 5, 'uploads/62550_Mihaela_Ilieva.html'),
('$2y$10$kYZRUdG7yfHqUX.bajD3nOLjsMhLIBPMV.JRuisoXaROhoFShyt0i', 'backgroundphoto.svg', 20965, 'image/svg+xml', '2023-07-01 23:19:03', 5, 'uploads/backgroundphoto.svg'),
('$2y$10$l.73d0qtdXg732Lj4PqGcuXN8jn6/kI7hX7XjIr3aBRaNJQ2Up/Ii', 'output.json', 59, 'application/json', '2023-07-01 23:19:03', 5, 'uploads/output.json'),
('$2y$10$lppnSvxbQRo7PIk/XgztF.WC2D2TFAY7liCg07A2.4i/NYDXUHRWe', 'IzbiraemiDisciplini.csv', 868, 'text/csv', '2023-07-01 23:17:00', 5, 'uploads/IzbiraemiDisciplini.csv'),
('$2y$10$lZ6JN5v5kgnJK7CwVmNvm.l29dQ1C7/GIagO.yg0y57iOnmXLnxEa', 'programming.gif', 7546, 'image/gif', '2023-07-01 23:19:03', 5, 'uploads/programming.gif'),
('$2y$10$MCZrOVnvJsLBiII0.3YUZuxlX/m3F4cq4UMrPK6K1nbrrZKrM1eY2', 'project_xslt.xsl', 2281, 'text/xml', '2023-07-01 23:21:01', 5, 'uploads/project_xslt.xsl'),
('$2y$10$Ne6YEoCQGoVBHuJ2ceSoeOB44iMUuCkGCWAOFFfUVmM/HuMwQYDWW', 'Untitled-1 (1).xsd', 14055, 'application/xml', '2023-07-01 23:19:03', 5, 'uploads/Untitled-1 (1).xsd'),
('$2y$10$NtM.x5ifWZrWQVDKbh4sDuAJ06ckOH/eG810JuHdRuhfXA5O..FhG', 'sendRequestUtility.js', 2222, 'text/javascript', '2023-07-01 23:19:03', 5, 'uploads/sendRequestUtility.js'),
('$2y$10$nZHZRxWq9eIVlZwNmjt7I.xX/qhaU0.d9QQDGAoALGQGNwCcXUhXG', '62550_Mihaela_Ilieva.css', 597, 'text/css', '2023-07-01 23:17:00', 5, 'uploads/62550_Mihaela_Ilieva.css'),
('$2y$10$p9EV9dK03jtICkig/3aP8eWQtehd2ajliXtbgELwFSFjTo5BseWQy', 'dump (1).sql', 3614, 'application/octet-stream', '2023-07-01 23:19:03', 5, 'uploads/dump (1).sql'),
('$2y$10$Qe8FhyolJzkLz/TBdG7oGu9.W17Ich86Fzod.ac9pxEH4r5pqXkQK', '62540_62550_documentation.docx', 1854685, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2023-07-01 23:17:00', 5, 'uploads/62540_62550_documentation.docx'),
('$2y$10$s1/F078Sxw8VnLoIgZxdF.0JXNwYs7qK07bAHP0AgwNRvASf328UO', 'Referat_Posledno_Opravqne.pdf', 479085, 'application/pdf', '2023-07-01 23:21:01', 5, 'uploads/Referat_Posledno_Opravqne.pdf'),
('$2y$10$SFoJ5H.lPdTbit3WKlVQJOliXYmgOXe4ME.6ERfGLXsgGM7F4xpf.', '62550 (1).pptx', 934121, 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '2023-07-01 23:19:03', 5, 'uploads/62550 (1).pptx'),
('$2y$10$SOQaW/FgO6KIbvxFhirJwe6UINZy.584egXQJYbBIrgGHAsincljy', '62540_62550_documentation.pdf', 1782126, 'application/pdf', '2023-07-01 23:17:00', 5, 'uploads/62540_62550_documentation.pdf'),
('$2y$10$SVF4kvaTrnxrLRFEObkGxuM1xKACLkPvWTRqna/TlhY3fMDboQ.vG', 'README.md', 131, 'application/octet-stream', '2023-07-01 23:21:01', 5, 'uploads/README.md'),
('$2y$10$vJKywSWY3LPHDuLJp0iXROsGi3eFX9hw1Y8B3aWmSkolspZplP3MG', '07.jpg', 1353084, 'image/jpeg', '2023-07-01 23:15:06', 5, 'uploads/07.jpg'),
('$2y$10$yIUOgJiD7ryax3udKYTapeQ0.Varcjr/AX3JHKlr1rBQL.9/NUu4W', 'IzbiraemiDisciplini.csv', 868, 'text/csv', '2023-07-02 00:19:33', 5, 'uploads/IzbiraemiDisciplini.csv');
UNLOCK TABLES;
-- Table structure for table `permissions`
CREATE TABLE `permissions` (
  `permission_id` int(255) NOT NULL AUTO_INCREMENT,
  `file_id` varchar(255) NOT NULL,
  `granted_by` int(255) NOT NULL,
  `granted_to` int(255) NOT NULL,
  PRIMARY KEY (`permission_id`),
  KEY `permision_FK_1` (`file_id`),
  KEY `permissions_FK_2` (`granted_by`),
  KEY `permissions_FK_3` (`granted_to`),
  CONSTRAINT `permision_FK_1` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permissions_FK_2` FOREIGN KEY (`granted_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permissions_FK_3` FOREIGN KEY (`granted_to`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `permissions` WRITE;
INSERT INTO `permissions` (`permission_id`, `file_id`, `granted_by`, `granted_to`) VALUES
(1, '$2y$10$/80W2pCTE8TSSrvixCc2sO.yrT53Ky3hYxI3flhA7VqqqKtmSdXz.', 5, 2),
(2, '$2y$10$SOQaW/FgO6KIbvxFhirJwe6UINZy.584egXQJYbBIrgGHAsincljy', 5, 6),
(3, '$2y$10$kKmjKW9JcwGgDFSyiSFHVeCWMP.MuTvSctkjxb7gem/E0N9ifkNfi', 6, 5);
UNLOCK TABLES;

CREATE TABLE `sharedfiles` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `file_id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isSeen` tinyint(1) NOT NULL,
  `hashedEmail` varchar(255) NOT NULL,
  `isDownloaded` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `file_id_FK_1` (`file_id`),
  CONSTRAINT `file_id_FK_1` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Table structure for table `users`
-- Dumping data for table `users`

-- Dump completed on 2023-06-20 18:11:15