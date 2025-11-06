import React, { useState, useEffect, useRef } from 'react';
// Importamos los iconos necesarios
import {
    Clock, Users, FileText, CheckCircle, GraduationCap, BarChart3, TrendingUp, Handshake, Shield, Monitor, Book, DollarSign, Target, MessageSquare, Clipboard, Star, BarChartBig, Globe,
    Rocket, Award, ThumbsUp,
    ChevronLeft, ChevronRight,
    LineChart,
    Instagram // Añadido para el footer
} from 'lucide-react';
// Importamos 'AnimatePresence' para el nuevo carrusel y 'useInView' para las animaciones al hacer scroll
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// --- Iconos Personalizados (SVG) ---
// Añadimos iconos SVG para marcas que no están en Lucide

const TiktokIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" {...props} shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
        <path d="M2081 0c55 473 319 755 778 785v532c-266 26-494-93-702-348-22 13-41 26-62 38-117 71-240 123-371 154-124 30-249 39-373 31-280-19-541-118-770-290-316-231-524-555-614-933-94-394-85-816-21-1226 59-369 217-703 458-971 247-273 558-456 906-532 323-71 661-34 967 101 40 18 78 37 115 57v528c-182-77-374-113-570-107-285 9-556 97-791 260-221 152-390 373-490 635-101 264-127 554-79 848 50 299 174 577 363 813 194 240 449 417 740 514 278 91 578 100 866 26 211-53 408-144 584-271v-520c-333 189-722 214-1090 71z" />
    </svg>
);

const WhatsAppIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224-99.6 224-222 0-59.3-25.2-115-67.1-157zm-157 .2c57.1 0 109.7 21.8 149.5 61.5 39.8 39.8 61.5 92.4 61.5 149.5 0 118.7-96.1 214.8-214.8 214.8h-.1c-34.9 0-68.6-9.3-98.6-26.4l-7.1-4.2-73.6 19.3L46.8 396l-4.5-7.4C21.8 358.8 12 323.5 12 287.9 12 169.2 108.1 73.1 226.8 73.1zm106.2 148.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.8-16.2-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
);


// --- BASE DE DATOS CENTRALIZADA (TODAS LAS FUENTES) ---

// 1. Datos del Caso de Estudio Maicao (Carta PDF)
const maicaoCaseStudy = {
    institute: "I. E. N° 6 Jorge Arrieta",
    location: "Maicao, La Guajira",
    oldAverage: 262,
    newAverage: 273,
    increase: 11,
    highScoreBefore: 420,
    highScoreAfter: 447,
};

