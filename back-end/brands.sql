-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2022 at 11:40 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_be_ivt`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `createdAt`, `updatedAt`, `CategoryId`) VALUES
('2fec7a03-9b06-46cc-b9b6-4e079dc9738f', 'Oppo', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '61fd22b9-2e66-46dd-a3c7-bc01639b371d'),
('4172260f-9cfc-4348-b7f6-6536a8db52c9', 'Oppo', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '110ee8e9-800d-460f-a777-abc6de0e771d'),
('433f405d-a194-4613-b6dd-d786ebbc82f1', 'Apple', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '61fd22b9-2e66-46dd-a3c7-bc01639b371d'),
('51a8adb9-63f3-40f7-b76a-eba57388919c', 'Xiaomi', '2022-12-21 05:49:29', '2022-12-21 05:49:29', 'e74cee0f-1ec3-470c-9df3-731e9111f341'),
('5c018013-9e91-43bf-abae-6f552585c19d', 'Apple', '2022-12-21 05:49:29', '2022-12-21 05:49:29', 'e74cee0f-1ec3-470c-9df3-731e9111f341'),
('6b432ccf-be2a-41a2-bcc5-91b9af117974', 'Samsung', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '61fd22b9-2e66-46dd-a3c7-bc01639b371d'),
('88133041-10da-436b-b87a-4309c98b7b59', 'Apple', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '110ee8e9-800d-460f-a777-abc6de0e771d'),
('988cf09e-db65-44aa-8077-e69e540aa284', 'Samsung', '2022-12-21 05:49:29', '2022-12-21 05:49:29', 'e74cee0f-1ec3-470c-9df3-731e9111f341'),
('a79d901d-7be8-41ac-b730-03bf622a1450', 'Samsung', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '110ee8e9-800d-460f-a777-abc6de0e771d'),
('f026e359-8a7a-4b75-9fb1-c972ca2ae7a3', 'Oppo', '2022-12-21 05:49:29', '2022-12-21 05:49:29', 'e74cee0f-1ec3-470c-9df3-731e9111f341'),
('f21d7c8e-20d6-455c-8f22-69a01579e009', 'Xiaomi', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '110ee8e9-800d-460f-a777-abc6de0e771d'),
('fccf04fb-d176-4cb5-af1f-2b41542ddbf8', 'Xiaomi', '2022-12-21 05:49:29', '2022-12-21 05:49:29', '61fd22b9-2e66-46dd-a3c7-bc01639b371d');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CategoryId` (`CategoryId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
