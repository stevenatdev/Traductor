-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-09-2024 a las 20:37:05
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_traductor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `translations`
--

CREATE TABLE `translations` (
  `id` int(11) NOT NULL,
  `shuar` varchar(255) NOT NULL,
  `espanol` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `translations`
--

INSERT INTO `translations` (`id`, `shuar`, `espanol`, `createdAt`, `updatedAt`) VALUES
(1, 'tsatsaka', 'somos', '2024-08-31 21:33:20', '2024-08-31 21:33:20'),
(2, 'yuku', 'agua', '2024-08-31 21:33:20', '2024-08-31 21:33:20'),
(3, 'Kawsayki, kikinka imashina?', 'Hola, ¿cómo estás?', '2024-09-01 01:21:22', '2024-09-01 01:21:22'),
(4, 'Ñukaka Juanmi.', 'Me llamo Juan.', '2024-09-01 01:21:22', '2024-09-01 01:21:22'),
(5, 'Maylli kawsak?', '¿Dónde está el baño?', '2024-09-01 01:21:22', '2024-09-01 01:21:22'),
(6, 'Yurakuk aña yachana yuyarichik.', 'Gracias por tu ayuda.', '2024-09-01 01:21:22', '2024-09-01 01:21:22'),
(7, 'Ñukaka shuk killa?', '¿Cuántos años tienes?', '2024-09-01 01:21:22', '2024-09-01 01:21:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `telefono` varchar(17) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `cedula`, `nombre`, `apellido`, `correo`, `telefono`, `password`) VALUES
(1, '', 'Steven', '', 'steven@gmail.com', '', '$2b$10$hqLw7MUArm6CvGRW4wVEAe0Uny4nkHgNbT.JgnLiB0QbDsGE2/Txm'),
(2, '', 'Alexander Torres', '', 'alex@gmail.com', '', '$2b$10$1rQtZ81W8bzvbJL9s5lKWe9J3ZkIl/hnAFvRHM.8gylOR1D3diBKS'),
(3, '', 'Adnres', '', 'andres@gmail.com', '', '$2b$10$RXvq1hxSIE78iiLo1QN8c.N76flgrTqmwDL9efiUz9WYLC092yev6'),
(6, '0803563774', 'Alexander Steven', 'Torres Santa', 'stev74@gmail.com', '0967201167', '$2y$10$ouy6/1s/wHS0QmY1dWbxYevisIcPgvdblPXC3oLicPKTHy7q2ygV.'),
(8, '0802032169', 'Daniel Enrique', 'Pineda Vernaza', 'verna@gmail.com', '0987364785', '$2y$10$GuwhUa/4t5Iaua8UOVlg4egJoJxKN0P4jjMCyYeb8iNmRiJWlgKqW');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `translations`
--
ALTER TABLE `translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