// 2. DATOS REALES DEL CSV (LIMPIADOS DE CARACTERES CORRUPTOS)
const studentPerformanceData = [
    { name: "KEVIN ESTEBAN ALDERETE LOZANO", score: 353, location: "Cali", lec: 83, mat: 75, soc: 69, cien: 60, ing: 57 },
    { name: "KATY YULIETH TERAN MERCADO", score: 378, location: "Sincelejo", lec: 74, mat: 74, soc: 74, cien: 75, ing: 74 },
    { name: "VALERIA OCAMPO SERPA", score: 438, location: "Turbaco", lec: 100, mat: 76, soc: 76, cien: 100, ing: 84 },
    { name: "RICARDO JESUS NARVAEZ ROSERO", score: 343, location: "Consaca", lec: 69, mat: 68, soc: 76, cien: 61, ing: 69 },
    { name: "BREYNER SANTIAGO URIBE GOMEZ", score: 365, location: "Sabana de Torres", lec: 73, mat: 70, soc: 71, cien: 81, ing: 63 },
    { name: "JHOSEP HERNEY VARGAS VARGAS", score: 443, location: "Aguachica", lec: 100, mat: 78, soc: 79, cien: 100, ing: 81 },
    { name: "ALEJANDRO JOSE NIETO SANABRIA", score: 388, location: "Villa del Rosario", lec: 84, mat: 81, soc: 72, cien: 79, ing: 60 },
    { name: "SAUL DANIEL FONTIVEROS DEJANON", score: 378, location: "Cucuta", lec: 84, mat: 75, soc: 70, cien: 72, ing: 80 },
    { name: "YEFERSON ELIAN URBANO ERASO", score: 374, location: "La Union", lec: 75, mat: 71, soc: 79, cien: 72, ing: 81 },
    { name: "EDUARD SEBASTIAN JIMENEZ MUNOZ", score: 374, location: "Pasto", lec: 73, mat: 68, soc: 82, cien: 78, ing: 70 },
    { name: "CARLOS ORLANDO RUIZ ORTIZ", score: 477, location: "Popayan", lec: 100, mat: 80, soc: 100, cien: 100, ing: 100 },
    { name: "SANTIAGO ANDRES CAMACHO VEGA", score: 478, location: "Bucaramanga", lec: 100, mat: 100, soc: 100, cien: 81, ing: 100 },
    { name: "SAMUEL ANDRES GIL GONZALEZ", score: 377, location: "Bogota D.C.", lec: 74, mat: 72, soc: 77, cien: 76, ing: 82 },
    { name: "JHEAN CARLOS MARIN LEON", score: 418, location: "Cali", lec: 100, mat: 80, soc: 83, cien: 77, ing: 66 },
    { name: "VALENTINA ARCINIEGAS ZAPATA", score: 455, location: "La Tebaida", lec: 100, mat: 100, soc: 80, cien: 81, ing: 100 },
    { name: "DAIRO DUVAN MENDOZA PEINADO", score: 273, location: "Carmen de Darien", lec: 54, mat: 56, soc: 50, cien: 58, ing: 55 },
    { name: "MARIA PAULA MELO RINCON", score: 332, location: "Sogamoso", lec: 61, mat: 73, soc: 70, cien: 66, ing: 54 },
    { name: "LUCY CATALINA SAMBONI ARTUNDUAGA", score: 455, location: "Bogota D.C.", lec: 100, mat: 80, soc: 81, cien: 100, ing: 100 },
    { name: "JOSE ALEJANDRO GOMEZ BERRIO", score: 365, location: "Planeta Rica", lec: 80, mat: 69, soc: 73, cien: 68, ing: 80 },
    { name: "VALENTINA OCAMPO ORDONEZ", score: 453, location: "Palmira", lec: 100, mat: 80, soc: 100, cien: 79, ing: 100 },
    { name: "ERICK ANDREY FANDINO FANDINO", score: 267, location: "Villa de San Diego de Ubate", lec: 57, mat: 52, soc: 58, cien: 52, ing: 36 },
    { name: "DIEGO JOSUE BARBOSA GUZMAN", score: 368, location: "Fortul", lec: 80, mat: 75, soc: 70, cien: 72, ing: 65 },
    { name: "MARIA JOSE ERAZO TORRES", score: 448, location: "Armenia", lec: 100, mat: 79, soc: 82, cien: 100, ing: 82 },
    { name: "ROSA ISABELLA MARIMON CERVANTES", score: 287, location: "San Onofre", lec: 64, mat: 54, soc: 51, cien: 59, ing: 62 },
    { name: "JUAN DAVID GARZON CASTILLO", score: 402, location: "Choconta", lec: 100, mat: 72, soc: 74, cien: 77, ing: 76 },
    { name: "JUAN JOSE QUINCHIA GOMEZ", score: 345, location: "Mompos", lec: 73, mat: 67, soc: 65, cien: 74, ing: 61 },
    { name: "SHARLENE TAPIA RODRIGUEZ", score: 427, location: "Sahagun", lec: 79, mat: 77, soc: 100, cien: 81, ing: 100 },
    { name: "SARA JIMENA PARRA SIACHOQUE", score: 360, location: "Fusagasuga", lec: 68, mat: 74, soc: 72, cien: 71, ing: 81 },
    { name: "JHON ENMANUEL PAYARES CASTRO", score: 386, location: "Arjona", lec: 100, mat: 78, soc: 69, cien: 60, ing: 82 },
    { name: "MARIA DE LOS ANGELES VASQUEZ ARANGO", score: 320, location: "Zarzal", lec: 67, mat: 65, soc: 61, cien: 64, ing: 62 },
    { name: "MARIA ISABEL GARCIA NOVA", score: 420, location: "Bucaramanga", lec: 82, mat: 100, soc: 77, cien: 79, ing: 78 },
    { name: "CAMILA TREJOS ESTERILLA", score: 288, location: "Cali", lec: 70, mat: 50, soc: 53, cien: 56, ing: 61 },
    { name: "ISABELLA MARTINEZ ALMANZA", score: 408, location: "Cerete", lec: 75, mat: 71, soc: 100, cien: 74, ing: 100 },
    { name: "ANGELA SOFIA DIAZ JARABA", score: 404, location: "Sahagun", lec: 100, mat: 74, soc: 74, cien: 77, ing: 73 },
    { name: "MARIA FERNANDA AVILA BENITO REVOLLO", score: 421, location: "Sincelejo", lec: 80, mat: 81, soc: 100, cien: 78, ing: 78 },
    { name: "DARLING SOFIA MATEUS RIOS", score: 339, location: "Bogota D.C.", lec: 62, mat: 66, soc: 75, cien: 67, ing: 72 },
    { name: "LICETH DANIELA CALDERON SAMBONI", score: 477, location: "San Agustin", lec: 100, mat: 80, soc: 100, cien: 100, ing: 100 },
    { name: "JUAN CAMILO DUQUE SOTO", score: 347, location: "Ibague", lec: 71, mat: 67, soc: 74, cien: 67, ing: 65 },
    { name: "JULIO PRADO BARRIOS", score: 360, location: "Sahagun", lec: 78, mat: 68, soc: 68, cien: 76, ing: 67 },
    { name: "LAURA SOFIA PINZON CORDOBA", score: 372, location: "Pasto", lec: 76, mat: 72, soc: 67, cien: 79, ing: 84 },
    { name: "MERLY JASBLEIDY PILLIMUE CORDOBA", score: 318, location: "Pitalito", lec: 71, mat: 53, soc: 63, cien: 68, ing: 62 },
    { name: "LUIS SANTIAGO DE BRIGARD DE LA HOZ", score: 425, location: "Valledupar", lec: 85, mat: 79, soc: 100, cien: 80, ing: 73 },
    { name: "NIKOLL PALACIO MOGOLLON", score: 368, location: "Corozal", lec: 78, mat: 74, soc: 72, cien: 69, ing: 78 },
    { name: "DANNA SOFIA BUITRON VASQUEZ", score: 423, location: "Popayan", lec: 82, mat: 100, soc: 80, cien: 78, ing: 79 },
    { name: "JOEL ANDRES PASTOR MORALES", score: 440, location: "Sincelejo", lec: 100, mat: 100, soc: 73, cien: 80, ing: 84 },
    { name: "LEINER ANDRES IBANEZ CAMARGO", score: 297, location: "Fonseca", lec: 69, mat: 56, soc: 56, cien: 58, ing: 55 },
    { name: "MARIANNA ZHARICK ANGARITA HERNANDEZ", score: 378, location: "Barranquilla", lec: 80, mat: 74, soc: 66, cien: 74, ing: 100 },
    { name: "JESUS DAVID LEONES YEPES", score: 381, location: "San Jacinto", lec: 78, mat: 79, soc: 70, cien: 76, ing: 81 },
    { name: "THOMAS ALEJANDRO LOPEZ GODOY", score: 480, location: "Aguazul", lec: 100, mat: 100, soc: 83, cien: 100, ing: 100 },
    { name: "DANIELA SILVA MIRANDA", score: 425, location: "Sabanagrande", lec: 80, mat: 82, soc: 100, cien: 79, ing: 82 },
    { name: "JOMADI GIRALDO ISAZA", score: 342, location: "Pereira", lec: 81, mat: 64, soc: 59, cien: 68, ing: 74 },
    { name: "JOSE MIGUEL URREA GOMEZ", score: 388, location: "Armenia", lec: 82, mat: 77, soc: 77, cien: 78, ing: 66 },
    { name: "DIEGO ALEJANDRO URBANO", score: 477, location: "Aguachica", lec: 100, mat: 80, soc: 100, cien: 100, ing: 100 },
    { name: "CRISTHIAN YESID COLINA CARDENAS", score: 472, location: "Aguazul", lec: 100, mat: 100, soc: 76, cien: 100, ing: 100 },
    { name: "LESLY KAROLAY VALENCIA LOAIZA", score: 321, location: "Cali", lec: 65, mat: 65, soc: 62, cien: 62, ing: 73 },
    { name: "VALENTINA RODRIGUEZ LOPEZ", score: 467, location: "Barranquilla", lec: 100, mat: 100, soc: 100, cien: 79, ing: 77 },
    { name: "DARLY SARAY PEREZ JAIMES", score: 420, location: "Bucaramanga", lec: 100, mat: 80, soc: 77, cien: 74, ing: 100 },
    { name: "JULIAN JEFFREY NUNEZ CANAS", score: 392, location: "Barrancabermeja", lec: 100, mat: 76, soc: 63, cien: 77, ing: 70 },
    { name: "MARIO RICARDO URUETA ESPANA", score: 457, location: "Cartagena de Indias", lec: 100, mat: 80, soc: 83, cien: 100, ing: 100 },
    { name: "EMILY SOFIA TORRES PACHECO", score: 353, location: "Barranquilla", lec: 80, mat: 68, soc: 67, cien: 67, ing: 71 },
    { name: "JERONIMO OSORIO DIETES", score: 419, location: "Yopal", lec: 83, mat: 77, soc: 100, cien: 76, ing: 82 },
    { name: "DAVID ALEJANDRO TORRES OSORIO", score: 375, location: "Caldas", lec: 85, mat: 69, soc: 72, cien: 75, ing: 71 },
    { name: "FAUNER ANDRES CISNEROS ANGEL", score: 389, location: "San Luis de Palenque", lec: 100, mat: 71, soc: 71, cien: 72, ing: 69 },
    { name: "KARIN JULIETH MARTIN CASTILLO", score: 309, location: "Zipaquira", lec: 60, mat: 70, soc: 60, cien: 54, ing: 71 },
    { name: "YESELIS MORON RAMIREZ", score: 343, location: "Maicao", lec: 77, mat: 70, soc: 68, cien: 62, ing: 72 },
    { name: "MARIA JOSE ARAUJO AGUDELO", score: 392, location: "Cali", lec: 100, mat: 74, soc: 74, cien: 70, ing: 66 },
    { name: "DERLY DAYANA LOPEZ LOPEZ", score: 381, location: "Pasto", lec: 84, mat: 74, soc: 73, cien: 71, ing: 84 },
    { name: "ANGIE SOFIA GRANADOS OCHOA", score: 440, location: "Piedecuesta", lec: 80, mat: 76, soc: 100, cien: 100, ing: 75 },
    { name: "JUAN ALEJANDRO CABRERA SANCHEZ", score: 355, location: "Jamundi", lec: 71, mat: 68, soc: 69, cien: 74, ing: 73 },
    { name: "CRISTIAN DAVID MARIN PASCAL", score: 307, location: "Ricaurte", lec: 62, mat: 71, soc: 62, cien: 48, ing: 70 },
    { name: "YURI MARCELA CERON COMETA", score: 364, location: "Popayan", lec: 70, mat: 74, soc: 77, cien: 70, ing: 74 },
    { name: "KEVIN DARIO SANCHEZ JAIMES", score: 453, location: "Bucaramanga", lec: 100, mat: 100, soc: 83, cien: 81, ing: 86 },
    { name: "ISABELA BARREIRO CARDENAS", score: 372, location: "Neiva", lec: 78, mat: 71, soc: 72, cien: 77, ing: 72 },
    { name: "DIEGO ANDRES PULIDO MENESES", score: 309, location: "El Espinal", lec: 84, mat: 47, soc: 48, cien: 69, ing: 59 },
    { name: "LUIS DAVID RECALDE CASTELLANOS", score: 420, location: "Bogota D.C.", lec: 100, mat: 80, soc: 76, cien: 80, ing: 85 },
    { name: "GUSTAVO CHANTRE RIVERA", score: 465, location: "Popayan", lec: 100, mat: 80, soc: 100, cien: 100, ing: 68 },
    { name: "SARA LUNA PEREZ SOLANO", score: 313, location: "Floridablanca", lec: 62, mat: 71, soc: 54, cien: 64, ing: 62 },
    { name: "ANGEL CAMILO ORDONEZ CASTRO", score: 388, location: "Popayan", lec: 79, mat: 77, soc: 74, cien: 80, ing: 80 },
    { name: "ANGHELO CORRALES GAMBOA", score: 401, location: "Armenia", lec: 100, mat: 75, soc: 68, cien: 77, ing: 83 },
    { name: "KEREN YISELLE SALINAS MENA", score: 367, location: "Aguachica", lec: 77, mat: 72, soc: 69, cien: 79, ing: 64 },
    { name: "MARYORI CONEO MISSE", score: 361, location: "Santa Marta", lec: 79, mat: 68, soc: 69, cien: 74, ing: 69 },
    { name: "JOSEPH ALEXANDER PABON ACOSTA", score: 470, location: "Cali", lec: 100, mat: 80, soc: 100, cien: 100, ing: 83 },
    { name: "ADRIAN JOSE MORENO RAVELO", score: 328, location: "Mompos", lec: 58, mat: 75, soc: 67, cien: 60, ing: 70 },
    { name: "VALERIA ANDREINA ALVAREZ PINTO", score: 335, location: "Lorica", lec: 76, mat: 69, soc: 61, cien: 63, ing: 64 },
    { name: "PEDRO IGNACIO BERNAL ORDUZ", score: 446, location: "Duitama", lec: 100, mat: 80, soc: 73, cien: 100, ing: 100 },
    { name: "MARIANA NAVARRO PEDROZO", score: 308, location: "Guamal", lec: 60, mat: 64, soc: 68, cien: 55, ing: 61 },
    { name: "LUZ ELIANA SANCHEZ TOVAR", score: 314, location: "Neiva", lec: 71, mat: 69, soc: 54, cien: 58, ing: 60 },
    { name: "JOSEPH SAMUEL VALBUENA FLOREZ", score: 385, location: "Ibague", lec: 84, mat: 74, soc: 71, cien: 80, ing: 74 },
    { name: "PAULA DANIELA GUTIERREZ ORTIZ", score: 393, location: "Neiva", lec: 84, mat: 75, soc: 76, cien: 78, ing: 84 },
    { name: "NICOLE DAYAN DE LA ROSA PIMIENTA", score: 380, location: "Sahagun", lec: 81, mat: 69, soc: 75, cien: 77, ing: 82 },
    { name: "SEBASTIAN MARTINEZ PIAMBA", score: 433, location: "Jamundi", lec: 84, mat: 79, soc: 100, cien: 79, ing: 100 },
    { name: "SEBASTIAN DE JESUS OROZCO PASTOR", score: 363, location: "Barranquilla", lec: 82, mat: 66, soc: 71, cien: 73, ing: 68 },
    { name: "CAMILO ANDRADE FRANCO", score: 392, location: "Armenia", lec: 82, mat: 75, soc: 73, cien: 76, ing: 100 },
    { name: "GABRIELA ORTA FIERRO", score: 385, location: "Cartagena de Indias", lec: 74, mat: 73, soc: 83, cien: 76, ing: 83 },
    { name: "SEBASTIAN ISAAC DONADO ACOSTA", score: 284, location: "Baranoa", lec: 64, mat: 51, soc: 52, cien: 59, ing: 60 },
    { name: "NICHOL SERPA MIRANDA", score: 350, location: "Caucasia", lec: 74, mat: 71, soc: 61, cien: 77, ing: 62 },
    { name: "DAYRA MARIANA NIAMPIRA PARRA", score: 358, location: "Samaca", lec: 76, mat: 68, soc: 72, cien: 69, ing: 77 },
    { name: "WILBERT GABRIEL CACERES GONZALEZ", score: 413, location: "Chinacota", lec: 85, mat: 74, soc: 73, cien: 100, ing: 79 },
    { name: "BELEN PAULINA PALACIOS PALACIOS", score: 420, location: "Cuaspud", lec: 100, mat: 80, soc: 79, cien: 78, ing: 81 },
    { name: "ABRIL DANIELA ESPITIA MERCADO", score: 358, location: "San Pelayo", lec: 71, mat: 70, soc: 70, cien: 73, ing: 79 },
    { name: "NATALIA PADILLA VARELA", score: 355, location: "Soledad", lec: 77, mat: 65, soc: 70, cien: 75, ing: 62 },
    { name: "LAURA YISETH VALDERRAMA CARRENO", score: 399, location: "Duitama", lec: 85, mat: 82, soc: 77, cien: 74, ing: 84 },
    { name: "ABRAHAM MONTES VERGARA", score: 358, location: "Majagual", lec: 73, mat: 71, soc: 61, cien: 80, ing: 77 },
    { name: "BELLAIRIS GIRALDO SALAZAR", score: 433, location: "Barrancabermeja", lec: 85, mat: 81, soc: 100, cien: 82, ing: 81 },
    { name: "ANGIE LIZETH QUEJADA SALAS", score: 370, location: "Ibague", lec: 84, mat: 70, soc: 67, cien: 76, ing: 71 },
    { name: "NANCY MILEIDY PUENTES MONROY", score: 477, location: "Ibague", lec: 100, mat: 80, soc: 100, cien: 100, ing: 100 },
    { name: "DAYANIS VERTEL PARRA", score: 362, location: "Monteria", lec: 77, mat: 71, soc: 70, cien: 72, ing: 72 },
    { name: "THOMAS LOPEZ MANCERA", score: 406, location: "Cucuta", lec: 100, mat: 74, soc: 78, cien: 75, ing: 75 },
    { name: "JEAN PIERRE PARRA ROA", score: 299, location: "Piedecuesta", lec: 67, mat: 51, soc: 53, cien: 66, ing: 67 },
    { name: "ILSER URREA MORENO", score: 468, location: "Florencia", lec: 100, mat: 80, soc: 100, cien: 100, ing: 78 },
    { name: "ALIRIO NICOLAS GOMEZ BENAVIDES", score: 363, location: "Tablon de Gomez", lec: 82, mat: 69, soc: 68, cien: 71, ing: 73 },
    { name: "VALERIA CASTILLO FLOREZ", score: 358, location: "San Pelayo", lec: 68, mat: 67, soc: 78, cien: 73, ing: 72 },
    { name: "FABIAN ANDRES BALCAZAR LETRADO", score: 370, location: "Jamundi", lec: 82, mat: 75, soc: 78, cien: 81, ing: 66 },
    { name: "GABRIEL SEBASTIAN URREGO GOMEZ", score: 390, location: "Villanueva", lec: 72, mat: 66, soc: 61, cien: 68, ing: 51 },
    { name: "MARIA CAMILA ESCUDERO NUNEZ", score: 328, location: "Since", lec: 79, mat: 67, soc: 67, cien: 67, ing: 69 },
    { name: "MARIAJOSE RIASCOS RIASCOS", score: 350, location: "Buenaventura", lec: 77, mat: 75, soc: 70, cien: 63, ing: 71 },
    { name: "YERSON DAVID TOSCANO MARTINEZ", score: 356, location: "Sincelejo", lec: 74, mat: 69, soc: 66, cien: 67, ing: 73 },
    { name: "ALEJANDRA VALENTINA MAXI MUNOZ", score: 347, location: "NARINO", lec: 73, mat: 70, soc: 75, cien: 61, ing: 67 },
    { name: "VALERIA MARIA VARGAS YOLY", score: 348, location: "Barranquilla", lec: 75, mat: 75, soc: 72, cien: 66, ing: 66 },
    { name: "ESTEFANIA ALVAREZ DIAZ", score: 358, location: "Turbaco", lec: 64, mat: 70, soc: 65, cien: 74, ing: 74 },
    { name: "HEIDY PAOLA VALENCIA VEGA", score: 343, location: "Cali", lec: 79, mat: 82, soc: 100, cien: 100, ing: 79 },
    { name: "PAULA SOFIA LOPEZ GARCIA", score: 447, location: "Sogamoso", lec: 67, mat: 63, soc: 59, cien: 58, ing: 66 },
    { name: "PAOLA SALAZAR SANCHEZ", score: 310, location: "Cali", lec: 76, mat: 77, soc: 67, cien: 72, ing: 74 },
    { name: "MIGUEL ALFONSO DE JESUS RIVERA PALACIO", score: 365, location: "Soledad", lec: 83, mat: 74, soc: 78, cien: 81, ing: 76 },
    { name: "ISABELLA NAVARRO HERNANDEZ", score: 394, location: "San Pedro de Uraba", lec: 76, mat: 70, soc: 67, cien: 68, ing: 75 },
    { name: "LUIS DAVID RODRIGUEZ MARTINEZ", score: 353, location: "Monteria", lec: 82, mat: 79, soc: 70, cien: 80, ing: 80 },
    { name: "KAREN PATRICIA DE LA CRUZ RAMOS", score: 390, location: "Cartagena De Indias", lec: 83, mat: 79, soc: 78, cien: 76, ing: 80 },
    { name: "JULIETH ANDREINA MONGUE TUEROS", score: 395, location: "San Sebastian De Buenavista", lec: 100, mat: 80, soc: 100, cien: 100, ing: 100 },
    { name: "ADRIANA ESTEFANIA MAYA MAYA", score: 477, location: "Tuquerres", lec: 100, mat: 80, soc: 100, cien: 100, ing: 100 },
    { name: "HELLEN DANIELA MANTILLA CORZO", score: 477, location: "Bucaramanga", lec: 82, mat: 78, soc: 82, cien: 75, ing: 69 },
    { name: "MATEO ANDRES VELEZ PINEDA", score: 392, location: "Malambo", lec: 82, mat: 72, soc: 75, cien: 69, ing: 69 },
    { name: "MARIANA AVILA JULIO", score: 370, location: "Barranquilla", lec: 82, mat: 75, soc: 73, cien: 77, ing: 81 },
    { name: "ELEEN YULIANA ARBOLEDA MORENO", score: 385, location: "Cali", lec: 61, mat: 67, soc: 61, cien: 62, ing: 58 },
    { name: "NAGUAL CAROLINA ROCHA BARRIOS", score: 312, location: "Barranquilla", lec: 100, mat: 100, soc: 76, cien: 100, ing: 85 },
    { name: "ANTONELLA MATEUS BURGOS", score: 467, location: "Barranquilla", lec: 68, mat: 69, soc: 68, cien: 68, ing: 69 },
    { name: "ASHLEY PAJARO PACHECO", score: 342, location: "Soledad", lec: 83, mat: 100, soc: 82, cien: 79, ing: 100 },
    { name: "VALERIE JULIETTE ARDILA GUTIERREZ", score: 435, location: "Bucaramanga", lec: 67, mat: 67, soc: 60, cien: 66, ing: 55 },
    { name: "EDWIN EVILLAN BAUTISTA MALDONADO", score: 321, location: "Yopa", lec: 65, mat: 59, soc: 54, cien: 60, ing: 56 },
    { name: "DENISSE NICOLE HURTADO SERRANO", score: 296, location: "Bogota", lec: 48, mat: 41, soc: 34, cien: 49, ing: 40 },
    { name: "Laura Juliana Escobar Castro", score: 214, location: "Santa Marta", lec: 84, mat: 80, soc: 81, cien: 81, ing: 100 },
    { name: "BRAYAN JAVIER CHINGAL INGUILAN", score: 415, location: "Pasto", lec: 82, mat: 71, soc: 72, cien: 78, ing: 74 },
    { name: "PAULA ISABEL JOJOA BUCHELI", score: 378, location: "Santa Rosa De Cabal", lec: 83, mat: 74, soc: 74, cien: 81, ing: 85 },
    { name: "DIEGO JAVIER JARAMILLO RICARDO", score: 393, location: "Sahagun", lec: 86, mat: 76, soc: 80, cien: 100, ing: 79 },
    { name: "CHIUDACCHANG COLLAZOS TRUJILLO", score: 425, location: "Santander De Quilichao", lec: 86, mat: 100, soc: 76, cien: 100, ing: 79 },
    { name: "JOHAN SAMUEL LOZANO MORALES", score: 448, location: "Armenia", lec: 100, mat: 73, soc: 76, cien: 81, ing: 74 },
    { name: "EMANUEL AGUILAR OSPINA", score: 409, location: "Calarca", lec: 50, mat: 50, soc: 30, cien: 43, ing: 44 },
    { name: "YUSNEILYS DEL CARMEN BLANCO PEREZ", score: 217, location: "San Onofre", lec: 71, mat: 80, soc: 72, cien: 79, ing: 81 },
    { name: "ARIADNA UCHIMA OBANDO", score: 376, location: "Cali", lec: 85, mat: 73, soc: 74, cien: 71, ing: 74 },
    { name: "SOFIA VALENTINA RESTREPO VEGA", score: 378, location: "Cucuta", lec: 68, mat: 67, soc: 64, cien: 64, ing: 64 },
    { name: "Jose David Sanchez Morales", score: 328, location: "Cerrito", lec: 81, mat: 74, soc: 79, cien: 80, ing: 81 },
    { name: "EFRAIN STEVEN MACIAS GARAVITO", score: 393, location: "Giron", lec: 81.6, mat: 79.5, soc: 79.3, cien: 79.6, ing: 79.5 }
];


