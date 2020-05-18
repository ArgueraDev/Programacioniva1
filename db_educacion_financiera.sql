-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-05-2020 a las 20:44:21
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_educacion_financiera`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

CREATE TABLE `consultas` (
  `idConsulta` int(10) NOT NULL,
  `idLogin` int(10) NOT NULL,
  `consulta` varchar(150) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `consultas`
--

INSERT INTO `consultas` (`idConsulta`, `idLogin`, `consulta`, `fecha`) VALUES
(22, 1, 'hola', '2020-05-07'),
(23, 1, 'esta es una prueba de consulta', '2020-05-07'),
(25, 11, 'Hola', '2020-05-07'),
(29, 1, 'hola', '2020-05-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacion`
--

CREATE TABLE `informacion` (
  `idInformacion` int(10) NOT NULL,
  `titulo` varchar(60) NOT NULL,
  `contenido` varchar(200) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `informacion`
--

INSERT INTO `informacion` (`idInformacion`, `titulo`, `contenido`, `tipo`, `imagen`) VALUES
(2, 'Tasa de interés activa', 'Es la tasa de interés que cobran las entidades financieras al otorgar un crédito', 'Conceptos Básicos', ''),
(3, 'Tasa de interés efectiva', 'es la que las instituciones financieras aplican a los créditos y que incluye la tasa nominal más el cobro del seguro, comisiones e impuestos', 'Conceptos Básicos', ''),
(4, 'Crédito o Préstamo', 'Es un producto financiero a través del cual los bancos, bancos cooperativos o sociedades de ahorro y credito                           nos facilitan una cantidad de dinero a un plazo y costo determina', 'Conceptos Básicos', ''),
(14, '¿Por qué es importante la informacion financiera?', 'La educacion financiera es uno de los motores del desarrollo economico y social ya que tomar desiciones financieras acertadas mejora nuestro nivel de vida', 'Información General', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `idLogin` int(10) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(50) NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`idLogin`, `nombre`, `correo`, `contraseña`, `tipo`, `imagen`) VALUES
(1, 'Roberto', 'roberto@ugb.sv', '12345', 'admin', 'img/usuario.png'),
(11, 'Yasmin', 'yasmin@ugb.sv', '123456', 'usuario', 'img/usuario.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moderar`
--

CREATE TABLE `moderar` (
  `idModerar` int(10) NOT NULL,
  `idLogin` int(10) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `contenido` varchar(200) NOT NULL,
  `fecha` date NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `imagen` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD PRIMARY KEY (`idConsulta`),
  ADD KEY `idLogin` (`idLogin`);

--
-- Indices de la tabla `informacion`
--
ALTER TABLE `informacion`
  ADD PRIMARY KEY (`idInformacion`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`idLogin`);

--
-- Indices de la tabla `moderar`
--
ALTER TABLE `moderar`
  ADD PRIMARY KEY (`idModerar`),
  ADD KEY `idLogin` (`idLogin`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consultas`
--
ALTER TABLE `consultas`
  MODIFY `idConsulta` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `informacion`
--
ALTER TABLE `informacion`
  MODIFY `idInformacion` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `idLogin` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `moderar`
--
ALTER TABLE `moderar`
  MODIFY `idModerar` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD CONSTRAINT `consultas_ibfk_1` FOREIGN KEY (`idLogin`) REFERENCES `login` (`idLogin`);

--
-- Filtros para la tabla `moderar`
--
ALTER TABLE `moderar`
  ADD CONSTRAINT `moderar_ibfk_1` FOREIGN KEY (`idLogin`) REFERENCES `login` (`idLogin`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
