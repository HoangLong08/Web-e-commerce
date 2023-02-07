-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2023 at 03:44 PM
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
('194174e4-6bec-4a22-b517-f4b72a8b5373', '2', '2023-01-01 21:31:26', '2023-01-01 21:31:26', 'cdacd516-bb67-43ed-92cd-b9e1a91db5c5'),
('31449b6f-3109-4c1f-95b2-ec506680a326', 'Apple', '2023-01-01 21:31:15', '2023-01-01 21:31:15', '61fd22b9-2e66-46dd-a3c7-bc01639b371d'),
('a6ebbb9f-86b3-4a96-bd53-88e10d951302', 'a', '2023-01-01 21:31:15', '2023-01-01 21:31:15', '61fd22b9-2e66-46dd-a3c7-bc01639b371d'),
('f499fc23-8961-4af2-a696-5f7776af2627', 'Samsung', '2023-01-01 21:31:02', '2023-01-01 21:31:02', 'e74cee0f-1ec3-470c-9df3-731e9111f341');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
('61fd22b9-2e66-46dd-a3c7-bc01639b371d', 'Laptop', '2023-01-01 15:40:08', '2023-01-01 21:31:15'),
('cdacd516-bb67-43ed-92cd-b9e1a91db5c5', '1', '2023-01-01 21:31:26', '2023-01-01 21:31:26'),
('e74cee0f-1ec3-470c-9df3-731e9111f341', 'Điện thoại', '2023-01-01 15:40:08', '2023-01-01 21:31:02');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `id` int(11) NOT NULL,
  `district` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `evaluates`
--

CREATE TABLE `evaluates` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `evaluates`
--