// 3. Equipo Élite (PDF Profesores)
const tutorData = [
    { name: "Daniel De La Cruz", title: "Fundador/Presidente", specialty: "Liderazgo y Estrategia", experience: "+5 AÑOS", score: "440+", icon: GraduationCap },
    { name: "Angel Pacheco", title: "Vicepresidente", specialty: "Matemáticas y Ciencias", experience: "+3 AÑOS", score: "475", icon: BarChart3 },
    { name: "Viviana Rincón", title: "Tutora Élite", specialty: "Matemáticas e Inglés", experience: "+3 AÑOS", score: "424", icon: CheckCircle },
    { name: "Alexandra Nikol", title: "Tutora Élite", specialty: "Lectura Crítica", experience: "+3 AÑOS", score: "428", icon: Book },
    { name: "David Cardona", title: "Tutor Élite", specialty: "Sociales", experience: "+2 AÑOS", score: "477", icon: Users },
    { name: "José Londoño", title: "Tutor Élite", specialty: "Ciencias Naturales", experience: "+3 AÑOS", score: "450", icon: Shield },
    { name: "Hellen Aranda", title: "Tutora Élite", specialty: "Lectura Crítica", experience: "+1 AÑO", score: "424", icon: Target },
    { name: "León Rodriguez", title: "Líder de Diseño", specialty: "Estrategia Digital", experience: "+2 AÑOS", score: "N/A", icon: Monitor },
];

