-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-09-2024 a las 21:27:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `db_traductor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(17) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id`, `cedula`, `nombre`, `apellido`, `correo`, `telefono`, `password`) VALUES
(1, '0803563774', 'Alexander Steven', 'Torres Santa', 'stev74@gmail.com', '0967201167', '$2y$10$wRKDPSpqHv6rj3WQ1Hrg.ucvqBMORDE53.TSaXkeAGQihspvJ8/ZK');

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
(1, '0807675434', 'Manuel', 'Caicedo', 'caice@gmail.com', '', '$2b$10$hqLw7MUArm6CvGRW4wVEAe0Uny4nkHgNbT.JgnLiB0QbDsGE2/Txm'),
(2, '0845234152', 'Alexander', 'Torres', 'alex@gmail.com', '098987675', '$2b$10$1rQtZ81W8bzvbJL9s5lKWe9J3ZkIl/hnAFvRHM.8gylOR1D3diBKS'),
(3, '0876787675', 'Amelia', 'Aguilar', 'amelia@gmail.com', '0924536452', '$2b$10$RXvq1hxSIE78iiLo1QN8c.N76flgrTqmwDL9efiUz9WYLC092yev6'),
(6, '0803563774', 'Alexander Steven', 'Torres Santa', 'stev74@gmail.com', '0967201167', '$2y$10$5H6SeB6zP.fOp5g1Xm7Zr./Qix1n3FhtUJPXuO6i6RtLuBf8r47xq'),
(9, '1400373583', 'Ayuy', 'asdasdas', 'asdasdasd', '13123131', '$2y$10$YIooECs4hkmwRLvEZ1uLROEbHaG1KecAIkRvteqsDsNVcF12E/UqG'),
(10, '2350017170', 'Josue', 'Caicedp', 'caicedo@gmail.com', '0967234567', '$2y$10$JnmvuKWbrVYunH4BGcc95eHmhPNkoLnqTPk3M2/S73aFMJ04q7vxq');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `translations`
--
ALTER TABLE `translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;
