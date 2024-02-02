-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2024 at 12:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_api_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `additionalfields`
--

CREATE TABLE `additionalfields` (
  `fieldId` int(11) NOT NULL,
  `fieldName` varchar(255) NOT NULL,
  `createdby` varchar(100) DEFAULT NULL,
  `createddate` varchar(255) DEFAULT NULL,
  `updatedby` varchar(100) DEFAULT NULL,
  `updateddate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `additionalfields`
--

INSERT INTO `additionalfields` (`fieldId`, `fieldName`, `createdby`, `createddate`, `updatedby`, `updateddate`) VALUES
(10000, 'Floors', '1000', '1706866468268', NULL, NULL),
(10001, 'Residential Property Types', '1000', '1706866474854', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL,
  `userName` varchar(75) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `fullName` varchar(75) NOT NULL,
  `userId` varchar(11) NOT NULL,
  `status` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `createddate` varchar(255) NOT NULL,
  `createdby` varchar(255) NOT NULL,
  `updateddate` varchar(255) NOT NULL,
  `updatedby` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminuser`
--

INSERT INTO `adminuser` (`id`, `userName`, `password`, `email`, `fullName`, `userId`, `status`, `role`, `createddate`, `createdby`, `updateddate`, `updatedby`) VALUES
(1, 'Admin69', '$2b$10$Cck1W1wlVQ4.7IiprR9ldu.wReGCxTU/9d0u.bk0vrYesLDjAI0rS', '696969@email.com', '6969', '1000', 1, 69, '', '', '1700807156268', '1000'),
(32, 'Admin4', '$2b$10$NM1/hBQLwpcZnKJ3KH.X4Om9AcAYxkqMvEHORjIIO5OZz/InzLDuK', 'gmail4@email.com', 'Shop Keeper', '1004', 1, 1, '1698933404969', '1000', '1702286792143', '1004'),
(33, 'Admin5', '$2b$10$1KeOrrwxaVFp7Wv2Ikzz6uZnAZ42WpTLBsOsSe7PUChr9JNJyXs3u', 'gmail5@email.com', 'eminem', '1005', 1, 1, '1698933411342', '1000', '', ''),
(34, 'Admin6', '$2b$10$kP4V1ZAEdZVxHmYhAWKufOb0S78HFR8e6OjhQ.ZLalLm1fJEPwCkW', 'gmail6@email.com', 'eminem', '1006', 1, 1, '1698933415744', '1000', '1703738983370', '1000'),
(35, 'Admin7', '$2b$10$Qlkq1EkIzY..dG9jmy1LX.gXgA1XX1EGfu65qZv48Wk4z1FhfW4y2', 'gmail7@email.com', 'eminem', '1007', 1, 1, '1698933420996', '1000', '1699378212861', '1000'),
(36, 'NishantMan', '$2b$10$5sftL5Pbdx2j2fVrKRWkJeMnF2d3cJHHuquyhr2u7ha2L.4A0IXGW', 'n', '', '1008', 0, 0, '1698933427987', '1000', '1699356200451', '1000'),
(37, 'Admin9', '$2b$10$mJtPZzs71SRzdfJOwRndvuz5VIGvYe49TiysTDGMU.Wgl2YAGs2fm', 'gmail9@email.com', 'eminem', '1009', 1, 1, '1698933432838', '1000', '1699253003415', '1000'),
(38, 'Admin10', '$2b$10$wGvxgn3lZmq1oo9gDwOKM.yZo1saY9vpqhvz5VlYGKGkdplDOZfDK', 'gmail10@email.com', 'eminem', '1010', 1, 1, '1698933437888', '1000', '1699377735572', '1000'),
(40, 'Admin12', '$2b$10$r6h6HI1M9Vsl5cnGExCoW.wuaxa2geShwpkrbETlamNJmbEcTolSG', 'gmail12@email.com', 'eminem', '1012', 1, 1, '1698933446251', '1000', '1699354456209', '1000'),
(41, 'Admin13', '$2b$10$BzQ.OlPeueZYJxqlBBGTvuO/ndvrTofTnuMZaNQgiCdhKbZATgJNy', 'gmail13@email.com', 'eminem', '1013', 1, 1, '1698933451109', '1000', '1699181321178', '1000'),
(42, 'Admin14', '$2b$10$bgt3yyBmDLlwO4ChXAilW.itU0WH4e/rLbb5Dz8WXSnLQIbiDpN3q', 'gmail14@email.com', 'eminem', '1014', 1, 1, '1698933455399', '1000', '', ''),
(43, 'Admin15', '$2b$10$xbxxLC.8GrvVbIOtRrlk7.qPLOs9xq1fXz3qfiYKGpQ7i4RPkpU4m', 'gmail15@email.com', 'eminem', '1015', 1, 1, '1698933462374', '1000', '', ''),
(44, 'Admin16', '$2b$10$T.v1p7Co3K9mHlYyJOd1lOwop6BSLlNJ9vgNarLp7Ia8dGgXmnssa', 'gmail16@email.com', 'eminem', '1016', 1, 1, '1698933467740', '1000', '', ''),
(45, 'Admin17', '$2b$10$CIcH8IWm4G2sofJvxZJ.VOCRRhOyP0F9TLbzP5NNfIzqYGQE4h2Im', 'gmail17@email.com', 'eminem', '1017', 1, 1, '1698933472572', '1000', '', ''),
(46, 'Admin18', '$2b$10$SsZ1eBNY/z.fiyNWOQwAoe9inoTOw7RRulKTSOH85iGCEDPfL7sQe', 'gmail18@email.com', 'eminem', '1018', 1, 1, '1698933477393', '1000', '', ''),
(47, 'Admin19', '$2b$10$3Go7GHWiTZQnUoL.0wCwbObWvMzncRo3tIUrhTW5MGYfMaHTtzjam', 'gmail19@email.com', 'eminem', '1019', 1, 1, '1698933482711', '1000', '', ''),
(48, 'Admin20', '$2b$10$C2EICXuMe.v9UpK4uYbrwu4866owntE1tA3HhozWn/UmWlsRbm2h6', 'gmail20@email.com', 'eminem', '1020', 1, 1, '1698933488446', '1000', '', ''),
(49, 'Admin21', '$2b$10$IYd2c6OwitFY8DYi08w8GeVwyvFbo3u28mzyrpxb8tEscA/YAOltG', 'gmail21@email.com', 'eminem', '1021', 1, 1, '1698933492916', '1000', '', ''),
(50, 'Admin22', '$2b$10$ZxOWN5fO97/xg5Qv6VMI3uA874JS9V4O/V.W2HYqOTHL73ceYro2y', 'gmail22@email.com', 'eminem', '1022', 1, 1, '1698933497209', '1000', '', ''),
(52, 'Admin24', '$2b$10$/3g4Yn3vNzra7lP21hJWnOucZt2F5zTTQB/Ibpf6esTn9NVryUzqm', 'gmail24@email.com', 'eminem', '1024', 1, 1, '1698933507234', '1000', '', ''),
(53, 'Admin25', '$2b$10$A9pn97RmzE6xreSTaE4RZOMlfR9jiuIiSKtLa0KKFOh9tGpHBJugK', 'gmail25@email.com', 'emineme', '1025', 1, 1, '1698988148358', '1000', '1699186212051', '1000'),
(54, 'Admin26', '$2b$10$3Wwak0kCdaKcjME9svjLOuAxFhUuQvYd208FMMgKsa50OEmUKJKJi', 'gmail26@email.com', 'eminem', '1026', 1, 1, '1698988152972', '1000', '1699186180137', '1000'),
(56, 'Admin28', '$2b$10$I2W3Mr/MwmdcYkhYukmtn.dWP0b1mGhA8o1VNGzsXfsn0eMGZ3k8m', 'gmail28@email.com', 'eminem', '1028', 1, 1, '1698988162728', '1000', '1699185478597', '1000'),
(57, 'Admin29', '$2b$10$rCDNlh9Bj0Rf9tAVqy08s.HqYC6RYeRX.RwxsOIJss2e7wCIKWLj2', 'gmail29@email.com', 'eminem', '1029', 1, 1, '1698988166455', '1000', '1699185820243', '1000'),
(58, 'Admin30', '$2b$10$5TIdpa/dBy51vAqV3ufEV.RqScq77GUWMKmiuGGPwDjVnUWcwXKY2', 'gmail30@email.com', 'eminem', '1030', 1, 1, '1698988170960', '1000', '1699185647525', '1000'),
(59, 'Admin31', '$2b$10$ESy7Qh2GT1KXwa0MNQt9neS8XPEMchvDAsulTK7YaVR1bYngS7xLW', 'gmail31@email.com', 'eminem', '1031', 1, 1, '1698988174751', '1000', '1699377962910', '1000'),
(61, 'Admin33', '$2b$10$lGlcfoDalucus.7nnAlG8uSLhKD9KrNMa7n2hAET1H6wjjxoBZku2', 'gmail33@email.com', 'eminem', '1033', 1, 1, '1698988182066', '1000', '1699182830278', '1000'),
(62, 'Admin34', '$2b$10$hpuxHyK1rw8JOmEdRk2oeee9ApLb8R3EkUZmrjjOX7QABirXe1thy', 'gmail34@email.com', 'eminem', '1034', 1, 1, '1698988185439', '1000', '1699356904800', '1000'),
(63, 'Admin35', '$2b$10$EfroKfZizjpsvJxJB5veS.u9nOVB2XtYbiaj0IKHfPeyR8u6F528u', 'gmail35@email.com', 'eminem', '1035', 1, 1, '1698988189039', '1000', '1699356256489', '1000'),
(64, 'Admin36', '$2b$10$hIqhSC.L3n7yqNIOnLc4PePn0v9bwUfNxr1/j6UnsGMoIuIBEFPnO', 'gmail36@email.com', 'slim shady', '1036', 1, 1, '1698988193301', '1000', '1699378145427', '1000'),
(65, 'Admin37', '$2b$10$WAZsHzrvLlnX5sJSnE3K9upEk.nvmSMl7uT8IVaaNHqqKoyo7RNS.', 'gmail37@email.com', 'eminem', '1037', 1, 1, '1698988197660', '1000', '1699251813528', '1000'),
(66, 'Admin38', '$2b$10$vaf.sVbMGuNbXHo0HRKut.eQHh/wAGOx6okhw8gPSyI/xDdg/.bdO', 'gmail38@email.com', 'eminem', '1038', 1, 1, '1698988201202', '1000', '1699377801974', '1000'),
(67, 'Admin39', '$2b$10$9slcvBL.re3impXj7QILl.LTdbDsGVjRzphzqo.tib4n17dCdfORW', 'gmail39@email.com', 'eminem', '1039', 1, 1, '1698988205561', '1000', '1699251791662', '1000'),
(68, 'Admin40', '$2b$10$WjoYM23etaXEpDZVoT3vle4Xnh42sbouUbl1b.UjEBH9UoEeaQbXG', 'gmail40@email.com', 'eminem', '1040', 1, 1, '1698988209985', '1000', '1699185573752', '1000'),
(69, 'Admin41', '$2b$10$PBhrbV.9a.N.jeQ6h7B4v.D7zTeQQOFgbAw6efSwsDF3USPoNQVY6', 'gmail41@email.com', 'eminem', '1041', 1, 1, '1698989708517', '1000', '1700477329598', '1000'),
(70, 'Admin42', '$2b$10$ktFoLalTA07W3I/3akIFh.gV3VGtm6VDGN88Gb48kFliWiNSBP2Y.', 'gmail42@email.com', 'eminem', '1042', 1, 1, '1698989712467', '1000', '1700549054769', '1000'),
(71, 'Admin43', '$2b$10$yYK9OU7W174g.i2Vbv123.qrPEgoa2hGw860dmO8qdQ579Jr8pinm', 'gmail43@email.com', 'eminem', '1043', 1, 1, '1698989719186', '1000', '1699374886917', '1000'),
(72, 'Admin44', '$2b$10$9nZ//wHDOqsl2egc6GR6M.mvBKCZDnZsQhB1GZPga5uCMkv2vh1FW', 'gmail44@email.com', 'eminem', '1044', 1, 1, '1698989723086', '1000', '1699251573723', '1000'),
(73, 'Admin45', '$2b$10$uasICz1VjwyjDvPxxoB99eNcS7YAARhkAsqIJVi6fLJw2ff1cXuca', 'gmail45@email.com', 'eminem', '1045', 1, 1, '1698989726363', '1000', '1699185739553', '1000'),
(74, 'nnnAdmin46', '$2b$10$S4j3ZXZhYvX/o59ln1CAH.pb/9mOqGJdQ5jvBxFwZiKijSJWY14Hq', 'gmail46@email.com', 'eminemaa', '1046', 1, 1, '1698989729789', '1000', '1700549061526', '1000'),
(75, 'Admin47', '$2b$10$WPZ5EOnZDx9EqLt4WUKyM.smZDkacC18A.RG2n5jlcBuP9XG1GgQu', 'gmail47@email.com', 'eminem', '1047', 1, 1, '1698989734972', '1000', '1699250964621', '1000'),
(76, 'Admin48', '$2b$10$2dhMsSdQhj2uhHo1OmbEeOjOLKh98.Gw.nqB/2l4FLz7A9Pr6xjDu', 'gmail48@email.com', 'eminem', '1048', 1, 1, '1698989738655', '1000', '1700476322289', '1000'),
(77, 'Admin49', '$2b$10$6xXOvanG6TbdPgiLCv20w.Fi0P1/4t6BwWd.XtIArcm.BaNRLwgkO', 'gmail49@email.com', 'eminem', '1049', 1, 1, '1698989742919', '1000', '1699179819199', '1000'),
(78, 'Admin50', '$2b$10$kKdvxJNboJhPPmn.Hh.Pdeqt3JoxeweUd9Hb3eOA1SC1h41ETKlXu', 'gmail50@email.com', 'eminem', '1050', 1, 1, '1698989748101', '1000', '1699181007290', '1000'),
(79, 'Admin53', '$2b$10$UQ9q2ctOF9Xkcr8Zx/t6NeP621VrzpdaX354b3HpzyIscQdLBMuAi', 'gmail53@email.com', 'eminem', '1051', 1, 1, '1698991140585', '1000', '1699369818408', '1000'),
(80, 'Admin54', '$2b$10$y7ZQ//gVAxUy80Dy9DG6oukvRgmd5OQ6imw9rQ4Ro2tPneofud41y', 'gmail54@email.com', 'emi mama', '1052', 1, 1, '1698991151984', '1000', '1699251561570', '1000'),
(82, 'Admin56', '$2b$10$0CAUAmP2uqjkpsqKYITq6.SaFKXytcq6vbqM.RH2QCxtS.smS5w6O', 'gmail56@email.com', 'eminem', '1054', 1, 1, '1698991170932', '1000', '1699356943867', '1000'),
(83, 'Admin57', '$2b$10$/O7I5yI2SwYkuIQeXt6RTOpYZ1tft.eSpZ3SonyNKLi/Ib13kSWPm', 'gmail57@email.com', 'eminem', '1055', 1, 1, '1698991175796', '1000', '1699355046859', '1000'),
(85, 'Admin58', '$2b$10$gLZE4sbqyhEppOY2hY63/.lG0zYxtdF.OqADDqhpvmFMNjikKME9q', 'gmail58@email.com', 'eminem', '1057', 1, 1, '1698991185477', '1000', '1699262189614', '1000'),
(88, 'Admin62', '$2b$10$nrbob60FhrjGeu3n71kDxuELZYTXleyLrOmYDOG4XKFAGO0HQDa72', 'gmail62@email.com', 'eminem', '1060', 1, 1, '1698991452065', '1000', '', ''),
(89, 'Admin63', '$2b$10$VLjX8ozmHma8XEv/WIgOMeffTkbUs527JquEV.LAMYNmLzozdbaaK', 'gmail63@email.com', 'eminem', '1061', 1, 1, '1698991456438', '1000', '', ''),
(90, 'Admin64', '$2b$10$HSBCs6D4pI3s3J9uOSYUueD4wxij41KmajDhGupMIdyBdLH5dPd6m', 'gmail64@email.com', 'eminem', '1062', 1, 1, '1698991461315', '1000', '', ''),
(91, 'Admin65', '$2b$10$hHuzV6y7cTLIB9oeqLMrnu6aAjIWfNknUtniPBYhW9rBwmB/zD0aK', 'gmail65@email.com', 'eminem', '1063', 1, 1, '1698991471829', '1000', '1700456893391', '1000'),
(92, 'Admin66', '$2b$10$umxVqQxeTV3aIHdYSUfllutm8tUfnDy85xkysltXlsI4fob3GMSzK', 'gmail66@email.com', 'eminem', '1064', 1, 1, '1698991475345', '1000', '', ''),
(93, 'Admin67', '$2b$10$3oY5AKsrQ3Q5RgXlRr0Vy.eWiHUZv5HTZeIK1Bl20Q1YVFMqGYfzK', 'gmail67@email.com', 'eminem', '1065', 1, 1, '1698991479893', '1000', '', ''),
(94, 'Admin68', '$2b$10$.zHs6wwEMyZba/9nGWG/H.XbLDOFNNvarUVZ.vPWR3YvrWYa/gwsG', 'gmail68@email.com', 'eminem', '1066', 1, 1, '1698991484055', '1000', '', ''),
(95, 'Admin70', '$2b$10$3FDtkK7T6NYlFc3gZQ8UyurhzqcTdTtYqSV6IkxV9UkgGJl4yXqAu', 'gmail70@email.com', 'eminem', '1067', 1, 1, '1698991496420', '1000', '', ''),
(96, 'Admin71', '$2b$10$JBi1TcEBXUE4QQ7Rak4kherVSzoaPGxEcRH4tzmZUSBVTSpLftwu6', 'gmail71@email.com', 'eminem', '1068', 1, 1, '1698991501718', '1000', '', ''),
(97, 'Admin72', '$2b$10$.v0rGZhsRSGuDOb4zOIBjuouv0FrW0ftTQT7j2c8/CPuYe9.ISoGW', 'gmail72@email.com', 'eminem', '1069', 1, 1, '1698991505566', '1000', '', ''),
(98, 'Admin73', '$2b$10$TtosHdJTvDnZ7iHtnsoXSuk/Yl70M0/ob30eE7/K1GCD549QSpq92', 'gmail73@email.com', 'eminem', '1070', 1, 1, '1698991509292', '1000', '', ''),
(99, 'Admin74', '$2b$10$czIkOrIELbQdZISclGNHKuEjaAMeyH/mD995qOX6EGagKDhZqZsjC', 'gmail74@email.com', 'eminem', '1071', 1, 1, '1698991512672', '1000', '', ''),
(100, 'Admin75', '$2b$10$Br7mdoygEbyouJLGIhgPB.3ueR4uyfwReixVEI/MIK4lXV.uKkttm', 'gmail75@email.com', 'eminem', '1072', 1, 1, '1698991516093', '1000', '1700461035474', '1000'),
(101, 'Admin76', '$2b$10$sDm/DxmzYf2EISum9eYk2.UKW9/Eta0cpBy727SXa0wwtUh5vnY.y', 'gmail76email.com', 'eminem', '1073', 1, 1, '1698991520180', '1000', '', ''),
(102, 'Admin77', '$2b$10$TfqKxKTfVxuU7KOB0bjgoOxKT50RZ2yZ9nsL8xHOvJcshxZbTTlrW', 'gmail77email.com', 'eminem', '1074', 1, 1, '1698991524214', '1000', '', ''),
(103, 'Admin78', '$2b$10$GmlhXlKhp1l.jyczz2xT..i2lqqODWBdDZCfe8262gYm7J/.fmlgW', 'gmail78email.com', 'eminem', '1075', 1, 1, '1698991529573', '1000', '', ''),
(104, 'Admin79', '$2b$10$KFTQRdJ.WID7qYbsITceHekRAF5D/6njeVyZeoqB5rB.AYlM8tHdi', 'gmail79email.com', 'eminem', '1076', 1, 1, '1698991534090', '1000', '', ''),
(105, 'Admin80', '$2b$10$tOGu0in1QFPVF79q95ZmA.ST2dIB34oQI.JTaiChor4Kj3iEYkM/i', 'gmail80email.com', 'eminem', '1077', 1, 1, '1698991542257', '1000', '', ''),
(106, 'Admin81', '$2b$10$tSipkK.bl4A.PeOGTFV4PuyG/pXSBD7XzkkIw22fZTxmXzUyUrduO', 'gmail81email.com', 'eminem', '1078', 1, 1, '1698991592307', '1000', '', ''),
(107, 'Admin82', '$2b$10$FIy3.Mfwvg0l46fh4hPXleaF5UY9pw6GYfgV1Iv4JjZMYJo0IdUqS', 'gmail82email.com', 'eminem', '1079', 1, 1, '1698991595789', '1000', '', ''),
(108, 'Admin83', '$2b$10$3mxjCVq8ipGerxh2B3W9veo9U5m94oUBxyUW92bLyJOuNmDcfxY1e', 'gmail83email.com', 'eminem', '1080', 1, 1, '1698991599419', '1000', '', ''),
(110, 'Admin85', '$2b$10$0jk14gpcUxcEoszlAuZJueBK4VvtnXi5NuLSLwCoB0O7EJuulm2gq', 'gmail85email.com', 'eminem', '1082', 1, 1, '1698991606869', '1000', '', ''),
(111, 'Admin86', '$2b$10$/yWWfn2xBYHTMNJM4rdId.HJe1gcTKNJtOL495pnzNUIURGBFho1m', 'gmail86email.com', 'eminem', '1083', 1, 1, '1698991610367', '1000', '1700645812538', '1000'),
(112, 'Admin87', '$2b$10$A1VayshKoDlz.XgMtzmvM.E1/ylFCimLVpsgZVKP4t74e9VgaHUeu', 'gmail87email.com', 'eminem', '1084', 1, 1, '1698991613939', '1000', '1700645807366', '1000'),
(113, 'Admin88', '$2b$10$FIiVMbUxlEz0xrNlIOjb8ORlPwxwMBXrOK56TK94IkhEnNX3wGZrS', 'gmail88email.com', 'test user', '1085', 1, 1, '1698991617904', '1000', '1699253099329', '1000'),
(114, 'Admin89 ', '$2b$10$oIWhhatPsO7GhIZPsASZFedu8VicdhQcmrHjQLG2mCZB1wGp/klka', 'gmail89email.com', 'eminem', '1086', 1, 1, '1698991621860', '1000', '1699182643124', '1000'),
(115, 'Admin90', '$2b$10$I71B4oSxba/ZZrGPWSbtheQ7DJqmh9lp7QW9Jbl9VpuMs4Iqe3c9G', 'gmail90email.com', 'eminem', '1087', 1, 1, '1698991633177', '1000', '1699253061868', '1000'),
(116, 'Admin91', '$2b$10$N2bi96T/QTNwnn0ESnG/7.azWakYkl3nRx/x9kyXtZRE9x2LcGZSG', 'gmail91email.com', 'eminem', '1088', 1, 1, '1698991636495', '1000', '1700459551634', '1000'),
(117, 'Admin92', '$2b$10$ihwS4pGxoIuP/OFzE3HZDuOX96fY676zmjFOFo1Ty6BgqM55ABbyO', 'gmail92email.com', 'nigacool', '1089', 1, 1, '1698991641728', '1000', '1700548788052', '1000'),
(119, 'Nishanr', '$2b$10$TlCvVIymgUbU7YTlV2slxeTrMhGJMxJTIMmuQgco.oWPA8IPraseu', 'nn@gm.com', 'nishan', '1090', 0, 1, '1700456692912', '1000', '1700556042050', '1000'),
(121, 'newnig69', '$2b$10$xn/FsRy1nsBgSSznC.0lb.cemHSpXuzTCyLV7JsegeHf.QGQseOeO', 'npoudel018@gmail.com', 'nishant poudel', '1092', 1, 1, '1700747243383', '1000', '1700747260810', '1000');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `categoryId` varchar(50) NOT NULL,
  `prodTypeId` varchar(50) DEFAULT NULL,
  `categoryName` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `createddate` varchar(50) NOT NULL,
  `updatedby` varchar(50) NOT NULL,
  `updateddate` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `categoryId`, `prodTypeId`, `categoryName`, `status`, `createdby`, `createddate`, `updatedby`, `updateddate`) VALUES
