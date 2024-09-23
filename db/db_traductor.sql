-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-09-2024 a las 05:43:27
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
(1, '0803563774', 'Alexander Steven', 'Torres Santa', 'steven@gmail.com', '0967201167', '$2y$10$dIz7h49ghSV1vWaGVhcFOOUj2pt72LLjirVvqRLVYD0YZ9Vf7lIQW');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntajes`
--

CREATE TABLE `puntajes` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `puntaje` int(11) NOT NULL,
  `desafio` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntajes`
--

INSERT INTO `puntajes` (`id`, `usuario_id`, `puntaje`, `desafio`, `fecha`) VALUES
(1, 9, 9, 1, '2024-09-23 00:29:52'),
(2, 9, 8, 1, '2024-09-23 00:32:46'),
(3, 9, 6, 1, '2024-09-23 00:34:03'),
(4, 9, 10, 2, '2024-09-23 01:16:36'),
(5, 9, 10, 3, '2024-09-23 01:50:26'),
(6, 9, 7, 4, '2024-09-23 02:31:53'),
(7, 9, 9, 5, '2024-09-23 03:06:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `translations`
--

CREATE TABLE `translations` (
  `id` int(11) NOT NULL,
  `shuar` varchar(255) NOT NULL,
  `espanol` varchar(255) NOT NULL,
  `audio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `translations`
--

INSERT INTO `translations` (`id`, `shuar`, `espanol`, `audio`) VALUES
(1, 'tsatsaka', 'somos', ''),
(2, 'yuku', 'agua', ''),
(3, 'Kawsayki, kikinka imashina?', 'Hola, ¿cómo estás?', ''),
(4, 'Ñukaka Juanmi.', 'Me llamo Juan.', ''),
(5, 'Maylli kawsak?', '¿Dónde está el baño?', ''),
(6, 'Yurakuk aña yachana yuyarichik.', 'Gracias por tu ayuda.', ''),
(7, 'Ñukaka shuk killa?', '¿cuántos años tienes?', ''),
(8, 'apa', 'papá', ''),
(9, 'nuku', 'mamá', ''),
(10, 'kapaku', 'rojo', ''),
(11, 'kinkla', 'azul', ''),
(12, 'kinkla', 'azul', ''),
(13, 'samék', 'verde', ''),
(14, 'yumkumá', 'amarillo', ''),
(15, 'chikichik', 'uno', ''),
(16, 'jímiar', 'dos', ''),
(17, 'mehaínt', 'tres', ''),
(18, 'aintiuk', 'cuatro', ''),
(19, 'uchi', 'hijo', ''),
(20, 'nawánt', 'hija', ''),
(21, 'apachich´', 'abuelo', ''),
(22, 'nukuchich´', 'abuela', ''),
(23, 'sankántiai', 'pelota', ''),
(24, 'yakátai', 'lapices de colores', ''),
(25, 'waátai', 'rompecabezas', ''),
(26, 'kunkuimiach', 'carrito', ''),
(27, 'wea-wea', 'trompo', ''),
(28, 'yawá', 'perro', ''),
(29, 'michik', 'gato', ''),
(30, 'chai', 'oso', ''),
(31, 'uunt yawá', 'tigre', ''),
(32, 'yantána', 'tigrillo', ''),
(33, 'pátu', 'pato', ''),
(34, 'traducir', 'hola', ''),
(35, 'traducir', 'buenos días', ''),
(36, 'traducir', 'buenas tardes', ''),
(37, 'traducir', 'buenas noches', ''),
(38, 'traducir', '¿cómo estás?', ''),
(39, 'traducir', 'adiós', '');

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
(6, '0803563774', 'Alexander Steven', 'Torres Santa', 'steven74@gmail.com', '0967201167', '$2y$10$7egcmuGZoqGH2hvDRPSD..4J88sprbGObSGVFRbLjGDAqJvhmJjza'),
(9, '1400373583', 'Wilmer', 'Ayuy', 'wilmer@gmail.com', '0989876567', '$2y$10$aHqY1KGAIGzKszR1GvIZX.JEd9IdlCY8I7Boql41o1hrDQLJOtFwK'),
(10, '2350017170', 'Carlos', 'Caicedo', 'caicedo@gmail.com', '0967234567', '$2y$10$uZv2aWzBwS.Ob1dj0ATHKexi2TKN1UBFmUfS2G8v2ERCwit7LMB5a');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `puntajes`
--
ALTER TABLE `puntajes`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `puntajes`
--
ALTER TABLE `puntajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `translations`
--
ALTER TABLE `translations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;