INSERT INTO `evaluates` (`id`, `content`, `rating`, `createdAt`, `updatedAt`, `ProductId`, `UserId`) VALUES
('000ddeb5-a968-4a3b-a59f-17bc66194877', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '031d4d74-3cc9-4d15-8f31-516b6d546fd0', NULL),
('0098adf2-b379-44c6-b6a4-55caf766dfee', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e959ec02-6542-4b10-899a-a12ebbc90a21', NULL),
('020e64d1-c619-4bf0-8965-83df3be28310', 'Dịch vụ tốt, phục vụ khách hàng tốt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2ab2e10e-2c55-4756-a267-3af47aed6d75', NULL),
('023a7152-099d-4d97-bcb3-1bb91759023c', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e2283081-f143-4a50-a589-f214570eea99', NULL),
('02521144-914c-4ca6-aa22-889143ef015a', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2a1ce682-878f-4b06-93a3-b640f908e682', NULL),
('0304f8b6-32ed-408d-9aef-67a83863a5df', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b861206f-76a1-47f2-ad8b-6afdc7c6e653', NULL),
('0372f0ed-4f50-4369-8292-d92b8232aa3f', 'Mọi người nên mua sản phẩm này', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2ab2e10e-2c55-4756-a267-3af47aed6d75', NULL),
('037e715d-826a-4f48-a020-8a049dd2eaf4', 'Mọi người nên mua sản phẩm này', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a921df76-e26e-44ac-8c90-f0de18613165', NULL),
('0398a39b-e4bc-487c-90bc-37f30aecb87b', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7f689c63-7b91-40cf-a0c3-e0b24b381598', NULL),
('039ed3a2-084f-42e9-9855-16bce93622e8', 'Sản phẩm hợp với túi tiền', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e2283081-f143-4a50-a589-f214570eea99', NULL),
('03d45639-871e-42f3-b70d-5bc90ea153d1', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '78ed2d36-2a32-4907-aafd-67b9b2a9857a', NULL),
('03f3f35f-6eda-4900-956e-54fa14cbc8ff', 'Giao hàng nhanh, đóng gói cẩn thận', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e8a031ad-0af0-4210-bf64-4b264fa42c34', NULL),
('044b177a-63a8-4bf1-8d0b-1bd3789a79b2', 'Giao hàng nhanh, đóng gói cẩn thận', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ce925a0-0039-4211-8e28-a7a9e27ccf99', NULL),
('052cf026-22a7-4297-ae5c-fe21a595153b', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa7084cf-eb9f-4494-9abf-4d0116453586', NULL),
('055f1df4-72d0-4511-b578-6cd77a5cc8a4', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '78ed2d36-2a32-4907-aafd-67b9b2a9857a', NULL),
('059b938c-7cc5-4ec1-9de1-1a42f8a64c0d', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '246a9872-cf9e-4c9a-b511-ce4cba80011c', NULL),
('06243742-a346-4f2d-abb3-ca5a1d83482a', 'Dịch vụ tốt, phục vụ khách hàng tốt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0fbd2ef4-b3dd-44cd-b332-412d7a87d70c', NULL),
('08f1e0b3-62c3-421d-92fd-9efd8a11405c', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9bf4031a-5359-49e2-9f2c-5caf108f1024', NULL),
('092514e0-a868-41bf-9e31-7601c252d887', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6e46de2b-29ec-4cbd-8438-73d2ba576f01', NULL),
('099de39f-b1c3-41b8-a0e5-a08f70d1c6ac', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '48b65d9e-e511-48a4-9e81-8b1fd9a79803', NULL),
('09d0d4ca-b899-416a-bf46-e313501a6147', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5351d77-4928-443d-aa53-10009b0ab75b', NULL),
('0a5cb5ed-4b5d-4ca2-a183-309d290638b0', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd1ad4014-7fba-4d8b-a9e8-0d804f19ab6e', NULL),
('0b3ce3de-d7b9-49cf-b77e-5d131e9d01c9', 'Sản phẩm tốt quá', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e27f6f35-d687-42a4-916b-7a2b72013aa8', NULL),
('0b4b8ec3-6343-4f15-aec5-eb7751bf3e7a', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5eecc82-0a23-48f1-8f82-b205275b3870', NULL),
('0bfb31a2-45bf-4687-8c57-c8cf89dc3271', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '30c39397-5951-4664-9d08-de0f70ce1d3c', NULL),
('0c0d033e-6ed3-4e38-ae6d-7a4cdeac73aa', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e5c5dbc-adf5-40de-99eb-75db05ffa9c4', NULL),
('0d01edcc-2bce-46f6-b983-b5e765f14035', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '37ce2e8a-a6c6-4729-89d0-24217d9ae626', NULL),
('0d0a2b45-4664-4562-880a-9d1d6475d7a3', 'Chất lượng sản phẩm như trong hình', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '775f24b8-9f1d-43c1-ae9b-81b4f416ce98', NULL),
('0d1d488b-a602-4ae8-aebd-17c9b571644a', 'Sản phẩm đẹp, thân thiên dễ dùng', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5351d77-4928-443d-aa53-10009b0ab75b', NULL),
('0d4d0d81-2bd7-4fda-87b6-f1cf40cc4184', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9bf4031a-5359-49e2-9f2c-5caf108f1024', NULL),
('0e01eca9-e1ef-4084-802d-259a220191c7', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '89d1bf7c-d5f0-475e-bfd0-2ec753a2fa31', NULL),
('0e092b57-87d0-49e4-94ac-938d479446ca', 'vote 5 sao cho sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e2283081-f143-4a50-a589-f214570eea99', NULL),
('0e134894-a653-474a-a802-5d17d6efeb75', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', NULL),
('0edf39b9-7e37-4b3a-b536-2e9a42b55253', 'vote 5 sao cho sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '3ee111c6-3e60-47a3-b60f-02d00f089567', NULL),
('0f972e67-c30f-42e5-aefb-d1e8c8faf675', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2d4a2ad7-8895-4913-95ec-64a6bbe36db3', NULL),
('10719a19-d3e2-43b4-8318-bb1b682c8f1b', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e2283081-f143-4a50-a589-f214570eea99', NULL),
('10858eb5-2f8c-4ea0-b2c2-925a69beec45', 'Chất lượng sản phẩm như trong hình', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5d86c01b-690c-4c4b-a406-866d510eb9e2', NULL),
('111e94ed-db82-414e-9ced-60bb8bc5eec1', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6136b258-080f-406d-af0b-236abe380bb6', NULL),
('112b2ac5-b689-44e2-a3d9-e5cc8d601ad7', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '995844ec-4b82-4f2b-97af-be4e6937624a', NULL),
('114d3440-a8ec-49b1-a6d3-bb1ea1c6a254', 'Mọi người nên mua sản phẩm này', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '3ee111c6-3e60-47a3-b60f-02d00f089567', NULL),
('12077b72-04d2-41c9-81d0-92b3bed6c753', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '78ed2d36-2a32-4907-aafd-67b9b2a9857a', NULL),
('120845ea-bf85-4120-8e93-2398fc51f91f', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '37ce2e8a-a6c6-4729-89d0-24217d9ae626', NULL),
('1356fe5f-e697-49d3-84ed-7edd9d9f8c97', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8fa92d36-7371-4964-9ca5-11a9adb5ef2f', NULL),
('14633c9a-de08-41a2-8396-436027c7c341', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5c586de-0941-4b8f-843f-910c2f426279', NULL),
('14e9ba3c-c715-4662-b1cf-2cea9db151ec', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094dca79-29a9-40fd-b72d-2fadf6a976b0', NULL),
('153c2218-d085-4fe0-a0d9-5adb745309c5', 'Dịch vụ tốt, phục vụ khách hàng tốt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e959ec02-6542-4b10-899a-a12ebbc90a21', NULL),
('158d770a-3ef0-4522-a9de-1b586a46d93a', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e5c5dbc-adf5-40de-99eb-75db05ffa9c4', NULL),
('16a16c95-1d8e-42de-b6f1-e593e2bf76e4', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9324d636-a712-40f9-b8b9-719b7dc8e997', NULL),
('17128215-60cc-4143-abfa-8fdb7a4ba79a', 'Dịch vụ tốt, phục vụ khách hàng tốt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c2a41298-fc99-4f7f-830a-294f077a8b0d', NULL),
('1725797a-c45a-48bf-8e04-6a0c0e65c831', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cd6c9ee6-b9f5-4999-80e6-997766d5f0a1', NULL),
('186f4292-f2fb-4afc-9bae-98b6dbf4abe4', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa7084cf-eb9f-4494-9abf-4d0116453586', NULL),
('18da088c-f8fb-4689-8907-3fc94e8b4315', 'vote 5 sao cho sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e80f52d1-e8e3-44b3-bfe0-61ab72c0a4a2', NULL),
('18df49e1-32a1-47d2-be3a-8c926723d276', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e92862a1-22e9-43f1-bb75-654d51e3a109', NULL),
('18e139e5-7aa7-4eee-8532-0cc1625d2ba5', 'Chụp ảnh đẹp, chơi game mượt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '4bc97e80-fefa-4879-8e4d-20fbc954ffba', NULL),
('19050697-c15f-425e-82c0-597f9920bc2f', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2a1ce682-878f-4b06-93a3-b640f908e682', NULL),
('191406a5-1af6-4bed-b980-3829bef3a99c', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5f240d03-e93f-411b-a155-8ea0ad9e5164', NULL),
('19b014f1-d317-4d0c-ad54-a46bfd39a67c', 'Chụp ảnh đẹp, chơi game mượt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2316d6e4-4c31-4974-b05e-f158c0031825', NULL),
('19f933b6-104a-4563-9afb-3587dafc7d8f', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd24c6103-4f9f-4126-b955-3a98a80ec5c6', NULL),
('1b71cf36-1d6e-4bcb-99d8-6f25d80fec81', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9324d636-a712-40f9-b8b9-719b7dc8e997', NULL),
('1c019781-1e1c-47d6-a174-9772d1e41a31', 'Chất lượng sản phẩm như trong hình', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ef5e270-b592-4c01-90a2-8b84d50ef2a2', NULL),
('1d26f605-3faf-455a-a743-ea3223ec208e', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('1d46f750-1857-4484-a968-b8bf45fab338', 'Giao hàng nhanh, đóng gói cẩn thận', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8aa42a32-2d37-423b-b436-897e33446a00', NULL),
('1dbe10a5-4599-4ec7-99eb-925f613f8239', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '58579f39-443b-4ca0-93a2-456b1589c7a8', NULL),
('1e215351-6d3b-4a39-a29f-37aaca859cb2', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2d4a2ad7-8895-4913-95ec-64a6bbe36db3', NULL),
('1e6dd897-dac0-4e4c-8cec-53faa87f547c', 'Dịch vụ tốt, phục vụ khách hàng tốt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ce925a0-0039-4211-8e28-a7a9e27ccf99', NULL),
('1eafe051-8e91-4f9a-a395-c879290d4f09', 'Chụp ảnh đẹp, chơi game mượt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7f689c63-7b91-40cf-a0c3-e0b24b381598', NULL),
('1f0bf0f2-6885-4cba-a19e-158ed91ac65a', 'Sản phẩm tốt quá', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6c5bd1d7-433e-4bfc-8819-4c909d4d2542', NULL),
('1fe9d798-edf4-4361-b4c3-0ee90b7893f2', 'Dịch vụ tốt, phục vụ khách hàng tốt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'aa42b0bb-b439-46d2-b2b5-dfb25b9e18cb', NULL),
('20b17e22-4076-443c-a6a0-fd779ea93818', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e959ec02-6542-4b10-899a-a12ebbc90a21', NULL),
('213833e8-3f88-4cf4-807c-53c6b3ecb0dd', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd24c6103-4f9f-4126-b955-3a98a80ec5c6', NULL),
('22046995-68cf-4cb9-86e0-1e80c40f94e5', 'Sản phẩm như mong đợi, đúng mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2d4a2ad7-8895-4913-95ec-64a6bbe36db3', NULL),
('22408abe-d281-4b0d-9d9f-d57a9802885b', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e2283081-f143-4a50-a589-f214570eea99', NULL),
('22f4df30-de51-4de6-b8c6-9980af22eca4', 'Chụp ảnh đẹp, chơi game mượt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7f689c63-7b91-40cf-a0c3-e0b24b381598', NULL),
('22f9d52b-f2bd-48c4-94f7-3ac819e34a92', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ae4bf40e-8c82-4bb5-b498-4c7c25686ebd', NULL),
('241f0b13-644a-4752-ad41-b84c67aafaab', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5a4913b2-740b-43e5-ba67-8433726e0eac', NULL),
('247e09cd-1dd8-4753-a7f5-cffe6201a323', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '19776230-1214-401c-a884-c99de205f5a2', NULL),
('26c5f263-55c2-4872-a472-937023683667', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ef5e270-b592-4c01-90a2-8b84d50ef2a2', NULL),
('26cd2942-093c-4f0a-a25f-0b0cf2e65c55', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e9d262b0-6ef5-4203-90cf-f655ce1c0549', NULL),
('2769a465-52e1-4ffc-8555-87c8fc60a4a6', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ce812634-2610-4a98-9486-9c4036ae136b', NULL),
('27de09ae-cf12-4902-8d0e-660d7db541ad', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb2b67f2-19e8-4936-870a-b52d169575ac', NULL),
('27e85346-8971-475a-bded-6ebace34a709', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', NULL),
('285bd705-91de-45b1-b216-f299c1327ffd', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a4573446-f711-48fe-b0b5-0224f9e3676e', NULL),
('28af00a5-7fa9-4b7a-8e02-57e0345cc23a', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '031d4d74-3cc9-4d15-8f31-516b6d546fd0', NULL),
('28df672f-4332-4bad-b4c1-eddcb8c419f3', 'Dịch vụ tốt, phục vụ khách hàng tốt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094024bf-3740-4646-a977-538f1a5710ea', NULL),
('29c65cbe-4760-4ef7-92cb-3d784b78bb4e', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e8a031ad-0af0-4210-bf64-4b264fa42c34', NULL),
('2a1d0b7a-6383-4c9d-ac8e-c0a40fce6dc2', 'Chất lượng sản phẩm như trong hình', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e92862a1-22e9-43f1-bb75-654d51e3a109', NULL),
('2a87741b-f199-4d4f-bcda-0782b5fcc405', 'vote 5 sao cho sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5f6a62c-283e-4db5-9732-9d8b198ba7e5', NULL),
('2b1a643c-9dd8-40ee-9793-6eb3095e595a', 'Sản phẩm đẹp, thân thiên dễ dùng', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('2bd06dcf-682a-4e8a-ad89-0526262df9d5', 'Giao hàng nhanh, đóng gói cẩn thận', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'bc6de2f6-b206-4ce7-9768-6f88562b2cdd', NULL),
('2be1e780-59e5-4254-966d-4b44fefb6b60', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df9ac6e4-aa12-44b4-8994-36de80aff78e', NULL),
('2c2be447-a036-47e1-9bc2-08e36233acec', 'Sản phẩm đẹp, thân thiên dễ dùng', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('2c44209b-72d5-4c58-ae3c-9d0a23157b0e', 'Dịch vụ tốt, phục vụ khách hàng tốt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd24c6103-4f9f-4126-b955-3a98a80ec5c6', NULL),
('2c5e1ec3-d2e3-4e92-8810-f471151966ac', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'da20d32f-809b-44b2-9932-0b98468ed353', NULL),
('2d4d58c5-765c-437e-929a-848b29f03f81', 'Chất lượng sản phẩm như trong hình', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5f6a62c-283e-4db5-9732-9d8b198ba7e5', NULL),
('2d8af638-c41c-4ad9-851b-70bee36da242', 'Sản phẩm hợp với túi tiền', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2316d6e4-4c31-4974-b05e-f158c0031825', NULL),
('2dd181e7-38df-45ab-b4ac-8a29df90403b', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '11525e7e-0a48-412b-86ea-e6d960ed91b5', NULL),
('2e453aa9-2eba-4a02-90f6-2827d6aef0ef', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8124aeda-6056-49ea-aff1-475c283b21db', NULL),
('2e47e54a-f444-411f-9211-fc27f4bc9fb6', 'Giao hàng nhanh, đóng gói cẩn thận', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('2f1d0c64-b83e-478a-a9f0-637d35edd04b', 'Dịch vụ tốt, phục vụ khách hàng tốt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '12eb8a77-7162-4fc1-8421-5a07e10e72da', NULL),
('2f5f85e3-4646-4371-9565-52815e3af93c', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2d4a2ad7-8895-4913-95ec-64a6bbe36db3', NULL),
('3022d7ad-e813-47d8-9c22-85891f09cfa5', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094024bf-3740-4646-a977-538f1a5710ea', NULL),
('30c5177f-fb5c-40a2-acf6-3e75b4b5405b', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'f45027b9-481b-4f53-b16c-14ffb31ab342', NULL),
('316e81b5-9078-4095-9318-5b658457cd5c', 'Chụp ảnh đẹp, chơi game mượt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5f4d7f9d-9cfd-4757-99d9-efb818d6f493', NULL),
('3283b536-6443-42d2-b13b-3d030230163b', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094dca79-29a9-40fd-b72d-2fadf6a976b0', NULL),
('32a8630e-714f-4fce-872e-4a2934ade427', 'Sản phẩm hợp với túi tiền', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c87612d5-91af-44ac-8274-6c22aa205bd3', NULL),
('32d8b5b2-028c-4d6e-bcca-61c36c37bcc0', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '53effac5-3ced-46d6-926a-fec30d488bf6', NULL),
('333cd32f-7118-4808-b52c-e20777b63d83', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '057abae5-ffb1-4978-8f8b-de5b2680b296', NULL),
('335096f4-4263-4211-b331-63a251ecb1a4', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '3ee111c6-3e60-47a3-b60f-02d00f089567', NULL),
('33d58efa-50a8-4691-abd6-3cd5923ff420', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9bf4031a-5359-49e2-9f2c-5caf108f1024', NULL),
('3461a801-9ab8-47f8-899d-b3bf82b27ebf', 'Giao hàng nhanh, đóng gói cẩn thận', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '74b0bdbe-7e2b-4a52-b7f5-ebe1f792411d', NULL),
('34747f8a-0d12-447a-8132-776fd56d0fae', 'Giao hàng cẩn thận, sản phẩm ngon', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c1dc3a56-e5e0-40df-a488-6a1d163be754', NULL),
('34d8941a-83af-4f9d-9668-a57d29194632', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '995844ec-4b82-4f2b-97af-be4e6937624a', NULL),
('35ba44a5-66ce-450a-ad3c-e81e51899669', 'Sản phẩm đẹp, thân thiên dễ dùng', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e4cf2ff-f0c6-4d82-8983-ffd924adde17', NULL),
('363e8624-28f6-4b6a-92e6-7756fc2fba03', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ef5e270-b592-4c01-90a2-8b84d50ef2a2', NULL),
('37f50e02-7f87-434b-8030-a293a042ba71', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b299b428-8bc7-46bc-9aee-5001cd519fa6', NULL),
('384a9677-c4b5-4b2d-91d9-d0faf8d9665c', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5f4d7f9d-9cfd-4757-99d9-efb818d6f493', NULL),
('39092ccf-192f-475c-b6c6-74ca2a89e558', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2ab2e10e-2c55-4756-a267-3af47aed6d75', NULL),
('39411ea7-2ca2-4c9d-9269-1b9ff5a90b50', 'Sản phẩm hợp với túi tiền', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6c5bd1d7-433e-4bfc-8819-4c909d4d2542', NULL),
('3a38b8d8-01d1-434f-82ce-5c7f2e3d18b1', 'Mọi người nên mua sản phẩm này', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5a4913b2-740b-43e5-ba67-8433726e0eac', NULL),
('3a835a28-d890-4fbd-9cf2-58815ecc7a66', 'Sản phẩm như mong đợi, đúng mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7ec67e58-5890-4c92-b21b-212beb47dd06', NULL),
('3ad8e22f-ea08-4024-bac7-0173214f2f75', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094024bf-3740-4646-a977-538f1a5710ea', NULL),
('3ae288af-976f-4d51-b33e-7123cd0944d6', 'Sản phẩm tốt quá', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '16064e2e-d3e1-4835-a6d4-3f2efc47823a', NULL),
('3b8d87ff-6ba9-4966-9c9b-2bb6ad11b463', 'Mọi người nên mua sản phẩm này', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '656bc5ca-f3bc-48af-91b2-8fbf7f58c52f', NULL),
('3bb02444-590c-45f5-832a-cf82c57ff94d', 'Sản phẩm hợp với túi tiền', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c87612d5-91af-44ac-8274-6c22aa205bd3', NULL),
('3c05c442-f4a7-4c56-aa25-ddcd2afa3082', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '05ac6ae9-5844-41bb-83df-29db272aff2d', NULL),
('3cde1dac-0942-4d24-86a8-3a68612388fb', 'Mọi người nên mua sản phẩm này', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa7084cf-eb9f-4494-9abf-4d0116453586', NULL),
('3d3b6f7b-d273-4cf0-88e8-06d1ba3ac2ee', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa057266-f7d1-4964-840e-953b6e7f9a55', NULL),
('3e3c9a9a-f9b9-42a1-bf4e-00acc4cc0849', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b1a50389-17da-48e1-93e6-fc74bb6006d3', NULL),
('3eb141b3-b9bf-4309-8dd7-403337db0150', 'Sản phẩm tốt quá', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'bd0d63fd-33bd-4d4c-9837-4c3059a9ea49', NULL),
('3fc32f1d-e171-471f-81b4-2de544db6269', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a921df76-e26e-44ac-8c90-f0de18613165', NULL),
('3fde3a10-7d68-4c22-a92f-7fa7e2a91157', 'Giao hàng cẩn thận, sản phẩm ngon', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ce925a0-0039-4211-8e28-a7a9e27ccf99', NULL),
('40867530-1e9f-4c93-bc31-32d99aa05cc6', 'vote 5 sao cho sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094dca79-29a9-40fd-b72d-2fadf6a976b0', NULL),
('410221ac-f602-4eaa-af91-7adf156937f5', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa057266-f7d1-4964-840e-953b6e7f9a55', NULL),
('413300a3-0a91-4ca6-a250-7abc8ed7e7b2', 'Chụp ảnh đẹp, chơi game mượt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb2b67f2-19e8-4936-870a-b52d169575ac', NULL),
('4143f059-9b54-4f2d-9cc2-bb9b21e1ee66', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7893a992-bb44-4b5a-8090-6bc7ad375617', NULL),
('41892015-1168-48a0-8abe-845ab620cfda', 'Chất lượng sản phẩm như trong hình', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '481858de-a521-47b4-b9be-587e361292a5', NULL),
('41991914-b232-4d24-abbf-51cd0edb98f8', 'Sản phẩm hợp với túi tiền', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '995844ec-4b82-4f2b-97af-be4e6937624a', NULL),
('42c3e066-4870-4be2-8a20-a81de6e6ee8c', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('432c1f86-61b7-400c-be5c-29c948898a46', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '05ac6ae9-5844-41bb-83df-29db272aff2d', NULL),
('43be0f06-e974-45fc-999f-9e52256607a3', 'Giao hàng cẩn thận, sản phẩm ngon', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '74b0bdbe-7e2b-4a52-b7f5-ebe1f792411d', NULL),
('441aa846-41f3-47c8-89fc-96baa1a7de60', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9ce47c1a-123e-4473-bd96-58746fb9dacf', NULL),
('4491566b-b9aa-43af-bc67-8cba3e0e0c70', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9bf4031a-5359-49e2-9f2c-5caf108f1024', NULL),
('44d394e4-5400-43df-8ee2-c19c63e3539b', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('45545d85-ced5-43ca-be82-e9291d4326b0', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7d27c039-098f-401a-94d8-00c500410099', NULL),
('45772df5-6405-4a73-81ae-4962f9dea13c', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '031d4d74-3cc9-4d15-8f31-516b6d546fd0', NULL),
('45b3f796-547f-45ef-8a2d-4927578f7e16', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ef5e270-b592-4c01-90a2-8b84d50ef2a2', NULL),
('465c0422-c39c-49ea-bc5a-d7875f779b08', 'Dịch vụ tốt, phục vụ khách hàng tốt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0ba4e8ca-ddf2-4fb4-a9a3-d350cf17de98', NULL),
('4669bf0d-8039-4f15-b07d-ac116591ef6b', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9bf4031a-5359-49e2-9f2c-5caf108f1024', NULL),
('46728e3f-9cf5-469a-b4b6-e7b8a1eec2a7', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8aa42a32-2d37-423b-b436-897e33446a00', NULL),
('469f9401-16c0-44f1-8266-edf459387665', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2ab2e10e-2c55-4756-a267-3af47aed6d75', NULL),
('473d56a7-f655-4f1a-8aa5-0d66681dd0a9', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7893a992-bb44-4b5a-8090-6bc7ad375617', NULL),
('483c25ce-03c4-4c5c-9dc3-1b1e07cfb06a', 'Sản phẩm hợp với túi tiền', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '740d9952-0379-4666-833b-3ad260ffba1a', NULL),
('4893d6f7-b5e9-490e-a030-03f2d2a6e0e1', 'Chất lượng sản phẩm như trong hình', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7ec67e58-5890-4c92-b21b-212beb47dd06', NULL),
('48d28c4a-9d98-44bd-bb5f-2a49691d647b', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'bc6de2f6-b206-4ce7-9768-6f88562b2cdd', NULL),
('48e93139-1766-44a7-9383-463fc6780df5', 'Chụp ảnh đẹp, chơi game mượt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('4993926a-7019-4fb4-86cd-1145dccfaebf', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('49e3020d-365f-4dc8-b4e7-28b29539c35d', 'Sản phẩm hợp với túi tiền', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'bd0d63fd-33bd-4d4c-9837-4c3059a9ea49', NULL),
('4a391850-adef-4417-935e-76fb6b8f378c', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ce925a0-0039-4211-8e28-a7a9e27ccf99', NULL),
('4a43559f-071d-49c9-b672-fe6af7327c5f', 'Dịch vụ tốt, phục vụ khách hàng tốt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('4a6d3d05-cdb7-42b9-9e5b-3e156c0ef7f5', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '246a9872-cf9e-4c9a-b511-ce4cba80011c', NULL),
('4b48bd14-ab6a-41a8-8391-a632217c7098', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8b70a493-440c-4da3-8649-a6f29e797d84', NULL),
('4cfb9990-4712-4b9e-a289-28b82c651c55', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b1a50389-17da-48e1-93e6-fc74bb6006d3', NULL),
('4d609bb0-6246-4fb5-b5ce-2bebd4bc7da0', 'Mọi người nên mua sản phẩm này', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e959ec02-6542-4b10-899a-a12ebbc90a21', NULL),
('4e6eeb54-47d7-45a9-89ee-aeb912306779', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5d86c01b-690c-4c4b-a406-866d510eb9e2', NULL),
('4eb174f6-22bf-40f8-8a1d-ea1f6078d7b3', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '78ed2d36-2a32-4907-aafd-67b9b2a9857a', NULL),
('4fae51c8-0def-4a4b-ac21-49dd819d7752', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('4ff9436a-1506-4793-a023-2d3d9f0e6e24', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '74b0bdbe-7e2b-4a52-b7f5-ebe1f792411d', NULL),
('5055cbb2-f646-4287-a184-ea3bba070194', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e0f63449-520c-47bf-9d4c-e3d67a13b6ac', NULL),
('507280f9-c1c9-4ce9-9055-424a0b7d841d', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '28c5fdb0-38e8-4630-bb90-672862b39ef8', NULL),
('509a51c5-6654-4953-b293-63884948f330', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5ef1cdb-4886-44d3-ad64-0fea6a960b4c', NULL),
('50fadadf-088b-42c9-8c35-bf8d4f7d85ff', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a4573446-f711-48fe-b0b5-0224f9e3676e', NULL),
('5228a9b3-b990-4374-8ac2-0f00d017d541', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5a4913b2-740b-43e5-ba67-8433726e0eac', NULL),
('52c21da1-5d0a-4c8a-b1ca-a9c1370f52c3', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', NULL),
('52c40f03-f7c0-4717-a779-f3cc6249d552', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'aa42b0bb-b439-46d2-b2b5-dfb25b9e18cb', NULL),
('52eaee8a-33d3-424d-945f-775187e15ae5', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '08a79882-1f4f-4039-8014-20cbcd3c0d45', NULL),
('52f785eb-c142-4a53-9139-ffd9d54c2a1d', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '995844ec-4b82-4f2b-97af-be4e6937624a', NULL),
('53189a86-82b2-43fc-a588-b1acf2e1d7e9', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5f240d03-e93f-411b-a155-8ea0ad9e5164', NULL),
('53600c03-e0f5-4718-88f3-c0e708686074', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '129a8e2e-e189-4fd0-b539-edeb9147a3d0', NULL),
('53abd18d-30c6-4ca2-8856-e150e0576562', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'aeaed587-2486-4c05-9921-eeee660f710b', NULL),
('544f55c4-eae8-41e7-92e7-b80c92197e72', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '656bc5ca-f3bc-48af-91b2-8fbf7f58c52f', NULL),
('545698af-c1dd-47ba-a972-3946a1c9a60e', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '12eb8a77-7162-4fc1-8421-5a07e10e72da', NULL),
('54a3964a-a5bd-460d-9e73-c943c784e48c', 'vote 5 sao cho sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5351d77-4928-443d-aa53-10009b0ab75b', NULL),
('54fca5a3-816a-41e5-9416-e00782472251', 'Giao hàng nhanh, đóng gói cẩn thận', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd1ad4014-7fba-4d8b-a9e8-0d804f19ab6e', NULL),
('55714881-d143-4936-83ca-3b8e10c63ca3', 'Mọi người nên mua sản phẩm này', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7d27c039-098f-401a-94d8-00c500410099', NULL),
('557b89c2-62f8-4b6f-9c29-fb8ac0454383', 'Sản phẩm đẹp, thân thiên dễ dùng', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8b70a493-440c-4da3-8649-a6f29e797d84', NULL),
('557e82fd-1889-425b-bc46-2148bf4fdc04', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('5676312c-a710-4488-952b-db5569ae4c88', 'Chụp ảnh đẹp, chơi game mượt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e4cf2ff-f0c6-4d82-8983-ffd924adde17', NULL),
('57d8f11c-9863-4aca-bb1a-70b980ab60be', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('58397ad6-3f13-40c7-8f5a-a78d11269577', 'Sản phẩm đẹp, thân thiên dễ dùng', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '89d1bf7c-d5f0-475e-bfd0-2ec753a2fa31', NULL),
('58421efb-296d-41b5-9095-74c4125ab0f3', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c1dc3a56-e5e0-40df-a488-6a1d163be754', NULL),
('58619f01-0385-4dda-b7ee-d7f61c3816b2', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094dca79-29a9-40fd-b72d-2fadf6a976b0', NULL),
('593d95f1-2f5f-48a0-b44f-f888640f4c2b', 'Mọi người nên mua sản phẩm này', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'eaf703a2-b477-45af-9b17-64a78e8b5c22', NULL),
('59736f30-36a9-4aa5-aae1-20c4de95e06a', 'Sản phẩm tốt quá', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df69b5de-8d5b-4aa1-b047-73631eeb2ec8', NULL),
('5a08b9b7-ef1b-4e3c-aaa7-0303309e99f0', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5f7d737-e4e4-4f0c-8b1d-42be4079386e', NULL),
('5a5115ff-a3b9-4427-9cad-5ac782f27879', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '69ee019e-f5ea-45e4-86f8-09b523551fd3', NULL),
('5a7cee5d-6f9d-4c85-b7e1-3782dda968d7', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8bcc1f8f-9a90-4695-baa7-fe0c09ee7391', NULL),
('5af1c3de-9132-48a6-8808-b56395966326', 'Chất lượng sản phẩm như trong hình', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '995844ec-4b82-4f2b-97af-be4e6937624a', NULL),
('5b00fb67-8513-4229-8cc6-11f95b74c248', 'Sản phẩm đẹp, thân thiên dễ dùng', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9ce47c1a-123e-4473-bd96-58746fb9dacf', NULL),
('5b03cb2c-5aa4-4fac-bbe2-206208d06a5b', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '740d9952-0379-4666-833b-3ad260ffba1a', NULL),
('5b8b4e34-611d-4d17-816b-864dd7250bbd', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'eaf703a2-b477-45af-9b17-64a78e8b5c22', NULL),
('5bffc1ae-5815-4bfa-8804-40e681e7cf78', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '48b65d9e-e511-48a4-9e81-8b1fd9a79803', NULL),
('5c5321e4-2dd9-4d67-bc45-b7f9d73da709', 'Sản phẩm hợp với túi tiền', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2316d6e4-4c31-4974-b05e-f158c0031825', NULL),
('5d76aaba-196f-4ee9-ac1a-f9f881ca7dc8', 'Giao hàng cẩn thận, sản phẩm ngon', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '16064e2e-d3e1-4835-a6d4-3f2efc47823a', NULL),
('5e65d0f6-9894-49ac-8d00-dc790ecda683', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8b70a493-440c-4da3-8649-a6f29e797d84', NULL),
('5eb1263e-a9be-4b85-9345-ceb6b6fb54b5', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '4bc97e80-fefa-4879-8e4d-20fbc954ffba', NULL),
('5f45614e-25e4-4478-9508-e3413fb0ce5c', 'Chất lượng sản phẩm như trong hình', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '266450a4-0384-48fb-8d90-5814de94cc76', NULL),
('60a35aa0-9b4b-4f37-8bf1-56b219ec7392', 'vote 5 sao cho sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5351d77-4928-443d-aa53-10009b0ab75b', NULL),
('6169eb96-9f45-4f47-b5cb-f1742c80df4d', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cd6c9ee6-b9f5-4999-80e6-997766d5f0a1', NULL),
('61a7dd82-9fba-4ee6-b1e5-d51ac8b8dc2d', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8bcc1f8f-9a90-4695-baa7-fe0c09ee7391', NULL),
('61a86003-d798-4091-99d9-45105c0de7f0', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb611b20-9249-4bf6-8b12-3bbed3e883ce', NULL),
('62b7c160-9ead-45ef-a075-e85419969e49', 'Giao hàng nhanh, đóng gói cẩn thận', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5d86c01b-690c-4c4b-a406-866d510eb9e2', NULL),
('63449b72-c64d-4263-b76e-0562d7a1959a', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '55eea06c-7e89-42f4-a997-15dfe443546e', NULL),
('64893c77-a07c-4135-9a7e-929efa7d1d1f', 'vote 5 sao cho sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '52d054bd-f023-4e16-af91-58ced27c1106', NULL),
('64e81d43-3958-485d-93f7-cdbf166afd58', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '89d1bf7c-d5f0-475e-bfd0-2ec753a2fa31', NULL),
('6755508e-038c-4fab-9ac7-3c9a3551c8dc', 'Sản phẩm đẹp, thân thiên dễ dùng', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '28c5fdb0-38e8-4630-bb90-672862b39ef8', NULL),
('6861617d-a664-4705-a5af-27a40084eb69', 'Sản phẩm hợp với túi tiền', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '057abae5-ffb1-4978-8f8b-de5b2680b296', NULL),
('687914cd-ad2b-41dd-91bf-278d35c2b5eb', 'vote 5 sao cho sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8aa42a32-2d37-423b-b436-897e33446a00', NULL),
('68a26960-e0ca-4472-aa3d-1975241e85ba', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9ce47c1a-123e-4473-bd96-58746fb9dacf', NULL),
('69411908-7b60-4816-87b7-8dd16a3ec8c2', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5ad5fe61-8b7d-45a3-a6ec-9829b8318f7a', NULL),
('694be923-5505-4060-92a0-3fe3af2fd846', 'Chất lượng sản phẩm như trong hình', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5d86c01b-690c-4c4b-a406-866d510eb9e2', NULL),
('698a336e-a47e-4dd3-8726-da2a45c9a214', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '656bc5ca-f3bc-48af-91b2-8fbf7f58c52f', NULL),
('6b0abf37-cc1e-4a62-a9b5-637684c54610', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '057abae5-ffb1-4978-8f8b-de5b2680b296', NULL),
('6b1b0d73-dba2-478d-bea5-e0f9ff6c3424', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e0f63449-520c-47bf-9d4c-e3d67a13b6ac', NULL),
('6c3d1f64-3204-4e87-a6ed-559a3993a240', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2d4a2ad7-8895-4913-95ec-64a6bbe36db3', NULL),
('6c4d0b21-272a-4880-8db1-7f6b594c234b', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '30c39397-5951-4664-9d08-de0f70ce1d3c', NULL),
('6cf7c514-75af-4e50-85c3-42ef80d945b0', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c1dc3a56-e5e0-40df-a488-6a1d163be754', NULL),
('6d1ddd80-b003-418b-bb3b-9edf6da95967', 'Sản phẩm đẹp, thân thiên dễ dùng', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '11525e7e-0a48-412b-86ea-e6d960ed91b5', NULL),
('6d2bb122-b8f2-4fb6-81c1-91b0ffc48e3c', 'Chụp ảnh đẹp, chơi game mượt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5c586de-0941-4b8f-843f-910c2f426279', NULL),
('6e2d3c43-6f61-4c66-bf26-eb8712887b18', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb2b67f2-19e8-4936-870a-b52d169575ac', NULL),
('6ec41b68-b4e1-4e09-bd6b-813f13e20ffa', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0554bec3-5034-4fdd-8c69-24bc85c208cd', NULL),
('6ee79cda-3e50-46d4-a633-08fd34eb21c2', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '48b65d9e-e511-48a4-9e81-8b1fd9a79803', NULL),
('6fff9816-fbea-4fd7-bd8a-918cd9c8c3ac', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7ec67e58-5890-4c92-b21b-212beb47dd06', NULL),
('709c5106-6f94-4d23-a1d1-84cc63085262', 'Chụp ảnh đẹp, chơi game mượt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb611b20-9249-4bf6-8b12-3bbed3e883ce', NULL),
('7254437b-fcba-41bb-9469-4f5543530af2', 'Dịch vụ tốt, phục vụ khách hàng tốt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '266450a4-0384-48fb-8d90-5814de94cc76', NULL),
('7342f134-cd41-4597-b9b5-8509fb887f42', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a4573446-f711-48fe-b0b5-0224f9e3676e', NULL),
('7406e060-e30f-4798-9424-62cab0264bfb', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '56e02e19-54ce-41f5-9ff8-74d5351a19f3', NULL),
('756f39a3-2dee-49ff-a374-4a797651c3d2', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '30c39397-5951-4664-9d08-de0f70ce1d3c', NULL),
('75a0e3e4-5827-4085-8210-abb363f3ec23', 'vote 5 sao cho sản phẩm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa7084cf-eb9f-4494-9abf-4d0116453586', NULL),
('75f294d4-5172-446e-87eb-2057fb1f3235', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5f4d7f9d-9cfd-4757-99d9-efb818d6f493', NULL),
('762a5b08-e5e6-476c-ad12-6ad3e7f6e162', 'Sản phẩm tốt quá', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e0f63449-520c-47bf-9d4c-e3d67a13b6ac', NULL),
('7636d474-ff4b-4cba-a415-b23c060e1921', 'Giao hàng cẩn thận, sản phẩm ngon', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ef5e270-b592-4c01-90a2-8b84d50ef2a2', NULL),
('764b37d6-b223-497a-abdd-02f303c5fa42', 'Sản phẩm như mong đợi, đúng mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'bd0d63fd-33bd-4d4c-9837-4c3059a9ea49', NULL),
('779e6869-4ba6-4983-afa6-4e752808f991', 'Giao hàng nhanh, đóng gói cẩn thận', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1f958414-3a59-4f28-9f42-67f3b07d1141', NULL),
('786b7230-9254-43a2-8662-cdfbf21d684d', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd24c6103-4f9f-4126-b955-3a98a80ec5c6', NULL),
('7887666d-84bb-4428-88ce-41966d9b69bb', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '05ac6ae9-5844-41bb-83df-29db272aff2d', NULL),
('798a35fa-e44e-496e-a836-1d7013234c7b', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '32517978-cdb6-455b-82c0-00125f343efa', NULL),
('7993ce09-c5e3-4069-bac0-f67023d15111', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e9d262b0-6ef5-4203-90cf-f655ce1c0549', NULL),
('7a00faf4-356d-42e1-980d-dc98a9273a24', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '37460f35-3a56-4a29-b4ce-c7f48c491f68', NULL),
('7abfe872-ebf0-4bf4-b987-fe755b9b0dff', 'Dịch vụ tốt, phục vụ khách hàng tốt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '11525e7e-0a48-412b-86ea-e6d960ed91b5', NULL),
('7b10d3dd-f5ae-4da0-91de-6f67022cfe45', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8fa92d36-7371-4964-9ca5-11a9adb5ef2f', NULL),
('7b1db4fd-bf05-4476-95fa-3279b6cb9247', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '654a9e06-c3c8-45eb-8207-975a900e2d55', NULL),
('7bad20a8-2ca6-475a-8aa6-eee6b9bf8350', 'Sản phẩm tốt quá', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ce041ec7-8fa9-4527-896f-a2f7028dc464', NULL),
('7bd80eee-5a32-43ae-8e7c-c8d9fb64ea44', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'eaf703a2-b477-45af-9b17-64a78e8b5c22', NULL),
('7bdadc7d-3b9a-40d6-9175-71d455be6a79', 'Mọi người nên mua sản phẩm này', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0554bec3-5034-4fdd-8c69-24bc85c208cd', NULL),
('7d0afa95-983e-4484-a568-2e1ecb0725cb', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '89d1bf7c-d5f0-475e-bfd0-2ec753a2fa31', NULL),
('7dfa9e57-7808-469b-a5fc-18fc9f240a07', 'Sản phẩm như mong đợi, đúng mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7893a992-bb44-4b5a-8090-6bc7ad375617', NULL),
('7f90211c-389b-4199-b622-769e60b8b5e8', 'Giao hàng cẩn thận, sản phẩm ngon', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '69ee019e-f5ea-45e4-86f8-09b523551fd3', NULL),
('813cf274-cca6-4962-88e2-9a05dbd47e1f', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7ec67e58-5890-4c92-b21b-212beb47dd06', NULL),
('824b137f-0445-4fcd-b8d7-458bc2c33246', 'Sản phẩm như mong đợi, đúng mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7f689c63-7b91-40cf-a0c3-e0b24b381598', NULL),
('82a6fb72-9e85-4f59-9b9c-5d692ca35e90', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '11525e7e-0a48-412b-86ea-e6d960ed91b5', NULL),
('82e8ef79-a7a1-4a5a-90ec-24104500d01e', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cd6c9ee6-b9f5-4999-80e6-997766d5f0a1', NULL),
('8372b58b-144d-4500-b1f2-4cf660d9ee80', 'Sản phẩm như mong đợi, đúng mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '67606394-f879-4010-baf0-260294b93970', NULL),
('8386ae21-5e87-4613-a2c0-e42bedef34c7', 'Sản phẩm đẹp, thân thiên dễ dùng', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9ce47c1a-123e-4473-bd96-58746fb9dacf', NULL),
('83e506cc-5451-46be-bbae-f8b0553ba036', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '995844ec-4b82-4f2b-97af-be4e6937624a', NULL),
('83ecb631-0043-4767-94d8-b09b379df2b3', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '775f24b8-9f1d-43c1-ae9b-81b4f416ce98', NULL),
('8414a013-354c-4031-bf39-f4e7eb391ed8', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b299b428-8bc7-46bc-9aee-5001cd519fa6', NULL),
('84d2a605-3e0d-4823-8f7b-bd29a8542890', 'Mọi người nên mua sản phẩm này', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b1a50389-17da-48e1-93e6-fc74bb6006d3', NULL),
('8557ac3e-40ce-4e88-8735-5634d0a94cbf', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '031d4d74-3cc9-4d15-8f31-516b6d546fd0', NULL),
('8658d928-e82a-4d28-baa6-91405eb23e8f', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2316d6e4-4c31-4974-b05e-f158c0031825', NULL),
('8683d65f-1dda-4ea3-bc4f-47a6abcf4373', 'Giao hàng cẩn thận, sản phẩm ngon', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', NULL),
('86a6dfd4-962d-43af-b19f-3b98793f5173', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c7a92ec0-8ef3-4be0-8a5d-37eb20bf9f97', NULL),
('87502a8c-922d-4b16-b59c-3f21e6d3e7e6', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c87612d5-91af-44ac-8274-6c22aa205bd3', NULL),
('876da04b-8b6d-42f6-9510-e499386e0dba', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '52d054bd-f023-4e16-af91-58ced27c1106', NULL),
('8835a736-fae5-4a12-ba36-3768bfe3eeb3', 'Dịch vụ tốt, phục vụ khách hàng tốt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e80f52d1-e8e3-44b3-bfe0-61ab72c0a4a2', NULL),
('88692e7d-f094-472e-8f8d-6a9c03d20441', 'Sản phẩm như mong đợi, đúng mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '69ee019e-f5ea-45e4-86f8-09b523551fd3', NULL),
('89aad3e7-520b-4998-96da-6d75a92b5350', 'vote 5 sao cho sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5f6a62c-283e-4db5-9732-9d8b198ba7e5', NULL),
('89be32f6-e9dc-4578-a391-74ac2c948049', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '16064e2e-d3e1-4835-a6d4-3f2efc47823a', NULL),
('8ad3f8bc-f8c8-4f4c-be5b-75652e6d8595', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('8b41a1d1-e0a3-4732-b88a-3b723b95f9b5', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a921df76-e26e-44ac-8c90-f0de18613165', NULL),
('8b4c2659-7562-449d-be52-8911ac282f64', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0ba4e8ca-ddf2-4fb4-a9a3-d350cf17de98', NULL),
('8c383a40-93bf-4f5f-b3e6-52259831b634', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '70f0e1ed-11ed-45e2-8460-c49022489482', NULL),
('8ca5fe54-0953-49d2-b78b-0029a6552dc5', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a4573446-f711-48fe-b0b5-0224f9e3676e', NULL),
('8d252e46-f61f-4d9f-9ea6-49c66405f37b', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0e13c656-6b26-48b8-ba0e-8d2919b716f5', NULL),
('8d61b1f7-ae74-4379-a163-da882a8e95b6', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('8ddc7dcb-ca17-4952-82be-b933a20d1724', 'vote 5 sao cho sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a4573446-f711-48fe-b0b5-0224f9e3676e', NULL),
('8dff21f4-bdee-49ab-8aee-ae8796a8ebaf', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '16064e2e-d3e1-4835-a6d4-3f2efc47823a', NULL),
('8f042cd0-4b2d-4cc5-b3fa-2dd794a55347', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ed14304d-1636-4cc5-885e-e20a2c7937cf', NULL);
INSERT INTO `evaluates` (`id`, `content`, `rating`, `createdAt`, `updatedAt`, `ProductId`, `UserId`) VALUES
('8fee4947-ac81-4c97-b09c-d05734531ecc', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '775f24b8-9f1d-43c1-ae9b-81b4f416ce98', NULL),
('9093cf55-32eb-4d60-b382-0e0aec5f71ca', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0fbd2ef4-b3dd-44cd-b332-412d7a87d70c', NULL),
('90d9fff9-260e-4307-a9e0-fa2fd69725ea', 'Sản phẩm như mong đợi, đúng mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('911b1831-9fde-4e8b-bcda-0c89e3da7a61', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e959ec02-6542-4b10-899a-a12ebbc90a21', NULL),
('91528c10-a6fe-480c-82af-ccd679034568', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa7084cf-eb9f-4494-9abf-4d0116453586', NULL),
('921dbe05-d4d3-45ed-93c0-d6f0d5cd0512', 'Sản phẩm hợp với túi tiền', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094024bf-3740-4646-a977-538f1a5710ea', NULL),
('926eb3a5-8a9f-4c42-978e-92e844c97ee9', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '70f0e1ed-11ed-45e2-8460-c49022489482', NULL),
('9280aa28-0d19-4d2e-a94f-05a71777e0b4', 'Sản phẩm tốt quá', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('92e214a1-afb8-4dcd-b42d-ede37fd5a8b0', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '16064e2e-d3e1-4835-a6d4-3f2efc47823a', NULL),
('92feb184-7c53-466a-aa9d-4ea4c33dbc56', 'Giao hàng nhanh, đóng gói cẩn thận', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '246a9872-cf9e-4c9a-b511-ce4cba80011c', NULL),
('9305ec5b-0180-48c8-bdab-40fd4df9c584', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '28c5fdb0-38e8-4630-bb90-672862b39ef8', NULL),
('935f3887-7096-4c8c-9847-4193eef499b4', 'vote 5 sao cho sản phẩm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7893a992-bb44-4b5a-8090-6bc7ad375617', NULL),
('938f11c0-a46d-4f88-bed4-1abe2f9d2220', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e8169e49-5a53-419b-9cbe-148591c69372', NULL),
('963b97ed-cc7b-40cc-8412-ae830be56031', 'Giao hàng nhanh, đóng gói cẩn thận', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5ef1cdb-4886-44d3-ad64-0fea6a960b4c', NULL),
('9659dbe6-b9e4-4c24-a9c5-221aeb9b1eb9', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5f240d03-e93f-411b-a155-8ea0ad9e5164', NULL),
('96bca577-2813-4b17-bf33-b17dcea8a8b6', 'Giao hàng nhanh, đóng gói cẩn thận', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '740d9952-0379-4666-833b-3ad260ffba1a', NULL),
('96c40117-0cdc-4faf-a4de-a748768a16a6', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '246a9872-cf9e-4c9a-b511-ce4cba80011c', NULL),
('96f9f44b-218e-4223-ab11-31b9e4dd55f7', 'Sản phẩm hợp với túi tiền', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5351d77-4928-443d-aa53-10009b0ab75b', NULL),
('96fd3d47-ef66-44eb-909f-58afc84d5ed5', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0ba4e8ca-ddf2-4fb4-a9a3-d350cf17de98', NULL),
('975d9d6a-6471-48a0-a3df-ff202cbb6ff8', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e92862a1-22e9-43f1-bb75-654d51e3a109', NULL),
('9814f757-3af0-4afa-a937-56a1fb5a3071', 'Sản phẩm như mong đợi, đúng mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '031d4d74-3cc9-4d15-8f31-516b6d546fd0', NULL),
('988e8dd2-bc9b-4fa8-aea2-bc07339c136b', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '78ed2d36-2a32-4907-aafd-67b9b2a9857a', NULL),
('98c4cf8d-f297-4ae0-8087-0b5d5261b293', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '481858de-a521-47b4-b9be-587e361292a5', NULL),
('995855b8-d700-4208-bbe0-dfc747c9cb41', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '11525e7e-0a48-412b-86ea-e6d960ed91b5', NULL),
('99cf8c76-6a93-4565-bd36-8d5c4ca93b57', 'Chụp ảnh đẹp, chơi game mượt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e959ec02-6542-4b10-899a-a12ebbc90a21', NULL),
('9a268342-77ee-4d4d-bef1-5936a54740ab', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '48b65d9e-e511-48a4-9e81-8b1fd9a79803', NULL),
('9ad1c5e9-0a9c-4ef7-a945-ad05539a358b', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6136b258-080f-406d-af0b-236abe380bb6', NULL),
('9b0f457f-c6e4-48e2-89b0-857d1757eead', 'Giao hàng cẩn thận, sản phẩm ngon', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9324d636-a712-40f9-b8b9-719b7dc8e997', NULL),
('9b3ea13b-474b-42be-9964-b95673964861', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa057266-f7d1-4964-840e-953b6e7f9a55', NULL),
('9b4ca201-e624-471c-99fc-8063bf8430cb', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '37ce2e8a-a6c6-4729-89d0-24217d9ae626', NULL),
('9bc1c841-f5d9-4e1a-9559-31082cff73cd', 'Chụp ảnh đẹp, chơi game mượt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7f689c63-7b91-40cf-a0c3-e0b24b381598', NULL),
('9cc5fda6-9496-45a6-800d-069caefddaff', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9562a9d4-5d5e-4340-a4e3-29916a83d4c9', NULL),
('9d2a87a4-d5f6-4819-95dd-28dafaabc0f1', 'Sản phẩm như mong đợi, đúng mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5351d77-4928-443d-aa53-10009b0ab75b', NULL),
('9e9c15ac-ddec-41cf-af3a-009c2089d48a', 'Sản phẩm hợp với túi tiền', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '775f24b8-9f1d-43c1-ae9b-81b4f416ce98', NULL),
('9f872ead-6ccd-422d-af5f-4a59dbc4afa5', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', NULL),
('a06dcd7a-b412-4e7f-ae11-89f12d8cb058', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '70f0e1ed-11ed-45e2-8460-c49022489482', NULL),
('a2dcc6ff-25f3-4d07-b0b2-6b568f350129', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a921df76-e26e-44ac-8c90-f0de18613165', NULL),
('a309e703-7bff-401e-b97a-78754ca080e7', 'Sản phẩm hợp với túi tiền', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7f689c63-7b91-40cf-a0c3-e0b24b381598', NULL),
('a3a31c35-7754-4ec1-99cc-a2235f3d67a8', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd1ad4014-7fba-4d8b-a9e8-0d804f19ab6e', NULL),
('a41d36f6-cf56-40be-83b1-e5a89a9723a1', 'Giao hàng cẩn thận, sản phẩm ngon', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '53effac5-3ced-46d6-926a-fec30d488bf6', NULL),
('a4c5a740-dea0-482b-b328-f810bb6835b6', 'Giao hàng nhanh, đóng gói cẩn thận', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '16064e2e-d3e1-4835-a6d4-3f2efc47823a', NULL),
('a50ca9bd-2426-4e68-bd6d-3835c25a01d2', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '55eea06c-7e89-42f4-a997-15dfe443546e', NULL),
('a595db92-7aec-4ebc-b682-f57c1083f17d', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '4bc97e80-fefa-4879-8e4d-20fbc954ffba', NULL),
('a6c7cce0-c1d6-40aa-ba06-dc4e4f5fe4aa', 'Sản phẩm tốt quá', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e9d262b0-6ef5-4203-90cf-f655ce1c0549', NULL),
('a71fc5a7-873e-4153-9df1-f48303bef16e', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e5c5dbc-adf5-40de-99eb-75db05ffa9c4', NULL),
('a8604c9a-af79-4a71-8188-5cc57c62963b', 'Sản phẩm hợp với túi tiền', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c7a92ec0-8ef3-4be0-8a5d-37eb20bf9f97', NULL),
('a8631a84-9524-4fa5-9840-171cf38191ee', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1ab0f8da-1aef-42f9-b4ff-c6397f0ae4fd', NULL),
('a865da98-27e0-41c8-8bf7-dd287acd8219', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5c586de-0941-4b8f-843f-910c2f426279', NULL),
('a9763b6a-673e-4772-92c0-2212a003cdc5', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0554bec3-5034-4fdd-8c69-24bc85c208cd', NULL),
('a9be9408-6cdd-45a1-aec9-b08cc2c2cbd4', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7893a992-bb44-4b5a-8090-6bc7ad375617', NULL),
('a9db3637-920f-4a5a-9d82-2371dc390973', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6136b258-080f-406d-af0b-236abe380bb6', NULL),
('a9ebc63c-7a5f-4111-b951-76f9d39c1bf1', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0ba4e8ca-ddf2-4fb4-a9a3-d350cf17de98', NULL),
('aaa75689-7891-43fc-a3cd-85870541aeb5', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e4cf2ff-f0c6-4d82-8983-ffd924adde17', NULL),
('aad3fa53-8f04-48b9-9ade-3d899c313e9c', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8bcc1f8f-9a90-4695-baa7-fe0c09ee7391', NULL),
('ab5d647e-a35c-4fce-9d43-5f716c02f526', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b861206f-76a1-47f2-ad8b-6afdc7c6e653', NULL),
('ac2f1e9d-72bc-496a-bb9d-2761ee45b089', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ce041ec7-8fa9-4527-896f-a2f7028dc464', NULL),
('aca95488-c644-455c-8d7c-198de6748f40', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '031d4d74-3cc9-4d15-8f31-516b6d546fd0', NULL),
('ad883958-9429-4e7f-b8a1-4e45fb1e763d', 'Chụp ảnh đẹp, chơi game mượt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '56e02e19-54ce-41f5-9ff8-74d5351a19f3', NULL),
('afc0fa8f-2574-45c1-bd57-3c254f6ba947', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cd6c9ee6-b9f5-4999-80e6-997766d5f0a1', NULL),
('afff7cf7-d899-479a-95f8-b1eb6d726bfc', 'Sản phẩm tốt quá', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '05ac6ae9-5844-41bb-83df-29db272aff2d', NULL),
('b0f07d98-05c1-4d15-b07e-043f66fd1ccd', 'Sản phẩm như mong đợi, đúng mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7d27c039-098f-401a-94d8-00c500410099', NULL),
('b158faec-8205-4992-aeb0-ae16cde7d51c', 'Sản phẩm hợp với túi tiền', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ed14304d-1636-4cc5-885e-e20a2c7937cf', NULL),
('b16f1720-a286-4a48-bdc9-0b62cd608c38', 'Dịch vụ tốt, phục vụ khách hàng tốt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '56e02e19-54ce-41f5-9ff8-74d5351a19f3', NULL),
('b20f39f6-a178-4e46-9767-73248b31708b', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e8169e49-5a53-419b-9cbe-148591c69372', NULL),
('b243691a-b356-45fb-b9a6-22d76a8119da', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e9d262b0-6ef5-4203-90cf-f655ce1c0549', NULL),
('b29a0d87-31fb-421a-9a46-3e4b2ee8cce7', 'Giao hàng nhanh, đóng gói cẩn thận', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '52d054bd-f023-4e16-af91-58ced27c1106', NULL),
('b2d46fd0-8588-4f75-b558-ddd7ad152205', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'bc6de2f6-b206-4ce7-9768-6f88562b2cdd', NULL),
('b33d08bc-bfc5-4e96-b558-06f0793ef43e', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ce925a0-0039-4211-8e28-a7a9e27ccf99', NULL),
('b502a249-06c4-4801-85b1-b01fde1a8012', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a4573446-f711-48fe-b0b5-0224f9e3676e', NULL),
('b6dbe861-02cc-4ca6-8865-bf7f0d6c55a9', 'Sản phẩm hợp với túi tiền', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c87612d5-91af-44ac-8274-6c22aa205bd3', NULL),
('b766ef9a-35aa-4d58-b809-32aa1ab014ea', 'vote 5 sao cho sản phẩm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '246a9872-cf9e-4c9a-b511-ce4cba80011c', NULL),
('b7dcacdc-3de9-439a-ad04-20395899aaaa', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df9ac6e4-aa12-44b4-8994-36de80aff78e', NULL),
('b89be873-56e1-40f0-bc6c-6c25c0f35771', 'Giao hàng cẩn thận, sản phẩm ngon', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', NULL),
('b946da56-923c-4bb3-aeb4-c6e7467e0962', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '05ac6ae9-5844-41bb-83df-29db272aff2d', NULL),
('b9616b6b-a9a7-4e88-8c45-7e5367af12e9', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('b9cafacc-855b-442b-b732-9831abc1ec53', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2ab2e10e-2c55-4756-a267-3af47aed6d75', NULL),
('bac21266-8fed-4376-af45-02a4e563558e', 'Giao hàng nhanh, đóng gói cẩn thận', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5ad5fe61-8b7d-45a3-a6ec-9829b8318f7a', NULL),
('bae52e89-6942-4a31-a0fb-2623e1667e16', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '70f0e1ed-11ed-45e2-8460-c49022489482', NULL),
('bb3cb4a4-459c-4608-89f7-42bf4c85c38b', 'Sản phẩm hợp với túi tiền', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '094dca79-29a9-40fd-b72d-2fadf6a976b0', NULL),
('bcb0e9fe-10f1-4cc6-b7db-249a099ba191', 'Dịch vụ tốt, phục vụ khách hàng tốt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0554bec3-5034-4fdd-8c69-24bc85c208cd', NULL),
('bcbbfab7-4f16-4817-8b06-bf3f56736ba6', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5ef1cdb-4886-44d3-ad64-0fea6a960b4c', NULL),
('bdfcde9c-b5d9-472d-a83d-c927d8e39667', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6136b258-080f-406d-af0b-236abe380bb6', NULL),
('be219d98-9efa-498f-abca-0a1b8cf0bcb6', 'Dịch vụ tốt, phục vụ khách hàng tốt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1f958414-3a59-4f28-9f42-67f3b07d1141', NULL),
('beaffe40-2e06-4f74-abd9-8df412194afc', 'Sản phẩm đẹp, thân thiên dễ dùng', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9bf4031a-5359-49e2-9f2c-5caf108f1024', NULL),
('bfd1c561-8c0d-4be6-b83d-6ae69786139d', 'Sản phẩm như mong đợi, đúng mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fba9537d-1b54-44dc-bd4d-dd7f9d40ac4f', NULL),
('bfd74e73-c898-4329-9001-a406577d5ddb', 'Giao hàng nhanh, đóng gói cẩn thận', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '3ee111c6-3e60-47a3-b60f-02d00f089567', NULL),
('c012d067-0d8e-4c28-a421-c5361f5a1581', 'Dịch vụ tốt, phục vụ khách hàng tốt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df69b5de-8d5b-4aa1-b047-73631eeb2ec8', NULL),
('c02bd30d-c383-4839-a839-a8c9eac9f931', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '53b14ada-58a3-41ce-b01e-5b384b8d1043', NULL),
('c079363d-ebe1-4dd4-96fa-4191e831b35e', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'da20d32f-809b-44b2-9932-0b98468ed353', NULL),
('c0f2f66d-95a3-406e-864f-4a57524b5ae6', 'Giao hàng cẩn thận, sản phẩm ngon', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c87612d5-91af-44ac-8274-6c22aa205bd3', NULL),
('c189e5ac-797b-496b-aa95-169354a95851', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5ad5fe61-8b7d-45a3-a6ec-9829b8318f7a', NULL),
('c2df25cc-e632-4d51-944a-1cdd629f67a7', 'Giao hàng nhanh, đóng gói cẩn thận', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '11525e7e-0a48-412b-86ea-e6d960ed91b5', NULL),
('c33b04f0-8f15-4258-9ba8-91fbd1a28ebe', 'Dịch vụ tốt, phục vụ khách hàng tốt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '30c39397-5951-4664-9d08-de0f70ce1d3c', NULL),
('c37b42e8-d628-4b9f-9a66-2ea4ed7b65a2', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('c52878ae-1a2f-44b9-8360-12c9de569b18', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b1a50389-17da-48e1-93e6-fc74bb6006d3', NULL),
('c657b08b-d8bb-4832-abb1-1183fa3a941a', 'Dịch vụ tốt, phục vụ khách hàng tốt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '266450a4-0384-48fb-8d90-5814de94cc76', NULL),
('c677c40c-db5e-4a6b-8d30-bb203bbb01f0', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b88c8866-4c9f-4ff9-b30e-ce73b6e9913e', NULL),
('c6a0815b-0f36-449b-b768-60365fe08298', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df69b5de-8d5b-4aa1-b047-73631eeb2ec8', NULL),
('c6b9f5e4-257a-46e0-a83f-55faa4f4dfa3', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa057266-f7d1-4964-840e-953b6e7f9a55', NULL),
('c74a294e-b1b3-4cb7-b571-19679e10989c', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b861206f-76a1-47f2-ad8b-6afdc7c6e653', NULL),
('c7c4d516-b374-4cf9-bc86-81e9bb5cd8c9', 'Chụp ảnh đẹp, chơi game mượt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('c7d4bd91-c14b-4539-b284-6ac2e6893d27', 'Giao hàng cẩn thận, sản phẩm ngon', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a4573446-f711-48fe-b0b5-0224f9e3676e', NULL),
('c899598a-76a8-4ffc-84d5-b0ee3f57e29e', 'Dịch vụ tốt, phục vụ khách hàng tốt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7f689c63-7b91-40cf-a0c3-e0b24b381598', NULL),
('c89f0816-7096-4396-8aaa-ff2618663ac1', 'Mọi người nên mua sản phẩm này', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '37460f35-3a56-4a29-b4ce-c7f48c491f68', NULL),
('c8d2c62b-52ba-4fc4-a750-5395cfd24cdc', 'Chụp ảnh đẹp, chơi game mượt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a195653e-907f-47e8-b638-6518dfdb403e', NULL),
('c91ef0ed-c172-49a0-b982-3571439311bb', 'Sản phẩm đẹp, thân thiên dễ dùng', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c7a92ec0-8ef3-4be0-8a5d-37eb20bf9f97', NULL),
('c92a457e-0ff0-47d7-9cda-46a3a956f006', 'Sản phẩm đẹp, thân thiên dễ dùng', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa057266-f7d1-4964-840e-953b6e7f9a55', NULL),
('c9c9b7ce-3b69-4ffe-aa1b-33f511b5d0e3', 'Giao hàng nhanh, đóng gói cẩn thận', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5d86c01b-690c-4c4b-a406-866d510eb9e2', NULL),
('ca54fb20-6b05-4606-b5e6-cf1fa88d5c91', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb611b20-9249-4bf6-8b12-3bbed3e883ce', NULL),
('ca5a1cfd-4437-4fe1-832c-acd13c7b959a', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2d4a2ad7-8895-4913-95ec-64a6bbe36db3', NULL),
('cb55b128-b9f6-425b-949d-1cb2ac2c1df8', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ef5e270-b592-4c01-90a2-8b84d50ef2a2', NULL),
('cb7fe704-bdda-454d-8f27-1fbadb293beb', 'Giao hàng nhanh, đóng gói cẩn thận', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '30c39397-5951-4664-9d08-de0f70ce1d3c', NULL),
('cbdbfed3-c9c6-4175-a24b-b3bc03b418ef', 'Sản phẩm như mong đợi, đúng mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2cb94e45-7963-480b-8df6-cb6ece7c393b', NULL),
('cc6cf2c7-0fcd-4a56-9f20-3dd4f9b4b860', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '08a79882-1f4f-4039-8014-20cbcd3c0d45', NULL),
('cda61b07-f8ad-498e-bd4c-59a1595cb332', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8124aeda-6056-49ea-aff1-475c283b21db', NULL),
('cde9d438-629d-4a65-b035-a96b7620a47a', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e27f6f35-d687-42a4-916b-7a2b72013aa8', NULL),
('cf75f0b5-8fc3-4054-9ff2-02367a4f3ceb', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('d1264302-bb61-493c-8d6d-36c92f0f66d7', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e27f6f35-d687-42a4-916b-7a2b72013aa8', NULL),
('d21949fa-fbd8-4d02-80d7-3a01db58cf5f', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a921df76-e26e-44ac-8c90-f0de18613165', NULL),
('d2696caa-fd75-418d-9683-1dd35938379c', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e5c5dbc-adf5-40de-99eb-75db05ffa9c4', NULL),
('d2a9290d-f471-40cc-8b70-fab79fc9cd3d', 'Giao hàng cẩn thận, sản phẩm ngon', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7ec67e58-5890-4c92-b21b-212beb47dd06', NULL),
('d2cfa1ff-b22f-42c9-88d0-179993c2f978', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b1a50389-17da-48e1-93e6-fc74bb6006d3', NULL),
('d38cbebb-52f5-44fb-8b2a-f035303d590a', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '3ee111c6-3e60-47a3-b60f-02d00f089567', NULL),
('d452cfab-2858-4101-93db-bcf63c11ea89', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '53effac5-3ced-46d6-926a-fec30d488bf6', NULL),
('d489b3a5-c2fc-4cc9-ae8b-05509cc404ec', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8fa92d36-7371-4964-9ca5-11a9adb5ef2f', NULL),
('d543f8c1-b0d7-4505-8d06-4894d59ca6d7', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9e4cf2ff-f0c6-4d82-8983-ffd924adde17', NULL),
('d5d41583-ddc9-4bc3-a838-b709df1ee5d5', 'Sản phẩm như mong đợi, đúng mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'fa7084cf-eb9f-4494-9abf-4d0116453586', NULL),
('d628c886-f529-49f0-8ee0-9fbb7ca0492e', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6e46de2b-29ec-4cbd-8438-73d2ba576f01', NULL),
('d66fddd4-bc79-403b-943f-fb206ce4f632', 'Dịch vụ tốt, phục vụ khách hàng tốt', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '69ee019e-f5ea-45e4-86f8-09b523551fd3', NULL),
('d6982693-58b4-4fac-a4ba-604275799cbb', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e959ec02-6542-4b10-899a-a12ebbc90a21', NULL),
('d6c72f4e-6862-407a-b429-3db2a661d98e', 'Sản phẩm như mong đợi, đúng mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '58579f39-443b-4ca0-93a2-456b1589c7a8', NULL),
('d7099268-1142-4632-9944-658fab1ba527', 'Sản phẩm tốt quá', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e80f52d1-e8e3-44b3-bfe0-61ab72c0a4a2', NULL),
('d80020eb-43fd-49d4-9d74-ea5afedafc44', 'Giao hàng cẩn thận, sản phẩm ngon', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2d4a2ad7-8895-4913-95ec-64a6bbe36db3', NULL),
('d8811722-b80a-4ac6-a435-953ae72ad751', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ae4bf40e-8c82-4bb5-b498-4c7c25686ebd', NULL),
('da5c5814-ae2a-4bdf-a343-cf6bb245e021', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df9ac6e4-aa12-44b4-8994-36de80aff78e', NULL),
('da91c984-728e-4b29-8914-90223d5260fb', 'Sản phẩm hợp với túi tiền', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '69ee019e-f5ea-45e4-86f8-09b523551fd3', NULL),
('db2456ba-1e0d-4730-8160-c5b435948aae', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '70f0e1ed-11ed-45e2-8460-c49022489482', NULL),
('dc3b0e73-9aa8-4ade-bd53-11128fcc46fd', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5f4d7f9d-9cfd-4757-99d9-efb818d6f493', NULL),
('dc405ec5-d86d-4ff4-86c1-17a3aae60f32', 'Dịch vụ tốt, phục vụ khách hàng tốt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7039f663-d2d0-4ea0-a81c-a654be24144e', NULL),
('dcc54c93-252b-4597-9187-ca18f79efce6', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2316d6e4-4c31-4974-b05e-f158c0031825', NULL),
('ddb8eb9b-25a4-44f7-832c-29e2ff1e511e', 'Dịch vụ tốt, phục vụ khách hàng tốt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9bf4031a-5359-49e2-9f2c-5caf108f1024', NULL),
('dde4bef0-b5a5-40c3-9efd-e772bb75b84f', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1ab0f8da-1aef-42f9-b4ff-c6397f0ae4fd', NULL),
('dee2bee5-0d96-49eb-9a67-d7eb57edcd5b', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ce925a0-0039-4211-8e28-a7a9e27ccf99', NULL),
('df63621d-871d-48ae-80f1-7ee6cb89de41', 'Dịch vụ tốt, phục vụ khách hàng tốt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '05ac6ae9-5844-41bb-83df-29db272aff2d', NULL),
('e018fa4a-2c5d-42cc-81b7-6cf71f19f197', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e9d262b0-6ef5-4203-90cf-f655ce1c0549', NULL),
('e0ce0e1d-054e-4dc9-9a7b-c48aa72c0e77', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb611b20-9249-4bf6-8b12-3bbed3e883ce', NULL),
('e0fb4c7f-3910-4b2f-b96b-b0aa35d03b56', 'Dịch vụ tốt, phục vụ khách hàng tốt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '12eb8a77-7162-4fc1-8421-5a07e10e72da', NULL),
('e2040aa9-88fb-420f-9d5c-752c40690d2b', 'Sản phẩm hợp với túi tiền', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '48b65d9e-e511-48a4-9e81-8b1fd9a79803', NULL),
('e2829248-8baf-4465-8458-0e3c3501cc84', 'Sản phẩm đẹp, thân thiên dễ dùng', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'aeaed587-2486-4c05-9921-eeee660f710b', NULL),
('e284eb8c-9b19-413b-9926-7962d0296bc8', 'Sản phẩm tốt quá', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('e3730147-e7f6-4791-a73d-6a11680ecf7e', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('e42e4e0c-9c41-4193-833c-efaaa0e6b996', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6ce925a0-0039-4211-8e28-a7a9e27ccf99', NULL),
('e5548a5d-8ca0-4947-93ef-92ec00d791fd', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0e13c656-6b26-48b8-ba0e-8d2919b716f5', NULL),
('e5ac3c19-af67-41d3-8fbc-d014fbabf647', 'Sản phẩm như mong đợi, đúng mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'f45027b9-481b-4f53-b16c-14ffb31ab342', NULL),
('e64f5aaf-8409-490f-9c18-66542a34e56a', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'eaf703a2-b477-45af-9b17-64a78e8b5c22', NULL),
('e65e45af-b3e1-4d12-9aec-da94be71649f', 'Sản phẩm hợp với túi tiền', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '08a79882-1f4f-4039-8014-20cbcd3c0d45', NULL),
('e6a55a55-ff9f-4f89-9f54-a4c86f9b868e', 'Sản phẩm tốt quá', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2a1ce682-878f-4b06-93a3-b640f908e682', NULL),
('e7050c37-deb0-4783-ab64-eedf4e287466', 'Chụp ảnh đẹp, chơi game mượt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '775f24b8-9f1d-43c1-ae9b-81b4f416ce98', NULL),
('e782c78d-28e8-48db-90ac-a2971ec0713b', 'Mọi người nên mua sản phẩm này', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '55eea06c-7e89-42f4-a997-15dfe443546e', NULL),
('e82a1895-3f35-430c-a65f-5ea1a712d4e9', 'Giao hàng cẩn thận, sản phẩm ngon', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '481858de-a521-47b4-b9be-587e361292a5', NULL),
('e8402548-af29-460f-97ee-6298161ec8fd', 'Dịch vụ tốt, phục vụ khách hàng tốt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'bd0d63fd-33bd-4d4c-9837-4c3059a9ea49', NULL),
('e892bdcb-dbec-4dff-a531-e9b7f1a4c713', 'Tính năng sản phẩm quá thích hợp với tôi', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '37ce2e8a-a6c6-4729-89d0-24217d9ae626', NULL),
('e8fdb5cf-0174-4b12-8a0e-1a99654d4111', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '74b0bdbe-7e2b-4a52-b7f5-ebe1f792411d', NULL),
('e9a14eb0-814a-41fb-8dcf-ae47fb09e935', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2a1ce682-878f-4b06-93a3-b640f908e682', NULL),
('e9e59f49-9cf8-4dfb-a379-3c6c2e749167', 'Giao hàng cẩn thận, sản phẩm ngon', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ce041ec7-8fa9-4527-896f-a2f7028dc464', NULL),
('e9e83271-d4ec-470b-a077-4415a185487c', 'Giao hàng cẩn thận, sản phẩm ngon', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9562a9d4-5d5e-4340-a4e3-29916a83d4c9', NULL),
('eae89bbe-7985-45d8-97da-82560551dc14', 'Mọi người nên mua sản phẩm này', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '9562a9d4-5d5e-4340-a4e3-29916a83d4c9', NULL),
('eb5f3842-783c-4459-9b86-559e7a1cc91c', 'Tính năng sản phẩm quá thích hợp với tôi', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ce812634-2610-4a98-9486-9c4036ae136b', NULL),
('eb687f9c-3b2a-4977-ab37-7fd227fff0aa', 'Giao hàng cẩn thận, sản phẩm ngon', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb611b20-9249-4bf6-8b12-3bbed3e883ce', NULL),
('ec8623fa-0854-48d0-aa1c-3abb79b4c70c', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2316d6e4-4c31-4974-b05e-f158c0031825', NULL),
('ed28e770-477b-4938-89b7-317e2d1ea529', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5c586de-0941-4b8f-843f-910c2f426279', NULL),
('edf671cc-3fe7-4eca-ba2f-cd4679c411f2', 'Tính năng sản phẩm quá thích hợp với tôi', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '4bc97e80-fefa-4879-8e4d-20fbc954ffba', NULL),
('edf8632f-46e0-4bf7-8fb2-dfc625dcd1d3', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '0e13c656-6b26-48b8-ba0e-8d2919b716f5', NULL),
('ee6762e4-552d-407b-9029-b85273653aa2', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'aabe1113-227c-4e23-af9e-b12365d2508e', NULL),
('ee8dbb0b-630f-4e26-b14d-9516d6c9f7b4', 'Dịch vụ tốt, phục vụ khách hàng tốt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1ab0f8da-1aef-42f9-b4ff-c6397f0ae4fd', NULL),
('eeb3a489-0c36-45a8-9293-7f770fe4cd7f', 'Dịch vụ tốt, phục vụ khách hàng tốt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6e5978dd-f480-4654-81a3-87c743019939', NULL),
('eec81048-bfc4-42db-888f-593e0d26d152', 'Sản phẩm như mong đợi, đúng mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b861206f-76a1-47f2-ad8b-6afdc7c6e653', NULL),
('efba29af-f52f-4ecb-aeab-ab62038b22d1', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '19776230-1214-401c-a884-c99de205f5a2', NULL),
('eff98ace-8a22-4734-9eaf-7ba1419c2a8a', 'Chụp ảnh đẹp, chơi game mượt', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e5eecc82-0a23-48f1-8f82-b205275b3870', NULL),
('f082e92b-9ad3-4a51-90cb-9c77e71ed7c5', 'Giao hàng cẩn thận, sản phẩm ngon', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd9620481-1119-4ed1-976e-3a4dc1dafa61', NULL),
('f23a4eee-7caa-4e49-8ceb-5c3a15376ff5', 'Sản phẩm như mong đợi, đúng mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8fa92d36-7371-4964-9ca5-11a9adb5ef2f', NULL),
('f3ccca32-825b-4f4c-adf5-52608c326ad0', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df69b5de-8d5b-4aa1-b047-73631eeb2ec8', NULL),
('f3e18734-a23a-41df-b5e8-65a43cedad50', 'Sản phẩm hợp với túi tiền', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '89d1bf7c-d5f0-475e-bfd0-2ec753a2fa31', NULL),
('f402354d-8653-4557-81c4-ec277022b245', 'Hình ảnh rõ nét, sản phẩm hoàn thiện', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7039f663-d2d0-4ea0-a81c-a654be24144e', NULL),
('f47ec04b-c578-4e31-9200-8a2d353ee018', 'vote 5 sao cho sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a195653e-907f-47e8-b638-6518dfdb403e', NULL),
('f5ec61d7-94d9-4fcd-9050-370625694e13', 'Dịch vụ tốt, phục vụ khách hàng tốt', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'e2283081-f143-4a50-a589-f214570eea99', NULL),
('f62007f4-0da4-491e-83ae-942ec31ea82d', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '89d1bf7c-d5f0-475e-bfd0-2ec753a2fa31', NULL),
('f6356e2f-1150-4957-acd6-77cec7fb872d', 'vote 5 sao cho sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'cb2b67f2-19e8-4936-870a-b52d169575ac', NULL),
('f653133d-a28d-4fde-b85d-3f0085939ee4', 'Sản phẩm như mong đợi, đúng mô tả', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'ce812634-2610-4a98-9486-9c4036ae136b', NULL),
('f6d0b8c0-4929-4987-9103-edcbf6cefee8', 'Sản phẩm đẹp, thân thiên dễ dùng', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c2a41298-fc99-4f7f-830a-294f077a8b0d', NULL),
('f6d2a0bd-f142-4bff-bc42-f3159f87d1c2', 'Sản phẩm đẹp, thân thiên dễ dùng', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5c586de-0941-4b8f-843f-910c2f426279', NULL),
('f71799af-2cb5-4b70-88be-e7809313c30f', 'Chất lượng sản phẩm như trong hình', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '8b70a493-440c-4da3-8649-a6f29e797d84', NULL),
('f74cd7f3-4dbb-4b47-b372-62d3e02376d5', 'Sản phẩm tốt quá', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', NULL),
('f85cbf60-bf22-4fd4-ad6a-9b868cbd8e92', 'Sản phẩm hợp với túi tiền', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a921df76-e26e-44ac-8c90-f0de18613165', NULL),
('f894140c-1a38-497d-a663-1bab234e391c', 'Sản phẩm như mong đợi, đúng mô tả', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '654a9e06-c3c8-45eb-8207-975a900e2d55', NULL),
('f90deed5-f5a0-4715-ac6c-ccb375d03674', 'Tính năng sản phẩm quá thích hợp với tôi', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'd1ad4014-7fba-4d8b-a9e8-0d804f19ab6e', NULL),
('fa9755ce-a191-46e2-a44a-33ec4d09fde8', 'Chụp ảnh đẹp, chơi game mượt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df9ac6e4-aa12-44b4-8994-36de80aff78e', NULL),
('faa1e111-f4e2-4d9a-b89f-23f8fffb0719', 'Giao hàng nhanh, đóng gói cẩn thận', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '2316d6e4-4c31-4974-b05e-f158c0031825', NULL),
('fb096c18-5636-4a18-bb4b-b1c5fae4ac23', 'Sản phẩm như mong đợi, đúng mô tả', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'c7a92ec0-8ef3-4be0-8a5d-37eb20bf9f97', NULL),
('fb7e8784-dc31-4df3-adac-f402cabb3646', 'Sản phẩm hợp với túi tiền', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('fbbedfae-7136-4ab5-982d-a093df48cdbc', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 4, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6136b258-080f-406d-af0b-236abe380bb6', NULL),
('fc781ba8-54da-43f9-b905-20d0f772fe11', 'Sản phẩm như mong đợi, đúng mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'df69b5de-8d5b-4aa1-b047-73631eeb2ec8', NULL),
('fc82d71e-b698-4612-86a9-d09c8f6d7772', 'Mọi người nên mua sản phẩm này', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '057abae5-ffb1-4978-8f8b-de5b2680b296', NULL),
('fc9880e5-607a-4f96-ab12-29a788e6debd', 'Chụp ảnh đẹp, chơi game mượt', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '1560f470-b891-4e71-89de-498c1fbd4927', NULL),
('fd47afba-f5ea-444b-b193-fdf3440fe6e3', 'Giao hang nhanh, gói hàng cẩn thẩn, đúng với mô tả', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '7893a992-bb44-4b5a-8090-6bc7ad375617', NULL),
('fd61e588-2e7d-4b57-9a19-29ddbcacbde7', 'Chất lượng sản phẩm như trong hình', 3, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '69ee019e-f5ea-45e4-86f8-09b523551fd3', NULL),
('fd946252-18c6-42e8-8388-de88970f7c9c', 'Tính năng sản phẩm quá thích hợp với tôi', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a889b902-f953-4ffb-bd47-f3bcf447fcbc', NULL),
('fe1daaca-dcba-44ff-bd1a-be85ee1a67e1', 'Khá chất lượng với tầm giá, sản phẩm đẹp lắm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '6c5bd1d7-433e-4bfc-8819-4c909d4d2542', NULL),
('fec15734-fa14-41a9-a271-434741854a27', 'Mọi người nên mua sản phẩm này', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b299b428-8bc7-46bc-9aee-5001cd519fa6', NULL),
('fec52fc0-4e50-4b82-9eaa-726394e63502', 'Dịch vụ tốt, phục vụ khách hàng tốt', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'aeaed587-2486-4c05-9921-eeee660f710b', NULL),
('fecebef9-4bf0-44df-ae63-322980816315', 'vote 5 sao cho sản phẩm', 2, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'a921df76-e26e-44ac-8c90-f0de18613165', NULL),
('fed8d412-f729-4c8f-8420-463c886bf8d2', 'Sản phẩm hơi ộp ẹp, nhưng giá hợp lý so với sản phẩm', 5, '2023-01-01 15:41:20', '2023-01-01 15:41:20', '5ad5fe61-8b7d-45a3-a6ec-9829b8318f7a', NULL),
('fef9e24a-0a4f-44ef-90d2-289ae8bff119', 'Sản phẩm hợp với túi tiền', 1, '2023-01-01 15:41:20', '2023-01-01 15:41:20', 'b5c586de-0941-4b8f-843f-910c2f426279', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `imageproducts`
--

CREATE TABLE `imageproducts` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ProductId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `CityId` int(11) DEFAULT NULL,
  `DistrictId` int(11) DEFAULT NULL,
  `StreetId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethods`
--

CREATE TABLE `paymentmethods` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paymentmethods`
--

INSERT INTO `paymentmethods` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
('1', 'cash', '2023-01-01 15:40:07', '2023-01-01 15:40:07'),
('2', 'visa/card', '2023-01-01 15:40:07', '2023-01-01 15:40:07');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `OrderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `PaymentMethodId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `isDiscount` tinyint(1) NOT NULL DEFAULT 0,
  `discount` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `BrandId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `thumbnail`, `isDiscount`, `discount`, `description`, `createdAt`, `updatedAt`, `CategoryId`, `BrandId`) VALUES
('031d4d74-3cc9-4d15-8f31-516b6d546fd0', 'iPhone 11', '11690000', 'http://localhost:5000/images/iphone-11-(58).jpg', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('0554bec3-5034-4fdd-8c69-24bc85c208cd', 'Samsung Galaxy Z Fold4 5G', '35490000', 'http://localhost:5000/images/samsung-galaxy-z-fold4-(4).jpg', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('057abae5-ffb1-4978-8f8b-de5b2680b296', 'MacBook Air M2 2022 8GB', '27390000', 'http://localhost:5000/images/undefined', 1, 2, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('05ac6ae9-5844-41bb-83df-29db272aff2d', 'Samsung Galaxy Z Fold4 5G', '35490000', 'http://localhost:5000/images/samsung-galaxy-z-fold4-(4).jpg', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('08a79882-1f4f-4039-8014-20cbcd3c0d45', 'OPPO A55', '4490000', 'http://localhost:5000/images/undefined', 1, 10, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('094024bf-3740-4646-a977-538f1a5710ea', 'Xiaomi Redmi Note 11S series', '6190000', 'http://localhost:5000/images/xiaomi-redmi-note-11s-5g-(6).jpg', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('094dca79-29a9-40fd-b72d-2fadf6a976b0', 'Samsung Galaxy Watch5 LTE 40mm dây silicone', '7190000', 'http://localhost:5000/images/samsung-galaxy-watch-5-lte-tim-thumbnew-600x600.jpeg', 1, 8, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('0ba4e8ca-ddf2-4fb4-a9a3-d350cf17de98', 'Samsung Galaxy Watch 4 Classic 42mm dây silicone', '5390000', 'http://localhost:5000/images/samsung-galaxy-watch-4-classic-42mm-trang-thumbnew-600x600.jpg', 1, 1, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('0e13c656-6b26-48b8-ba0e-8d2919b716f5', 'iPhone 13 Pro 1TB', '30490000', 'http://localhost:5000/images/undefined', 1, 10, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('0fbd2ef4-b3dd-44cd-b332-412d7a87d70c', 'Apple Watch SE 44mm viền nhôm dây silicone', '6490000', 'http://localhost:5000/images/apple-watch-se-44mm-vien-nhom-day-cao-su-xanh-den-thumb-1-600x600.jpg', 1, 8, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('11525e7e-0a48-412b-86ea-e6d960ed91b5', 'OPPO A55', '4490000', 'http://localhost:5000/images/undefined', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('129a8e2e-e189-4fd0-b539-edeb9147a3d0', 'iPhone 13 Pro 1TB', '30490000', 'http://localhost:5000/images/undefined', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('12eb8a77-7162-4fc1-8421-5a07e10e72da', 'Xiaomi Redmi Watch 2 Lite 41.2mm dây TPU', '1090000', 'http://localhost:5000/images/redmi-watch-2-lite-den-600x600.jpg', 1, 3, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('1560f470-b891-4e71-89de-498c1fbd4927', 'iPhone 14 Pro Max', '31990000', 'http://localhost:5000/images/251192.jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('16064e2e-d3e1-4835-a6d4-3f2efc47823a', 'Samsung Galaxy S22+ 5G', '18990000', 'http://localhost:5000/images/samsung-galaxy-s22-plus-(8).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('19776230-1214-401c-a884-c99de205f5a2', 'iPhone 13 Pro Max 1TB', '34990000', 'http://localhost:5000/images/undefined', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('1ab0f8da-1aef-42f9-b4ff-c6397f0ae4fd', 'Samsung Galaxy A23', '5590000', 'http://localhost:5000/images/samsung-galaxy-a23-(10).jpg', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('1f958414-3a59-4f28-9f42-67f3b07d1141', 'MacBook Air M1 2020 8-core GPU', '33990000', 'http://localhost:5000/images/apple-macbook-air-m1-2020-8-core-gpu-xam-01-1-600x600.jpg', 1, 7, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('2316d6e4-4c31-4974-b05e-f158c0031825', 'iPhone 13 Pro Max 1TB', '34990000', 'http://localhost:5000/images/undefined', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('246a9872-cf9e-4c9a-b511-ce4cba80011c', 'Samsung Galaxy Watch5 LTE 44mm dây silicone', '7590000', 'http://localhost:5000/images/samsung-galaxy-watch5-lte-44mm-thumbnew-600x600.jpeg', 1, 2, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('266450a4-0384-48fb-8d90-5814de94cc76', 'Realme Watch 3 45mm dây silicone', '1390000', 'http://localhost:5000/images/realme-watch-3-den-thumb-600x600.jpeg', 1, 7, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('28c5fdb0-38e8-4630-bb90-672862b39ef8', 'iPhone 14 Pro Max', '31990000', 'http://localhost:5000/images/251192.jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('2a1ce682-878f-4b06-93a3-b640f908e682', 'Samsung Galaxy S22+ 5G', '18990000', 'http://localhost:5000/images/samsung-galaxy-s22-plus-(8).jpg', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('2ab2e10e-2c55-4756-a267-3af47aed6d75', 'Samsung Galaxy Z Fold3 5G', '31990000', 'http://localhost:5000/images/samsung-galaxy-z-fold-3-(12).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('2cb94e45-7963-480b-8df6-cb6ece7c393b', 'Samsung Galaxy Z Fold3 5G', '31990000', 'http://localhost:5000/images/samsung-galaxy-z-fold-3-(12).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('2d4a2ad7-8895-4913-95ec-64a6bbe36db3', 'Samsung Galaxy A23', '5590000', 'http://localhost:5000/images/samsung-galaxy-a23-(10).jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('30c39397-5951-4664-9d08-de0f70ce1d3c', 'OPPO Find X5 Pro 5G', '29990000', 'http://localhost:5000/images/undefined', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('32517978-cdb6-455b-82c0-00125f343efa', 'Vivo Y15 series', '2890000', 'http://localhost:5000/images/vivo-y15s-2021-(10).jpg', 1, 4, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('37460f35-3a56-4a29-b4ce-c7f48c491f68', 'Samsung Galaxy Watch5 40mm dây silicone', '6190000', 'http://localhost:5000/images/samsung-galaxy-watch-5-40-mm-tim-tn-600x600.jpg', 1, 10, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('37ce2e8a-a6c6-4729-89d0-24217d9ae626', 'iPhone 14 Plus', '24990000', 'http://localhost:5000/images/iphone-14-plus-(16).jpg', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('3ee111c6-3e60-47a3-b60f-02d00f089567', 'Samsung Galaxy Watch 4 LTE Classic 42mm dây silicone', '6390000', 'http://localhost:5000/images/samsung-galaxy-watch-4-lte-classic-42mm-thumb-1-600x600.jpg', 1, 5, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('481858de-a521-47b4-b9be-587e361292a5', 'iPhone 14', '21990000', 'http://localhost:5000/images/iphone-14-(16).jpg', 1, 2, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('48b65d9e-e511-48a4-9e81-8b1fd9a79803', 'OPPO Find X5 Pro 5G', '29990000', 'http://localhost:5000/images/undefined', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('4bc97e80-fefa-4879-8e4d-20fbc954ffba', 'Vivo Y15 series', '2890000', 'http://localhost:5000/images/vivo-y15s-2021-(10).jpg', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('52d054bd-f023-4e16-af91-58ced27c1106', 'Samsung Galaxy Z Flip4 5G', '18490000', 'http://localhost:5000/images/samsung-galaxy-z-flip4-(4).jpg', 1, 4, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('53b14ada-58a3-41ce-b01e-5b384b8d1043', 'OPPO Reno8 series', '17990000', 'http://localhost:5000/images/oppo-reno8-pro-(4).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('53effac5-3ced-46d6-926a-fec30d488bf6', 'Befit B4 44mm dây silicone', '490000000', 'http://localhost:5000/images/dong-ho-befit-b4-hong-thumbnew-600x600.jpeg', 1, 1, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('55eea06c-7e89-42f4-a997-15dfe443546e', 'iPhone 14', '21990000', 'http://localhost:5000/images/iphone-14-(16).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('56e02e19-54ce-41f5-9ff8-74d5351a19f3', 'Xiaomi Redmi Note 11', '4090000', 'http://localhost:5000/images/xiaomi-redmi-note-11-4gb-64gb-(16).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('58579f39-443b-4ca0-93a2-456b1589c7a8', 'OPPO Reno8 series', '17990000', 'http://localhost:5000/images/oppo-reno8-pro-(4).jpg', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('5a4913b2-740b-43e5-ba67-8433726e0eac', 'iPhone 14 Plus', '24990000', 'http://localhost:5000/images/iphone-14-plus-(16).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('5ad5fe61-8b7d-45a3-a6ec-9829b8318f7a', 'Xiaomi Redmi Note 11S series', '6190000', 'http://localhost:5000/images/xiaomi-redmi-note-11s-5g-(6).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('5d86c01b-690c-4c4b-a406-866d510eb9e2', 'OPPO Reno8 series', '17990000', 'http://localhost:5000/images/oppo-reno8-pro-(4).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('5f240d03-e93f-411b-a155-8ea0ad9e5164', 'MacBook Air M2 2022 16GB', '35090000', 'http://localhost:5000/images/undefined', 0, 0, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('5f4d7f9d-9cfd-4757-99d9-efb818d6f493', 'Vivo Y15 series', '2890000', 'http://localhost:5000/images/vivo-y15s-2021-(10).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('6136b258-080f-406d-af0b-236abe380bb6', 'MacBook Pro 16 M1 Max 2021/32 core-GPU', '76990000', 'http://localhost:5000/images/apple-macbook-pro-16-m1-max-2021-600x600.jpg', 1, 2, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('654a9e06-c3c8-45eb-8207-975a900e2d55', 'iPhone 11', '11690000', 'http://localhost:5000/images/iphone-11-(58).jpg', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('656bc5ca-f3bc-48af-91b2-8fbf7f58c52f', 'Samsung Galaxy Z Flip4 5G', '18490000', 'http://localhost:5000/images/samsung-galaxy-z-flip4-(4).jpg', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('67606394-f879-4010-baf0-260294b93970', 'iPhone 14 Pro', '28990000', 'http://localhost:5000/images/iphone-14-pro-(16).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('69ee019e-f5ea-45e4-86f8-09b523551fd3', 'Samsung Galaxy S22 Ultra 5G', '21990000', 'http://localhost:5000/images/235838.jpg', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('6c5bd1d7-433e-4bfc-8819-4c909d4d2542', 'Samsung Galaxy S22 Ultra 5G', '21990000', 'http://localhost:5000/images/235838.jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('6ce925a0-0039-4211-8e28-a7a9e27ccf99', 'Samsung Galaxy Watch5 44mm dây silicone', '6590000', 'http://localhost:5000/images/samsung-galaxy-watch-5-44-mm-tnew-600x600.jpg', 1, 9, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('6e46de2b-29ec-4cbd-8438-73d2ba576f01', 'Samsung Galaxy Z Flip4 5G', '18490000', 'http://localhost:5000/images/samsung-galaxy-z-flip4-(4).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('6e5978dd-f480-4654-81a3-87c743019939', 'OPPO A55', '4490000', 'http://localhost:5000/images/undefined', 1, 4, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('6ef5e270-b592-4c01-90a2-8b84d50ef2a2', 'OPPO Reno8 series', '17990000', 'http://localhost:5000/images/oppo-reno8-pro-(4).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('7039f663-d2d0-4ea0-a81c-a654be24144e', 'Apple Watch S6 LTE 40mm viền nhôm dây silicone', '11990000', 'http://localhost:5000/images/s6-lte-40mm-vien-nhom-day-cao-su-do-600x600.jpg', 1, 7, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('70f0e1ed-11ed-45e2-8460-c49022489482', 'iPhone 14 Pro Max', '31990000', 'http://localhost:5000/images/251192.jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('740d9952-0379-4666-833b-3ad260ffba1a', 'Samsung Galaxy S22+ 5G', '18990000', 'http://localhost:5000/images/samsung-galaxy-s22-plus-(8).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('74b0bdbe-7e2b-4a52-b7f5-ebe1f792411d', 'OPPO Find X5 Pro 5G', '29990000', 'http://localhost:5000/images/undefined', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('7512350a-1154-468e-83c4-75b0ad7d0717', 'Samsung Galaxy Z Flip4 5G', '18490000', 'http://localhost:5000/images/samsung-galaxy-z-flip4-(4).jpg', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('775f24b8-9f1d-43c1-ae9b-81b4f416ce98', 'Apple Watch Series 7 GPS 41mm viền nhôm dây silicone', '7990000', 'http://localhost:5000/images/apple-watch-s7-41mm-xanh-duong-thumbnew-600x600.jpeg', 1, 3, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('7893a992-bb44-4b5a-8090-6bc7ad375617', 'Samsung Galaxy A23', '5590000', 'http://localhost:5000/images/samsung-galaxy-a23-(10).jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('78ed2d36-2a32-4907-aafd-67b9b2a9857a', 'Samsung Galaxy Z Fold3 5G', '31990000', 'http://localhost:5000/images/samsung-galaxy-z-fold-3-(12).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('7d27c039-098f-401a-94d8-00c500410099', 'Samsung Galaxy Z Fold4 5G', '35490000', 'http://localhost:5000/images/samsung-galaxy-z-fold4-(4).jpg', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('7ec67e58-5890-4c92-b21b-212beb47dd06', 'iPhone 14 Plus', '24990000', 'http://localhost:5000/images/iphone-14-plus-(16).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('7f689c63-7b91-40cf-a0c3-e0b24b381598', 'MacBook Pro 16 M1 Pro 2021', '53490000', 'http://localhost:5000/images/undefined', 1, 2, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('8124aeda-6056-49ea-aff1-475c283b21db', 'Samsung Galaxy S22 Ultra 5G', '21990000', 'http://localhost:5000/images/235838.jpg', 1, 2, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('87a56389-5a8a-4feb-b336-6abe3a6f095f', 'iPhone 14 Pro Max', '31990000', 'http://localhost:5000/images/251192.jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('89d1bf7c-d5f0-475e-bfd0-2ec753a2fa31', 'MacBook Pro 14 M1 Pro 2021', '42990000', 'http://localhost:5000/images/undefined', 1, 3, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('8aa42a32-2d37-423b-b436-897e33446a00', 'Xiaomi Redmi Note 11', '4090000', 'http://localhost:5000/images/xiaomi-redmi-note-11-4gb-64gb-(16).jpg', 1, 2, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('8b70a493-440c-4da3-8649-a6f29e797d84', 'Samsung Galaxy A23', '5590000', 'http://localhost:5000/images/samsung-galaxy-a23-(10).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('8bcc1f8f-9a90-4695-baa7-fe0c09ee7391', 'iPhone 14', '21990000', 'http://localhost:5000/images/iphone-14-(16).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('8fa92d36-7371-4964-9ca5-11a9adb5ef2f', 'iPhone 13', '19990000', 'http://localhost:5000/images/iphone-13-(24).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('9324d636-a712-40f9-b8b9-719b7dc8e997', 'iPhone 13', '19990000', 'http://localhost:5000/images/iphone-13-(24).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('9562a9d4-5d5e-4340-a4e3-29916a83d4c9', 'Xiaomi Redmi Note 11', '4090000', 'http://localhost:5000/images/xiaomi-redmi-note-11-4gb-64gb-(16).jpg', 1, 4, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('995844ec-4b82-4f2b-97af-be4e6937624a', 'Apple Watch Ultra LTE 49mm viền Titanium dây Ocean', '20990000', 'http://localhost:5000/images/apple-watch-ultra-cao-su-vang-thumbn-600x600.jpg', 1, 8, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('9bf4031a-5359-49e2-9f2c-5caf108f1024', 'OPPO Reno8 series', '17990000', 'http://localhost:5000/images/oppo-reno8-pro-(4).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('9ce47c1a-123e-4473-bd96-58746fb9dacf', 'iPhone 13 Pro Max 1TB', '34990000', 'http://localhost:5000/images/undefined', 1, 10, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('9e4cf2ff-f0c6-4d82-8983-ffd924adde17', 'OPPO Find X5 Pro 5G', '29990000', 'http://localhost:5000/images/undefined', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('9e5c5dbc-adf5-40de-99eb-75db05ffa9c4', 'Samsung Galaxy S22+ 5G', '18990000', 'http://localhost:5000/images/samsung-galaxy-s22-plus-(8).jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('a195653e-907f-47e8-b638-6518dfdb403e', 'iPhone 14 Pro', '28990000', 'http://localhost:5000/images/iphone-14-pro-(16).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('a4573446-f711-48fe-b0b5-0224f9e3676e', 'iPhone 11', '11690000', 'http://localhost:5000/images/iphone-11-(58).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('a889b902-f953-4ffb-bd47-f3bcf447fcbc', 'Xiaomi Watch S1 46.5mm dây da', '4790000', 'http://localhost:5000/images/dong-ho-thong-minh-xiaomi-watch-s1-thumbn-600x600.jpg', 1, 8, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('a8e14d56-acbf-4a0e-9d5f-a361ee75ea50', 'OPPO Find X5 Pro 5G', '29990000', 'http://localhost:5000/images/undefined', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('a921df76-e26e-44ac-8c90-f0de18613165', 'OPPO A55', '4490000', 'http://localhost:5000/images/undefined', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('aa42b0bb-b439-46d2-b2b5-dfb25b9e18cb', 'Amazfit GTS 4 42.7mm', '4990000', 'http://localhost:5000/images/amazfit-gts-4-day-nylon-thumb-600x600.jpeg', 1, 10, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('aabe1113-227c-4e23-af9e-b12365d2508e', 'MacBook Air M1 2020 7-core GPU', '22090000', 'http://localhost:5000/images/macbook-air-m1.png', 1, 7, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('ae4bf40e-8c82-4bb5-b498-4c7c25686ebd', 'Samsung Galaxy S22 Ultra 5G', '21990000', 'http://localhost:5000/images/235838.jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('aeaed587-2486-4c05-9921-eeee660f710b', 'Apple Watch S3 GPS 38mm viền nhôm dây silicone', '4690000', 'http://localhost:5000/images/apple-watch-s3-gps-38mm-den-thumbnew-600x600.jpeg', 1, 6, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('b1a50389-17da-48e1-93e6-fc74bb6006d3', 'MacBook Pro M1 2020', '36990000', 'http://localhost:5000/images/macbook-pro.png', 1, 10, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('b299b428-8bc7-46bc-9aee-5001cd519fa6', 'Samsung Galaxy S22+ 5G', '18990000', 'http://localhost:5000/images/samsung-galaxy-s22-plus-(8).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('b5c586de-0941-4b8f-843f-910c2f426279', 'iPhone 14 Pro', '28990000', 'http://localhost:5000/images/iphone-14-pro-(16).jpg', 1, 4, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('b5ef1cdb-4886-44d3-ad64-0fea6a960b4c', 'iPhone 13 Pro Max 1TB', '34990000', 'http://localhost:5000/images/undefined', 1, 2, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('b5f6a62c-283e-4db5-9732-9d8b198ba7e5', 'iPhone 13 Pro 1TB', '30490000', 'http://localhost:5000/images/undefined', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('b861206f-76a1-47f2-ad8b-6afdc7c6e653', 'Vivo Y15 series', '2890000', 'http://localhost:5000/images/vivo-y15s-2021-(10).jpg', 1, 4, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('b88c8866-4c9f-4ff9-b30e-ce73b6e9913e', 'iPhone 13 Pro 1TB', '30490000', 'http://localhost:5000/images/undefined', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('bc6de2f6-b206-4ce7-9768-6f88562b2cdd', 'Xiaomi Redmi Note 11', '4090000', 'http://localhost:5000/images/xiaomi-redmi-note-11-4gb-64gb-(16).jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('bd0d63fd-33bd-4d4c-9837-4c3059a9ea49', 'Apple Watch Series 7 GPS 45mm viền nhôm dây silicone', '8990000', 'http://localhost:5000/images/dong-ho-apple-watch-s7-45mm-thumbnew-600x600.jpeg', 1, 7, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('c1dc3a56-e5e0-40df-a488-6a1d163be754', 'Samsung Galaxy Z Flip4 5G', '18490000', 'http://localhost:5000/images/samsung-galaxy-z-flip4-(4).jpg', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('c2a41298-fc99-4f7f-830a-294f077a8b0d', 'MacBook Air M1 2020 7-core GPU', '27290000', 'http://localhost:5000/images/macbook-air-m1-2020-gold-600x600.jpg', 1, 3, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('c49e31e1-2232-4722-b72c-088b5e9053fb', 'iPhone 14 Pro', '28990000', 'http://localhost:5000/images/iphone-14-pro-(16).jpg', 1, 2, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('c7a92ec0-8ef3-4be0-8a5d-37eb20bf9f97', 'iPhone 13', '19990000', 'http://localhost:5000/images/iphone-13-(24).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('c87612d5-91af-44ac-8274-6c22aa205bd3', 'BeFit BeU B3 44mm dây silicone', '990000000', 'http://localhost:5000/images/dong-ho-befit-b3-vang-thumbnew-600x600.jpeg', 1, 1, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('cb2b67f2-19e8-4936-870a-b52d169575ac', 'iPhone 13', '19990000', 'http://localhost:5000/images/iphone-13-(24).jpg', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('cb611b20-9249-4bf6-8b12-3bbed3e883ce', 'Xiaomi Redmi Note 11S series', '6190000', 'http://localhost:5000/images/xiaomi-redmi-note-11s-5g-(6).jpg', 1, 4, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('cd6c9ee6-b9f5-4999-80e6-997766d5f0a1', 'Xiaomi Redmi Note 11', '4090000', 'http://localhost:5000/images/xiaomi-redmi-note-11-4gb-64gb-(16).jpg', 1, 2, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('ce041ec7-8fa9-4527-896f-a2f7028dc464', 'MacBook Pro M1 2020', '32390000', 'http://localhost:5000/images/231254.png', 1, 8, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('ce812634-2610-4a98-9486-9c4036ae136b', 'iPhone 14 Plus', '24990000', 'http://localhost:5000/images/iphone-14-plus-(16).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('d1ad4014-7fba-4d8b-a9e8-0d804f19ab6e', 'iPhone 14 Pro Max', '31990000', 'http://localhost:5000/images/251192.jpg', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('d24c6103-4f9f-4126-b955-3a98a80ec5c6', 'Amazfit GTR 4 46mm', '4990000', 'http://localhost:5000/images/amazfit-gtr-4-silicone-thmb-600x600.jpeg', 1, 8, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('d9620481-1119-4ed1-976e-3a4dc1dafa61', 'iPhone 11', '11690000', 'http://localhost:5000/images/iphone-11-(58).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('da20d32f-809b-44b2-9932-0b98468ed353', 'Samsung Galaxy Z Fold3 5G', '31990000', 'http://localhost:5000/images/samsung-galaxy-z-fold-3-(12).jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('df69b5de-8d5b-4aa1-b047-73631eeb2ec8', 'MacBook Pro M2 2022 16GB/10-core GPU', '37990000', 'http://localhost:5000/images/undefined', 1, 8, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('df9ac6e4-aa12-44b4-8994-36de80aff78e', 'Apple Watch S8 GPS 41mm viền nhôm dây silicone', '9990000', 'http://localhost:5000/images/apple-watch-s8-41mm-trang-kem-thumb-600x600.jpeg', 1, 8, '', '2023-01-01 15:41:20', '2023-01-01 15:41:20', NULL, NULL),
('e0f63449-520c-47bf-9d4c-e3d67a13b6ac', 'MacBook Pro M2 2022', '31390000', 'http://localhost:5000/images/undefined', 1, 7, '', '2023-01-01 15:41:19', '2023-01-01 15:41:19', '61fd22b9-2e66-46dd-a3c7-bc01639b371d', NULL),
('e2283081-f143-4a50-a589-f214570eea99', 'Samsung Galaxy S22 Ultra 5G', '21990000', 'http://localhost:5000/images/235838.jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e27f6f35-d687-42a4-916b-7a2b72013aa8', 'iPhone 14 Pro', '28990000', 'http://localhost:5000/images/iphone-14-pro-(16).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e5351d77-4928-443d-aa53-10009b0ab75b', 'Xiaomi Redmi Note 11S series', '6190000', 'http://localhost:5000/images/xiaomi-redmi-note-11s-5g-(6).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e5eecc82-0a23-48f1-8f82-b205275b3870', 'iPhone 14', '21990000', 'http://localhost:5000/images/iphone-14-(16).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e5f7d737-e4e4-4f0c-8b1d-42be4079386e', 'Samsung Galaxy Z Fold4 5G', '35490000', 'http://localhost:5000/images/samsung-galaxy-z-fold4-(4).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e80f52d1-e8e3-44b3-bfe0-61ab72c0a4a2', 'iPhone 13 Pro 1TB', '30490000', 'http://localhost:5000/images/undefined', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e8169e49-5a53-419b-9cbe-148591c69372', 'Samsung Galaxy Z Fold4 5G', '35490000', 'http://localhost:5000/images/samsung-galaxy-z-fold4-(4).jpg', 1, 8, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e8a031ad-0af0-4210-bf64-4b264fa42c34', 'Xiaomi Redmi Note 11S series', '6190000', 'http://localhost:5000/images/xiaomi-redmi-note-11s-5g-(6).jpg', 1, 7, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e92862a1-22e9-43f1-bb75-654d51e3a109', 'Samsung Galaxy A23', '5590000', 'http://localhost:5000/images/samsung-galaxy-a23-(10).jpg', 1, 9, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e959ec02-6542-4b10-899a-a12ebbc90a21', 'iPhone 11', '11690000', 'http://localhost:5000/images/iphone-11-(58).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('e9d262b0-6ef5-4203-90cf-f655ce1c0549', 'iPhone 14', '21990000', 'http://localhost:5000/images/iphone-14-(16).jpg', 0, 0, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('eaf703a2-b477-45af-9b17-64a78e8b5c22', 'Vivo Y15 series', '2890000', 'http://localhost:5000/images/vivo-y15s-2021-(10).jpg', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('ed14304d-1636-4cc5-885e-e20a2c7937cf', 'iPhone 14 Plus', '24990000', 'http://localhost:5000/images/iphone-14-plus-(16).jpg', 1, 1, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('f45027b9-481b-4f53-b16c-14ffb31ab342', 'Samsung Galaxy Z Fold3 5G', '31990000', 'http://localhost:5000/images/samsung-galaxy-z-fold-3-(12).jpg', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('fa057266-f7d1-4964-840e-953b6e7f9a55', 'OPPO A55', '4490000', 'http://localhost:5000/images/undefined', 1, 5, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('fa7084cf-eb9f-4494-9abf-4d0116453586', 'iPhone 13', '19990000', 'http://localhost:5000/images/iphone-13-(24).jpg', 1, 3, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL),
('fba9537d-1b54-44dc-bd4d-dd7f9d40ac4f', 'iPhone 13 Pro Max 1TB', '34990000', 'http://localhost:5000/images/undefined', 1, 6, '', '2023-01-01 15:41:16', '2023-01-01 15:41:16', 'e74cee0f-1ec3-470c-9df3-731e9111f341', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `type`, `description`, `createdAt`, `updatedAt`) VALUES
('1', 'user', '', '2023-01-01 15:40:07', '2023-01-01 15:40:07'),
('2', 'staff', '', '2023-01-01 15:40:07', '2023-01-01 15:40:07'),
('3', 'admin', '', '2023-01-01 15:40:07', '2023-01-01 15:40:07');

-- --------------------------------------------------------

--
-- Table structure for table `speciations`
--

CREATE TABLE `speciations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProductId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `streets`
--

CREATE TABLE `streets` (
  `id` int(11) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DistrictId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hashPassword` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RoleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userName`, `email`, `hashPassword`, `isActive`, `createdAt`, `updatedAt`, `RoleId`) VALUES
('03bba9bc-9256-4c22-9d27-c913f9e37582', 'hoanglong', 'longnguyen.080400@gmail.com', '$2b$10$37aKjAxsGBDfSJ90yCxyu.fo6dABjI44k6OOL7BNn/Wx6IObdt78C', 1, '2023-11-01 15:40:08', '2023-01-01 15:57:37', '1'),
('0ac26261-9658-405d-8be1-93ff0c86ead1', 'longhoang', 'longhoang.080400@gmail.com', '$2b$10$WisiEWSflYl3L1gQWV9LBOCFTSdr4Rhu0NEGYpftJ/n15wrknk6zm', 1, '2023-06-01 15:40:08', '2023-01-01 15:57:37', '1'),
('0d5d4bb2-25bb-4f88-8454-a3a289369060', 'lienquan', 'lienquan.080400@gmail.com', '$2b$10$wwciCG1XbHiWR4Br9YahkOuNBP9d5rpN79CGNXKphy7AopL.XjTRy', 1, '2023-09-01 15:40:08', '2023-01-01 15:57:37', '1'),
('1f6ffd1d-b1df-4d6c-90a5-119c36db7308', 'traoduyen', 'traoduyen.080400@gmail.com', '$2b$10$Orz5GiGbkM2SWs6cirQoKu7NkyuSSqxvj7xBLxqy8R5tafGtQw2MC', 1, '2023-11-01 15:40:08', '2023-01-01 15:57:37', '1'),
('2518367d-c32d-4fb0-9936-459a41929ec6', 'trongthanh', 'trongthanh.080400@gmail.com', '$2b$10$8/MwrRUMUQ2RifcBVZNqK.N85vZozYULIaaluhacL00RlWujMMQoC', 1, '2023-01-01 15:40:08', '2023-01-01 15:57:37', '1'),
('2b0cbb2c-8539-4ac0-9c90-92f602298533', 'tuanct', 'tuanct.080400@gmail.com', '$2b$10$wTUy3MA/ysPwKHEeunZwgudUK5d3xhiEMdeLloJJ9hfml3IeFTshy', 1, '2023-08-01 15:40:08', '2023-01-01 15:57:37', '1'),
('3050c4a1-56a3-416f-b7df-d7769e22c192', 'minhtien', 'minhtien.080400@gmail.com', '$2b$10$LeBWwWJaqZhF3WJydEBFLeQcASKh7sb5G2w9fSdK/Wyd/z6Wd21l.', 1, '2023-01-01 15:40:08', '2023-01-01 15:57:37', '1'),
('3562fc21-38ca-4a2e-ac6f-ff01f72fc251', 'caote', 'caote.080400@gmail.com', '$2b$10$niLe6uyalMPoEy/y7UsH6.YNXUnJaitkKqFFBqYYz710zoaFFcvDG', 1, '2023-11-01 15:40:08', '2023-01-01 15:57:37', '1'),
('35694d68-943b-42f0-bd25-b5b6c48cc6a3', 'thudieu', 'thudieu.080400@gmail.com', '$2b$10$tcb0C/aMYo294BVFVMvExOEQoCuBiaRrcKRLBVOpXNHzzIUWGzeR6', 1, '2023-05-01 15:40:08', '2023-01-01 15:57:37', '1'),
('358dda32-aebd-489d-a42a-80e4b8c7efa4', 'thaothao', 'thaothao.080400@gmail.com', '$2b$10$tdgquoi5O4LQnCSOiPsPd.Qe4NpZPCsygKVbVTKA8tKLlA.rym9wi', 1, '2023-05-01 15:40:08', '2023-01-01 15:57:37', '1'),
('41de0409-f71a-426e-9caf-c93154c54bcc', 'huuphuu', 'huuphuu.080400@gmail.com', '$2b$10$ADZCey8Tg65BWnDWmb4VwO9Rs32R8zkAC3HWJ9WFqgdwBMYYcx5w2', 1, '2023-07-01 15:40:08', '2023-01-01 15:57:37', '1'),
('49434605-5a48-4c3b-886f-1117d0898edb', 'dinhty', 'dinhty.080400@gmail.com', '$2b$10$CqHfPzryKuy4MLNvp60Fk.8tKGiEgX2ibXGpSy3nGKdiMgMi5z.na', 1, '2023-10-01 15:40:08', '2023-01-01 15:57:37', '1'),
('4cf3d96a-328d-49ad-8bc4-8185ccdc98ec', 'phamminh', 'phamminh.080400@gmail.com', '$2b$10$V3uQGmh3Q.qxYKbWj3U3XuKBmdkWaSWCvia0F.5uc2I8//3icM1Ta', 1, '2023-01-01 15:40:08', '2023-01-01 15:57:37', '1'),
('55300096-7b97-46cb-953e-9c63c269f692', 'quangvu', 'quangvu.080400@gmail.com', '$2b$10$hE3T2MMDnX2evqX4Mh8rLO47rBWPHiTWcKEYBixlykgd5hP3esb.S', 1, '2023-12-01 15:40:08', '2023-01-01 15:57:37', '1'),
('5e5d4262-612b-4767-a331-157fbb2db956', 'thino', 'thino.080400@gmail.com', '$2b$10$enUZ.23FMoyPqf3gFN.tsePM3sxzUk.0EE/Zw./c2k8xqD0bdep5u', 1, '2023-12-01 15:40:08', '2023-01-01 15:57:37', '1'),
('5ff4b61c-9723-48bc-a2dd-591b251df080', 'hoangquy', 'hoangquy.080400@gmail.com', '$2b$10$dUYM7QfGDwgDkT2f4snPmeK4vtEiu1.RZCBM3K77xobccLoVuxIHi', 1, '2023-04-01 15:40:08', '2023-01-01 15:57:37', '1'),
('659213f2-d591-4f88-a352-c27ab5d313d2', 'thanhhuy1', 'thanhhuy1.080400@gmail.com', '$2b$10$Poo0QF4t4z0h2Ad.EbEWk.LqLUGytCVgnngI1PDttBs8h2Aux5oI.', 1, '2023-02-01 15:40:08', '2023-01-01 15:57:37', '1'),
('74dd2e95-1fc4-4f55-a9c3-6f0626a9bf85', 'pubg', 'pubg.080400@gmail.com', '$2b$10$OL2wiN7DewlGsKEuB0.OVu.uj4r0skys.yqPTJQRiDHjcsSbk/4S6', 1, '2023-10-01 15:40:08', '2023-01-01 15:57:37', '1'),
('7fd1eadd-5e8e-45b5-9425-4e127e569cdd', 'longraz', 'longraz.080400@gmail.com', '$2b$10$gv.rLjkhBTJDXVcRd/hupe4ydpEanT30q.gkAeS8tZwn5yZB.7FMS', 1, '2023-08-01 15:40:08', '2023-01-01 15:57:37', '1'),
('8820b334-0a21-43b9-8eec-f1b011b9bc4b', 'hoangtu', 'hoangtu.080400@gmail.com', '$2b$10$XpUqqC7ZLB57dLKVLG9kleypezwO5/acYRFgKPQ5IPvpbZoqWxdm2', 1, '2023-01-01 15:40:08', '2023-01-01 15:57:37', '1'),
('89191a0a-319e-49d8-ad16-3edd4aa47e84', 'admin', 'admin@gmail.com', '$2b$10$cOS8UtVPI6KPXwjBC/yv2eZU0kQLpJvHbvkHcyxOYgohvPvErMu0W', 1, '2023-01-01 15:40:08', '2023-01-01 15:57:37', '3'),
('899be996-7b4a-436d-a560-d49d92635778', 'thanhhuy2', 'thanhhuy2.080400@gmail.com', '$2b$10$Xdp48Z5xcXYaoq3bxnyV9OZoQgb3Nx..u3E4Ua2R7nseTBOe8JZyO', 1, '2023-03-01 15:40:08', '2023-01-01 15:57:37', '1'),
('9ad67c72-c849-4168-9518-808a37e3efc7', 'minhhieu', 'minhhieu.080400@gmail.com', '$2b$10$1HyD83ohW9kYO1k.EbukWuCdfWeNSeNyANhJziXZ6B6Z1RKik7BaK', 1, '2023-01-01 15:40:08', '2023-01-01 15:57:37', '1'),
('9f233be5-64be-4311-8629-8ae575a63feb', 'huyhoang', 'huyhoang.080400@gmail.com', '$2b$10$kKuj1woUC0r2Jsy4n04E5ugeOzBN1bTvVZv0EYQjTcv9UzuQfoqfG', 1, '2023-07-01 15:40:08', '2023-01-01 15:57:37', '1'),
('9fee1380-adfc-4a45-9433-66e61f65d32a', 'hoangthao', 'hoangthao.080400@gmail.com', '$2b$10$fHweKZNmBTtWBMvR3xtdQOsxu2xjk2..yrk71YaoCE4uBIiAz.vj6', 1, '2023-06-01 15:40:08', '2023-01-01 15:57:37', '1'),
('be4ecbcd-f6c5-401e-b7da-0550b380e8dc', 'chipheo', 'chipheo.080400@gmail.com', '$2b$10$xIZspR6kqWS.9ye0SoxpOOdILb8efPL26YAkey.n.XgxRXvFewnIi', 1, '2023-12-01 15:40:08', '2023-01-01 15:57:37', '1'),
('d34bd817-2c6b-4b75-a6e6-adfe9f7f6619', 'quoctinh', 'quoctinh.080400@gmail.com', '$2b$10$ufm2NjvdbxnQDhtlJl2MiOyubfMW4AQW6koCjgMHYVn57gasd8bvW', 1, '2023-02-01 15:40:08', '2023-01-01 15:57:37', '1'),
('dbd58ae2-3dae-4bd8-a2cf-923b397c5605', 'dinhhuy', 'dinhhuy.080400@gmail.com', '$2b$10$G4znZUMHqPnVZSktWLR4..Sv09M9skmRPnOtlH7B2nMuNeCp6iIwa', 1, '2023-04-01 15:40:08', '2023-01-01 15:57:37', '1'),
('f6de7310-baef-4a17-89ce-87f82386afc8', 'treocao', 'treocao.080400@gmail.com', '$2b$10$GMao8fgPAEmV3YMxZkIbgOtsm9YcV/IMo5FLXMjsvXuShzNzgEcIe', 1, '2023-11-01 15:40:08', '2023-01-01 15:57:37', '1');

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
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CityId` (`CityId`);

--
-- Indexes for table `evaluates`
--
ALTER TABLE `evaluates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `imageproducts`
--
ALTER TABLE `imageproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `CityId` (`CityId`),
  ADD KEY `DistrictId` (`DistrictId`),
  ADD KEY `StreetId` (`StreetId`);

--
-- Indexes for table `paymentmethods`
--
ALTER TABLE `paymentmethods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `OrderId` (`OrderId`),
  ADD KEY `PaymentMethodId` (`PaymentMethodId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CategoryId` (`CategoryId`),
  ADD KEY `BrandId` (`BrandId`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `speciations`
--
ALTER TABLE `speciations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `streets`
--
ALTER TABLE `streets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `DistrictId` (`DistrictId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `RoleId` (`RoleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `streets`
--
ALTER TABLE `streets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`CityId`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `evaluates`
--
ALTER TABLE `evaluates`
  ADD CONSTRAINT `evaluates_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluates_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `imageproducts`
--
ALTER TABLE `imageproducts`
  ADD CONSTRAINT `imageproducts_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`CityId`) REFERENCES `cities` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`DistrictId`) REFERENCES `districts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`StreetId`) REFERENCES `streets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`PaymentMethodId`) REFERENCES `paymentmethods` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`BrandId`) REFERENCES `brands` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `speciations`
--
ALTER TABLE `speciations`
  ADD CONSTRAINT `speciations_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `streets`
--
ALTER TABLE `streets`
  ADD CONSTRAINT `streets_ibfk_1` FOREIGN KEY (`DistrictId`) REFERENCES `districts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleId`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
