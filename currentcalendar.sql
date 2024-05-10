-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2024 at 02:29 AM
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
-- Database: `currentcalendar`
--

-- --------------------------------------------------------

--
-- Table structure for table `predictedperiods`
--

CREATE TABLE `predictedperiods` (
  `predictionID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `startDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `predictedperiods`
--

INSERT INTO `predictedperiods` (`predictionID`, `userID`, `startDate`) VALUES
(7, 2, '2024-05-07'),
(8, 1, '2024-06-08');

-- --------------------------------------------------------

--
-- Table structure for table `trackeddates`
--

CREATE TABLE `trackeddates` (
  `dateID` int(11) NOT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `userID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trackeddates`
--

INSERT INTO `trackeddates` (`dateID`, `startDate`, `endDate`, `userID`) VALUES
(5, '2024-01-08', '2024-01-13', 2),
(6, '2024-02-07', '2024-02-11', 2),
(7, '2024-03-09', '2024-03-13', 2),
(9, '2024-04-10', '2024-04-14', 2),
(10, '2023-12-07', '2023-12-11', 1),
(11, '2024-01-09', '2024-01-14', 1),
(12, '2024-02-09', '2024-02-12', 1),
(13, '2024-03-08', '2024-03-11', 1),
(14, '2024-04-07', '2024-04-11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `firstname`, `lastname`, `password`) VALUES
(1, 'hollywood14', 'Hedy', 'Lamarr', 'wifi'),
(2, 'ogcoder', 'Ada', 'Lovelace', 'byron');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `predictedperiods`
--
ALTER TABLE `predictedperiods`
  ADD PRIMARY KEY (`predictionID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `trackeddates`
--
ALTER TABLE `trackeddates`
  ADD PRIMARY KEY (`dateID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `predictedperiods`
--
ALTER TABLE `predictedperiods`
  MODIFY `predictionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `trackeddates`
--
ALTER TABLE `trackeddates`
  MODIFY `dateID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `predictedperiods`
--
ALTER TABLE `predictedperiods`
  ADD CONSTRAINT `predictedperiods_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userId`);

--
-- Constraints for table `trackeddates`
--
ALTER TABLE `trackeddates`
  ADD CONSTRAINT `trackeddates_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
