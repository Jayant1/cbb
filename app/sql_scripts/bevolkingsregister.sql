-- PostgreSQL schema for bevolkingsregister
-- Generated from Sequelize model definitions
-- Database: bevolkingsregister

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET client_min_messages = WARNING;

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE adres_type_enum AS ENUM ('hoofdverblijf', 'briefadres', 'historisch');
CREATE TYPE burgerlijke_staat_enum AS ENUM ('ongehuwd', 'gehuwd', 'gescheiden', 'weduwe_weduwnaar', 'geregistreerd_partnerschap');
CREATE TYPE documenten_type_enum AS ENUM ('identiteitskaart', 'paspoort', 'verblijfsvergunning', 'rijbewijs');
CREATE TYPE verkrijgingswijze_enum AS ENUM ('geboorte', 'naturalisatie', 'huwelijk', 'optie', 'erkenning');
CREATE TYPE geslacht_enum AS ENUM ('M', 'V', 'X');
CREATE TYPE verblijf_type_enum AS ENUM ('hoofdverblijf', 'domicilie', 'bijadres');

-- ============================================================
-- TABLE: distrikten
-- Model: distrikten.model.js
-- ============================================================

DROP TABLE IF EXISTS distrikten CASCADE;
CREATE TABLE distrikten (
    id          SERIAL PRIMARY KEY,
    distrikt_code VARCHAR(10) NOT NULL,
    distriktnaam  VARCHAR(100) NOT NULL,
    CONSTRAINT distrikten_distrikt_code_key UNIQUE (distrikt_code)
);

INSERT INTO distrikten (id, distrikt_code, distriktnaam) VALUES
(1,  'PAR', 'Paramaribo'),
(2,  'WAN', 'Wanica'),
(3,  'NIC', 'Nickerie'),
(4,  'SAR', 'Saramacca'),
(5,  'COM', 'Commewijne'),
(6,  'MAR', 'Marowijne'),
(7,  'BRO', 'Brokopondo'),
(8,  'SIP', 'Sipaliwini'),
(9,  'COR', 'Coronie'),
(10, 'PAM', 'Para');

SELECT setval('distrikten_id_seq', 10);

-- ============================================================
-- TABLE: landen
-- Model: landen.model.js
-- ============================================================

DROP TABLE IF EXISTS landen CASCADE;
CREATE TABLE landen (
    id        SERIAL PRIMARY KEY,
    land_code VARCHAR(3)   NOT NULL,
    landnaam  VARCHAR(100) NOT NULL,
    CONSTRAINT landen_land_code_key UNIQUE (land_code)
);

INSERT INTO landen (id, land_code, landnaam) VALUES
(1, 'SUR', 'Suriname'),
(2, 'NLD', 'Nederland'),
(3, 'GUY', 'Guyana'),
(4, 'FRA', 'Frankrijk');

SELECT setval('landen_id_seq', 4);

-- ============================================================
-- TABLE: nationaliteiten
-- Model: nationaliteiten.model.js
-- ============================================================

DROP TABLE IF EXISTS nationaliteiten CASCADE;
CREATE TABLE nationaliteiten (
    id                  SERIAL PRIMARY KEY,
    nationaliteit_code  VARCHAR(3)   NOT NULL,
    nationaliteit_naam  VARCHAR(100) NOT NULL,
    CONSTRAINT nationaliteiten_nationaliteit_code_key UNIQUE (nationaliteit_code)
);

INSERT INTO nationaliteiten (id, nationaliteit_code, nationaliteit_naam) VALUES
(1, 'SUR', 'Surinaams'),
(2, 'NLD', 'Nederlands'),
(3, 'GUY', 'Guyaans'),
(4, 'BRA', 'Braziliaans');

SELECT setval('nationaliteiten_id_seq', 4);

-- ============================================================
-- TABLE: wijken
-- Model: wijken.model.js
-- ============================================================

DROP TABLE IF EXISTS wijken CASCADE;
CREATE TABLE wijken (
    id           SERIAL PRIMARY KEY,
    distrikten_id  INT          NOT NULL,
    wijk_code    VARCHAR(10)  NOT NULL,
    wijknaam     VARCHAR(100) NOT NULL,
    CONSTRAINT wijken_wijk_code_key UNIQUE (wijk_code),
    CONSTRAINT wijken_ibfk_1 FOREIGN KEY (distrikten_id) REFERENCES distrikten (id)
);