// 4. Testimonios Reales (Chat Logs)
const testimonialsData = [
    { name: "Angie Soto", quote: "Comparé su contenido con otros grupos y este me parece más eficiente, más barato y con más contenido. Me gusta que las clases sean entretenidas." },
    { name: "Jerónimo", quote: "Los conocí por un amigo. En las clases gratis son muy interactivos y nos explican muy bien. Me gusta que envían preguntas por el grupo." },
    { name: "Laura Díaz", quote: "Ustedes SIEMPRE permanecen activos y con novedades... hablan con más honestidad y presentan preguntas actualizadas. Es un regalo caído del cielo." },
    { name: "Sara Ramírez", quote: "Adquirí un vacacional y la experiencia fue super chévere... me di cuenta que había hecho la mejor inversión que pude haber hecho. Manejan muy buenos precios por toda la calidad que dan." },
    { name: "Josías Acuña", quote: "Conocí Seamos Genios por medio de mi hermano que saco 430... Para mí es el mejor preicfes que pude haber comprado, mezcla la teoría con mucha práctica." },
    { name: "Nicolás Otálvaro", quote: "Participé en los mini simulacros... y quedé asombrado de que en las pruebas me salieron muchas preguntas iguales a las de ese material. Excelente preICFES." },
];

// 5. SALÓN DE LA FAMA MEJORADO (>410 Puntos)
const generateHallOfFame = (data) => {
    // 1. Filtrar estudiantes con puntaje >= 410
    const filteredStudents = data
        .filter(s => s.score >= 410)
        .map(s => ({
            name: s.name,
            score: s.score,
            detail: "Puntaje Sobresaliente",
            location: s.location.split(' - ')[0].split(' (')[0], // Limpia la ubicación
            scores: { lec: s.lec, mat: s.mat, soc: s.soc, cien: s.cien, ing: s.ing },
            img: `https://placehold.co/100x100/E2E8F0/1E293B?text=${s.name.split(' ')[0][0]}${s.name.split(' ').length > 1 ? s.name.split(' ')[1][0] : ''}`
        }));

    // 2. Insertar a Nicole Meneses (500) al principio
    const nicoleMeneses = {
        name: "Nicole Meneses",
        score: 500,
        detail: "Puntaje Perfecto",
        location: "Bucaramanga, Santander",
        scores: { lec: 100, mat: 100, soc: 100, cien: 100, ing: 100 },
        img: "https://placehold.co/100x100/E2E8F0/1E293B?text=NM"
    };

    // 3. Ordenar el resto por puntaje descendente
    const sortedStudents = filteredStudents.sort((a, b) => b.score - a.score);

    // 4. Asegurar que Nicole esté primero
    const existingNicoleIndex = sortedStudents.findIndex(s => s.name === "Nicole Meneses");
    if (existingNicoleIndex > -1) {
        sortedStudents.splice(existingNicoleIndex, 1);
    }
    sortedStudents.unshift(nicoleMeneses);

    return sortedStudents;
};

const hallOfFameData = generateHallOfFame(studentPerformanceData);


// 7. Cálculo de Promedios Reales para el Dashboard
const calculateSubjectAverages = (data) => {
    if (!data || data.length === 0) return [];
    const subjects = ['lec', 'mat', 'soc', 'cien', 'ing'];
    const averages = subjects.map(subject => {
        const total = data.reduce((sum, s) => sum + (s[subject] || 0), 0);
        return { subject, score: Math.round(total / data.length) };
    });
    return averages;
};

// --- Componentes Reutilizables ---

