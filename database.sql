--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'SUPER_ADMIN',
    'ADMIN_NATIONAL',
    'ADMIN_LOCAL',
    'ADMIN_E_COMMERCE',
    'NONE'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: BureauNational; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."BureauNational" (
    id integer NOT NULL,
    name text NOT NULL,
    "firstName" text NOT NULL,
    title text NOT NULL,
    "imgUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."BureauNational" OWNER TO postgres;

--
-- Name: BureauNational_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."BureauNational_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BureauNational_id_seq" OWNER TO postgres;

--
-- Name: BureauNational_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."BureauNational_id_seq" OWNED BY public."BureauNational".id;


--
-- Name: Event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    title text NOT NULL,
    type text NOT NULL,
    "imgUrl" text NOT NULL,
    content text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "organisationLocalId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Event" OWNER TO postgres;

--
-- Name: EventFile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventFile" (
    id integer NOT NULL,
    "fileUrl" text NOT NULL,
    "eventId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."EventFile" OWNER TO postgres;

--
-- Name: EventFile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EventFile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EventFile_id_seq" OWNER TO postgres;

--
-- Name: EventFile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EventFile_id_seq" OWNED BY public."EventFile".id;


--
-- Name: EventImage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventImage" (
    id integer NOT NULL,
    "imgUrl" text NOT NULL,
    "eventId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."EventImage" OWNER TO postgres;

--
-- Name: EventImage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EventImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EventImage_id_seq" OWNER TO postgres;

--
-- Name: EventImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EventImage_id_seq" OWNED BY public."EventImage".id;


--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_id_seq" OWNER TO postgres;

--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: Item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Item" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imgUrl" text NOT NULL
);


ALTER TABLE public."Item" OWNER TO postgres;

--
-- Name: Item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Item_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Item_id_seq" OWNER TO postgres;

--
-- Name: Item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Item_id_seq" OWNED BY public."Item".id;


--
-- Name: Member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Member" (
    id integer NOT NULL,
    name text NOT NULL,
    "imgUrl" text NOT NULL,
    title text NOT NULL,
    ticket text NOT NULL,
    "organisationLocalId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Member" OWNER TO postgres;

--
-- Name: Member_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Member_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Member_id_seq" OWNER TO postgres;

--
-- Name: Member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Member_id_seq" OWNED BY public."Member".id;


--
-- Name: OrganisationLocal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrganisationLocal" (
    id integer NOT NULL,
    name text NOT NULL,
    localisation text NOT NULL,
    phone text NOT NULL,
    email text NOT NULL,
    "mapImgUrl" text NOT NULL,
    "logoImgUrl" text NOT NULL,
    "zoneId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OrganisationLocal" OWNER TO postgres;

--
-- Name: OrganisationLocalContent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrganisationLocalContent" (
    id integer NOT NULL,
    content text NOT NULL,
    "organisationLocalId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OrganisationLocalContent" OWNER TO postgres;

--
-- Name: OrganisationLocalContent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrganisationLocalContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrganisationLocalContent_id_seq" OWNER TO postgres;

--
-- Name: OrganisationLocalContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrganisationLocalContent_id_seq" OWNED BY public."OrganisationLocalContent".id;


--
-- Name: OrganisationLocal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrganisationLocal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrganisationLocal_id_seq" OWNER TO postgres;

--
-- Name: OrganisationLocal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrganisationLocal_id_seq" OWNED BY public."OrganisationLocal".id;


--
-- Name: PastPresident; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PastPresident" (
    id integer NOT NULL,
    name text NOT NULL,
    year integer NOT NULL,
    "imgUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PastPresident" OWNER TO postgres;

--
-- Name: PastPresident_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PastPresident_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PastPresident_id_seq" OWNER TO postgres;

--
-- Name: PastPresident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PastPresident_id_seq" OWNED BY public."PastPresident".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'NONE'::public."Role" NOT NULL,
    "organisationLocalId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastLogin" timestamp(3) without time zone
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Zone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Zone" (
    id integer NOT NULL,
    name text NOT NULL,
    "imgUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Zone" OWNER TO postgres;

--
-- Name: ZonePresident; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ZonePresident" (
    id integer NOT NULL,
    name text NOT NULL,
    quote text NOT NULL,
    "imgUrl" text NOT NULL,
    contact text NOT NULL,
    "zoneId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ZonePresident" OWNER TO postgres;

--
-- Name: ZonePresident_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ZonePresident_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ZonePresident_id_seq" OWNER TO postgres;

