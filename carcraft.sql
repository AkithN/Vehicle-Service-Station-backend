-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 24, 2024 at 05:22 PM
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
-- Database: `carcraft`
--

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `garages`
--

CREATE TABLE `garages` (
  `garageId` int(11) NOT NULL,
  `garageName` varchar(255) NOT NULL,
  `garageAddress` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `workNum` varchar(20) NOT NULL,
  `mobileNum` varchar(20) NOT NULL,
  `services` varchar(255) NOT NULL,
  `garageDescription` text NOT NULL,
  `operatingHoursWeek` varchar(100) NOT NULL,
  `operatingHoursWeekend` varchar(100) NOT NULL,
  `publicHoliday` varchar(10) NOT NULL,
  `emergencyService` varchar(10) NOT NULL,
  `serviceScale` varchar(50) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(255) DEFAULT NULL,
  `image3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `garages`
--

INSERT INTO `garages` (`garageId`, `garageName`, `garageAddress`, `district`, `province`, `workNum`, `mobileNum`, `services`, `garageDescription`, `operatingHoursWeek`, `operatingHoursWeekend`, `publicHoliday`, `emergencyService`, `serviceScale`, `website`, `facebook`, `instagram`, `twitter`, `image1`, `image2`, `image3`) VALUES
(20, 'A.B. Diluka Theekshana', 'qwe', 'Nuwara Eliya', 'Central_Province', '0701119034', '0701119034', 'maintenance', 'dds', '8-5', 'w9-3', 'yes', 'yes', 'small', 'f', 'f', 'f', 'f', '/uploads/1724449077224-(1).jpg', '/uploads/1724449077227-(2).jpg', '/uploads/1724449077229-(3).jpg');

-- --------------------------------------------------------

--
-- Table structure for table `inquiries`
--

CREATE TABLE `inquiries` (
  `inquiryId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `vehicleType` varchar(100) NOT NULL,
  `vehicleNumber` varchar(50) NOT NULL,
  `services` varchar(255) NOT NULL,
  `selectDate` date NOT NULL,
  `selectTime` time NOT NULL,
  `additionalServices` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inquiries`
--

INSERT INTO `inquiries` (`inquiryId`, `name`, `phoneNumber`, `vehicleType`, `vehicleNumber`, `services`, `selectDate`, `selectTime`, `additionalServices`, `createdAt`, `updatedAt`) VALUES
(1, 'A.B. Diluka Theekshana', '0701119034', 'Car', 'KM6078', 'Maintenance Services', '2024-08-24', '07:06:05', 'can u', '2024-08-23 21:55:05', '2024-08-23 21:55:05');

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `newsId` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `topic` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`newsId`, `image`, `topic`, `description`) VALUES
(1, '/uploads/news/1724445935170.jpg', 'abc', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `offerId` int(11) NOT NULL,
  `offerName` varchar(255) NOT NULL,
  `offerDescription` text NOT NULL,
  `expiredate` date NOT NULL,
  `imageName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`offerId`, `offerName`, `offerDescription`, `expiredate`, `imageName`) VALUES
(14, 'test', 'testdsf', '2024-09-14', '1724443390684.png');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `packageId` int(11) NOT NULL,
  `packageName` varchar(255) NOT NULL,
  `packageDescription` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `packageImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `roleId` varchar(50) NOT NULL,
  `roleName` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `roleId`, `roleName`, `status`) VALUES
(1, '001', 'VehicleOwner', 'Active'),
(2, '002', 'GarageOwner', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `userType` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `userType`, `email`, `password`, `createdAt`) VALUES
(1, 'Diluka Theekshana', 'Admin', 'theekshana0815@gmail.com', '$2b$10$ENblwW.m0Tr9294OSZMzMOVspBeV0dxvuU3ZUvq3viC/N55ytZg9S', '2024-08-19 12:14:49'),
(2, 'ABCd', 'GarageOwner', 'abc@gmail.com', '$2b$10$NAqFXPb4IGGgn98MHW1Lwug3FsE9AXyyeBgNCfkmgj7J.H.6gy5iW', '2024-08-19 19:21:08'),
(4, 'ABC', 'VehicleOwner', 'abcd@gmail.com', '$2b$10$5UZsPEZOkCZVZzM3yRHIVuGNG.8fpg9vaB4cMs0RaVtdG5/lTbSx.', '2024-08-23 21:08:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `garages`
--
ALTER TABLE `garages`
  ADD PRIMARY KEY (`garageId`);

--
-- Indexes for table `inquiries`
--
ALTER TABLE `inquiries`
  ADD PRIMARY KEY (`inquiryId`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`newsId`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`offerId`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`packageId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roleId` (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `garages`
--
ALTER TABLE `garages`
  MODIFY `garageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `inquiries`
--
ALTER TABLE `inquiries`
  MODIFY `inquiryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `newsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `offers`
--
ALTER TABLE `offers`
  MODIFY `offerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `packageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
