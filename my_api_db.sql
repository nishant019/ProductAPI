-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2023 at 04:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my api db`
--

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
(1, 'Admin69', '$2b$10$3xTWlpTh3DgwCgnff0pV4elT3fzhCweF/mXlSe26wFSj0nx1NatY.', '696969@email.com', '6969', '1000', 1, 69, '', '', '1698937509600', '1000'),
(31, 'Adminwho3', '$2b$10$8dIPxhzs/ZC4IJ75KMM07uhnjDkZb5R8X90Um..3CGRQX3fmm.KDW', 'gmail3@email.com', 'eminem', '1003', 1, 1, '1698933400134', '1000', '1698937467931', '1000'),
(32, 'Admin4', '$2b$10$NM1/hBQLwpcZnKJ3KH.X4Om9AcAYxkqMvEHORjIIO5OZz/InzLDuK', 'gmail4@email.com', 'eminemmm', '1004', 1, 1, '1698933404969', '1000', '1698938957620', '1004'),
(33, 'Admin5', '$2b$10$1KeOrrwxaVFp7Wv2Ikzz6uZnAZ42WpTLBsOsSe7PUChr9JNJyXs3u', 'gmail5@email.com', 'eminem', '1005', 1, 1, '1698933411342', '1000', '', ''),
(34, 'Admin6', '$2b$10$kP4V1ZAEdZVxHmYhAWKufOb0S78HFR8e6OjhQ.ZLalLm1fJEPwCkW', 'gmail6@email.com', 'eminem', '1006', 1, 1, '1698933415744', '1000', '', ''),
(35, 'Admin7', '$2b$10$Qlkq1EkIzY..dG9jmy1LX.gXgA1XX1EGfu65qZv48Wk4z1FhfW4y2', 'gmail7@email.com', 'eminem', '1007', 1, 1, '1698933420996', '1000', '', ''),
(36, 'Admin8', '$2b$10$5sftL5Pbdx2j2fVrKRWkJeMnF2d3cJHHuquyhr2u7ha2L.4A0IXGW', 'gmail8@email.com', 'eminem', '1008', 1, 1, '1698933427987', '1000', '', ''),
(37, 'Admin9', '$2b$10$mJtPZzs71SRzdfJOwRndvuz5VIGvYe49TiysTDGMU.Wgl2YAGs2fm', 'gmail9@email.com', 'eminem', '1009', 1, 1, '1698933432838', '1000', '', ''),
(38, 'Admin10', '$2b$10$wGvxgn3lZmq1oo9gDwOKM.yZo1saY9vpqhvz5VlYGKGkdplDOZfDK', 'gmail10@email.com', 'eminem', '1010', 1, 1, '1698933437888', '1000', '', ''),
(40, 'Admin12', '$2b$10$r6h6HI1M9Vsl5cnGExCoW.wuaxa2geShwpkrbETlamNJmbEcTolSG', 'gmail12@email.com', 'eminem', '1012', 1, 1, '1698933446251', '1000', '', ''),
(41, 'Admin13', '$2b$10$BzQ.OlPeueZYJxqlBBGTvuO/ndvrTofTnuMZaNQgiCdhKbZATgJNy', 'gmail13@email.com', 'eminem', '1013', 1, 1, '1698933451109', '1000', '', ''),
(42, 'Admin14', '$2b$10$bgt3yyBmDLlwO4ChXAilW.itU0WH4e/rLbb5Dz8WXSnLQIbiDpN3q', 'gmail14@email.com', 'eminem', '1014', 1, 1, '1698933455399', '1000', '', ''),
(43, 'Admin15', '$2b$10$xbxxLC.8GrvVbIOtRrlk7.qPLOs9xq1fXz3qfiYKGpQ7i4RPkpU4m', 'gmail15@email.com', 'eminem', '1015', 1, 1, '1698933462374', '1000', '', ''),
(44, 'Admin16', '$2b$10$T.v1p7Co3K9mHlYyJOd1lOwop6BSLlNJ9vgNarLp7Ia8dGgXmnssa', 'gmail16@email.com', 'eminem', '1016', 1, 1, '1698933467740', '1000', '', ''),
(45, 'Admin17', '$2b$10$CIcH8IWm4G2sofJvxZJ.VOCRRhOyP0F9TLbzP5NNfIzqYGQE4h2Im', 'gmail17@email.com', 'eminem', '1017', 1, 1, '1698933472572', '1000', '', ''),
(46, 'Admin18', '$2b$10$SsZ1eBNY/z.fiyNWOQwAoe9inoTOw7RRulKTSOH85iGCEDPfL7sQe', 'gmail18@email.com', 'eminem', '1018', 1, 1, '1698933477393', '1000', '', ''),
(47, 'Admin19', '$2b$10$3Go7GHWiTZQnUoL.0wCwbObWvMzncRo3tIUrhTW5MGYfMaHTtzjam', 'gmail19@email.com', 'eminem', '1019', 1, 1, '1698933482711', '1000', '', ''),
(48, 'Admin20', '$2b$10$C2EICXuMe.v9UpK4uYbrwu4866owntE1tA3HhozWn/UmWlsRbm2h6', 'gmail20@email.com', 'eminem', '1020', 1, 1, '1698933488446', '1000', '', ''),
(49, 'Admin21', '$2b$10$IYd2c6OwitFY8DYi08w8GeVwyvFbo3u28mzyrpxb8tEscA/YAOltG', 'gmail21@email.com', 'eminem', '1021', 1, 1, '1698933492916', '1000', '', ''),
(50, 'Admin22', '$2b$10$ZxOWN5fO97/xg5Qv6VMI3uA874JS9V4O/V.W2HYqOTHL73ceYro2y', 'gmail22@email.com', 'eminem', '1022', 1, 1, '1698933497209', '1000', '', ''),
(52, 'Admin24', '$2b$10$/3g4Yn3vNzra7lP21hJWnOucZt2F5zTTQB/Ibpf6esTn9NVryUzqm', 'gmail24@email.com', 'eminem', '1024', 1, 1, '1698933507234', '1000', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `prods`
--

CREATE TABLE `prods` (
  `id` int(11) NOT NULL,
  `prodId` int(11) NOT NULL,
  `prodName` varchar(255) DEFAULT NULL,
  `prodLocation` varchar(255) DEFAULT NULL,
  `prodImage` varchar(255) DEFAULT NULL,
  `prodTitle` varchar(255) DEFAULT NULL,
  `prodDescription` text DEFAULT NULL,
  `user` varchar(75) DEFAULT NULL,
  `createddate` varchar(255) NOT NULL,
  `updateddate` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(11, '', '1000', '1691649458058', '1698937679911'),
(19, '', '1004', '1698938930760', '1698938930760');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminuser`
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prods`
--
ALTER TABLE `prods`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `tkn_store`
--
ALTER TABLE `tkn_store`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