--
-- Name: ZonePresident_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ZonePresident_id_seq" OWNED BY public."ZonePresident".id;


--
-- Name: Zone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Zone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Zone_id_seq" OWNER TO postgres;

--
-- Name: Zone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Zone_id_seq" OWNED BY public."Zone".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: BureauNational id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BureauNational" ALTER COLUMN id SET DEFAULT nextval('public."BureauNational_id_seq"'::regclass);


--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: EventFile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventFile" ALTER COLUMN id SET DEFAULT nextval('public."EventFile_id_seq"'::regclass);


--
-- Name: EventImage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventImage" ALTER COLUMN id SET DEFAULT nextval('public."EventImage_id_seq"'::regclass);


--
-- Name: Item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item" ALTER COLUMN id SET DEFAULT nextval('public."Item_id_seq"'::regclass);


--
-- Name: Member id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member" ALTER COLUMN id SET DEFAULT nextval('public."Member_id_seq"'::regclass);


--
-- Name: OrganisationLocal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrganisationLocal" ALTER COLUMN id SET DEFAULT nextval('public."OrganisationLocal_id_seq"'::regclass);


--
-- Name: OrganisationLocalContent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrganisationLocalContent" ALTER COLUMN id SET DEFAULT nextval('public."OrganisationLocalContent_id_seq"'::regclass);


--
-- Name: PastPresident id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PastPresident" ALTER COLUMN id SET DEFAULT nextval('public."PastPresident_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: Zone id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Zone" ALTER COLUMN id SET DEFAULT nextval('public."Zone_id_seq"'::regclass);


--
-- Name: ZonePresident id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ZonePresident" ALTER COLUMN id SET DEFAULT nextval('public."ZonePresident_id_seq"'::regclass);