// Componente: Contador Animado
const AnimatedCounter = ({ value, label, unit, icon: Icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const count = useMotionValue(0);
    const rounded = useSpring(count, { duration: 2500, damping: 50, stiffness: 100 });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, value, count]);

    useEffect(() => {
        rounded.on("change", (latest) => {
            setDisplayValue(Math.round(latest));
        });
    }, [rounded]);

    return (
        <motion.div
            ref={ref}
            className="text-center p-4 bg-white rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            <Icon className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <div className="text-4xl md:text-5xl font-extrabold text-slate-800">
                {displayValue.toLocaleString()}{unit}
            </div>
            <p className="mt-2 text-sm md:text-base text-gray-600 font-semibold">{label}</p>
        </motion.div>
    );
};

// Componente: Caso de Estudio (Maicao)
const MaicaoCaseStudy = ({ data }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const AnimatedNumber = ({ endValue, duration = 2000, suffix = '' }) => {
        const count = useMotionValue(data.oldAverage);
        const rounded = useSpring(count, { duration, damping: 50, stiffness: 100 });
        const [displayValue, setDisplayValue] = useState(data.oldAverage);

        useEffect(() => {
            if (isInView) {
                count.set(endValue);
            }
        }, [isInView, endValue, count]);

        useEffect(() => {
            rounded.on("change", (latest) => {
                setDisplayValue(Math.round(latest));
            });
        }, [rounded]);

        return <span className="font-extrabold text-5xl md:text-7xl text-red-600">{displayValue}{suffix}</span>;
    };


    return (
        <motion.div
            ref={ref}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-8 border-red-600"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
        >
            <div className="text-center mb-10">
                <Star className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-slate-800">Prueba de Impacto Institucional (Caso de Éxito)</h3>
                <p className="text-lg text-gray-600 mt-2">Alianza con la <span className="font-bold">I. E. N° 6 Jorge Arrieta</span> (Maicao, La Guajira)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch text-center">

                {/* Columna 1: Promedio Institucional */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border-b-4 border-blue-500 flex flex-col justify-between">
                    <div>
                        <p className="text-base font-semibold text-gray-600 mb-4">Promedio Institucional Saber 11</p>
                        <div className="flex justify-center items-center gap-4">
                            <div className="text-center">
                                <p className="text-xl text-gray-500">Antes (2024)</p>
                                <span className="font-bold text-4xl text-slate-800">{data.oldAverage}</span>
                            </div>
                            <div className="text-4xl md:text-5xl text-red-600">→</div>
                            <div className="text-center">
                                <p className="text-xl text-red-600">Después (2025)</p>
                                <AnimatedNumber endValue={data.newAverage} duration={2500} />
                            </div>
                        </div>
                    </div>
                    <p className="text-base font-bold text-green-600 mt-3 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 mr-1" /> Aumento de {data.increase} puntos
                    </p>
                </div>

                {/* Columna 2: Puntaje Máximo */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-md border-b-4 border-yellow-500 flex flex-col justify-between">
                    <div>
                        <p className="text-base font-semibold text-gray-600 mb-4">Puntaje Máximo Individual</p>
                        <div className="flex justify-center items-center gap-4">
                            <div className="text-center">
                                <p className="text-xl text-gray-500">Antes</p>
                                <span className="font-bold text-4xl text-slate-800">{data.highScoreBefore}</span>
                            </div>
                            <div className="text-4xl md:text-5xl text-red-600">→</div>
                            <div className="text-center">
                                <p className="text-xl text-red-600">Después (2025)</p>
                                <AnimatedNumber endValue={data.highScoreAfter} duration={3000} />
                            </div>
                        </div>
                    </div>
                    <p className="text-base font-bold text-red-600 mt-3 flex items-center justify-center">
                        <Target className="w-4 h-4 mr-1" /> Mejor puntaje de colegio oficial en Maicao.
                    </p>
                </div>

                {/* Columna 3: Testimonio del Rector */}
                <div className="bg-gray-900 p-6 rounded-lg shadow-inner flex flex-col justify-center text-left">
                    <p className="text-lg italic text-gray-300 mb-4">
                        "Damos fe de que su colaboración genera un impacto real en el rendimiento. Recomiendo a SeamosGenios como un valioso aliado..."
                    </p>
                    <div className="border-t pt-4 border-gray-700">
                        <p className="font-bold text-white">Esp. Luis Davila Ramirez</p>
                        <p className="text-sm text-gray-400">Rector, I. E. N° 6 Jorge Arrieta</p>
                        <p className="text-xs text-gray-500 mt-1">Maicao, La Guajira</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Componente: Dashboard del Rector (Simulador Interactivo)
const RectorDashboard = () => {
    const [activeTab, setActiveTab] = useState('fortalezas');
    const subjectAverages = calculateSubjectAverages(studentPerformanceData);

    const subjectColors = { lec: '#ef4444', mat: '#f97316', soc: '#eab308', cien: '#22c55e', ing: '#3b82f6' };

    const BarChart = ({ data }) => (
        <div className="space-y-5">
            {data.sort((a, b) => b.score - a.score).map((item) => (
                <motion.div
                    key={item.subject}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-800 capitalize">
                            {item.subject.replace('mat', 'Matemáticas').replace('lec', 'Lectura').replace('soc', 'Sociales').replace('cien', 'Ciencias').replace('ing', 'Inglés')}
                        </span>
                        <span className="text-sm font-bold" style={{ color: subjectColors[item.subject] }}>{item.score} / 100</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: subjectColors[item.subject] }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.score}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'progress':
                return (
                    <motion.div key="progress" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-4">
                        <div className="col-span-1">
                            <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                                <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" strokeWidth="15" />
                                <motion.circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    fill="none"
                                    stroke="#DC2626"
                                    strokeWidth="15"
                                    strokeDasharray={2 * Math.PI * 50}
                                    strokeDashoffset={(100 - 75) / 100 * (2 * Math.PI * 50)}
                                    strokeLinecap="round"
                                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                                    animate={{ strokeDashoffset: (100 - 75) / 100 * (2 * Math.PI * 50) }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                />
                                <text x="60" y="65" textAnchor="middle" className="text-3xl font-extrabold fill-slate-800">75%</text>
                            </svg>
                        </div>
                        <div className="col-span-2 text-left">
                            <h4 className="text-xl font-bold text-slate-800">Módulo 1: Avance Curricular y Asistencia</h4>
                            <p className="text-gray-600 mt-2">
                                El <span className="font-bold">75%</span> del contenido programático ha sido cubierto. Acceso a reportes detallados de asistencia a clases en vivo y consumo de grabaciones.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <Monitor className="w-5 h-5 text-red-600" />
                                <span className="text-sm font-semibold text-gray-700">Monitoreo de asistencia y consumo individual.</span>
                            </div>
                        </div>
                    </motion.div>
                );
            case 'fortalezas':
                return (
                    <motion.div key="fortalezas" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="p-4">
                        <h4 className="text-xl font-bold text-slate-800 mb-4">Módulo 2: Identificación de Debilidades (Análisis Colectivo)</h4>
                        <BarChart data={calculateSubjectAverages(studentPerformanceData)} />
                        <p className="text-sm text-gray-500 mt-4">*Promedios calculados de nuestra base de datos CSV completa.</p>
                    </motion.div>
                );
            case 'seguimiento':
                return (
                    <motion.div key="seguimiento" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="overflow-x-auto p-4">
                        <h4 className="text-xl font-bold text-slate-800 mb-4">Módulo 3: Muestra de Progreso Individual</h4>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntaje Global</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mejor Materia</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {studentPerformanceData.filter(s => s.score > 430).slice(0, 5).map((s, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-800">{s.name.split(' ').slice(0, 2).join(' ')}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-bold">{s.score}/500</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-semibold">
                                            {s.mat === 100 ? 'Matemáticas (100)' : s.lec === 100 ? 'Lectura Crítica (100)' : 'Varias'}
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3" className="px-4 py-2 text-center text-xs text-gray-500">... {studentPerformanceData.length} estudiantes en la base de datos de éxito.</td>
                                </tr>
                            </tbody>
                        </table>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-2xl border-2 border-red-600/30">
            <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">Demo: Dashboard de Seguimiento Institucional</h3>
            <div className="flex border-b border-gray-200 mb-6 justify-center">
                <button onClick={() => setActiveTab('progress')} className={`px-4 py-2 text-sm font-bold relative transition-colors ${activeTab === 'progress' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}>
                    Avance Curricular
                    {activeTab === 'progress' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full" />}
                </button>
                <button onClick={() => setActiveTab('fortalezas')} className={`px-4 py-2 text-sm font-bold relative transition-colors ${activeTab === 'fortalezas' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}>
                    Análisis de Áreas
                    {activeTab === 'fortalezas' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full" />}
                </button>
                <button onClick={() => setActiveTab('seguimiento')} className={`px-4 py-2 text-sm font-bold relative transition-colors ${activeTab === 'seguimiento' ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}>
                    Muestra de Éxito
                    {activeTab === 'seguimiento' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-t-full" />}
                </button>
            </div>
            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
        </div>
    );
};

// --- SLIDER INTERACTIVO (MEJORADO) ---

// Tarjeta individual para el slider
const HallOfFameCard = ({ student }) => {
    const subjectColors = { lec: '#ef4444', mat: '#f97316', soc: '#eab308', cien: '#22c55e', ing: '#3b82f6' };

    const SubjectBar = ({ subject, score }) => (
        <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold capitalize text-gray-600">{subject.replace('mat', 'Matemáticas').replace('lec', 'Lectura').replace('soc', 'Sociales').replace('cien', 'Ciencias').replace('ing', 'Inglés')}</span>
                <span className="font-bold" style={{ color: subjectColors[subject] }}>{score}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
                <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: subjectColors[subject] }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
        </div>
    );

    return (
        <div className="h-full pt-12 relative">
            <img
                src={student.img}
                alt={`Foto de ${student.name}`}
                className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg absolute top-0 left-1/2 -translate-x-1/2 z-10 object-cover"
                onError={(e) => e.target.src = 'https://placehold.co/100x100/E2E8F0/1E293B?text=SG'}
            />
            <div className={`p-6 pt-16 rounded-2xl shadow-xl h-full flex flex-col ${student.score >= 500 ? 'bg-gradient-to-tr from-yellow-400 to-yellow-500 text-slate-800 border-4 border-yellow-300' : 'bg-white text-slate-800'}`}>

                <div className="text-center">
                    <div className={`text-6xl font-extrabold ${student.score >= 500 ? 'text-red-700' : 'text-red-600'}`}>
                        {student.score}<span className={`text-3xl ${student.score >= 500 ? 'text-slate-700' : 'text-gray-400'}`}>/500</span>
                    </div>
                    <p className={`font-bold mt-2 text-xl ${student.score >= 500 ? 'text-slate-800' : 'text-slate-800'}`}>{student.name}</p>
                    <p className={`text-sm font-medium ${student.score >= 500 ? 'text-slate-700' : 'text-gray-500'}`}>{student.location}</p>
                    <p className={`text-sm font-semibold mt-2 ${student.score >= 500 ? 'text-red-600' : 'text-red-600'}`}>{student.detail}</p>
                </div>
                <div className={`border-t my-4 ${student.score >= 500 ? 'border-yellow-600/50' : 'border-gray-200'}`}></div>
                <div className="flex-grow">
                    <h4 className={`text-sm font-bold mb-3 text-center ${student.score >= 500 ? 'text-slate-800' : 'text-slate-800'}`}>Desglose de Puntajes</h4>
                    {student.scores ? (
                        <div className={`${student.score >= 500 ? '[&_span]:text-slate-700 [&>div>div]:bg-yellow-300' : ''}`}>
                            <SubjectBar subject="lec" score={student.scores.lec} />
                            <SubjectBar subject="mat" score={student.scores.mat} />
                            <SubjectBar subject="soc" score={student.scores.soc} />
                            <SubjectBar subject="cien" score={student.scores.cien} />
                            <SubjectBar subject="ing" score={student.scores.ing} />
                        </div>
                    ) : (
                        <p className={`text-sm text-center ${student.score >= 500 ? 'text-slate-700' : 'text-gray-500'}`}>Desglose no disponible.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Componente Slider Contenedor (MEJORA: Lógica de slidesPerView simplificada)
const HallOfFameSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null);
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth < 640) {
                setSlidesPerView(1);
            } else if (window.innerWidth < 1024) {
                setSlidesPerView(2);
            } else {
                setSlidesPerView(3);
            }
        };

        updateSlidesPerView(); // Set inicial
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    const totalPages = Math.ceil(hallOfFameData.length / slidesPerView);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Efecto para el auto-play
    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(nextSlide, 4000);
        }
        return () => clearInterval(timerRef.current);
    }, [currentIndex, isPaused, totalPages]); // Recalcula si totalPages cambia

    const pauseSlider = () => setIsPaused(true);
    const resumeSlider = () => setIsPaused(false);

    // Determina los slides a mostrar en la vista actual
    const startIndex = currentIndex * slidesPerView;
    const endIndex = startIndex + slidesPerView;
    const visibleSlides = hallOfFameData.slice(startIndex, endIndex);

    // Para el efecto de "relleno" y bucle infinito (opcional pero bueno)
    // Esta lógica asegura que siempre haya 'slidesPerView' tarjetas
    if (visibleSlides.length < slidesPerView && hallOfFameData.length > slidesPerView) {
        const remaining = slidesPerView - visibleSlides.length;
        visibleSlides.push(...hallOfFameData.slice(0, remaining));
    }
    
    // Si hay menos data que slidesPerView, ajustamos totalPages
    const finalTotalPages = hallOfFameData.length <= slidesPerView ? 1 : totalPages;


    return (
        <div className="relative" onMouseEnter={pauseSlider} onMouseLeave={resumeSlider}>
            <div className="overflow-hidden relative">
                <motion.div
                    key={currentIndex} // Clave para forzar la re-animación
                    className="flex"
                    initial={{ x: '0%' }} // Empezamos en la posición 'correcta'
                    animate={{ x: '0%' }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                >
                    {/* Renderizamos solo los slides visibles */}
                    {visibleSlides.map((student, index) => (
                        <div key={`${student.name}-${index}`} style={{ width: `${100 / slidesPerView}%` }} className="flex-shrink-0 p-3 h-full">
                            <HallOfFameCard student={student} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Flechas de Control (solo si hay más de 1 página) */}
            {finalTotalPages > 1 && (
                <>
                    <button onClick={prevSlide} className="absolute top-1/2 left-0 md:-left-4 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg z-10 transition-all">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextSlide} className="absolute top-1/2 right-0 md:-right-4 -translate-y-1/2 bg-white/70 hover:bg-white text-slate-800 p-2 rounded-full shadow-lg z-10 transition-all">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}


            {/* Puntos de Navegación */}
            {finalTotalPages > 1 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {Array.from({ length: finalTotalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === index ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};
// --- FIN DEL SLIDER INTERACTIVO ---


// --- Componente Principal de la Aplicación ---

const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    
    // Efecto para detectar scroll y cambiar el header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- DATOS ESTADÍSTICOS Y MÉTRICAS CALCULADAS ---
    const totalStudentsInDB = studentPerformanceData.length;
    const totalScore = studentPerformanceData.reduce((sum, s) => sum + s.score, 0);
    const averageScore = totalStudentsInDB > 0 ? Math.round(totalScore / totalStudentsInDB) : 0;
    const countOver410 = studentPerformanceData.filter(s => s.score >= 410).length;

    // Métricas de Impacto Global
    const impactMetrics = [
        { value: 500, label: "Puntaje Perfecto Alcanzado", unit: "", icon: Award },
        { value: countOver410, label: "Estudiantes con +410 Puntos", unit: "+", icon: Users },
        { value: averageScore, label: `Promedio General (${totalStudentsInDB} Estudiantes)`, unit: "", icon: BarChart3 },
        { value: 11000, label: "Estudiantes (Grupo Gratuito)", unit: "+", icon: Globe },
    ];
    // --- FIN DE DATOS ESTADÍSTICOS ---

    const BRAND_COLOR_CLASS = 'bg-red-600 hover:bg-red-700 text-white';
    const BRAND_TEXT_COLOR_CLASS = 'text-red-600';

    const customStyles = `
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; background-color: #f8fafc; }
        .hero-bg { background-color: #f8fafc; }
        .text-brand { color: #DC2626; }
        .bg-brand { background-color: #DC2626; }
        .text-slate-800 { color: #1E293B; }
        ::selection { background-color: #fecaca; color: #DC2626; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
    `;

    // Lista de Videos de TikTok
    const videoData = [
        { id: 'video1', title: 'Tips de Estudio', user: '@seamosgenios', thumbnail: 'https://placehold.co/360x640/1a1a1a/FACC15?text=Tip+de+Estudio', link: 'https://vt.tiktok.com/ZSyyNhQCm/' },
        { id: 'video2', title: 'Testimonio Alumno', user: '@seamosgenios', thumbnail: 'https://placehold.co/360x640/1a1a1a/FACC15?text=Testimonio', link: 'https://vt.tiktok.com/ZSyyNhQCm/' },
        { id: 'video3', title: 'Clase Gratuita', user: '@seamosgenios', thumbnail: 'https://placehold.co/360x640/1a1a1a/FACC15?text=Clase+Gratis', link: 'https://vt.tiktok.com/ZSyyNhQCm/' },
    ];
    
    // --- Componente TikTok Card ---
    const TikTokCard = ({ video }) => (
        <motion.a 
            href={video.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden relative aspect-[9/16] group block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
        >
            <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                onError={(e) => e.target.src = 'https://placehold.co/360x640/1a1a1a/FFFFFF?text=Video+No+Disponible'}
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <TiktokIcon className="w-12 h-12 text-white opacity-70 fill-current" />
            </div>
            <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold text-lg drop-shadow-lg">{video.user}</p>
                <p className="text-sm drop-shadow-md">{video.title}</p>
            </div>
        </motion.a>
    );


    return (
        <div className="bg-slate-50 text-slate-800 min-h-screen antialiased">
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {/* Header / Barra de Navegación */}
            <header className={`bg-white sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
                <nav className="container mx-auto px-6 py-4 md:px-12 lg:px-24 flex justify-between items-center">
                    <a href="#inicio" className="text-2xl font-extrabold text-red-600 flex items-center">
                        <Rocket className="w-6 h-6 mr-2" /> SEAMOSGENIOS
                    </a>

                    {/* Menú de Escritorio */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <a href="#metodologia" className="text-gray-600 hover:text-red-600 font-medium transition-colors" onClick={closeMenu}>Servicios</a>
                        <a href="#resultados" className="text-gray-600 hover:text-red-600 font-medium transition-colors" onClick={closeMenu}>Resultados</a>
                        <a href="#equipo" className="text-gray-600 hover:text-red-600 font-medium transition-colors" onClick={closeMenu}>Equipo</a>
                        <a href="#comunidad" className="text-gray-600 hover:text-red-600 font-medium transition-colors" onClick={closeMenu}>Comunidad</a>
                        <a href="#alianza" className="text-red-600 hover:text-red-700 font-semibold transition-colors" onClick={closeMenu}>Para Colegios</a>
                        <a href="#modelos" className={`px-5 py-2.5 rounded-full font-bold transition duration-300 ${BRAND_COLOR_CLASS} shadow-lg hover:shadow-red-500/30 transform hover:scale-105`} onClick={closeMenu}>
                            Inscríbete
                        </a>
                    </div>

                    {/* Botón de Menú Móvil */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-slate-800 focus:outline-none">
                            <motion.div
                                animate={isMenuOpen ? "open" : "closed"}
                                className="w-6 h-6 flex flex-col justify-around"
                            >
                                <motion.span
                                    variants={{
                                        closed: { rotate: 0, y: 0 },
                                        open: { rotate: 45, y: 8 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="block h-0.5 w-full bg-slate-800"
                                ></motion.span>
                                <motion.span
                                    variants={{
                                        closed: { opacity: 1 },
                                        open: { opacity: 0 }
                                    }}
                                    transition={{ duration: 0.1 }}
                                    className="block h-0.5 w-full bg-slate-800"
                                ></motion.span>
                                <motion.span
                                    variants={{
                                        closed: { rotate: 0, y: 0 },
                                        open: { rotate: -45, y: -8 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="block h-0.5 w-full bg-slate-800"
                                ></motion.span>
                            </motion.div>
                        </button>
                    </div>
                </nav>

                {/* Menú Desplegable Móvil */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white shadow-xl w-full absolute overflow-hidden"
                        >
                            <a href="#metodologia" className="block text-lg text-slate-800 text-center py-3 px-6 hover:bg-gray-50" onClick={closeMenu}>Servicios</a>
                            <a href="#resultados" className="block text-lg text-slate-800 text-center py-3 px-6 hover:bg-gray-50" onClick={closeMenu}>Resultados</a>
                            <a href="#equipo" className="block text-lg text-slate-800 text-center py-3 px-6 hover:bg-gray-50" onClick={closeMenu}>Equipo</a>
                            <a href="#comunidad" className="block text-lg text-slate-800 text-center py-3 px-6 hover:bg-gray-50" onClick={closeMenu}>Comunidad</a>
                            <a href="#alianza" className="block text-lg text-red-600 text-center py-3 px-6 hover:bg-gray-50 font-semibold" onClick={closeMenu}>Para Colegios</a>
                            <div className="p-4">
                                <a href="#modelos" className={`block ${BRAND_COLOR_CLASS} text-center py-3 px-6 rounded-full font-semibold`} onClick={closeMenu}>
                                    Inscríbete
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Sección 1: Hero Global */}
            <section id="inicio" className="hero-bg py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-extrabold text-slate-800 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Educación de Élite para <span className={BRAND_TEXT_COLOR_CLASS}>Mentes Extraordinarias.</span>
                    </motion.h1>
                    <motion.p 
                        className="mt-6 text-xl text-gray-700 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        La preparación #1 de Colombia que combina mentores de élite (+420), precios justos y resultados comprobados para superar a toda la competencia.
                    </motion.p>
                    <motion.div 
                        className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <a href="#modelos" className={`${BRAND_COLOR_CLASS} px-8 py-4 rounded-full font-bold transition duration-300 text-lg shadow-xl transform hover:scale-105`}>
                            Inscribirme al PreICFES
                        </a>
                        <a href="#alianza" className={`bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-full font-bold transition duration-300 text-lg shadow-xl transform hover:scale-105`}>
                            Soy una Institución
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Sección 2: Métricas de Impacto Global */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {impactMetrics.map((metric, index) => (
                            <AnimatedCounter key={index} {...metric} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección 3: Salón de la Fama (SLIDER) */}
            <section id="resultados" className="py-20 bg-gray-50">
                <div className="text-center mb-16 px-6">
                    <h2 className="text-4xl font-bold text-slate-800">El Salón de la Fama SeamosGenios (+410)</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                        Resultados reales y verificados. Analiza el desglose de puntajes de nuestros estudiantes de élite.
                    </p>
                </div>
                {/* Contenedor del Slider con padding para las fotos */}
                <div className="container mx-auto px-0 md:px-12 lg:px-24 relative pb-12 pt-12">
                    <HallOfFameSlider />
                </div>
            </section>

            {/* Sección 4: Caso de Estudio Maicao (Prueba B2B) */}
            <section id="alianza" className="py-20 bg-slate-100">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <MaicaoCaseStudy data={maicaoCaseStudy} />
                </div>
            </section>

            {/* Sección 5: Modelos de Alianza */}
            <section id="modelos" className="py-20 bg-gray-900">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white">Nuestra Misión: Democratizar la Excelencia</h2>
                        <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                            Creemos que la educación de élite debe ser accesible. Por eso tenemos un modelo para cada necesidad.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Tarjeta 1: Grupo Gratuito (B2C) */}
                        <motion.div 
                            className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col justify-between transform hover:scale-[1.02] transition duration-300 border border-gray-700"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div>
                                <h3 className="text-3xl font-extrabold text-white">Grupo Gratuito</h3>
                                <p className="text-lg font-bold text-red-400 mb-6">Impacto Social (+11,000 Estudiantes)</p>
                                <ul className="space-y-3 text-gray-300 text-base flex-grow">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" /> Clases en vivo seleccionadas</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" /> Acceso a Compilados Clave</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" /> Simulacros tipo ICFES</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-500 mr-3 mt-1 flex-shrink-0" /> Comunidad de estudio activa</li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <a href="https://wa.me/573042797630?text=Hola,%20quiero%20unirme%20al%20grupo%20gratuito" target="_blank" rel="noopener noreferrer" className={`w-full text-center py-3 rounded-full font-bold transition duration-300 bg-red-600 hover:bg-red-500 text-white shadow-md flex items-center justify-center`}>
                                    <WhatsAppIcon className="w-4 h-4 mr-2 fill-current" /> Unirme Gratis
                                </a>
                            </div>
                        </motion.div>

                        {/* Tarjeta 2: Intensivo (B2C/B2P) - RECOMENDADO */}
                        <motion.div 
                            className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col justify-between border-4 border-red-600 transform scale-105 z-10"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Recomendado</div>
                            <div>
                                <h3 className="text-3xl font-extrabold text-slate-800">PreICFES Intensivo</h3>
                                <p className="text-lg font-bold text-red-600 mb-6 flex items-center"><DollarSign className="w-5 h-5 mr-1" /> $250K COP (Calendario B 2026)</p>
                                <ul className="space-y-3 text-gray-700 text-base flex-grow">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" /> <span className="font-bold">525 horas</span> de clases en vivo (y grabadas)</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" /> Nube privada con <span className="font-bold">+1000 GB</span> de material</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" /> Plataforma web con chat y simulacros</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" /> <span className="font-bold">+106 cuadernillos</span> y compilados</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" /> 4 simulacros completos + minisimulacros</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" /> Consultas ilimitadas con profesores</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" /> Acompañamiento real y constante</li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <a href="https://wa.me/573042797630?text=Hola,%20quiero%20inscribirme%20al%20PreICFES%20Intensivo" target="_blank" rel="noopener noreferrer" className={`w-full text-center py-3 rounded-full font-bold transition duration-300 bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/30 flex items-center justify-center`}>
                                    <WhatsAppIcon className="w-4 h-4 mr-2 fill-current" /> Inscribirme Ahora
                                </a>
                            </div>
                        </motion.div>

                        {/* Tarjeta 3: Institucional (B2B) */}
                        <motion.div 
                            className="bg-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col justify-between transform hover:scale-[1.02] transition duration-300 border border-gray-700"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div>
                                <h3 className="text-3xl font-extrabold text-white">Alianza Institucional</h3>
                                <p className="text-lg font-bold text-red-400 mb-6 flex items-center"><Handshake className="w-5 h-5 mr-1" /> Tarifa de Convenio (B2B)</p>
                                <ul className="space-y-3 text-gray-300 text-base flex-grow">
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" /> <span className="font-bold">Plataforma de Simulacros ($)</span>: Acceso mensual asequible para 10° y 11°.</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" /> <span className="font-bold">PreICFES Completo:</span> Precio especial individual ($200.000).</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" /> <span className="font-bold">Asesoría Docente:</span> Revisión y ajuste de contenidos institucionales.</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" /> <span className="font-bold">Entrega de Material ICFES:</span> Recursos listos para el trabajo en clase.</li>
                                    <li className="flex items-start"><CheckCircle className="w-5 h-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" /> <span className="font-bold">Retroalimentación Dual:</span> Reportes para estudiantes y para el rector (Dashboard).</li>
                                </ul>
                            </div>
                            <div className="mt-8">
                                <a href="#contacto" className={`w-full text-center py-3 rounded-full font-bold transition duration-300 bg-white text-slate-800 shadow-md hover:bg-gray-200 flex items-center justify-center`}>
                                    Solicitar Propuesta
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sección 6: Metodología de Acompañamiento 360° */}
            <section id="metodologia" className="py-20 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-800">Plataforma y Metodología 360°</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
                            No solo damos clases. Ofrecemos un ecosistema de seguimiento que garantiza la mejora continua.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature Card */}
                        <motion.div 
                            className="p-6 bg-gray-50 rounded-2xl shadow-lg border-b-4 border-red-600/50"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <BarChartBig className="w-8 h-8 text-red-600 mb-3" />
                            <h3 className="text-xl font-bold text-slate-800">Pruebas y Simulacros</h3>
                            <p className="text-gray-600 mt-2">Simulacros virtuales interactivos, diseñados para replicar la prueba real y medir el progreso.</p>
                        </motion.div>
                         {/* Feature Card */}
                        <motion.div 
                            className="p-6 bg-gray-50 rounded-2xl shadow-lg border-b-4 border-red-600/50"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Clipboard className="w-8 h-8 text-red-600 mb-3" />
                            <h3 className="text-xl font-bold text-slate-800">Recursos y Grabaciones</h3>
                            <p className="text-gray-600 mt-2">Acceso a +525 horas de contenido grabado y los "Compilados Supremos" (+2000 preguntas).</p>
                        </motion.div>
                         {/* Feature Card */}
                        <motion.div 
                            className="p-6 bg-gray-50 rounded-2xl shadow-lg border-b-4 border-red-600/50"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <MessageSquare className="w-8 h-8 text-red-600 mb-3" />
                            <h3 className="text-xl font-bold text-slate-800">Chat y Colaboración</h3>
                            <p className="text-gray-600 mt-2">Canales de comunicación directa con mentores (+420) y estudiantes para aprendizaje colectivo.</p>
                        </motion.div>
                         {/* Feature Card */}
                        <motion.div 
                            className="p-6 bg-gray-50 rounded-2xl shadow-lg border-b-4 border-red-600/50"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Target className="w-8 h-8 text-red-600 mb-3" />
                            <h3 className="text-xl font-bold text-slate-800">Reportes de Desempeño</h3>
                            <p className="text-gray-600 mt-2">Análisis de resultados para que cada alumno identifique debilidades y siga su progreso.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sección 7: Dashboard del Rector (Interactiva) */}
            <section id="dashboard" className="py-20 bg-slate-100">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            className="lg:order-2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7 }}
                        >
                            <RectorDashboard />
                        </motion.div>
                        <motion.div 
                            className="lg:order-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h2 className="text-4xl font-bold text-slate-800">Visibilidad y Control para Instituciones</h2>
                            <p className="mt-4 text-lg text-gray-700">
                                Nuestro Dashboard (exclusivo para alianzas B2B) brinda reportes en tiempo real sobre el avance, las fortalezas por área y el progreso individual. <span className="font-bold">La transparencia de datos es nuestra garantía.</span>
                            </p>
                            <ul className="mt-6 space-y-3">
                                <li className="flex items-center text-gray-700 font-medium"><LineChart className="w-5 h-5 text-red-600 mr-3" /> Reportes de Desempeño Cuantitativos</li>
                                <li className="flex items-center text-gray-700 font-medium"><BarChart3 className="w-5 h-5 text-red-600 mr-3" /> Identificación de Debilidades Curriculares</li>
                                <li className="flex items-center text-gray-700 font-medium"><Shield className="w-5 h-5 text-red-600 mr-3" /> Monitoreo de Seguridad y Progreso</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sección 8: Equipo y Mentores */}
            <section id="equipo" className="py-20 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-800">Nuestro Capital Humano: La Garantía +420</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-4xl mx-auto">
                            Líderes que no solo obtuvieron puntajes superiores a 420, sino que tienen años de experiencia transformando la educación.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {tutorData.map((tutor, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-6 bg-white rounded-2xl shadow-xl border-b-4 border-red-600 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <tutor.icon className="w-10 h-10 text-red-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-800">{tutor.name}</h3>
                                <p className="text-sm font-semibold text-gray-600">{tutor.specialty}</p>
                                <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
                                    <span className="text-xs font-medium bg-red-100 text-red-700 px-2.5 py-1 rounded-full">{tutor.experience} EXP</span>
                                    {tutor.score !== "N/A" && (
                                        <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">{tutor.score} ICFES</span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección 9: Testimonios Reales (Comunidad B2C) */}
            <section id="comunidad" className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-800">Lo Que Dice Nuestra Comunidad</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                            Extractos reales de nuestro grupo de estudio gratuito. La confianza de miles de estudiantes.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonialsData.map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-red-600"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                <ThumbsUp className="w-6 h-6 text-red-600 mb-3" />
                                <p className="text-gray-700 italic">"{item.quote}"</p>
                                <p className="mt-4 font-bold text-slate-800">- {item.name}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección 10: TikTok (B2C) */}
            <section id="tiktok" className="py-20 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-slate-800">Encuéntranos en TikTok</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                            Sigue a <a href="https://www.tiktok.com/@seamosgenios" target="_blank" rel="noopener noreferrer" className="text-red-600 font-semibold hover:underline">@seamosgenios</a> para tips, hacks de estudio y mucho más.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videoData.map((video) => (
                            <TikTokCard key={video.id} video={video} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sección 11: Contacto Final (CTA) */}
            <section id="contacto" className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="container mx-auto px-6 py-16 md:py-20 md:px-12 lg:px-24 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Inicie su Transformación Académica Hoy.</h2>
                    <p className="text-lg text-red-100 mt-4 max-w-3xl mx-auto">
                        Ya sea un estudiante buscando el puntaje perfecto, o una institución buscando un aliado estratégico, tenemos el plan para usted.
                    </p>
                    <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                        <a href="#modelos" className={`bg-white text-red-600 px-8 py-4 rounded-full font-bold transition duration-300 text-lg shadow-xl transform hover:scale-105`}>
                            Ver Planes (Estudiantes)
                        </a>
                        <a href="mailto:contacto@seamosgenios.com" className={`bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 rounded-full font-bold transition duration-300 text-lg shadow-xl transform hover:scale-105`}>
                            Contactar (Instituciones)
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-800 text-gray-400">
                <div className="container mx-auto px-6 py-10 md:px-12 lg:px-24">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left mb-6 md:mb-0">
                            <div className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start">
                                <Rocket className="w-6 h-6 mr-2" /> SEAMOSGENIOS
                            </div>
                            <p>&copy; {new Date().getFullYear()} SeamosGenios. Todos los derechos reservados.</p>
                            <p className="text-xs mt-2 text-red-400/80">Operación con impacto social y excelencia académica.</p>
                        </div>
                        <div className="flex space-x-6 items-center">
                            <a href="https://www.tiktok.com/@seamosgenios" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                                <TiktokIcon className="w-5 h-5 fill-current" />
                            </a>
                             <a href="https://www.instagram.com/seamosgenios/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="https://wa.me/573042797630" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors">
                                <WhatsAppIcon className="w-5 h-5 fill-current" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
