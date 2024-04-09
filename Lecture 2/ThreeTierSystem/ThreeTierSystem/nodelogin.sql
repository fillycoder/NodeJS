SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "-06:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodelogin`
--

-- --------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `nodelogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodelogin`;


--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `s_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `s_status` int(2) NOT NULL DEFAULT 0,
  `s_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`s_id`, `user_id`, `s_status`, `s_created_at`) VALUES
(1, 4, 2, '2021-11-27 15:41:53'),
(2, 4, 1, '2021-11-27 15:41:57'),
(3, 4, 0, '2021-11-27 15:40:50'),
(4, 5, 0, '2021-11-27 15:41:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(250) NOT NULL,
  `status` int(2) NOT NULL DEFAULT 0,
  `user_type` int(2) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `accounts` (`id`, `name`, `email`, `password`, `status`, `user_type`, `created_at`, `updated_at`) VALUES
(1, 'test', 'test@test.com', 'test', 0, 1, '2021-11-27 02:30:45', '2021-11-27 02:30:45'),
(2, 'staff12', 'staff1@gmail.com', 'staff1@gmail.com', 1, 2, '2021-11-27 15:40:38', '2021-11-27 15:40:38'),
(3, 'staff2', 'staff2@gmail.com', 'staff2@gmail.com', 0, 2, '2021-11-27 15:09:12', '2021-11-27 15:09:12'),
(4, 'customer1', 'customer1@gmail.com', 'customer1@gmail.com', 1, 3, '2021-11-27 15:41:43', '2021-11-27 15:41:43'),
(5, 'customer2', 'customer2@gmail.com', 'customer2@gmail.com', 0, 3, '2021-11-27 02:30:45', '2021-11-27 02:30:45'),
(6, 'staff3', 'staff3@gmail.com', 'staff3@gmail.com', 0, 2, '2021-11-27 15:11:26', '2021-11-27 15:11:26'),
(7, 'customer3', 'customer3@gmail.com', 'customer3@gmail.com', 0, 3, '2021-11-27 15:16:01', '2021-11-27 15:16:01'),
(8, 'emjay2', 'emjay2@gmail.com', 'emjay2@gmail.com', 0, 1, '2021-11-27 15:42:35', '2021-11-27 15:42:35'),
(9, 'emjay3', 'emjay3@gmail.com', 'emjay3@gmail.com', 0, 2, '2021-11-27 15:43:08', '2021-11-27 15:43:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`s_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `s_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