--
-- Data for Name: BureauNational; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."BureauNational" (id, name, "firstName", title, "imgUrl", "createdAt", "updatedAt") FROM stdin;
23	RAKOTONIRINA	Miharisoa Barinia	Secrétaire général	/uploads/avatar/1790157823109-883788561.png	2026-09-23 10:03:43.125	2026-09-23 10:03:43.125
24	HAMBA	Tianjara Hugues	Immediat past président	/uploads/avatar/1790157858676-135947747.jpg	2026-09-23 10:04:18.705	2026-09-23 10:04:18.705
25	MAYET	Jouber	Trésorier national	/uploads/avatar/1790157977583-77114522.jpg	2026-09-23 10:06:17.649	2026-09-23 10:06:17.649
26	RATSIRAHONANA	Ando	Conseiller juridique national	/uploads/avatar/1790158052600-94150518.png	2026-09-23 10:07:32.639	2026-09-23 10:07:32.639
27	RALALA	Mialitiana	Vice Présidente Exécutive National	/uploads/avatar/1790158093894-366186540.jpg	2026-09-23 10:08:13.954	2026-09-23 10:08:13.954
28	ANDRIAMAMPIONONA	Franco Joël	Vice Président National zone nord	/uploads/avatar/1790158140053-971805422.jpg	2026-09-23 10:09:00.097	2026-09-23 10:09:00.097
29	RAKOTONARIVO	Anjarasoa	Vice Président National zone centre	/uploads/avatar/1790158220619-914448179.jpeg	2026-09-23 10:10:20.664	2026-09-23 10:10:20.664
30	RASOANINDRINA	Emilie	Vice Présidente National zone Sud	/uploads/avatar/1790158252635-259925760.png	2026-09-23 10:10:52.647	2026-09-23 10:10:52.647
31	ANDRIANARIVONY	Tamby	Directeur de l'innovation Numérique	/uploads/avatar/1790158330960-450763328.jpg	2026-09-23 10:12:10.98	2026-09-23 10:12:10.98
32	RABEARILAZA	Mamy	Directeur Partenariat et Fundraising	/uploads/avatar/1790158376450-195436360.JPG	2026-09-23 10:12:56.489	2026-09-23 10:12:56.489
33	RANDRIANARIVO	Tiffany	Directeur de Développement de Compétence	/uploads/avatar/1790158405444-460148955.png	2026-09-23 10:13:25.478	2026-09-23 10:13:25.478
34	MANITRIAVY	Melissa Martina	Directeur des Programmes Nationaux	/uploads/avatar/1790158453903-862965894.JPG	2026-09-23 10:14:13.92	2026-09-23 10:14:13.92
35	RABEFARIHY	Ando Nirina	Directeur du membership	/uploads/avatar/1790158483967-578131227.jpg	2026-09-23 10:14:44.034	2026-09-23 10:14:44.034
22	RAKOTOBE	Manjatosoa Minah	Présidente nationale	/uploads/avatar/1790332983567-286598086.png	2026-09-23 10:03:03.424	2026-09-25 10:43:03.59
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event" (id, title, type, "imgUrl", content, date, "organisationLocalId", "createdAt", "updatedAt") FROM stdin;
28	Concours national CYE 2026	ACTU	/uploads/events/1790246997450-211711837.png	Le programme CYE de la JCI met en lumière les jeunes entrepreneurs innovants, ambitieux et à fort impact.	2026-04-10 00:00:00	\N	2026-09-24 10:49:57.477	2026-09-24 10:49:57.477
30	Journée mondiale de devoir humain 2026	ACTU	/uploads/events/1790247165761-610048414.png	La Rentrée Solennelle 2025 de la JCI Madagascar soulignera le lancement officiel du mandat de cette année.	2026-07-10 00:00:00	\N	2026-09-24 10:52:45.768	2026-09-24 10:52:45.768
31	Académie de Japon 2026	EVENT	/uploads/events/1790247216807-560761896.png	10 jours d'immersion internationale, de partage, d'apprentissage aux côtés des plus grands leaders JCI du monde entier	2026-07-02 00:00:00	\N	2026-09-24 10:53:36.842	2026-09-24 10:53:36.842
33	Concours national TOYP 2026	EVENT	/uploads/events/1790247316934-325960210.png	Le programme TOYP – Ten Outstanding Young Persons, initiative phare de la Junior Chamber International (JCI), met en lumière de jeunes leaders âgés de 18 à 40 ans dont les réalisations exceptionnelles inspirent leur communauté et contribuent au développement de la société.	2026-07-17 00:00:00	\N	2026-09-24 10:55:16.963	2026-09-24 10:55:16.963
20	CRZS TEST	EVENT	/uploads/events/1790187563916-306734134.png	Ceci est un test depuis un OL	2026-09-16 00:00:00	12	2026-09-23 18:19:23.941	2026-09-24 10:58:19.179
29	CAMO 2026	EVENT	/uploads/events/1790360013463-32994303.webp	La conference Afrique et Moyen Orient qui s’est deroule en Cote d’Ivoire a regroupe tous les membres dans la region	2026-05-21 00:00:00	\N	2026-09-24 10:51:37.222	2026-09-25 18:13:33.686
32	JCI Malagasy Academy 2026	EVENT	/uploads/events/1790361507423-197915629.png	Programme national de la JCI Madagascar en Leadership | Formations | Développement personnel\r\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).	2026-07-20 00:00:00	\N	2026-09-24 10:54:16.945	2026-09-25 18:42:50.993
22	Rentrée Solennelle 2026	EVENT	/uploads/events/1790246628700-765546163.png	La Rentrée Solennelle 2026 de la JCI Madagascar soulignera le lancement officiel du mandat de cette année.	2026-02-06 00:00:00	\N	2026-09-24 10:43:48.738	2026-09-24 10:43:48.738
23	Réunion des présidents nationaux 2026	EVENT	/uploads/events/1790246691275-966235350.png	La réunion des des presidents nationaux au Sénégal marque le lancement du plan d’action mondiale et son alignement a celle de la nationale	2026-02-14 00:00:00	\N	2026-09-24 10:44:51.294	2026-09-24 10:44:51.294
24	Acceuil VPI 2026	EVENT	/uploads/events/1790246774581-886581521.png	La visite officielle du vice-president internationale a Madagascar	2026-03-30 00:00:00	\N	2026-09-24 10:46:14.591	2026-09-24 10:46:14.591
25	Cornférence Régionale Zone Sud 2026	EVENT	/uploads/events/1790246844377-549784612.png	Conférence Régionale Zone Sud 2026 de la JCI Madagascar, accuiellie par la JCI Toliara	2026-04-02 00:00:00	\N	2026-09-24 10:47:24.426	2026-09-24 10:47:24.426
26	Cornférence Régionale Zone Centre 2026	EVENT	/uploads/events/1790246902346-62431381.png	Conférence Régionale Zone Centre 2026 de la JCI Madagascar, accuiellie par la JCI Toamasina	2026-05-01 00:00:00	\N	2026-09-24 10:48:22.354	2026-09-24 10:48:22.354
27	Cornférence Régionale Zone Nord 2026	EVENT	/uploads/events/1790246947141-647941846.png	Conférence Régionale Zone Sud 2026 de la JCI Madagascar, accuiellie par la JCI Sambava	2026-05-08 00:00:00	\N	2026-09-24 10:49:07.154	2026-09-24 10:49:07.154
\.