INSERT INTO wijken (id, distrikten_id, wijk_code, wijknaam) VALUES
(1, 1, 'PAR-CEN', 'Centrum'),
(2, 1, 'PAR-RAI', 'Rainville'),
(3, 1, 'PAR-FLO', 'Flora'),
(4, 1, 'PAR-KOM', 'Koningsstraat'),
(5, 1, 'PAR-ZOR', 'Zorg en Hoop');

SELECT setval('wijken_id_seq', 5);

-- ============================================================
-- TABLE: personen
-- Model: persoon.model.js  (model name: "persoon", table: "personen")
-- ============================================================

DROP TABLE IF EXISTS personen CASCADE;
CREATE TABLE personen (
    id                      SERIAL PRIMARY KEY,
    identificatienummer     VARCHAR(20)  NOT NULL,
    voornamen               VARCHAR(200) NOT NULL,
    achternaam              VARCHAR(100) NOT NULL,
    geboortedatum           DATE         NOT NULL,
    geboorteplaats          VARCHAR(100) DEFAULT NULL,
    landen_id               INT          DEFAULT NULL,
    geslacht                geslacht_enum NOT NULL,
    burgerlijke_staat       burgerlijke_staat_enum NOT NULL,
    nationaliteiten_id      INT          DEFAULT NULL,
    overlijdensdatum        DATE         DEFAULT NULL,
    overlijdensplaats       VARCHAR(100) DEFAULT NULL,
    datum_aanmaak           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    datum_laatste_wijziging TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT personen_identificatienummer_key UNIQUE (identificatienummer),
    CONSTRAINT personen_ibfk_landen FOREIGN KEY (landen_id) REFERENCES landen (id),
    CONSTRAINT personen_ibfk_nationaliteiten FOREIGN KEY (nationaliteiten_id) REFERENCES nationaliteiten (id)
);

CREATE INDEX idx_personen_achternaam    ON personen (achternaam);
CREATE INDEX idx_personen_geboortedatum ON personen (geboortedatum);