(4, '10002', '10001', 'Groceries', '1', '1000', '1701324053962', '', ''),
(5, '10003', '10000', 'Tshirt', '1', '1000', '1701327409569', '', ''),
(6, '10004', '10002', 'Mobile', '1', '1000', '1701327418537', '', ''),
(7, '10005', '10003', 'Rice Cooker', '1', '1000', '1701327426183', '', ''),
(9, '10006', '10003', 'Toaster', '1', '1000', '1701327426183', '', ''),
(10, '10007', '10002', 'Home Appliances', '1', '1000', '1705395899333', '', ''),
(11, '10008', '10002', 'Home Appliances', '1', '1000', '1705395941906', '', ''),
(12, '10009', '10001', 'TEST123', '1', '1000', '1706523581347', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `categoryadditionalfieldmapping`
--

CREATE TABLE `categoryadditionalfieldmapping` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `subCategoryId` int(11) NOT NULL,
  `fieldId` int(11) DEFAULT NULL,
  `value` varchar(255) NOT NULL,
  `units` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `createdby` varchar(100) DEFAULT NULL,
  `createddate` varchar(255) DEFAULT NULL,
  `updatedby` varchar(100) DEFAULT NULL,
  `updateddate` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categoryadditionalfieldmapping`
--

INSERT INTO `categoryadditionalfieldmapping` (`id`, `categoryId`, `subCategoryId`, `fieldId`, `value`, `units`, `sold`, `size`, `createdby`, `createddate`, `updatedby`, `updateddate`) VALUES
(8, 10006, 10007, 10001, '1', 1, 1, '1', '1000', '2024-02-02 15:36:52.745', NULL, NULL),
(9, 10003, 10005, 10000, '1', 1, 1, '1', '1000', '2024-02-02 17:27:06.053', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `childadditionalfield`
--

CREATE TABLE `childadditionalfield` (
  `id` int(11) NOT NULL,
  `parentFieldId` int(11) NOT NULL,
  `childFieldTitle` varchar(100) NOT NULL,
  `createddate` int(11) NOT NULL,
  `createdby` int(11) NOT NULL,
  `updateddate` varchar(100) NOT NULL,
  `updatedby` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `childadditionalfield`
--

INSERT INTO `childadditionalfield` (`id`, `parentFieldId`, `childFieldTitle`, `createddate`, `createdby`, `updateddate`, `updatedby`) VALUES
(8, 10000, 'Ground Floor', 2147483647, 1000, '', 0),
(9, 10000, 'First Floor', 2147483647, 1000, '', 0),
(10, 10000, 'Second Floor', 2147483647, 1000, '', 0),
(11, 10001, 'Ground Floor', 2147483647, 1000, '', 0),
(12, 10001, 'First Floor', 2147483647, 1000, '', 0),
(13, 10001, 'Second Floor', 2147483647, 1000, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `childadditionalfieldimages`
--

CREATE TABLE `childadditionalfieldimages` (
  `imageId` int(11) NOT NULL,
  `childFieldId` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `featureimage`
--

CREATE TABLE `featureimage` (
  `imageId` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `featureId` int(11) DEFAULT NULL,
  `createddate` varchar(255) NOT NULL,
  `createdby` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `featureimage`
--

INSERT INTO `featureimage` (`imageId`, `imageUrl`, `featureId`, `createddate`, `createdby`) VALUES
(7, '/featureImage/10000/featureImage-1706691650844.jpg', 10000, '1706691650848', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `Id` int(11) NOT NULL,
  `featureId` int(11) NOT NULL,
  `featureName` varchar(255) NOT NULL,
  `featureDescription` text DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `createdby` int(11) NOT NULL,
  `createddate` varchar(255) NOT NULL,
  `updateddate` varchar(255) NOT NULL,
  `updatedby` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`Id`, `featureId`, `featureName`, `featureDescription`, `status`, `createdby`, `createddate`, `updateddate`, `updatedby`) VALUES
(6, 10000, 'Test', 'aaa', '1', 1000, '1706607352364', '1706692325260', 1000),
(7, 10001, 'Test', 'aaa', '1', 1000, '1706607353731', '', 0),
(8, 10002, 'Test', 'aaa', '1', 1000, '1706607354526', '1706692150972', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `prods`
--

CREATE TABLE `prods` (
  `id` int(11) NOT NULL,
  `prodId` int(11) NOT NULL,
  `prodName` varchar(255) DEFAULT NULL,
  `prodLocation` varchar(255) DEFAULT NULL,
  `prodLocation1` varchar(100) NOT NULL,
  `prodLocation2` varchar(100) NOT NULL,
  `status` int(10) NOT NULL,
  `prodTitle` varchar(255) DEFAULT NULL,
  `prodSubTitle` varchar(100) NOT NULL,
  `prodShortDescription` varchar(255) NOT NULL,
  `prodDescription` text DEFAULT NULL,
  `prodType` varchar(255) NOT NULL,
  `prodCategory` varchar(255) NOT NULL,
  `prodSubCategory` varchar(255) NOT NULL,
  `cost` float NOT NULL,
  `quantity` int(10) NOT NULL,
  `quantityType` varchar(100) NOT NULL,
  `user` varchar(75) DEFAULT NULL,
  `createddate` varchar(255) NOT NULL,
  `updateddate` varchar(255) NOT NULL,
  `updatedBy` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prods`
--

INSERT INTO `prods` (`id`, `prodId`, `prodName`, `prodLocation`, `prodLocation1`, `prodLocation2`, `status`, `prodTitle`, `prodSubTitle`, `prodShortDescription`, `prodDescription`, `prodType`, `prodCategory`, `prodSubCategory`, `cost`, `quantity`, `quantityType`, `user`, `createddate`, `updateddate`, `updatedBy`) VALUES
(18, 10009, 'Product 1699106454237_99', 'Location 1699106454237_99', 'Location1 1699106454237_99', 'Location2 1699106454237_99', 1, 'Title 1699106454237_99', '', '', 'Description 1699106454237_99', '', '', '', 0, 0, '', '1000', '1699106454257', '1703739138342', '1000'),
(19, 10010, 'Product 1699106454314_99', 'Location 1699106454314_99', 'Location1 1699106454314_99', 'Location2 1699106454314_99', 1, 'Title 1699106454314_99', 'sub title', 'desc', 'Description 1699106454314_99', '10000', '10003', '10005', 5000, 10, 'Number', '1000', '1699106454333', '1703738703122', '1000'),
(20, 10011, 'Product 1699106454393_99', 'Location 1699106454393_99', 'Location1 1699106454393_99', 'Location2 1699106454393_99', 1, 'Title 1699106454393_99', 'sub title', 'Short Description:\n', 'Description 1699106454393_99', '10001', '10002', '10004', 100, 10, 'Packs', '1000', '1699106454414', '1706526278056', '1000'),
(22, 10013, 'Product 1699106454559_99', 'Location 1699106454559_99', 'Location1 1699106454559_99', 'Location2 1699106454559_99', 1, 'Title 1699106454559_99', '', '', 'Description 1699106454559_99', '10002', '10004', '10019', 0, 0, '', '1000', '1699106454594', '1705398157850', '1000'),
(23, 10014, 'Product 1699106454652_99', 'Location 1699106454652_99', 'Location1 1699106454652_99', 'Location2 1699106454652_99', 1, 'Title 1699106454652_99', '', '', 'Description 1699106454652_99', '', '', '', 0, 0, '', '1000', '1699106454669', '1699106454669', ''),
(24, 10015, 'Product 1699106454716_99', 'Location 1699106454716_99', 'Location1 1699106454716_99', 'Location2 1699106454716_99', 1, 'Title 1699106454716_99', '', '', 'Description 1699106454716_99', '', '', '', 0, 0, '', '1000', '1699106454731', '1699106454731', ''),
(25, 10016, 'Product 1699106454787_99', 'Location 1699106454787_99', 'Location1 1699106454787_99', 'Location2 1699106454787_99', 1, 'Title 1699106454787_99', '', '', 'Description 1699106454787_99', '', '', '', 0, 0, '', '1000', '1699106454798', '1699106454798', ''),
(26, 10017, 'Product 1699106454852_99', 'Location 1699106454852_99', 'Location1 1699106454852_99', 'Location2 1699106454852_99', 1, 'Title 1699106454852_99', '', '', 'Description 1699106454852_99', '', '', '', 0, 0, '', '1000', '1699106454885', '1699106454885', ''),
(27, 10018, 'Product 1699106454946_99', 'Location 1699106454946_99', 'Location1 1699106454946_99', 'Location2 1699106454946_99', 1, 'Title 1699106454946_99', '', '', 'Description 1699106454946_99', '', '', '', 0, 0, '', '1000', '1699106454965', '1699106454965', ''),
(28, 10019, 'Product 1699106455009_99', 'Location 1699106455009_99', 'Location1 1699106455009_99', 'Location2 1699106455009_99', 1, 'Title 1699106455009_99', '', '', 'Description 1699106455009_99', '', '', '', 0, 0, '', '1000', '1699106455048', '1699106455048', ''),
(29, 10020, 'Product 1699106455100_99', 'Location 1699106455100_99', 'Location1 1699106455100_99', 'Location2 1699106455100_99', 1, 'Title 1699106455100_99', '', '', 'Description 1699106455100_99', '', '', '', 0, 0, '', '1000', '1699106455127', '1699106455127', ''),
(30, 10021, 'Product 1699106455186_99', 'Location 1699106455186_99', 'Location1 1699106455186_99', 'Location2 1699106455186_99', 1, 'Title 1699106455186_99', '', '', 'Description 1699106455186_99', '', '', '', 0, 0, '', '1000', '1699106455206', '1699106455206', ''),
(31, 10022, 'Product 1699106455257_99', 'Location 1699106455257_99', 'Location1 1699106455257_99', 'Location2 1699106455257_99', 1, 'Title 1699106455257_99', '', '', 'Description 1699106455257_99', '', '', '', 0, 0, '', '1000', '1699106455276', '1699106455276', ''),
(32, 10023, 'Product 1699106455306_99', 'Location 1699106455306_99', 'Location1 1699106455306_99', 'Location2 1699106455306_99', 1, 'Title 1699106455306_99', '', '', 'Description 1699106455306_99', '', '', '', 0, 0, '', '1000', '1699106455323', '1699106455323', ''),
(33, 10024, 'Product 1699106455399_99', 'Location 1699106455399_99', 'Location1 1699106455399_99', 'Location2 1699106455399_99', 1, 'Title 1699106455399_99', '', '', 'Description 1699106455399_99', '10003', '10003', '10005', 0, 0, '', '1000', '1699106457383', '1706526330299', '1000'),
(34, 10025, 'Product 1699106457429_99', 'Location 1699106457429_99', 'Location1 1699106457429_99', 'Location2 1699106457429_99', 1, 'Title 1699106457429_99', '', '', 'Description 1699106457429_99', '', '', '', 0, 0, '', '1000', '1699106457461', '1699106457461', ''),
(35, 10026, 'Product 1699106457515_99', 'Location 1699106457515_99', 'Location1 1699106457515_99', 'Location2 1699106457515_99', 1, 'Title 1699106457515_99', '', '', 'Description 1699106457515_99', '', '', '', 0, 0, '', '1000', '1699106457543', '1699106457543', ''),
(36, 10027, 'Product 1699106457593_99', 'Location 1699106457593_99', 'Location1 1699106457593_99', 'Location2 1699106457593_99', 1, 'Title 1699106457593_99', '', '', 'Description 1699106457593_99', '', '', '', 0, 0, '', '1000', '1699106457616', '1699106457616', ''),
(37, 10028, 'Product 1699106457670_99', 'Location 1699106457670_99', 'Location1 1699106457670_99', 'Location2 1699106457670_99', 1, 'Title 1699106457670_99', '', '', 'Description 1699106457670_99', '', '', '', 0, 0, '', '1000', '1699106457706', '1699106457706', ''),
(38, 10029, 'Product 1699106457762_99', 'Location 1699106457762_99', 'Location1 1699106457762_99', 'Location2 1699106457762_99', 1, 'Title 1699106457762_99', '', '', 'Description 1699106457762_99', '', '', '', 0, 0, '', '1000', '1699106457784', '1699106457784', ''),
(39, 10030, 'Product 1699106457827_99', 'Location 1699106457827_99', 'Location1 1699106457827_99', 'Location2 1699106457827_99', 1, 'Title 1699106457827_99', '', '', 'Description 1699106457827_99', '', '', '', 0, 0, '', '1000', '1699106457865', '1699106457865', ''),
(40, 10031, 'Product 1699106457908_99', 'Location 1699106457908_99', 'Location1 1699106457908_99', 'Location2 1699106457908_99', 1, 'Title 1699106457908_99', '', '', 'Description 1699106457908_99', '', '', '', 0, 0, '', '1000', '1699106457926', '1699106457926', ''),
(41, 10032, 'Product 1699106458006_99', 'Location 1699106458006_99', 'Location1 1699106458006_99', 'Location2 1699106458006_99', 1, 'Title 1699106458006_99', '', '', 'Description 1699106458006_99', '', '', '', 0, 0, '', '1000', '1699106458041', '1699106458041', ''),
(42, 10033, 'Product 1699106458098_99', 'Location 1699106458098_99', 'Location1 1699106458098_99', 'Location2 1699106458098_99', 1, 'Title 1699106458098_99', '', '', 'Description 1699106458098_99', '', '', '', 0, 0, '', '1000', '1699106458122', '1699106458122', ''),
(43, 10034, 'Product 1699106458183_99', 'Location 1699106458183_99', 'Location1 1699106458183_99', 'Location2 1699106458183_99', 1, 'Title 1699106458183_99', '', '', 'Description 1699106458183_99', '', '', '', 0, 0, '', '1000', '1699106458217', '1699106458217', ''),
(44, 10035, 'Product 1699106458261_99', 'Location 1699106458261_99', 'Location1 1699106458261_99', 'Location2 1699106458261_99', 1, 'Title 1699106458261_99', '', '', 'Description 1699106458261_99', '', '', '', 0, 0, '', '1000', '1699106458280', '1699106458280', ''),
(45, 10036, 'Product 1699106458350_99', 'Location 1699106458350_99', 'Location1 1699106458350_99', 'Location2 1699106458350_99', 1, 'Title 1699106458350_99', '', '', 'Description 1699106458350_99', '', '', '', 0, 0, '', '1000', '1699106458365', '1699106458365', ''),
(46, 10037, 'Product 1699106458419_99', 'Location 1699106458419_99', 'Location1 1699106458419_99', 'Location2 1699106458419_99', 1, 'Title 1699106458419_99', '', '', 'Description 1699106458419_99', '', '', '', 0, 0, '', '1000', '1699106458435', '1699106458435', ''),
(47, 10038, 'Product 1699106458514_99', 'Location 1699106458514_99', 'Location1 1699106458514_99', 'Location2 1699106458514_99', 1, 'Title 1699106458514_99', '', '', 'Description 1699106458514_99', '', '', '', 0, 0, '', '1000', '1699106458564', '1699106458564', ''),
(48, 10039, 'Product 1699106458637_99', 'Location 1699106458637_99', 'Location1 1699106458637_99', 'Location2 1699106458637_99', 1, 'Title 1699106458637_99', '', '', 'Description 1699106458637_99', '', '', '', 0, 0, '', '1000', '1699106458704', '1699106458704', ''),
(49, 10040, 'Product 1699106458766_99', 'Location 1699106458766_99', 'Location1 1699106458766_99', 'Location2 1699106458766_99', 1, 'Title 1699106458766_99', '', '', 'Description 1699106458766_99', '', '', '', 0, 0, '', '1000', '1699106458795', '1699106458795', ''),
(50, 10041, 'Product 1699106458851_99', 'Location 1699106458851_99', 'Location1 1699106458851_99', 'Location2 1699106458851_99', 1, 'Title 1699106458851_99', '', '', 'Description 1699106458851_99', '', '', '', 0, 0, '', '1000', '1699106458871', '1699106458871', ''),
(51, 10042, 'Product 1699106458937_99', 'Location 1699106458937_99', 'Location1 1699106458937_99', 'Location2 1699106458937_99', 1, 'Title 1699106458937_99', '', '', 'Description 1699106458937_99', '', '', '', 0, 0, '', '1000', '1699106458963', '1699106458963', ''),
(52, 10043, 'Product 1699106459026_99', 'Location 1699106459026_99', 'Location1 1699106459026_99', 'Location2 1699106459026_99', 1, 'Title 1699106459026_99', '', '', 'Description 1699106459026_99', '', '', '', 0, 0, '', '1000', '1699106459050', '1699106459050', ''),
(53, 10044, 'Product 1699106459100_99', 'Location 1699106459100_99', 'Location1 1699106459100_99', 'Location2 1699106459100_99', 1, 'Title 1699106459100_99', '', '', 'Description 1699106459100_99', '', '', '', 0, 0, '', '1000', '1699106459117', '1699106459117', ''),
(54, 10045, 'Product 1699106459171_99', 'Location 1699106459171_99', 'Location1 1699106459171_99', 'Location2 1699106459171_99', 1, 'Title 1699106459171_99', '', '', 'Description 1699106459171_99', '', '', '', 0, 0, '', '1000', '1699106459204', '1699106459204', ''),
(55, 10046, 'Product 1699106459269_99', 'Location 1699106459269_99', 'Location1 1699106459269_99', 'Location2 1699106459269_99', 1, 'Title 1699106459269_99', '', '', 'Description 1699106459269_99', '', '', '', 0, 0, '', '1000', '1699106459311', '1699106459311', ''),
(56, 10047, 'Product 1699106459350_99', 'Location 1699106459350_99', 'Location1 1699106459350_99', 'Location2 1699106459350_99', 1, 'Title 1699106459350_99', '', '', 'Description 1699106459350_99', '', '', '', 0, 0, '', '1000', '1699106459384', '1699106459384', ''),
(57, 10048, 'Product 1699106459440_99', 'Location 1699106459440_99', 'Location1 1699106459440_99', 'Location2 1699106459440_99', 1, 'Title 1699106459440_99', '', '', 'Description 1699106459440_99', '', '', '', 0, 0, '', '1000', '1699106459463', '1699106459463', ''),
(58, 10049, 'Product 1699106459514_99', 'Location 1699106459514_99', 'Location1 1699106459514_99', 'Location2 1699106459514_99', 1, 'Title 1699106459514_99', '', '', 'Description 1699106459514_99', '', '', '', 0, 0, '', '1000', '1699106459532', '1699106459532', ''),
(59, 10050, 'Product 1699106459578_99', 'Location 1699106459578_99', 'Location1 1699106459578_99', 'Location2 1699106459578_99', 1, 'Title 1699106459578_99', '', '', 'Description 1699106459578_99', '', '', '', 0, 0, '', '1000', '1699106459614', '1699106459614', ''),
(60, 10051, 'Product 1699106459675_99', 'Location 1699106459675_99', 'Location1 1699106459675_99', 'Location2 1699106459675_99', 1, 'Title 1699106459675_99', '', '', 'Description 1699106459675_99', '', '', '', 0, 0, '', '1000', '1699106459711', '1699106459711', ''),
(61, 10052, 'Product 1699106459766_99', 'Location 1699106459766_99', 'Location1 1699106459766_99', 'Location2 1699106459766_99', 1, 'Title 1699106459766_99', '', '', 'Description 1699106459766_99', '', '', '', 0, 0, '', '1000', '1699106459803', '1699106459803', ''),
(62, 10053, 'Product 1699106459844_99', 'Location 1699106459844_99', 'Location1 1699106459844_99', 'Location2 1699106459844_99', 1, 'Title 1699106459844_99', '', '', 'Description 1699106459844_99', '10000', '10003', '10005', 0, 0, '', '1000', '1699106459880', '1706526259358', '1000'),
(63, 10054, 'Product 1699106459958_99', 'Location 1699106459958_99', 'Location1 1699106459958_99', 'Location2 1699106459958_99', 1, 'Title 1699106459958_99', '', '', 'Description 1699106459958_99', '', '', '', 0, 0, '', '1000', '1699106459996', '1699106459996', ''),
(64, 10055, 'Product 1699106460045_99', 'Location 1699106460045_99', 'Location1 1699106460045_99', 'Location2 1699106460045_99', 1, 'Title 1699106460045_99', '', '', 'Description 1699106460045_99', '', '', '', 0, 0, '', '1000', '1699106460070', '1699106460070', ''),
(65, 10056, 'Product 1699106460120_99', 'Location 1699106460120_99', 'Location1 1699106460120_99', 'Location2 1699106460120_99', 1, 'Title 1699106460120_99', '', '', 'Description 1699106460120_99', '', '', '', 0, 0, '', '1000', '1699106460152', '1699106460152', ''),
(66, 10057, 'Product 1699106460202_99', 'Location 1699106460202_99', 'Location1 1699106460202_99', 'Location2 1699106460202_99', 1, 'Title 1699106460202_99', '', '', 'Description 1699106460202_99', '', '', '', 0, 0, '', '1000', '1699106460247', '1699106460247', ''),
(67, 10058, 'Product 1699106460301_99', 'Location 1699106460301_99', 'Location1 1699106460301_99', 'Location2 1699106460301_99', 1, 'Title 1699106460301_99', '', '', 'Description 1699106460301_99', '', '', '', 0, 0, '', '1000', '1699106460320', '1699106460320', ''),
(68, 10059, 'Product 1699106460363_99', 'Location 1699106460363_99', 'Location1 1699106460363_99', 'Location2 1699106460363_99', 1, 'Title 1699106460363_99', '', '', 'Description 1699106460363_99', '', '', '', 0, 0, '', '1000', '1699106460379', '1699106460379', ''),
(69, 10060, 'Product 1699106460426_99', 'Location 1699106460426_99', 'Location1 1699106460426_99', 'Location2 1699106460426_99', 1, 'Title 1699106460426_99', '', '', 'Description 1699106460426_99', '', '', '', 0, 0, '', '1000', '1699106460444', '1699106460444', ''),
(70, 10061, 'Product 1699106460504_99', 'Location 1699106460504_99', 'Location1 1699106460504_99', 'Location2 1699106460504_99', 1, 'Title 1699106460504_99', '', '', 'Description 1699106460504_99', '', '', '', 0, 0, '', '1000', '1699106460538', '1699106460538', ''),
(71, 10062, 'Product 1699106460621_99', 'Location 1699106460621_99', 'Location1 1699106460621_99', 'Location2 1699106460621_99', 1, 'Title 1699106460621_99', '', '', 'Description 1699106460621_99', '', '', '', 0, 0, '', '1000', '1699106460651', '1699106460651', ''),
(72, 10063, 'Product 1699106460692_99', 'Location 1699106460692_99', 'Location1 1699106460692_99', 'Location2 1699106460692_99', 1, 'Title 1699106460692_99', '', '', 'Description 1699106460692_99', '', '', '', 0, 0, '', '1000', '1699106460714', '1699106460714', ''),
(73, 10064, 'Product 1699106460750_99', 'Location 1699106460750_99', 'Location1 1699106460750_99', 'Location2 1699106460750_99', 1, 'Title 1699106460750_99', '', '', 'Description 1699106460750_99', '', '', '', 0, 0, '', '1000', '1699106460766', '1699106460766', ''),
(74, 10065, 'Product 1699106460796_99', 'Location 1699106460796_99', 'Location1 1699106460796_99', 'Location2 1699106460796_99', 1, 'Title 1699106460796_99', '', '', 'Description 1699106460796_99', '', '', '', 0, 0, '', '1000', '1699106460825', '1699106460825', ''),
(75, 10066, 'Product 1699106460877_99', 'Location 1699106460877_99', 'Location1 1699106460877_99', 'Location2 1699106460877_99', 1, 'Title 1699106460877_99', '', '', 'Description 1699106460877_99', '', '', '', 0, 0, '', '1000', '1699106460895', '1699106460895', ''),
(76, 10067, 'Product 1699106460929_99', 'Location 1699106460929_99', 'Location1 1699106460929_99', 'Location2 1699106460929_99', 1, 'Title 1699106460929_99', '', '', 'Description 1699106460929_99', '', '', '', 0, 0, '', '1000', '1699106460944', '1699106460944', ''),
(77, 10068, 'Product 1699106460979_99', 'Location 1699106460979_99', 'Location1 1699106460979_99', 'Location2 1699106460979_99', 1, 'Title 1699106460979_99', '', '', 'Description 1699106460979_99', '', '', '', 0, 0, '', '1000', '1699106460997', '1699106460997', ''),
(78, 10069, 'Product 1699106461037_99', 'Location 1699106461037_99', 'Location1 1699106461037_99', 'Location2 1699106461037_99', 1, 'Title 1699106461037_99', '', '', 'Description 1699106461037_99', '', '', '', 0, 0, '', '1000', '1699106461052', '1699106461052', ''),
(79, 10070, 'Product 1699106461085_99', 'Location 1699106461085_99', 'Location1 1699106461085_99', 'Location2 1699106461085_99', 1, 'Title 1699106461085_99', '', '', 'Description 1699106461085_99', '', '', '', 0, 0, '', '1000', '1699106461101', '1699106461101', ''),
(80, 10071, 'Product 1699106461162_99', 'Location 1699106461162_99', 'Location1 1699106461162_99', 'Location2 1699106461162_99', 1, 'Title 1699106461162_99', '', '', 'Description 1699106461162_99', '', '', '', 0, 0, '', '1000', '1699106461181', '1699106461181', ''),
(81, 10072, 'Product 1699106461260_99', 'Location 1699106461260_99', 'Location1 1699106461260_99', 'Location2 1699106461260_99', 1, 'Title 1699106461260_99', '', '', 'Description 1699106461260_99', '', '', '', 0, 0, '', '1000', '1699106461286', '1699106461286', ''),
(82, 10073, 'Product 1699106461341_99', 'Location 1699106461341_99', 'Location1 1699106461341_99', 'Location2 1699106461341_99', 1, 'Title 1699106461341_99', '', '', 'Description 1699106461341_99', '', '', '', 0, 0, '', '1000', '1699106461365', '1699106461365', ''),
(83, 10074, 'Product 1699106461412_99', 'Location 1699106461412_99', 'Location1 1699106461412_99', 'Location2 1699106461412_99', 1, 'Title 1699106461412_99', '', '', 'Description 1699106461412_99', '10001', '10002', '10004', 0, 0, '', '1000', '1699106463398', '1706604046749', '1000'),
(84, 10075, 'Product 1699106463472_99', 'Location 1699106463472_99', 'Location1 1699106463472_99', 'Location2 1699106463472_99', 1, 'Title 1699106463472_99', '', '', 'Description 1699106463472_99', '', '', '', 0, 0, '', '1000', '1699106463496', '1699106463496', ''),
(85, 10076, 'Product 1699106463547_99', 'Location 1699106463547_99', 'Location1 1699106463547_99', 'Location2 1699106463547_99', 1, 'Title 1699106463547_99', '', '', 'Description 1699106463547_99', '', '', '', 0, 0, '', '1000', '1699106463582', '1699106463582', ''),
(86, 10077, 'Product 1699106463630_99', 'Location 1699106463630_99', 'Location1 1699106463630_99', 'Location2 1699106463630_99', 1, 'Title 1699106463630_99', '', '', 'Description 1699106463630_99', '', '', '', 0, 0, '', '1000', '1699106463647', '1699106463647', ''),
(87, 10078, 'Product 1699106463692_99', 'Location 1699106463692_99', 'Location1 1699106463692_99', 'Location2 1699106463692_99', 1, 'Title 1699106463692_99', '', '', 'Description 1699106463692_99', '', '', '', 0, 0, '', '1000', '1699106463732', '1699106463732', ''),
(88, 10079, 'Product 1699106463797_99', 'Location 1699106463797_99', 'Location1 1699106463797_99', 'Location2 1699106463797_99', 1, 'Title 1699106463797_99', '', '', 'Description 1699106463797_99', '', '', '', 0, 0, '', '1000', '1699106463818', '1699106463818', ''),
(89, 10080, 'Product 1699106463879_99', 'Location 1699106463879_99', 'Location1 1699106463879_99', 'Location2 1699106463879_99', 1, 'Title 1699106463879_99', '', '', 'Description 1699106463879_99', '', '', '', 0, 0, '', '1000', '1699106463898', '1699106463898', ''),
(90, 10081, 'Product 1699106463960_99', 'Location 1699106463960_99', 'Location1 1699106463960_99', 'Location2 1699106463960_99', 1, 'Title 1699106463960_99', '', '', 'Description 1699106463960_99', '', '', '', 0, 0, '', '1000', '1699106463990', '1699106463990', ''),
(91, 10082, 'Product 1699106464059_99', 'Location 1699106464059_99', 'Location1 1699106464059_99', 'Location2 1699106464059_99', 1, 'Title 1699106464059_99', '', '', 'Description 1699106464059_99', '', '', '', 0, 0, '', '1000', '1699106464073', '1699106464073', ''),
(92, 10083, 'Product 1699106464130_99', 'Location 1699106464130_99', 'Location1 1699106464130_99', 'Location2 1699106464130_99', 1, 'Title 1699106464130_99', '', '', 'Description 1699106464130_99', '', '', '', 0, 0, '', '1000', '1699106464174', '1699106464174', ''),
(93, 10084, 'Product 1699106464245_99', 'Location 1699106464245_99', 'Location1 1699106464245_99', 'Location2 1699106464245_99', 1, 'Title 1699106464245_99', '', '', 'Description 1699106464245_99', '', '', '', 0, 0, '', '1000', '1699106464266', '1699106464266', ''),
(94, 10085, 'Product 1699106464306_99', 'Location 1699106464306_99', 'Location1 1699106464306_99', 'Location2 1699106464306_99', 1, 'Title 1699106464306_99', '', '', 'Description 1699106464306_99', '', '', '', 0, 0, '', '1000', '1699106464327', '1699106464327', ''),
(95, 10086, 'Product 1699106464386_99', 'Location 1699106464386_99', 'Location1 1699106464386_99', 'Location2 1699106464386_99', 1, 'Title 1699106464386_99', '', '', 'Description 1699106464386_99', '', '', '', 0, 0, '', '1000', '1699106464416', '1699106464416', ''),
(96, 10087, 'Product 1699106464461_99', 'Location 1699106464461_99', 'Location1 1699106464461_99', 'Location2 1699106464461_99', 1, 'Title 1699106464461_99', '', '', 'Description 1699106464461_99', '', '', '', 0, 0, '', '1000', '1699106464492', '1699106464492', ''),
(97, 10088, 'Product 1699106464551_99', 'Location 1699106464551_99', 'Location1 1699106464551_99', 'Location2 1699106464551_99', 1, 'Title 1699106464551_99', '', '', 'Description 1699106464551_99', '', '', '', 0, 0, '', '1000', '1699106464582', '1699106464582', ''),
(98, 10089, 'Product 1699106464620_99', 'Location 1699106464620_99', 'Location1 1699106464620_99', 'Location2 1699106464620_99', 1, 'Title 1699106464620_99', '', '', 'Description 1699106464620_99', '', '', '', 0, 0, '', '1000', '1699106464652', '1699106464652', ''),
(99, 10090, 'Product 1699106464698_99', 'Location 1699106464698_99', 'Location1 1699106464698_99', 'Location2 1699106464698_99', 1, 'Title 1699106464698_99', '', '', 'Description 1699106464698_99', '', '', '', 0, 0, '', '1000', '1699106464731', '1699106464731', ''),
(100, 10091, 'Product 1699106464794_99', 'Location 1699106464794_99', 'Location1 1699106464794_99', 'Location2 1699106464794_99', 1, 'Title 1699106464794_99', '', '', 'Description 1699106464794_99', '', '', '', 0, 0, '', '1000', '1699106464828', '1699106464828', ''),
(101, 10092, 'Product 1699106464889_99', 'Location 1699106464889_99', 'Location1 1699106464889_99', 'Location2 1699106464889_99', 1, 'Title 1699106464889_99', '', '', 'Description 1699106464889_99', '', '', '', 0, 0, '', '1000', '1699106464913', '1699106464913', ''),
(102, 10093, 'Product 1699106464971_99', 'Location 1699106464971_99', 'Location1 1699106464971_99', 'Location2 1699106464971_99', 1, 'Title 1699106464971_99', '', '', 'Description 1699106464971_99', '', '', '', 0, 0, '', '1000', '1699106464991', '1699106464991', ''),
(103, 10094, 'Product 1699106465051_99', 'Location 1699106465051_99', 'Location1 1699106465051_99', 'Location2 1699106465051_99', 1, 'Title 1699106465051_99', '', '', 'Description 1699106465051_99', '', '', '', 0, 0, '', '1000', '1699106465085', '1699106465085', ''),
(104, 10095, 'Product 1699106465141_99', 'Location 1699106465141_99', 'Location1 1699106465141_99', 'Location2 1699106465141_99', 1, 'Title 1699106465141_99', '', '', 'Description 1699106465141_99', '', '', '', 0, 0, '', '1000', '1699106465159', '1699106465159', ''),
(105, 10096, 'Product 1699106465228_99', 'Location 1699106465228_99', 'Location1 1699106465228_99', 'Location2 1699106465228_99', 1, 'Title 1699106465228_99', '', '', 'Description 1699106465228_99', '', '', '', 0, 0, '', '1000', '1699106465274', '1699106465274', ''),
(106, 10097, 'Product 1699106465343_99', 'Location 1699106465343_99', 'Location1 1699106465343_99', 'Location2 1699106465343_99', 1, 'Title 1699106465343_99', '', '', 'Description 1699106465343_99', '', '', '', 0, 0, '', '1000', '1699106465363', '1699106465363', ''),
(107, 10098, 'Product 1699106465418_99', 'Location 1699106465418_99', 'Location1 1699106465418_99', 'Location2 1699106465418_99', 1, 'Title 1699106465418_99', '', '', 'Description 1699106465418_99', '', '', '', 0, 0, '', '1000', '1699106465454', '1699106465454', ''),
(108, 10099, 'Product 1699106465497_99', 'Location 1699106465497_99', 'Location1 1699106465497_99', 'Location2 1699106465497_99', 1, 'Title 1699106465497_99', '', '', 'Description 1699106465497_99', '', '', '', 0, 0, '', '1000', '1699106465514', '1699106465514', ''),
(109, 10100, 'Product 1699106465569_99', 'Location 1699106465569_99', 'Location1 1699106465569_99', 'Location2 1699106465569_99', 1, 'Title 1699106465569_99', '', '', 'Description 1699106465569_99', '', '', '', 0, 0, '', '1000', '1699106465594', '1699106465594', ''),
(110, 10101, 'Product 1699106465644_99', 'Location 1699106465644_99', 'Location1 1699106465644_99', 'Location2 1699106465644_99', 1, 'Title 1699106465644_99', '', '', 'Description 1699106465644_99', '', '', '', 0, 0, '', '1000', '1699106465662', '1699106465662', ''),
(111, 10102, 'Product 1699106465695_99', 'Location 1699106465695_99', 'Location1 1699106465695_99', 'Location2 1699106465695_99', 1, 'Title 1699106465695_99', '', '', 'Description 1699106465695_99', '', '', '', 0, 0, '', '1000', '1699106465724', '1699106465724', ''),
(115, 10106, 'Product 1699106465997_99', 'Location 1699106465997_99', 'Location1 1699106465997_99', 'Location2 1699106465997_99', 1, 'Title 1699106465997_99', '', '', 'Description 1699106465997_99', '', '', '', 0, 0, '', '1000', '1699106466031', '1699106466031', ''),
(116, 10107, 'Product 1699110783851_99', 'Location 1699110783851_99', 'Location1 1699110783851_99', 'Location2 1699110783851_99', 1, 'Title 1699110783851_99', '', '', 'Description 1699110783851_99', '', '', '', 0, 0, '', '1089', '1699110783907', '1700646276121', '1000'),
(118, 10108, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700668961339', '1700668961339', ''),
(119, 10109, 'aa', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669002016', '1700669002016', ''),
(120, 10110, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669063394', '1700669063394', ''),
(121, 10111, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669264001', '1700669264001', ''),
(122, 10112, 'Product 1700669307935_99', 'Location 1700669307935_99', 'Location1 1700669307935_99', 'Location2 1700669307935_99', 1, 'Title 1700669307935_99', '', '', 'Description 1700669307935_99', '', '', '', 0, 0, '', '1089', '1700669307952', '1700669307952', ''),
(123, 10113, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669356016', '1700669356016', ''),
(124, 10114, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669434422', '1700669434422', ''),
(125, 10115, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669511272', '1700669511272', ''),
(126, 10116, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669609607', '1700669609607', ''),
(127, 10117, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669619004', '1700669619004', ''),
(128, 10118, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669718067', '1700669718067', ''),
(129, 10119, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700669950005', '1700669950005', ''),
(130, 10120, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700670101682', '1700670101682', ''),
(131, 10121, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700670163035', '1700670163035', ''),
(132, 10122, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700670233000', '1700670233000', ''),
(133, 10123, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700670803741', '1700670803741', ''),
(134, 10124, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700671274490', '1700671274490', ''),
(135, 10125, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700672475825', '1700672475825', ''),
(136, 10126, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700672569683', '1700672569683', ''),
(137, 10127, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700673077518', '1700673077518', ''),
(138, 10128, 'New Prod', '1', '1', '1', 1, '1', '', '', '1', '', '', '', 0, 0, '', '1000', '1700714701564', '1700714701564', ''),
(139, 10129, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700718337865', '1700718337865', ''),
(141, 10131, 'admnin9prod', '55', '55', '55', 1, '55', '', '', '555555\n', '', '', '', 0, 0, '', '1009', '1700738578603', '1700738578603', ''),
(153, 10132, '', '', '', '', 1, '', '', '', '', '', '', '', 0, 0, '', '1000', '1700997459631', '1700997459631', ''),
(168, 10133, 'Product 1701065226698_99', 'Location 1701065226698_99', 'Location1 1701065226698_99', 'Location2 1701065226698_99', 1, 'Title 1701065226698_99', '', '', 'Description 1701065226698_99', '', '', '', 0, 0, '', '1089', '1701065226723', '1701065226723', ''),
(175, 10134, 'Test', '', '', '', 1, 'test', '', '', '', '10000', '10003', '10005', 0, 0, '', '1004', '1702286638666', '1703679254966', '1004');

-- --------------------------------------------------------

--
-- Table structure for table `productimages`
--

CREATE TABLE `productimages` (
  `imageId` int(11) NOT NULL,
  `prodId` int(11) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createddate` varchar(255) DEFAULT NULL,
  `createdby` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productimages`
--

INSERT INTO `productimages` (`imageId`, `prodId`, `imageUrl`, `createddate`, `createdby`) VALUES
(134, 10010, '/image/10010/prodImage-1703678320460.jpg', '1703678320468', 1000),
(136, 10010, '/image/10010/prodImage-1703679015733.jpeg', '1703679015736', 1000),
(137, 10009, '/image/10009/prodImage-1703679132189.png', '1703679132351', 1000),
(140, 10134, '/image/10134/prodImage-1703679254855.png', '1703679254966', 1004),
(142, 10010, '/image/10010/prodImage-1703738703073.jpg', '1703738703122', 1000),
(144, 10013, '/image/10013/prodImage-1705397714621.jpg', '1705397714637', 1000),
(146, 10013, '/image/10013/prodImage-1705398157833.jpg', '1705398157850', 1000),
(147, 10053, '/image/10053/prodImage-1706526259335.jpeg', '1706526259358', 1000),
(148, 10011, '/image/10011/prodImage-1706526278049.png', '1706526278056', 1000),
(149, 10074, '/image/10074/prodImage-1706526304014.jpg', '1706526304018', 1000),
(150, 10024, '/image/10024/prodImage-1706526330297.jpg', '1706526330299', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `producttype`
--

CREATE TABLE `producttype` (
  `id` int(11) NOT NULL,
  `prodTypeId` varchar(50) NOT NULL,
  `prodTypeName` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `createddate` varchar(50) NOT NULL,
  `updatedby` varchar(50) NOT NULL,
  `updateddate` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `producttype`
--

INSERT INTO `producttype` (`id`, `prodTypeId`, `prodTypeName`, `status`, `createdby`, `createddate`, `updatedby`, `updateddate`) VALUES
(11, '10000', 'Clothes', '1', '1000', '1701321081492', '', ''),
(12, '10001', 'Food', '1', '1000', '1701321090326', '', ''),
(13, '10002', 'Gadgets', '1', '1000', '1701321100143', '', ''),
(14, '10003', 'Appliances', '1', '1000', '1701321109281', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `subcategory`
--

CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL,
  `categoryId` varchar(50) DEFAULT NULL,
  `prodTypeId` varchar(50) DEFAULT NULL,
  `subCategoryId` varchar(50) NOT NULL,
  `subCategoryName` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  `createdby` varchar(100) NOT NULL,
  `createddate` varchar(50) NOT NULL,
  `updatedby` varchar(50) NOT NULL,
  `updateddate` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategory`
--

INSERT INTO `subcategory` (`id`, `categoryId`, `prodTypeId`, `subCategoryId`, `subCategoryName`, `status`, `createdby`, `createddate`, `updatedby`, `updateddate`) VALUES
(5, '10002', '10001', '10004', 'Grains', '1', '1000', '1701327554471', '', ''),
(6, '10003', '10000', '10005', 'Half', '1', '1000', '1701327563784', '', ''),
(7, '10003', '10000', '10006', 'Full', '1', '1000', '1701327569022', '', ''),
(9, '10006', '10003', '10007', 'Test Cat', '1', '', '', '', ''),
(12, '10002', '10001', '10018', 'aa', '1', '1000', '1705396934377', '', ''),
(13, '10004', '10002', '10019', 'Android', '1', '1000', '1705397178834', '', ''),
(14, '10004', '10002', '10020', 'IOS', '1', '1000', '1705397238363', '', ''),
(15, '10003', '10000', '10021', 'BLUEBERRY', '1', '1000', '1705397328063', '', ''),
(16, '10003', '10000', '10022', 'HTC', '1', '1000', '1705397333667', '', ''),
(17, '10003', '10000', '10023', 'HTC', '1', '1000', '1705397337072', '', ''),
(18, '10002', '10001', '10024', 'TEST123', '1', '1000', '1706523557491', '', ''),
(19, '10009', '10001', '10025', 'teste00', '1', '1000', '1706523590926', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tkn_store`
--

CREATE TABLE `tkn_store` (
  `id` int(11) NOT NULL,
  `tkn` varchar(256) DEFAULT NULL,
  `user` varchar(75) NOT NULL,
  `createddate` varchar(255) NOT NULL,
  `updateddate` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tkn_store`
--

INSERT INTO `tkn_store` (`id`, `tkn`, `user`, `createddate`, `updateddate`) VALUES
(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluNjkiLCJwYXNzd29yZCI6IiQyYiQxMCRDY2sxVzF3bFZRNC43SWlwclI5bGR1LndSZUdDeFRVLzlkMHUuYmswdnJZZXNMRGpBSTByUyIsInVzZXJJZCI6IjEwMDAiLCJpYXQiOjE3MDY4NzI0NTN9.njS9_C7CQfgbjEMPAOP4bW_gowZZvUzPwes4peCurLs', '1000', '1691649458058', '1706872453156'),
(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluNCIsInBhc3N3b3JkIjoiJDJiJDEwJE5NMS9oQlFMd3BjWm5LSjNLSC5YNE9tOUFjQVl4a3FNdkVIT1JqSUlPNU9aei9JbnpMRHVLIiwidXNlcklkIjoiMTAwNCIsImlhdCI6MTcwMzY3OTI0MH0.5zLmg1HTbIXonZd0DCSHgMBwlOju3We69eclAYRjP70', '1004', '1698938930760', '1703679240427'),
(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluOTIiLCJwYXNzd29yZCI6IiQyYiQxMCRpaHdTNHBHeG9JdVAvT0Z6RTNIWkR1T1g5NmZZNjc2em1qRk9GbzFUeTZCZ3FNNTVBQmJ5TyIsInVzZXJJZCI6IjEwODkiLCJpYXQiOjE3MDEwNjUyMjR9.-a6QV8RtsaxqB7XntWi65MMbi1jUBg6u4H1g63XrzG8', '1089', '1699110081818', '1701065224254'),
(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluOSIsInBhc3N3b3JkIjoiJDJiJDEwJG1KdFBaenM3MVNSemRmSk93Um5kdnV6NVZJR3ZZZTQ5VGl5c1RER01VLldnbDJZQUdzMmZtIiwidXNlcklkIjoiMTAwOSIsImlhdCI6MTcwMDczODU2M30.ZK3cxSurDbd-00mX282_We88aTLAyCIFV-O1uul_4n8', '1009', '1700738563816', '1700738563816');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additionalfields`
--
ALTER TABLE `additionalfields`
  ADD PRIMARY KEY (`fieldId`);

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categoryId` (`categoryId`);

--
-- Indexes for table `categoryadditionalfieldmapping`
--
ALTER TABLE `categoryadditionalfieldmapping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `childadditionalfield`
--
ALTER TABLE `childadditionalfield`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `childadditionalfieldimages`
--
ALTER TABLE `childadditionalfieldimages`
  ADD PRIMARY KEY (`imageId`);

--
-- Indexes for table `featureimage`
--
ALTER TABLE `featureimage`
  ADD PRIMARY KEY (`imageId`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `prods`
--
ALTER TABLE `prods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productimages`
--
ALTER TABLE `productimages`
  ADD PRIMARY KEY (`imageId`);

--
-- Indexes for table `producttype`
--
ALTER TABLE `producttype`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `prodTypeId` (`prodTypeId`);

--
-- Indexes for table `subcategory`
--
ALTER TABLE `subcategory`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subCategoryId` (`subCategoryId`);

--
-- Indexes for table `tkn_store`
--
ALTER TABLE `tkn_store`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminuser`
--
ALTER TABLE `adminuser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categoryadditionalfieldmapping`
--
ALTER TABLE `categoryadditionalfieldmapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `childadditionalfield`
--
ALTER TABLE `childadditionalfield`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `childadditionalfieldimages`
--
ALTER TABLE `childadditionalfieldimages`
  MODIFY `imageId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `featureimage`
--
ALTER TABLE `featureimage`
  MODIFY `imageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `prods`
--
ALTER TABLE `prods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT for table `productimages`
--
ALTER TABLE `productimages`
  MODIFY `imageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `producttype`
--
ALTER TABLE `producttype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `subcategory`
--
ALTER TABLE `subcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tkn_store`
--
ALTER TABLE `tkn_store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