--
-- Data for Name: EventFile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EventFile" (id, "fileUrl", "eventId", "createdAt") FROM stdin;
12	/uploads/events/files/1790361339781-23060816.pdf	32	2026-09-25 18:35:40.148
\.


--
-- Data for Name: EventImage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EventImage" (id, "imgUrl", "eventId", "createdAt") FROM stdin;
30	/uploads/events/1790361368235-187073366.webp	32	2026-09-25 18:36:08.254
31	/uploads/events/1790361377378-122803355.png	32	2026-09-25 18:36:17.421
32	/uploads/events/1790361384820-304966509.png	32	2026-09-25 18:36:24.839
33	/uploads/events/1790361394531-578525278.png	32	2026-09-25 18:36:34.565
34	/uploads/events/1790361407814-30526026.png	32	2026-09-25 18:36:47.852
\.


--
-- Data for Name: Item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Item" (id, name, description, price, "createdAt", "updatedAt", "imgUrl") FROM stdin;
3	XRAY-2025	TEST DATA	2500	2026-09-24 16:35:50.901	2026-09-25 18:03:50.884	/uploads/items/1790267750895-45091800.png
4	JCIt	TEST DATA	20000	2026-09-24 16:54:55.858	2026-09-25 18:04:01.325	/uploads/items/1790268895806-889870928.png
\.


--
-- Data for Name: Member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Member" (id, name, "imgUrl", title, ticket, "organisationLocalId", "createdAt", "updatedAt") FROM stdin;
20	Guychard Dimisy	/uploads/avatar/1790248536324-643041557.png	Président Local	Synergy in action	16	2026-09-24 11:15:36.346	2026-09-24 11:15:36.346
\.


--
-- Data for Name: OrganisationLocal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrganisationLocal" (id, name, localisation, phone, email, "mapImgUrl", "logoImgUrl", "zoneId", "createdAt", "updatedAt") FROM stdin;
16	Ambilobe	Ambilobe	0340000000	sglambilobe@jcimada.org	/uploads/avatar/1790248049058-330756511.png	/uploads/avatar/1790248384199-295848212.png	22	2026-09-24 11:07:29.093	2026-09-24 11:13:04.361
13	Test Datas	Test Localisation	0340000000	example@gmail.com	/uploads/avatar/1790257742360-230993068.png	/uploads/avatar/1790169203228-356429568.png	30	2026-09-23 13:13:23.243	2026-09-24 13:49:02.371
14	Test Data L	Test Localisation	0340000000	example@gmail.com	/uploads/avatar/1790257774835-775924545.png	/uploads/avatar/1790257727195-886515512.png	30	2026-09-23 17:33:26.649	2026-09-24 13:49:34.85
15	Test Data	Test Localisation	0340000000	example@gmail.com	/uploads/avatar/1790333369351-977607251.png	/uploads/avatar/1790333355823-680377763.png	30	2026-09-23 17:33:43.762	2026-09-25 10:49:29.37
12	Ivonea	Fianarantsoa	0340000000	example@gmail.com	/uploads/avatar/1790257760780-103144141.png	/uploads/avatar/1790158806152-89172115.png	30	2026-09-23 10:20:06.158	2026-09-25 17:59:07.953
\.


--
-- Data for Name: OrganisationLocalContent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrganisationLocalContent" (id, content, "organisationLocalId", "createdAt", "updatedAt") FROM stdin;
18	Eminuit autem inter humilia supergressa iam impotentia fines mediocrium delictorum nefanda Clematii cuiusdam Alexandrini nobilis mors repentina; cuius socrus cum misceri sibi generum, flagrans eius amore, non impetraret, ut	12	2026-09-23 13:16:53.026	2026-09-23 13:16:53.026
19	La jeune chambre Internationale Ambilobe a vu le jour à partir du projet d’extension de la JCI Antsiranana en 2012, à l’initiative du président fondateur ARISTE Tsimiady Voudray.	16	2026-09-24 11:13:37.517	2026-09-24 11:13:37.517
20	Depuis , les membres sont composés des jeunes qui ont soif de changement positif et durable. C’est pourquoi nos actions se focalisent surtout sur des activités qui enrichissent le développement personnel de chacun.	16	2026-09-24 11:13:44.115	2026-09-24 11:13:44.115
21	Les formations qu’on y trouve se transforment en outils de renforcement de compétence qui permetent de se lancer davantage à la prise de responsabilité.	16	2026-09-24 11:13:50.893	2026-09-24 11:13:50.893
\.