INSERT INTO personen (id, identificatienummer, voornamen, achternaam, geboortedatum, geboorteplaats, landen_id, geslacht, burgerlijke_staat, nationaliteiten_id, overlijdensdatum, overlijdensplaats, datum_aanmaak, datum_laatste_wijziging) VALUES
(1,  'IC001985', 'Jan Willem',      'Aboikoni',                 '1985-01-23', 'Paramaribo', 1, 'M', 'gehuwd',                    1, NULL, NULL, '2026-02-17 14:20:11', '2026-02-17 14:20:11'),
(2,  'IC007890', 'Maria Sophia',   'Aboikoni-Kasanpawiro',     '1987-05-15', 'Nickerie',   1, 'V', 'gehuwd',                    1, NULL, NULL, '2026-02-17 14:20:11', '2026-02-17 14:20:11'),
(3,  'IC007895', 'Ravi Kumar',     'Ramkhelawan',              '1990-08-10', 'Paramaribo', 1, 'M', 'ongehuwd',                  1, NULL, NULL, '2026-02-21 21:26:00', '2026-02-21 21:26:00'),
(4,  'IC002310', 'Priya Devi',     'Sital',                    '1992-03-14', 'Paramaribo', 1, 'V', 'ongehuwd',                  1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(5,  'IC003874', 'Winston',        'Boldewijn',                '1978-11-02', 'Wanica',     1, 'M', 'gehuwd',                    1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(6,  'IC004561', 'Anita',          'Doerga',                   '1983-06-25', 'Paramaribo', 1, 'V', 'gescheiden',                1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(7,  'IC005101', 'Carlos',         'Fernandes',                '1995-09-17', 'Nickerie',   1, 'M', 'ongehuwd',                  1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(8,  'IC005202', 'Sunita',         'Ramlakhan',                '1988-04-30', 'Paramaribo', 1, 'V', 'gehuwd',                    1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(9,  'IC005303', 'Jerome',         'Waterberg',                '1975-12-08', 'Commewijne', 1, 'M', 'weduwe_weduwnaar',          1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(10, 'IC008123', 'Fatima',         'Alibaks',                  '2000-07-19', 'Paramaribo', 1, 'V', 'ongehuwd',                  1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(11, 'IC009456', 'Daniël',         'Kromosoeto',               '1969-02-11', 'Saramacca',  1, 'M', 'gehuwd',                    1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(12, 'IC010001', 'Lisette',        'Pengel',                   '1991-08-03', 'Paramaribo', 1, 'V', 'geregistreerd_partnerschap', 1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(13, 'IC010002', 'Marcus',         'Telgt',                    '1986-05-22', 'Wanica',     1, 'M', 'gehuwd',                    1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(14, 'IC010003', 'Reshma',         'Jhinkoe',                  '1993-10-15', 'Paramaribo', 1, 'V', 'ongehuwd',                  1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(15, 'IC010004', 'Erwin',          'Naarendorp',               '1980-01-27', 'Nickerie',   1, 'M', 'gescheiden',                1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(16, 'IC010005', 'Chandra',        'Misier',                   '1997-03-09', 'Paramaribo', 1, 'V', 'ongehuwd',                  1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00'),
(17, 'IC010006', 'Humphrey',       'Bouterse',                 '1972-11-30', 'Paramaribo', 1, 'M', 'gehuwd',                    1, NULL, NULL, '2026-02-22 10:00:00', '2026-02-22 10:00:00');

SELECT setval('personen_id_seq', 17);

-- ============================================================
-- TABLE: adressen
-- Model: adres.model.js  (model name: "adres", table: "adressen")
-- ============================================================

DROP TABLE IF EXISTS adressen CASCADE;
CREATE TABLE adressen (
    id          SERIAL PRIMARY KEY,
    straatnaam  VARCHAR(200) NOT NULL,
    huisnummer  VARCHAR(20)  NOT NULL,
    toevoeging  VARCHAR(20)  DEFAULT NULL,
    wijken_id     INT          NOT NULL,
    distrikten_id INT          NOT NULL,
    landen_id     INT          NOT NULL,
    adres_type  adres_type_enum NOT NULL,
    CONSTRAINT adressen_ibfk_wijken     FOREIGN KEY (wijken_id)     REFERENCES wijken     (id),
    CONSTRAINT adressen_ibfk_distrikten FOREIGN KEY (distrikten_id) REFERENCES distrikten (id),
    CONSTRAINT adressen_ibfk_landen     FOREIGN KEY (landen_id)     REFERENCES landen     (id)
);

CREATE INDEX idx_adressen_wijk     ON adressen (wijken_id);
CREATE INDEX idx_adressen_distrikt ON adressen (distrikten_id);

INSERT INTO adressen (id, straatnaam, huisnummer, toevoeging, wijken_id, distrikten_id, landen_id, adres_type) VALUES
(1,  'Henck Arronstraat',     '42',  'A',  1, 1, 1, 'hoofdverblijf'),
(2,  'Kernkampweg',           '15',  NULL, 2, 1, 1, 'hoofdverblijf'),
(3,  'Indira Gandhiweg',      '88',  NULL, 3, 1, 1, 'hoofdverblijf'),
(4,  'Kwattaweg',             '210', NULL, 4, 1, 1, 'hoofdverblijf'),
(5,  'Zorg en Hoop Pad',      '7',   'B',  5, 1, 1, 'hoofdverblijf'),
(6,  'Saramaccastraat',       '33',  NULL, 1, 1, 1, 'hoofdverblijf'),
(7,  'Mahonylaan',            '5',   NULL, 2, 1, 1, 'hoofdverblijf'),
(8,  'Verlengde Gemenelandsweg', '120', NULL, 3, 1, 1, 'hoofdverblijf'),
(9,  'Nieuwe Domineestraat',  '9',   NULL, 1, 1, 1, 'hoofdverblijf'),
(10, 'Tourtonnelaan',         '44',  NULL, 4, 1, 1, 'hoofdverblijf'),
(11, 'Coppenamestraat',       '67',  NULL, 5, 1, 1, 'hoofdverblijf'),
(12, 'Frederikstraat',        '18',  NULL, 1, 1, 1, 'hoofdverblijf'),
(13, 'Lim A Postraat',        '3',   'C',  2, 1, 1, 'hoofdverblijf'),
(14, 'Blauwgrond',            '55',  NULL, 3, 1, 1, 'hoofdverblijf'),
(15, 'Jagernath Lachmonstraat', '101', NULL, 4, 1, 1, 'hoofdverblijf'),
(16, 'Welgedacht A',          '22',  NULL, 5, 1, 1, 'hoofdverblijf'),
(17, 'Pontbuiten',            '8',   NULL, 1, 1, 1, 'hoofdverblijf');

SELECT setval('adressen_id_seq', 17);

-- ============================================================
-- TABLE: verblijven
-- Model: verblijf.model.js  (model name: "verblijf", table: "verblijven")
-- ============================================================

DROP TABLE IF EXISTS verblijven CASCADE;
CREATE TABLE verblijven (
    id                  SERIAL PRIMARY KEY,
    personen_id         INT  NOT NULL,
    adressen_id         INT  NOT NULL,
    inschrijvingsdatum  DATE NOT NULL,
    uitschrijvingsdatum DATE DEFAULT NULL,
    verblijf_type       verblijf_type_enum NOT NULL,
    is_actief           BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT verblijven_ibfk_personen FOREIGN KEY (personen_id) REFERENCES personen (id),
    CONSTRAINT verblijven_ibfk_adressen  FOREIGN KEY (adressen_id) REFERENCES adressen  (id)
);

INSERT INTO verblijven (id, personen_id, adressen_id, inschrijvingsdatum, uitschrijvingsdatum, verblijf_type, is_actief) VALUES
(1,  1,  1,  '2010-03-01', NULL, 'hoofdverblijf', TRUE),
(2,  2,  2,  '2012-07-15', NULL, 'hoofdverblijf', TRUE),
(3,  3,  3,  '2015-01-20', NULL, 'hoofdverblijf', TRUE),
(4,  4,  4,  '2018-05-10', NULL, 'hoofdverblijf', TRUE),
(5,  5,  5,  '2008-09-01', NULL, 'hoofdverblijf', TRUE),
(6,  6,  6,  '2011-11-23', NULL, 'hoofdverblijf', TRUE),
(7,  7,  7,  '2019-02-14', NULL, 'hoofdverblijf', TRUE),
(8,  8,  8,  '2013-06-30', NULL, 'hoofdverblijf', TRUE),
(9,  9,  9,  '2005-04-17', NULL, 'hoofdverblijf', TRUE),
(10, 10, 10, '2021-08-05', NULL, 'hoofdverblijf', TRUE),
(11, 11, 11, '2000-12-01', NULL, 'hoofdverblijf', TRUE),
(12, 12, 12, '2016-03-22', NULL, 'hoofdverblijf', TRUE),
(13, 13, 13, '2014-10-09', NULL, 'hoofdverblijf', TRUE),
(14, 14, 14, '2017-07-18', NULL, 'hoofdverblijf', TRUE),
(15, 15, 15, '2009-01-11', NULL, 'hoofdverblijf', TRUE),
(16, 16, 16, '2022-04-03', NULL, 'hoofdverblijf', TRUE),
(17, 17, 17, '2003-08-25', NULL, 'hoofdverblijf', TRUE);

SELECT setval('verblijven_id_seq', 17);

-- ============================================================
-- TABLE: documenten
-- Model: document.model.js  (model name: "document", table: "documenten")
-- ============================================================

DROP TABLE IF EXISTS documenten CASCADE;
CREATE TABLE documenten (
    id                    SERIAL PRIMARY KEY,
    personen_id           INT          NOT NULL,
    document_type         documenten_type_enum NOT NULL,
    document_nummer       VARCHAR(50)  NOT NULL,
    uitgiftedatum         DATE         NOT NULL,
    vervaldatum           DATE         NOT NULL,
    uitgevende_instantie  VARCHAR(100) NOT NULL,
    CONSTRAINT documenten_document_nummer_key UNIQUE (document_nummer),
    CONSTRAINT documenten_ibfk_personen FOREIGN KEY (personen_id) REFERENCES personen (id) ON DELETE CASCADE
);

CREATE INDEX idx_documenten_persoon ON documenten (personen_id);

INSERT INTO documenten (id, personen_id, document_type, document_nummer, uitgiftedatum, vervaldatum, uitgevende_instantie) VALUES
(1,  1,  'identiteitskaart', 'SUR-IC-001985', '2020-01-15', '2030-01-15', 'Ministerie van Binnenlandse Zaken'),
(2,  2,  'identiteitskaart', 'SUR-IC-007890', '2019-06-01', '2029-06-01', 'Ministerie van Binnenlandse Zaken'),
(3,  3,  'identiteitskaart', 'SUR-IC-007895', '2021-03-10', '2031-03-10', 'Ministerie van Binnenlandse Zaken'),
(4,  4,  'identiteitskaart', 'SUR-IC-002310', '2022-05-20', '2032-05-20', 'Ministerie van Binnenlandse Zaken'),
(5,  5,  'identiteitskaart', 'SUR-IC-003874', '2018-09-14', '2028-09-14', 'Ministerie van Binnenlandse Zaken'),
(6,  6,  'identiteitskaart', 'SUR-IC-004561', '2020-11-30', '2030-11-30', 'Ministerie van Binnenlandse Zaken'),
(7,  7,  'identiteitskaart', 'SUR-IC-005101', '2023-01-07', '2033-01-07', 'Ministerie van Binnenlandse Zaken'),
(8,  8,  'identiteitskaart', 'SUR-IC-005202', '2019-08-22', '2029-08-22', 'Ministerie van Binnenlandse Zaken'),
(9,  9,  'identiteitskaart', 'SUR-IC-005303', '2017-04-05', '2027-04-05', 'Ministerie van Binnenlandse Zaken'),
(10, 10, 'identiteitskaart', 'SUR-IC-008123', '2021-12-18', '2031-12-18', 'Ministerie van Binnenlandse Zaken'),
(11, 11, 'identiteitskaart', 'SUR-IC-009456', '2016-07-29', '2026-07-29', 'Ministerie van Binnenlandse Zaken'),
(12, 12, 'identiteitskaart', 'SUR-IC-010001', '2022-02-14', '2032-02-14', 'Ministerie van Binnenlandse Zaken'),
(13, 13, 'identiteitskaart', 'SUR-IC-010002', '2020-09-03', '2030-09-03', 'Ministerie van Binnenlandse Zaken'),
(14, 14, 'identiteitskaart', 'SUR-IC-010003', '2023-06-11', '2033-06-11', 'Ministerie van Binnenlandse Zaken'),
(15, 15, 'identiteitskaart', 'SUR-IC-010004', '2018-03-27', '2028-03-27', 'Ministerie van Binnenlandse Zaken'),
(16, 16, 'identiteitskaart', 'SUR-IC-010005', '2024-01-09', '2034-01-09', 'Ministerie van Binnenlandse Zaken'),
(17, 17, 'identiteitskaart', 'SUR-IC-010006', '2015-10-16', '2025-10-16', 'Ministerie van Binnenlandse Zaken');

SELECT setval('documenten_id_seq', 17);

-- ============================================================
-- TABLE: burgerlijke_staat_historie
-- Model: burgerlijke_staat_historie.model.js
-- ============================================================

DROP TABLE IF EXISTS burgerlijke_staat_historie CASCADE;
CREATE TABLE burgerlijke_staat_historie (
    id                SERIAL PRIMARY KEY,
    personen_id       INT  NOT NULL,
    burgerlijke_staat burgerlijke_staat_enum NOT NULL,
    wijzigingsdatum   DATE NOT NULL,
    akte_nummer       VARCHAR(50)  DEFAULT NULL,
    plaats_registratie VARCHAR(100) DEFAULT NULL,
    CONSTRAINT burgerlijke_staat_historie_ibfk_personen FOREIGN KEY (personen_id) REFERENCES personen (id) ON DELETE CASCADE
);

INSERT INTO burgerlijke_staat_historie (id, personen_id, burgerlijke_staat, wijzigingsdatum, akte_nummer, plaats_registratie) VALUES
(1,  1,  'ongehuwd', '2005-01-01', NULL,          'Paramaribo'),
(2,  1,  'gehuwd',   '2012-06-15', 'AK-2012-0615', 'Paramaribo'),
(3,  2,  'ongehuwd', '2005-01-01', NULL,          'Nickerie'),
(4,  2,  'gehuwd',   '2012-06-15', 'AK-2012-0616', 'Paramaribo'),
(5,  3,  'ongehuwd', '2008-08-10', NULL,          'Paramaribo'),
(6,  4,  'ongehuwd', '2010-03-14', NULL,          'Paramaribo'),
(7,  5,  'ongehuwd', '1996-11-02', NULL,          'Wanica'),
(8,  5,  'gehuwd',   '2005-04-20', 'AK-2005-0420', 'Paramaribo'),
(9,  6,  'ongehuwd', '2001-06-25', NULL,          'Paramaribo'),
(10, 6,  'gehuwd',   '2008-09-10', 'AK-2008-0910', 'Paramaribo'),
(11, 6,  'gescheiden','2018-03-05', 'AK-2018-0305', 'Paramaribo'),
(12, 7,  'ongehuwd', '2013-09-17', NULL,          'Nickerie'),
(13, 8,  'ongehuwd', '2006-04-30', NULL,          'Paramaribo'),
(14, 8,  'gehuwd',   '2014-11-22', 'AK-2014-1122', 'Paramaribo'),
(15, 9,  'ongehuwd', '1993-12-08', NULL,          'Commewijne'),
(16, 9,  'gehuwd',   '2001-07-14', 'AK-2001-0714', 'Paramaribo'),
(17, 9,  'weduwe_weduwnaar', '2019-02-28', 'AK-2019-0228', 'Paramaribo'),
(18, 10, 'ongehuwd', '2018-07-19', NULL,          'Paramaribo'),
(19, 11, 'ongehuwd', '1987-02-11', NULL,          'Saramacca'),
(20, 11, 'gehuwd',   '1995-08-03', 'AK-1995-0803', 'Paramaribo'),
(21, 12, 'ongehuwd', '2009-08-03', NULL,          'Paramaribo'),
(22, 12, 'geregistreerd_partnerschap', '2020-05-17', 'AK-2020-0517', 'Paramaribo'),
(23, 13, 'ongehuwd', '2004-05-22', NULL,          'Wanica'),
(24, 13, 'gehuwd',   '2013-09-08', 'AK-2013-0908', 'Paramaribo'),
(25, 14, 'ongehuwd', '2011-10-15', NULL,          'Paramaribo'),
(26, 15, 'ongehuwd', '1998-01-27', NULL,          'Nickerie'),
(27, 15, 'gehuwd',   '2007-06-19', 'AK-2007-0619', 'Paramaribo'),
(28, 15, 'gescheiden','2016-11-30', 'AK-2016-1130', 'Paramaribo'),
(29, 16, 'ongehuwd', '2015-03-09', NULL,          'Paramaribo'),
(30, 17, 'ongehuwd', '1990-11-30', NULL,          'Paramaribo'),
(31, 17, 'gehuwd',   '1998-04-12', 'AK-1998-0412', 'Paramaribo');

SELECT setval('burgerlijke_staat_historie_id_seq', 31);

-- ============================================================
-- TABLE: nationaliteit_historie
-- Model: nationaliteit_historie.model.js
-- ============================================================

DROP TABLE IF EXISTS nationaliteit_historie CASCADE;
CREATE TABLE nationaliteit_historie (
    id                  SERIAL PRIMARY KEY,
    personen_id         INT  NOT NULL,
    nationaliteiten_id  INT  NOT NULL,
    verkrijgingsdatum   DATE NOT NULL,
    verliesdatum        DATE DEFAULT NULL,
    verkrijgingswijze   verkrijgingswijze_enum NOT NULL,
    CONSTRAINT nationaliteit_historie_ibfk_personen       FOREIGN KEY (personen_id)       REFERENCES personen       (id) ON DELETE CASCADE,
    CONSTRAINT nationaliteit_historie_ibfk_nationaliteiten FOREIGN KEY (nationaliteiten_id) REFERENCES nationaliteiten (id)
);

CREATE INDEX idx_nationaliteit_historie_persoon ON nationaliteit_historie (personen_id);
CREATE INDEX idx_nationaliteit_historie_id      ON nationaliteit_historie (nationaliteiten_id);

INSERT INTO nationaliteit_historie (id, personen_id, nationaliteiten_id, verkrijgingsdatum, verliesdatum, verkrijgingswijze) VALUES
(1,  1,  1, '1985-01-23', NULL, 'geboorte'),
(2,  2,  1, '1987-05-15', NULL, 'geboorte'),
(3,  3,  1, '1990-08-10', NULL, 'geboorte'),
(4,  4,  1, '1992-03-14', NULL, 'geboorte'),
(5,  5,  1, '1978-11-02', NULL, 'geboorte'),
(6,  6,  1, '1983-06-25', NULL, 'geboorte'),
(7,  7,  1, '1995-09-17', NULL, 'geboorte'),
(8,  8,  1, '1988-04-30', NULL, 'geboorte'),
(9,  9,  1, '1975-12-08', NULL, 'geboorte'),
(10, 10, 1, '2000-07-19', NULL, 'geboorte'),
(11, 11, 1, '1969-02-11', NULL, 'geboorte'),
(12, 12, 1, '1991-08-03', NULL, 'geboorte'),
(13, 13, 1, '1986-05-22', NULL, 'geboorte'),
(14, 14, 1, '1993-10-15', NULL, 'geboorte'),
(15, 15, 1, '1980-01-27', NULL, 'geboorte'),
(16, 16, 1, '1997-03-09', NULL, 'geboorte'),
(17, 17, 1, '1972-11-30', NULL, 'geboorte');

SELECT setval('nationaliteit_historie_id_seq', 17);
