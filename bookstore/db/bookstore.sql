-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2019 at 05:10 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` int(20) NOT NULL,
  `figure` varchar(100) NOT NULL,
  `added_by` int(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `figure`, `added_by`, `status`, `added_at`) VALUES
(1, 'UX Design Principles', 'One of the most frustrating aspects of a designer’s job is receiving vague feedback from clients, leaders, and peers. The subjectivity inherent in design renders it difficult to create a shared understanding and this shows up frequently in the form of differing opinions of each individual in their design philosophies. The book "UX Design Principles", written by Tarun Kohli, is a compilation of the principles codified by him to bring method to the madness. The book will help the creative teams and product evangelists understand the importance of designs principles. \r\n\r\n                     \r\n\r\n                     \r\n\r\n                    ', 395, 'quovantisbook.png', 1, 'New', '2019-05-02 16:58:03'),
(2, 'How design principles help ', 'One of the most frustrating aspects of a designer’s job is receiving vague feedback from clients, leaders, and peers. The subjectivity inherent in design renders it difficult to create a shared understanding and this shows up frequently in the form of differing opinions of each individual in their design philosophies. The book "UX Design Principles", written by Tarun Kohli, is a compilation of the principles codified by him to bring method to the madness. The book will help the creative teams and product evangelists understand the importance of designs principles. \r\n\r\n                     \r\n\r\n                    ', 390, 'quovantisbook.png', 1, 'New', '2019-05-02 17:00:30'),
(3, 'UX Design Principles', 'One of the most frustrating aspects of a designer’s job is receiving vague feedback from clients, leaders, and peers. The subjectivity inherent in design renders it difficult to create a shared understanding and this shows up frequently in the form of differing opinions of each individual in their design philosophies. The book "UX Design Principles", written by Tarun Kohli, is a compilation of the principles codified by him to bring method to the madness. The book will help the creative teams and product evangelists understand the importance of designs principles. \r\n\r\n                     \r\n\r\n                    ', 390, 'quovantisbook.png', 1, 'New', '2019-05-02 17:00:46'),
(4, 'How design principles help ', 'One of the most frustrating aspects of a designer’s job is receiving vague feedback from clients, leaders, and peers. The subjectivity inherent in design renders it difficult to create a shared understanding and this shows up frequently in the form of differing opinions of each individual in their design philosophies. The book "UX Design Principles", written by Tarun Kohli, is a compilation of the principles codified by him to bring method to the madness. The book will help the creative teams and product evangelists understand the importance of designs principles. \r\n\r\n                     \r\n\r\n                    ', 390, 'quovantisbook.png', 1, 'New', '2019-05-02 17:01:11');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(12) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `profile_picture` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `phone`, `email`, `password`, `address`, `city`, `country`, `profile_picture`) VALUES
(1, 'atul', '9876543210', 'atul@gmail.com', 'atul123', '224 global business park zirakpur, Baby Shower, Baby Shower, Baby Shower, Baby Shower, Auction, Auction, Corporate Event, Auction, Auction, Auction, Auction, Auction, Auction, Auction, Auction, Auction, Auction', 'Zirakpur', 'India', 'atul.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