--
-- Data for Name: PastPresident; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PastPresident" (id, name, year, "imgUrl", "createdAt", "updatedAt") FROM stdin;
13	Tianjara Hugues HAMBA	2025	/uploads/avatar/1790158702585-418205559.jpg	2026-09-22 11:57:10.923	2026-09-23 10:18:22.607
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, role, "organisationLocalId", "createdAt", "updatedAt", "lastLogin") FROM stdin;
20	tiavina3180@gmail.comty	$2b$10$sb4ZxLludHqA9lFrrnPrqORbGZU0Re8GfPiBFhSsXFMOM3J1V01su	ADMIN_NATIONAL	\N	2026-09-16 13:13:09.075	2026-09-24 07:54:34.059	2026-09-24 07:54:34.057
29	ivonea@gmail.com	$2b$10$Dq/HDa9.YHSTKU9sytC6E.Qu3ZgC6.LTN/962sgQF50VXQBX2bLoq	ADMIN_LOCAL	12	2026-09-23 10:20:54.728	2026-09-24 17:57:26.951	2026-09-24 17:57:26.944
21	ecommerce@gmail.com	$2b$10$PPMd/261tbAj00w/4E6OlePUmYXRaGql2lFc3F5iU8j0HWFe9Za5e	ADMIN_E_COMMERCE	\N	2026-09-17 12:09:20.176	2026-09-25 18:15:33.054	2026-09-25 18:15:33.052
15	tiavina3180@gmail.com	$2b$10$JM.kODBrARyQ/67n/i0kdeK1Ex321izkGUFIVHKIDVoXZtU3ec.LW	SUPER_ADMIN	\N	2026-09-16 10:11:36.263	2026-09-25 18:34:43.889	2026-09-25 18:34:43.884
\.


--
-- Data for Name: Zone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Zone" (id, name, "imgUrl", "createdAt", "updatedAt") FROM stdin;
29	CENTRE	/uploads/avatar/1790158619496-256726389.png	2026-09-23 10:16:59.506	2026-09-23 10:16:59.506
30	SUD	/uploads/avatar/1790158633153-487927635.png	2026-09-23 10:17:13.174	2026-09-23 10:17:13.174
22	NORD	/uploads/avatar/1790165754985-447271610.png	2026-09-22 07:17:16.646	2026-09-23 12:15:55.11
\.


--
-- Data for Name: ZonePresident; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ZonePresident" (id, name, quote, "imgUrl", contact, "zoneId", "createdAt", "updatedAt") FROM stdin;
15	Fanco Joël ANDRIAMAMPIONONA	Sous le lead et l’accompagnement de Franco Joël ANDRIAMAMPIONONA, Vice-Présidente Nationale Nord 2026, la Zone Nord composée de six Organisations Locales	/uploads/avatar/1790082654505-82517204.jpg	0340000000	22	2026-09-22 12:41:28.84	2026-09-24 10:40:13.344
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
3ecf9b87-33e7-4ebf-8a63-8977d2dd26f2	9ed16c0c6bb03484c961a4ba4d80dbc9b267df250dab6cd82b61560968f2cedd	2026-09-14 11:22:26.746812+03	20260914082226_v01_models	\N	\N	2026-09-14 11:22:26.62568+03	1
8f3dfd9b-5e34-4905-a8df-1fd595d37c84	30835acd0d5aa5f18d79df9cf3ea3effb854460abf80d0095b43947068dad502	2026-09-14 14:39:33.54534+03	20260914113933_item_model_name_updated_image_url_img_url	\N	\N	2026-09-14 14:39:33.515864+03	1
b6dee08d-9998-4155-8e9c-6e1db48b68f8	17b82e39d2af0059c37d310eeb2e819949be3592dee4c935d2d59a70de27c790	2026-09-14 14:42:14.403615+03	20260914114214_item_model_name_set_to_unique	\N	\N	2026-09-14 14:42:14.345512+03	1
984e15ee-7995-4fb9-a55f-5d9519a20bfd	979f4fab14f15abab6c34dd70b61d5984feac3b1c1588d2e3349a114b5f2c906	2026-09-14 19:02:54.762758+03	20260914160254_v1_2	\N	\N	2026-09-14 19:02:54.592865+03	1
263cdabe-58f8-4c82-93bc-ebbd03dbaa55	a595daa65d8fd96eda57bf9261a43121cd9222a0ae74de3b0beb8c58a0f64575	2026-09-14 21:40:38.430993+03	20260914184038_updated_at_updated_to_updated_at_date_time_updated_at	\N	\N	2026-09-14 21:40:38.414845+03	1
\.


