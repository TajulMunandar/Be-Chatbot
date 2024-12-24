-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table db_chatbot_umuslim.chatbot_rules
CREATE TABLE IF NOT EXISTS `chatbot_rules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `keywords` text COLLATE utf8mb4_general_ci NOT NULL,
  `answer` text COLLATE utf8mb4_general_ci NOT NULL,
  `fuzzy_threshold` float NOT NULL DEFAULT '0.5',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `question` text COLLATE utf8mb4_general_ci NOT NULL,
  `intent` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chatbot_rules_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_chatbot_umuslim.chatbot_rules: ~12 rows (approximately)
INSERT INTO `chatbot_rules` (`id`, `uuid`, `keywords`, `answer`, `fuzzy_threshold`, `created_at`, `updated_at`, `user_id`, `question`, `intent`) VALUES
	(20, '80c31cab-c882-4051-8730-9f2dcb887406', 'halo,hai,hi,hello,apa kabar,selamat pagi,selamat siang,selamat sore,apa kabar min,Assalamualaikum', 'Halo, apa ada yang bisa saya bantu', 0.5, '2024-10-21 03:36:37', '2024-10-21 03:36:37', 1, '', ''),
	(21, 'd49bc991-997c-4739-b70c-dccc409004eb', 'syarat,syarat pendaftaran,berkas,berkas pendaftaran', 'Syarat pendaftaran:\n1) Menyerahkan Fotocopy ijazah SLTA, Sederajat yang telah dilegalisir sebanyak 3 (tiga) lembar.\n2) Menyerahkan Trankrip Nilai yang telah dilegarlisir sebanyak 3 Lbr.\n3) Surat Keterangan Hasil Ujian (SKHU) yang telah dilegalisir sebanyak 3 Lbr\n4) Pas Foto latar belakang merah ukuran 3x4 cm sebanyak 2 Lbr\n', 0.5, '2024-10-21 05:31:05', '2024-10-21 05:31:05', 1, 'Apa saja syarat untuk mendaftar menjadi mahasiswa baru universitas al muslim?', 'syarat'),
	(22, 'ce585cac-dca7-46e7-bc5a-c9d65221b767', 'waktu pendaftaran,waktu,jadwal pendaftaran,jadwal,kapan', 'Pendaftaran dimulai dari tgl 1 Februari s.d 21 Agustus 2024 (Senin-Sabtu)\n', 0.5, '2024-10-21 05:32:48', '2024-10-21 05:32:48', 1, '', ''),
	(23, 'b9e260ef-9cb4-424c-bdf3-b48eb417bba0', 'tempat, tempat pendaftaran, lokasi pendaftaran, dimana', '1) Kampus Induk, Jl. Almuslim Matangglumpangdua Bireuen-Aceh 24261.\n2) Kampus B, Jl. Merdeka Barat, No. 18.21 Mns Mesjid Cunda, Mns Mesjid, Kec. Muara Dua, Kota Lhokseumawe, Aceh 24355.\n3) Online: www.spmb.umuslim.ac.id\n4) email: almuslim.universitas@yahoo.co.id\n', 0.5, '2024-10-21 05:37:44', '2024-10-21 05:37:44', 1, '', ''),
	(24, '5ba41c82-589a-4fb0-b9fb-169c7676fc57', 'jadwal seleksi, jadwal tes, tes, jadwal seleksi mahasiswa baru, kapan tes, tgl tes, tanggal tes,  tanggal seleksi', 'Seleksi tahap 1  : 1 Nov 2023 s.d 31 Mei 2024\nSeleksi tahap 2 : 1 Juni s.d 19 Juli 2024\nSeleksi tahap 3 : 20 Juli s.d Agustus 2024', 0.5, '2024-10-21 05:40:26', '2024-10-21 05:40:26', 1, '', ''),
	(25, '2609f089-443e-41ce-ac03-6cb366da7abc', 'prodi, program studi, jurusan, jumlah jurusan', 'Pada Universitas Almuslim terdapat 27 Program Studi yang terakreditasi', 0.5, '2024-10-21 05:43:30', '2024-10-21 05:43:30', 1, '', ''),
	(26, '976d7c0e-52bc-48a0-b158-81f057003ce4', 'fakultas, jumlah fakultas, berapa fakultas', 'Pada Universitas Almuslim terdapat 7 Fakultas', 0.5, '2024-10-21 05:45:14', '2024-10-21 05:45:14', 1, '', ''),
	(28, 'dea84f95-b39e-4abc-b53f-644e00931b16', 'satu,dua,tiga,empat,lima,enam,tujuh,delapan,sembilan,sepuluh', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 0.5, '2024-11-18 02:47:12', '2024-11-18 02:47:12', 1, 'Pertanyaan', 'Greeting'),
	(29, 'd92064f6-65cb-4a9a-93ca-ea55bd5a8392', 'ketika', 'ketika', 0.5, '2024-11-20 02:02:26', '2024-11-20 02:02:26', 1, 'ketika', 'ketika'),
	(30, '2836f082-d506-4b96-b6ac-36e2634efdb6', 'data', 'data answer', 0.5, '2024-11-22 02:46:54', '2024-11-22 02:46:54', 1, 'data question', 'beasiswa'),
	(31, '5fa2f5cc-0cbb-4010-bfa9-b5ecbb0a6de7', 'dapat', 'dapat answer', 0.5, '2024-11-22 08:12:07', '2024-11-22 08:12:07', 1, 'dapat question', 'jalur masuk'),
	(32, '9561588d-8e33-41b7-b9d8-c62c3a8305a0', 'kera', 'kera', 0.5, '2024-11-22 08:13:08', '2024-11-22 08:13:08', 1, 'kera', 'beasiswa');

-- Dumping structure for table db_chatbot_umuslim.chat_app
CREATE TABLE IF NOT EXISTS `chat_app` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_app_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_chatbot_umuslim.chat_app: ~32 rows (approximately)
INSERT INTO `chat_app` (`id`, `uuid`, `message`, `user_id`) VALUES
	(1, '7b30b08c-caba-47c2-89c3-c511ac832200', 'Halo admin, saya butuh bantuan!', 1),
	(2, '506370f4-acd5-4226-97e6-e225cd9a353d', 'Assalamualaikum min', 3),
	(3, '6e7057bd-f416-45d0-ada0-0cc8edb134f3', 'Assalamualaikum min', 3),
	(4, '330a31fe-eb39-4599-a41d-e7e8e71d07a9', 'Assalamualaikum min', 9),
	(11, 'f7278120-f8d6-45bc-bb22-4f2a7d20c196', 'Assalamualaikum, ini balasan dari admin.', 1),
	(12, '065b3533-5437-4e22-9d79-055b3c419a15', 'Ada apa', 9),
	(13, '9c4af127-d341-44da-b39b-10fbd0aa7fd3', 'asdas', 3),
	(14, 'd2c8a52c-a3d3-4406-a8c2-86ebe8c488e1', 'dssss', 3),
	(15, '86cf996a-b32e-4237-bc12-80dbf64ebf12', 'halo min', 3),
	(16, '6e50419b-cf39-481d-b59e-ac4fd447aa41', 'Ada apa', 3),
	(17, '49d9548d-646e-4d30-892d-9e67cdd06a74', 'dfdf', 3),
	(18, '941dced1-ef48-4e17-887a-6c58bab61600', 'hai', 3),
	(19, 'be3ed7f4-e1fc-4f0c-91c5-bcf8a4feb292', 'sss', 3),
	(20, 'f954cbaf-7b2e-4b82-b9f2-0eaf925a7522', 'aa', 3),
	(21, '7f9c80fa-6d9b-4c6f-ae83-edd8f1eb7d0d', 'anang kurniawan', 3),
	(22, '2e38b0c3-aa5a-484a-9c43-55d059f15f91', 'jjj', 3),
	(23, 'eff4c7f6-3857-445a-9bb8-658490e0dc60', 'kk', 3),
	(24, '3f90215e-5422-4cf9-9a97-3c245566b9f1', 'kk', 3),
	(25, '67485118-3ba6-4c9e-8cba-e5d3f52cf360', 'halkoooo', 3),
	(26, '9607672d-8aa7-40ff-bdee-a6d47f5b2eb5', 'jj', 9),
	(27, '670a5826-24de-4eb0-bed5-75322a66de01', 'apa hai', 3),
	(28, '53184b0b-7256-42eb-a84d-0efaaff4c92c', 'dsdsd', 3),
	(29, '3a72605b-2a72-4b1e-a719-756b50578b67', 'iya', 3),
	(30, '938c5e9c-a9a8-45ae-b4d9-cdce227cfeef', 'halo min', 3),
	(31, '41a4b159-7736-49d7-b38d-de895dc669d3', 'halo', 3),
	(32, 'aeea1457-4b12-4af5-a5ae-fa142ee66a92', 'hhhaa', 3),
	(33, 'e650e9f3-d807-4d72-a079-c61f84344a8e', 'fasdfdsa', 3),
	(34, '5b07cfbd-0e0b-498f-b0a0-6a4de7adf045', 'iyaa', 3),
	(35, 'f6ffa6b9-c8f8-4653-927c-59dd890f919c', 'asep', 3),
	(36, 'b9447467-59a7-4d51-a282-c239e71a6f3c', 'oke', 3),
	(37, 'badbc87a-958c-41f8-92c9-1dfb7587fcef', 'oke', 3),
	(38, '17b34059-0c1e-4d58-8b39-6d0fe4c17012', 'oi', 3),
	(39, '1a181c0f-b780-4313-8130-feb14b9804df', 'oi', 3),
	(40, 'b3e40f48-cd52-4a97-a06c-0a25c321e520', 'jadi kan', 3),
	(41, '06c75eb4-7c9d-4954-9e58-8e4ce5a1878f', 'tulakan', 3);

-- Dumping structure for table db_chatbot_umuslim.chat_detail
CREATE TABLE IF NOT EXISTS `chat_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `chat_room_id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`),
  KEY `chat_room_id` (`chat_room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `chat_detail_ibfk_1` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chat_detail_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_chatbot_umuslim.chat_detail: ~0 rows (approximately)

-- Dumping structure for table db_chatbot_umuslim.chat_room
CREATE TABLE IF NOT EXISTS `chat_room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_chatbot_umuslim.chat_room: ~0 rows (approximately)

-- Dumping structure for table db_chatbot_umuslim.default_responses
CREATE TABLE IF NOT EXISTS `default_responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `response` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_chatbot_umuslim.default_responses: ~0 rows (approximately)
INSERT INTO `default_responses` (`id`, `uuid`, `response`, `created_at`) VALUES
	(1, 'acbd3ea7-1834-447f-8f3e-d9cce2bac390', 'maaf saya tidak tau, anda bisa tanya lebih detail lagi di chat admin', '2024-09-28 22:45:22');

-- Dumping structure for table db_chatbot_umuslim.intent
CREATE TABLE IF NOT EXISTS `intent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `intent_name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `intent_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table db_chatbot_umuslim.intent: ~0 rows (approximately)

-- Dumping structure for table db_chatbot_umuslim.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_chatbot_umuslim.product: ~4 rows (approximately)
INSERT INTO `product` (`id`, `uuid`, `name`, `price`, `user_id`) VALUES
	(1, '43e2322e-f52c-41fc-b235-8ec9bd3f0632', 'gula merah', 10000, 2),
	(2, 'f51148c0-2e9b-4c01-a320-7fca08155ce1', 'jeruk perut', 10000, 2),
	(5, '1f2a0598-b9fa-42cc-8880-62344445ee2f', 'Lemon', 3000, 1),
	(6, '784d9a36-955b-4fc5-86c8-0b9991bd61cf', 'sate ', 25000, 1);

-- Dumping structure for table db_chatbot_umuslim.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `sid` varchar(36) COLLATE utf8mb4_general_ci NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text COLLATE utf8mb4_general_ci,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_chatbot_umuslim.sessions: ~26 rows (approximately)
INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
	('1FmSVBvMmw1EU1pD3Fa_icwaizKdIczS', '2024-12-18 02:21:57', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"},"userId":"93110a40-8e3b-489e-a253-c5b539a5f816"}', '2024-12-17 01:23:46', '2024-12-17 02:21:57'),
	('2bz1uzU0GyDLbCqX-UXBJdQ0VQYrPNT2', '2024-12-18 01:16:05', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:16:05', '2024-12-17 01:16:05'),
	('2ZYD4SQLVQUTE-CRwMN_B7STOfJZ98tp', '2024-12-18 01:34:27', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:34:27', '2024-12-17 01:34:27'),
	('36TaVue5Bdm1UdLNEVK8bhUdRoQl5bjJ', '2024-12-18 01:37:20', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:37:20', '2024-12-17 01:37:20'),
	('5Q15bnXeeNh6AdeitrQ7dcfNL0Rgd-Oh', '2024-12-18 01:15:50', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:15:50', '2024-12-17 01:15:50'),
	('BplrxVjvqOKhHIx0LMiOunywKbiC_7Fk', '2024-12-18 02:05:31', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 02:05:31', '2024-12-17 02:05:31'),
	('DV6iFIFMezbhLt3BUmfUUrXA52SFnzJc', '2024-12-18 02:05:15', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 02:05:15', '2024-12-17 02:05:15'),
	('e6IqIo-rdNvVfpMOo-I13Gi61k2u9z1C', '2024-12-18 01:22:02', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:22:02', '2024-12-17 01:22:02'),
	('ghvFl_4hk07nOddOfUsgfaqbNyHxfAbc', '2024-12-18 02:05:15', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 02:05:15', '2024-12-17 02:05:15'),
	('hVVrdruwmfC-i8PgA7AklLbv8igpi9Zn', '2024-12-18 01:21:40', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:21:40', '2024-12-17 01:21:40'),
	('hWexqSMsVoHEfdJWkEXe2t77xPbZrhGQ', '2024-12-18 01:34:30', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:34:30', '2024-12-17 01:34:30'),
	('h__UPI5I8LRe58F59eKaR13tro0Bz1-L', '2024-12-18 01:15:59', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:15:59', '2024-12-17 01:15:59'),
	('lZxh_wFxT-rS-pQJ0NGt-I8XMgV3Ul_s', '2024-12-18 01:16:09', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:16:09', '2024-12-17 01:16:09'),
	('moNlUgeOZLQTUgIl3f5eLNpLq2D4x4N5', '2024-12-18 01:22:11', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:22:11', '2024-12-17 01:22:11'),
	('ol6tx66kT4KKugZ74LJdJdPMvJTQzX_x', '2024-12-18 01:15:59', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:15:59', '2024-12-17 01:15:59'),
	('PINevLlEqaFjee4OA4MLMMshh4N6a0lh', '2024-12-18 06:38:19', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"},"userId":"586d9ad6-b5de-4cae-8671-ebe8b6785f9e"}', '2024-12-17 02:05:31', '2024-12-17 06:38:19'),
	('Q_azAaEwgBBX797lJHv6T5VaTNYbGJ2P', '2024-12-18 01:23:46', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:23:46', '2024-12-17 01:23:46'),
	('r8_T-DxKdecB07yASnWL1-240Hh8RXTa', '2024-12-18 01:32:02', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:32:02', '2024-12-17 01:32:02'),
	('RWN62PSED-IpPZNHN76GYfK4f9rCs0mf', '2024-12-18 01:32:04', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:32:04', '2024-12-17 01:32:04'),
	('S9dJHZ2IMlSNxMVERzL9Hmp7VtlF-Y_n', '2024-12-18 02:05:15', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 02:05:15', '2024-12-17 02:05:15'),
	('tqg5q7ex5pQP2TPHdR-OpN-anpUeB4Bl', '2024-12-18 01:16:05', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:16:05', '2024-12-17 01:16:05'),
	('WJ1QqKISf-MsfRIcHO2kualE4SL85yI6', '2024-12-18 01:24:00', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:24:00', '2024-12-17 01:24:00'),
	('XHkOtbK1snkQSgALXBR3vgVIm6hGuXFn', '2024-12-18 01:20:34', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:20:34', '2024-12-17 01:20:34'),
	('XISCsg-AJ7WZZ0IWKrOWw_sUOSe0N839', '2024-12-18 01:22:11', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:22:11', '2024-12-17 01:22:11'),
	('xk5euM9iZTCyB5j7cPIKCtwrG6RTZmqh', '2024-12-18 01:31:38', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:31:38', '2024-12-17 01:31:38'),
	('XnBRSFs7VyU8cwK2FFvPaI8LlmE-SZHR', '2024-12-18 01:37:37', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:37:37', '2024-12-17 01:37:37'),
	('_50vRk_JuKNsFrHkgkpV-0ag2-GONPJX', '2024-12-18 01:15:50', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:15:50', '2024-12-17 01:15:50'),
	('_F4WJ5B6foGdWS-CJ8dnFU8xcW9EpDZi', '2024-12-18 01:22:02', '{"cookie":{"originalMaxAge":null,"expires":null,"secure":false,"httpOnly":true,"path":"/"}}', '2024-12-17 01:22:02', '2024-12-17 01:22:02');

-- Dumping structure for table db_chatbot_umuslim.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table db_chatbot_umuslim.users: ~9 rows (approximately)
INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`) VALUES
	(1, '586d9ad6-b5de-4cae-8671-ebe8b6785f9e', 'admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$m7/WxWodM4eKTBoAozqDTg$P9Sy+GhOpNr1Fx/87WVqPx+CdEeSmdwdagMN+XFTNAI', 'admin'),
	(2, 'b27d1ac3-8a51-4c30-8608-5fe28963b807', 'Anang', 'anang@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$dVflI4tkRvZxHM7DJRbL7g$tBgXVB2O0E/ws8lPAMTVJgbPYTWzIGvhD2RT2YhbHCg', 'super_admin'),
	(3, '93110a40-8e3b-489e-a253-c5b539a5f816', 'user', 'user@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$tKK+zR6u4dWOpBAojBwACQ$9SMngj5O7kJf1jqyjHWqTPWxY9fPi5fDJYAXTKUefMc', 'user'),
	(4, '31f59a22-27c4-48b3-b88a-5857d8c16789', 'Super Admin', 'superadmin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$K0ix+CHrHAN6xOtN3Hhp2g$lxDraUrP1wgobgG609841CvqVBdJ2+BTZrp/SVeD3wY', 'super_admin'),
	(5, '6ba38175-17eb-400f-8c50-6d8c3a4a93d7', 'Kurniawan', 'kurniawan@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$nfxOokbJqjaSIeQ/OvJhrQ$40HSwc7FGdJ2y4WxNiAiAfYE91v/7ihL3FMNddOvMh4', 'admin'),
	(7, '40010bce-5552-4d09-bf80-e11530e95796', 'aaa', 'aaa@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Pm/Nkln44XQh6bsXKSznNQ$eOorT9q+nIielnxbQCP8pU/dcXb3d7dFQEDUXBA9U4c', 'User'),
	(9, 'f7327e3f-7065-40b9-a149-2748ee586874', 'limakali', 'limakali@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$2x5mTidT+vMwgEcCmCmMtQ$rzilYP+61bV29L0ifjnwirX0a+9H0vtlbwcAr14k4o0', 'user'),
	(10, 'f6a4762d-a34e-4ae7-8ad2-a72652db0bf2', 'matematika', 'matematika@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$WxZ9y3eiRvZmCvk8FS3sFQ$80ZNGJRvv0JZ8YD2xZfPlyDzJkUDJ8aCpBIQ/5V1x3I', 'user'),
	(11, '45c99980-f596-43ff-89c8-bc354f2ad6f6', 'kita', 'kita@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$qQA4HUMrPxfs/lqJfSVz9g$mIO2FkKjrmV/zx+29+qjr8uzHG32gr6XFOKSsXIzMsQ', 'User');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
