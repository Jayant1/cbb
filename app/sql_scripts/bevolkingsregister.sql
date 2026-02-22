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
(1, 'Henck Arronstraat', '42', 'A', 1, 1, 1, 'hoofdverblijf');

SELECT setval('adressen_id_seq', 1);

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
(1, 1, 'identiteitskaart', 'SUR123456789', '2020-01-15', '2030-01-15', 'Ministerie van Binnenlandse Zaken');

SELECT setval('documenten_id_seq', 1);

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
