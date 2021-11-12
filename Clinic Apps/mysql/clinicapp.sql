-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 12, 2021 at 06:31 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinicapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `PrescriptionID` int(11) NOT NULL,
  `PrescriptionName` varchar(255) NOT NULL,
  `PrescribedTo` varchar(100) NOT NULL,
  `Token` varchar(100) DEFAULT NULL,
  `PrescriptionStatus` varchar(1) NOT NULL,
  `PrescribedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `DispensedOn` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prescription`
--

INSERT INTO `prescription` (`PrescriptionID`, `PrescriptionName`, `PrescribedTo`, `Token`, `PrescriptionStatus`, `PrescribedOn`, `DispensedOn`) VALUES
(13, 'Paracetamolssss', '4', '764098', '1', '2021-11-01 00:00:00', '2021-11-01 18:13:50'),
(14, 'sinopaccccc', '4', '419700', '1', '2021-11-01 00:00:00', '2021-11-11 15:25:25'),
(15, 'Sinovac', '4', '302604', '0', '2021-11-01 00:00:00', NULL),
(16, 'Sinovac123', '4', '589039', '0', '2021-11-01 00:00:00', NULL),
(17, 'sinopac123', '5', '527740', '0', '2021-11-01 00:00:00', NULL),
(18, 'racun tikus', '4', '696969', '0', '2021-11-01 18:01:15', NULL),
(19, 'Sinovac', '4', '1941102021', '0', '2021-11-01 18:01:55', NULL),
(20, 'Sinovac5555', '4', '2041112021', '0', '2021-11-01 18:03:30', NULL),
(21, 'Paracetamol', '4', '2145112021', '0', '2021-11-05 20:32:19', NULL),
(22, 'Paracetamol666', '5', '2258112021', '1', '2021-11-08 18:49:21', '2021-11-08 18:51:03');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Role` varchar(100) DEFAULT 'Patient'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Name`, `Email`, `Role`) VALUES
(1, 'admin1', 'admin1', 'Ricksonn', 'admin1@admin.com', 'Admin'),
(2, 'doctor1', 'doctor1', 'John Doe', 'johndoe@lunaseekers.com', 'Doctor'),
(3, 'pharma1', 'pharma1', 'Joe', 'Joeee@lunaseekers.com', 'Pharmacist'),
(4, 'patient1', 'patient1', 'Amelia', 'rickson3585@gmail.com', 'Patient'),
(5, 'patient2', 'patient2', 'Watson', 'rickson3585@gmail.com', 'Patient'),
(6, 'patient3', 'patient3', 'Lukeman', 'patient3@patient3.com', 'Patient'),
(7, 'tessttt6666', 'tessttt666', 'tessttt6666', 'tessttt6666', 'Patient'),
(8, 'tessttt123', 'tessttt123', 'tessttt123', 'tessttt123', 'Patient'),
(9, 'tessttt6', 'tessttt56', 'tessttt776', 'tessttt56', 'Doctor'),
(10, 'tessttt', 'tessttt', 'tessttt', 'tessttt', 'Admin'),
(11, 'tessttt1111', 'tessttt', 'tessttt', 'tessttt', 'Admin'),
(12, 'doctor69', 'tessttt', 'tessttt', 'tessttt', 'Doctor'),
(13, 'tessttt78678678678768', 'tessttt', 'tessttt', 'tessttt', 'Patient');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`PrescriptionID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`,`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `PrescriptionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