--
-- Name: BureauNational_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."BureauNational_id_seq"', 36, true);


--
-- Name: EventFile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EventFile_id_seq"', 12, true);


--
-- Name: EventImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EventImage_id_seq"', 34, true);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_id_seq"', 33, true);


--
-- Name: Item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Item_id_seq"', 4, true);


--
-- Name: Member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Member_id_seq"', 20, true);


--
-- Name: OrganisationLocalContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrganisationLocalContent_id_seq"', 21, true);


--
-- Name: OrganisationLocal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrganisationLocal_id_seq"', 17, true);


--
-- Name: PastPresident_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PastPresident_id_seq"', 14, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 29, true);


--
-- Name: ZonePresident_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ZonePresident_id_seq"', 16, true);


--
-- Name: Zone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Zone_id_seq"', 30, true);


--
-- Name: BureauNational BureauNational_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."BureauNational"
    ADD CONSTRAINT "BureauNational_pkey" PRIMARY KEY (id);


--
-- Name: EventFile EventFile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventFile"
    ADD CONSTRAINT "EventFile_pkey" PRIMARY KEY (id);


--
-- Name: EventImage EventImage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventImage"
    ADD CONSTRAINT "EventImage_pkey" PRIMARY KEY (id);


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: Item Item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Item"
    ADD CONSTRAINT "Item_pkey" PRIMARY KEY (id);


--
-- Name: Member Member_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);


--
-- Name: OrganisationLocalContent OrganisationLocalContent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrganisationLocalContent"
    ADD CONSTRAINT "OrganisationLocalContent_pkey" PRIMARY KEY (id);


--
-- Name: OrganisationLocal OrganisationLocal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrganisationLocal"
    ADD CONSTRAINT "OrganisationLocal_pkey" PRIMARY KEY (id);


--
-- Name: PastPresident PastPresident_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PastPresident"
    ADD CONSTRAINT "PastPresident_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: ZonePresident ZonePresident_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ZonePresident"
    ADD CONSTRAINT "ZonePresident_pkey" PRIMARY KEY (id);


--
-- Name: Zone Zone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Zone"
    ADD CONSTRAINT "Zone_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: BureauNational_title_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "BureauNational_title_key" ON public."BureauNational" USING btree (title);


--
-- Name: Item_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Item_name_key" ON public."Item" USING btree (name);


--
-- Name: OrganisationLocal_name_zoneId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "OrganisationLocal_name_zoneId_key" ON public."OrganisationLocal" USING btree (name, "zoneId");


--
-- Name: PastPresident_year_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PastPresident_year_key" ON public."PastPresident" USING btree (year);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: ZonePresident_zoneId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ZonePresident_zoneId_key" ON public."ZonePresident" USING btree ("zoneId");


--
-- Name: Zone_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Zone_name_key" ON public."Zone" USING btree (name);


--
-- Name: EventFile EventFile_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventFile"
    ADD CONSTRAINT "EventFile_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EventImage EventImage_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventImage"
    ADD CONSTRAINT "EventImage_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Event Event_organisationLocalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_organisationLocalId_fkey" FOREIGN KEY ("organisationLocalId") REFERENCES public."OrganisationLocal"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Member Member_organisationLocalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_organisationLocalId_fkey" FOREIGN KEY ("organisationLocalId") REFERENCES public."OrganisationLocal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrganisationLocalContent OrganisationLocalContent_organisationLocalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrganisationLocalContent"
    ADD CONSTRAINT "OrganisationLocalContent_organisationLocalId_fkey" FOREIGN KEY ("organisationLocalId") REFERENCES public."OrganisationLocal"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrganisationLocal OrganisationLocal_zoneId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrganisationLocal"
    ADD CONSTRAINT "OrganisationLocal_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES public."Zone"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_organisationLocalId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_organisationLocalId_fkey" FOREIGN KEY ("organisationLocalId") REFERENCES public."OrganisationLocal"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ZonePresident ZonePresident_zoneId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ZonePresident"
    ADD CONSTRAINT "ZonePresident_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES public."Zone"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

