import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  Cpu,
  Globe,
  GraduationCap,
  Handshake,
  Landmark,
  Lightbulb,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Play,
  Rocket,
  Scale,
  ShieldCheck,
  Target,
  ThumbsUp,
  Trophy,
  UserPlus,
  Users,
} from 'lucide-react';

import type {
  ActivityAxis,
  ContactChannel,
  HeroContent,
  LanguageOption,
  LocalizedText,
  MediaAsset,
  MissionPillar,
  NavLink,
  OrganizationInfo,
  Partner,
  PartnerDirectory,
  RoleOption,
  SectionCopy,
  SocialLink,
  Stat,
  TimelineStep,
} from '@/types';

/* ==================================================================
 * DONNEES OFFICIELLES DE L'UUPT
 * Union des Universites Privees de Thies — creee le 26 avril 2026.
 *
 * Source de verite unique du site : les composants ne contiennent
 * aucun texte en dur, tout est pilote depuis ce fichier.
 *
 * Convention i18n (spec §8) : chaque champ editorial existe en double
 * `{ fr, en }` (type `LocalizedText`). Le FR fait foi ; l'EN est une
 * traduction au ton du mouvement. Les noms propres (sigles,
 * etablissements), identifiants, routes, urls et coordonnees restent
 * des `string` simples.
 * ================================================================== */

/** Construit une URL Unsplash optimisee (image de secours). */
const unsplash = (id: string, width = 1600): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

/* ------------------------- Ressources visuelles ------------------- */

/**
 * Chemins des medias.
 * `src`   : fichier attendu dans `public/` (voir public/photos/README.md)
 * `fallback` : image Unsplash utilisee tant que le fichier est absent
 */
export const media = {
  hero: {
    src: '/photos/hero-bg.jpg',
    fallback: unsplash('photo-1523050854058-8df90110c9f1', 1920),
    alt: {
      fr: 'Étudiants réunis sur le parvis d’un campus universitaire',
      en: 'Students gathered on the forecourt of a university campus',
    },
  },
  about: {
    src: '/photos/campus-thies.jpg',
    fallback: unsplash('photo-1523240795612-9a054b0db644', 1200),
    alt: {
      fr: 'Étudiants travaillant ensemble sur un projet académique',
      en: 'Students working together on an academic project',
    },
  },
  axeAcademique: {
    src: '/photos/axe-academique.jpg',
    fallback: unsplash('photo-1521587760476-6c12a4b040da', 900),
    alt: {
      fr: 'Salle de bibliothèque universitaire',
      en: 'University library reading room',
    },
  },
  axeInnovation: {
    src: '/photos/axe-innovation.jpg',
    fallback: unsplash('photo-1518770660439-4636190af475', 900),
    alt: {
      fr: 'Composants électroniques d’un prototype étudiant',
      en: 'Electronic components of a student-built prototype',
    },
  },
  axeSport: {
    src: '/photos/axe-sport.jpg',
    fallback: unsplash('photo-1546519638-68e109498ffc', 900),
    alt: {
      fr: 'Terrain de basket-ball lors d’un tournoi inter-établissements',
      en: 'Basketball court during an inter-campus tournament',
    },
  },
  panelInnovation: {
    src: '/photos/panel-innovation.jpg',
    fallback: unsplash('photo-1475721027785-f74eccf877e2', 1200),
    alt: {
      fr: 'Panel académique étudiant sur scène',
      en: 'Student academic panel on stage',
    },
  },
} satisfies Record<string, MediaAsset>;

/* ---------------------------- Identite --------------------------- */

export const organization: OrganizationInfo = {
  name: 'Union des Universités Privées de Thiès',
  acronym: 'UUPT',
  tagline: {
    fr: 'Ensemble, construisons l’avenir',
    en: 'Together, we build the future',
  },
  type: {
    fr: 'Mouvement estudiantin inter-établissements',
    en: 'Inter-campus student movement',
  },
  createdAt: '2026-04-26',
  createdLabel: {
    fr: '26 Avril 2026',
    en: '26 April 2026',
  },
  city: 'Thiès',
  region: 'Thiès',
  country: {
    fr: 'Sénégal',
    en: 'Senegal',
  },
  address: {
    fr: 'Thiès, Sénégal',
    en: 'Thiès, Senegal',
  },
  // TODO(UUPT) : remplacer par les coordonnees officielles de l'Union.
  email: 'contact@uupt.sn',
  phone: '+221 00 000 00 00',
  whatsapp: '221000000000',
};

/* ------------------------- Navigation ---------------------------- */

export const navLinks: NavLink[] = [
  {
    id: 'accueil',
    to: '/',
    label: { fr: 'Accueil', en: 'Home' },
    description: {
      fr: 'Le mouvement estudiantin de Thiès',
      en: 'The student movement of Thiès',
    },
  },
  {
    id: 'a-propos',
    to: '/a-propos',
    label: { fr: 'À propos', en: 'About' },
    description: {
      fr: 'Mission et collaboration avec les BDE',
      en: 'Our mission and collaboration with the BDEs',
    },
  },
  {
    id: 'axe-academique-culturel',
    to: '/axe-academique-culturel',
    label: { fr: 'Académique & Culturel', en: 'Academic & Cultural' },
    description: {
      fr: 'Panels, formations, débats et plaidoirie',
      en: 'Panels, training, debates and moot court',
    },
  },
  {
    id: 'axe-innovation',
    to: '/axe-innovation',
    label: { fr: 'Innovation', en: 'Innovation' },
    description: {
      fr: 'Prototypes, expositions et démonstrations',
      en: 'Prototypes, exhibitions and live demonstrations',
    },
  },
  {
    id: 'axe-sportif',
    to: '/axe-sportif',
    label: { fr: 'Sportif', en: 'Sports' },
    description: {
      fr: 'Tournois Basket • Hand • Foot',
      en: 'Basketball • Handball • Football tournaments',
    },
  },
  {
    id: 'historique',
    to: '/historique',
    label: { fr: 'Historique', en: 'History' },
    description: {
      fr: 'Du panel initial au 26 avril 2026',
      en: 'From the first panel to 26 April 2026',
    },
  },
  {
    id: 'partenaires',
    to: '/partenaires',
    label: { fr: 'BDE Partenaires', en: 'Partner BDEs' },
    description: {
      fr: 'Établissements et bureaux étudiants',
      en: 'Institutions and student boards',
    },
  },
];

/**
 * Langues de l'interface.
 * TODO(UUPT) : passer `available` a `true` une fois les traductions fournies.
 */
export const languages: LanguageOption[] = [
  { code: 'FR', label: 'Français', available: true },
  { code: 'EN', label: 'English', available: false },
  { code: 'WO', label: 'Wolof', available: false },
];

/** Bouton d'action principal de la navbar (route Contact). */
export const headerCta = {
  label: { fr: 'Rejoindre l’UUPT', en: 'Join UUPT' },
  href: '/contact',
  icon: UserPlus,
};

/* ------------------------------ Hero ----------------------------- */

export const heroContent: HeroContent = {
  overtitle: {
    fr: 'Mouvement estudiantin • Thiès, Sénégal',
    en: 'Student movement • Thiès, Senegal',
  },
  title: {
    lead: { fr: 'Fédérer, innover et', en: 'Unite, innovate and' },
    accent: { fr: 'construire l’avenir', en: 'build the future' },
    tail: { fr: '!', en: '!' },
  },
  subtitle: {
    fr: 'L’UUPT rassemble les étudiants des universités, écoles et instituts privés de Thiès autour de projets communs, en étroite collaboration avec les Bureaux Des Étudiants (BDE) de chaque établissement.',
    en: 'UUPT brings together the students of Thiès’s private universities, schools and institutes around shared projects, in close collaboration with the Students’ Unions (BDE) of each institution.',
  },
  primaryCta: {
    label: { fr: 'Découvrir nos axes', en: 'Explore our axes' },
    // Ancre de la section « Nos axes » de l'accueil (id="poles"), comme le
    // hero SALEEL — la route unique `/axes` n'existe plus (3 pages d'axes).
    href: '#poles',
    icon: ArrowRight,
  },
  secondaryCta: {
    label: { fr: 'Rejoindre l’UUPT', en: 'Join UUPT' },
    href: '/contact',
    icon: UserPlus,
  },
  background: media.hero,
  marqueeItems: [
    { fr: 'Académique & Culturel', en: 'Academic & Cultural' },
    { fr: 'Innovation & Technique', en: 'Innovation & Technology' },
    { fr: 'Sport inter-établissements', en: 'Inter-campus sports' },
    { fr: 'Concours de plaidoirie', en: 'Moot court competitions' },
    { fr: 'Panels de discussion', en: 'Panel discussions' },
    { fr: 'Expositions des projets étudiants', en: 'Student project exhibitions' },
    { fr: 'Tournois Basket • Hand • Foot', en: 'Basketball • Handball • Football tournaments' },
  ],
};

/* ------------------------ Chiffres cles -------------------------- */

/**
 * Banniere de statistiques (compteurs animes).
 * Ajuster `value` selon la liste officielle des etablissements affilies.
 */
export const keyStats: Stat[] = [
  {
    id: 'etablissements',
    value: 12,
    suffix: '+',
    label: { fr: 'Établissements & BDE', en: 'Institutions & BDEs' },
    detail: {
      fr: 'Universités, écoles et instituts privés de Thiès',
      en: 'Private universities, schools and institutes of Thiès',
    },
    icon: Building2,
  },
  {
    id: 'axes',
    value: 3,
    label: { fr: 'Axes majeurs', en: 'Core axes' },
    detail: {
      fr: 'Académique & culturel, innovation, sport',
      en: 'Academic & cultural, innovation, sports',
    },
    icon: Target,
  },
  {
    id: 'evenements',
    value: 10,
    prefix: '+',
    label: { fr: 'Événements prévus', en: 'Planned events' },
    detail: {
      fr: 'Panels, formations, expositions, tournois',
      en: 'Panels, training, exhibitions, tournaments',
    },
    icon: Calendar,
  },
  {
    id: 'disciplines',
    value: 3,
    label: { fr: 'Disciplines sportives', en: 'Sports disciplines' },
    detail: {
      fr: 'Basket-ball, handball et football',
      en: 'Basketball, handball and football',
    },
    icon: Trophy,
  },
];

/* ---------------------------- A propos --------------------------- */

export const aboutCopy: SectionCopy = {
  eyebrow: { fr: 'Qui sommes-nous', en: 'Who we are' },
  title: { fr: 'Un mouvement estudiantin', en: 'A student movement' },
  highlight: {
    fr: 'au service des étudiants de Thiès',
    en: 'serving the students of Thiès',
  },
  description: {
    fr: 'Née de la volonté des étudiants des établissements supérieurs privés de Thiès, l’UUPT transforme des campus souvent isolés les uns des autres en une communauté de destin, capable de porter des projets communs et de faire entendre une voix unique.',
    en: 'Born of the resolve of students from Thiès’s private higher-education institutions, UUPT turns campuses that once stood apart from one another into a community of shared purpose, able to carry common projects and make a single voice heard.',
  },
};

/** Les trois engagements statutaires de l'Union. */
export const missionPillars: MissionPillar[] = [
  {
    id: 'federer',
    title: { fr: 'Fédérer les étudiants', en: 'Uniting students' },
    description: {
      fr: 'Réunir les étudiants des établissements d’enseignement supérieur privés de Thiès autour de projets communs, dans un esprit de fraternité inter-campus.',
      en: 'Bringing together the students of Thiès’s private higher-education institutions around shared projects, in a spirit of inter-campus fellowship.',
    },
    icon: Users,
  },
  {
    id: 'promouvoir',
    title: { fr: 'Promouvoir l’excellence', en: 'Promoting excellence' },
    description: {
      fr: 'Valoriser l’excellence académique, les compétences oratoires, les talents sportifs et les innovations des filières techniques et juridiques.',
      en: 'Championing academic excellence, oratory skills, athletic talent and the innovations of the technical and legal programmes.',
    },
    icon: Award,
  },
  {
    id: 'collaborer',
    title: { fr: 'Agir avec les BDE', en: 'Working with the BDEs' },
    description: {
      fr: 'Concevoir et déployer l’ensemble des activités en étroite collaboration avec les Bureaux Des Étudiants de chaque établissement affilié.',
      en: 'Designing and delivering every activity in close collaboration with the Students’ Unions of each affiliated institution.',
    },
    icon: Handshake,
  },
];

/** Mise en avant du partenariat strategique avec les BDE. */
export const bdePartnership = {
  eyebrow: { fr: 'Partenaire stratégique', en: 'Strategic partner' },
  title: {
    fr: 'Les Bureaux Des Étudiants, colonne vertébrale de l’Union',
    en: 'The Students’ Unions (BDE), the backbone of the Union',
  },
  description: {
    fr: 'L’UUPT ne se substitue à aucun BDE : elle les relie. Chaque activité est co-construite, co-animée et restituée avec le bureau de l’établissement concerné, qui demeure le point de contact direct des étudiants et le garant de la représentativité de ses filières.',
    en: 'UUPT does not replace any BDE: it connects them. Every activity is co-designed, co-run and reviewed with the student board of the institution concerned, which remains the students’ direct point of contact and the guarantor of representation for its programmes.',
  },
  commitments: [
    {
      id: 'co-construction',
      title: { fr: 'Co-construction systématique', en: 'Systematic co-design' },
      description: {
        fr: 'Chaque projet est discuté puis validé en assemblée avec les délégués des BDE affiliés.',
        en: 'Every project is discussed then approved in assembly with the delegates of the affiliated BDEs.',
      },
      icon: MessageSquare,
    },
    {
      id: 'equite',
      title: { fr: 'Représentation équitable', en: 'Fair representation' },
      description: {
        fr: 'Une voix par établissement, quelle que soit sa taille, pour garantir un équilibre durable.',
        en: 'One voice per institution, whatever its size, to secure a lasting balance.',
      },
      icon: Scale,
    },
    {
      id: 'transparence',
      title: { fr: 'Transparence totale', en: 'Full transparency' },
      description: {
        fr: 'Programmes, budgets et résultats sont restitués publiquement après chaque activité.',
        en: 'Programmes, budgets and results are publicly reported after every activity.',
      },
      icon: ShieldCheck,
    },
    {
      id: 'competences',
      title: { fr: 'Montée en compétences', en: 'Skills development' },
      description: {
        fr: 'Les membres des BDE sont formés à la gestion de projet, à la communication et au plaidoyer.',
        en: 'BDE members are trained in project management, communication and advocacy.',
      },
      icon: GraduationCap,
    },
  ],
};

/* --------------------------- Nos axes ---------------------------- */

export const axesCopy: SectionCopy = {
  eyebrow: { fr: 'Nos axes d’activités', en: 'Our activity axes' },
  title: { fr: 'Trois leviers pour', en: 'Three levers to' },
  highlight: { fr: 'faire grandir la jeunesse', en: 'help youth grow' },
  description: {
    fr: 'L’Union concentre son action sur trois axes complémentaires, pilotés avec les BDE de chaque établissement selon un calendrier annuel et des livrables concrets.',
    en: 'The Union focuses its action on three complementary axes, run with the BDE of each institution on an annual calendar with concrete deliverables.',
  },
};

export const activityAxes: ActivityAxis[] = [
  {
    id: 'academique-culturel',
    order: '01',
    title: { fr: 'Académique & Culturel', en: 'Academic & Cultural' },
    tagline: {
      fr: 'La parole comme premier talent',
      en: 'Words as our first talent',
    },
    description: {
      fr: 'Un espace d’émulation intellectuelle où les étudiants de Thiès affûtent leur esprit critique, leur culture générale et leur éloquence à travers des rencontres de haut niveau.',
      en: 'A space of intellectual emulation where the students of Thiès sharpen their critical thinking, general knowledge and eloquence through high-level encounters.',
    },
    icon: BookOpen,
    image: media.axeAcademique,
    activities: [
      {
        title: { fr: 'Panels de discussion', en: 'Panel discussions' },
        description: {
          fr: 'Tables rondes thématiques réunissant étudiants, enseignants et professionnels autour des grands enjeux du Sénégal et de l’Afrique.',
          en: 'Thematic round tables bringing together students, teachers and professionals around the major challenges facing Senegal and Africa.',
        },
      },
      {
        title: { fr: 'Sessions de formation', en: 'Training sessions' },
        description: {
          fr: 'Ateliers pratiques : méthodologie de recherche, rédaction scientifique, communication et préparation à l’insertion professionnelle.',
          en: 'Hands-on workshops: research methodology, academic writing, communication and preparation for professional life.',
        },
      },
      {
        title: { fr: 'Débats d’idées', en: 'Inter-campus debates' },
        description: {
          fr: 'Confrontations argumentées entre établissements sur des sujets de société, arbitrées par un jury et restituées devant le public.',
          en: 'Reasoned confrontations between institutions on issues of society, judged by a jury and presented before the audience.',
        },
      },
      {
        title: { fr: 'Concours de plaidoirie', en: 'Moot court competitions' },
        description: {
          fr: 'Compétition d’éloquence et de droit réservée aux filières juridiques, évaluée par des praticiens du barreau et de la magistrature.',
          en: 'An eloquence and law competition reserved for legal programmes, judged by practitioners from the bar and the bench.',
        },
      },
    ],
  },
  {
    id: 'innovation',
    order: '02',
    title: { fr: 'Innovation', en: 'Innovation' },
    tagline: {
      fr: 'Montrer ce que nos campus savent construire',
      en: 'Showcasing what our campuses can build',
    },
    description: {
      fr: 'Une vitrine dédiée aux productions des filières techniques et technologiques : prototypes, logiciels, objets connectés et solutions pensées pour les besoins réels de Thiès.',
      en: 'A showcase dedicated to the work of the technical and technological programmes: prototypes, software, connected devices and solutions designed for the real needs of Thiès.',
    },
    icon: Cpu,
    image: media.axeInnovation,
    activities: [
      {
        title: { fr: 'Expositions des projets étudiants', en: 'Student project exhibitions' },
        description: {
          fr: 'Galeries techniques où chaque établissement présente ses prototypes, maquettes et travaux de fin de cycle au grand public.',
          en: 'Technical galleries where each institution presents its prototypes, scale models and final-year projects to the general public.',
        },
      },
      {
        title: { fr: 'Démonstrations en direct', en: 'Live demonstrations' },
        description: {
          fr: 'Sessions de démonstration et de tests de solutions numériques, robotiques et énergétiques développées par les étudiants.',
          en: 'Demonstration and testing sessions for the digital, robotic and energy solutions developed by students.',
        },
      },
      {
        title: { fr: 'Rencontres avec l’écosystème', en: 'Meetings with the ecosystem' },
        description: {
          fr: 'Mise en relation avec les entreprises, incubateurs et institutions pour accélérer la maturation des projets présentés.',
          en: 'Connecting students with companies, incubators and institutions to accelerate the maturation of the projects presented.',
        },
      },
      {
        title: { fr: 'Concours d’innovation', en: 'Innovation competitions' },
        description: {
          fr: 'Distinction des meilleures créations par un jury mixte, réunissant enseignants-chercheurs et professionnels du secteur.',
          en: 'The best creations are recognised by a mixed jury of teacher-researchers and industry professionals.',
        },
      },
    ],
  },
  {
    id: 'sportif',
    order: '03',
    title: { fr: 'Sportif', en: 'Sports' },
    tagline: {
      fr: 'La cohésion se construit sur le terrain',
      en: 'Cohesion is built on the field',
    },
    description: {
      fr: 'Des compétitions inter-établissements qui transforment la rivalité académique en esprit d’équipe, avec le fair-play et la rigueur comme règles communes à tous les campus.',
      en: 'Inter-campus competitions that turn academic rivalry into team spirit, with fair play and discipline as the rules shared by every campus.',
    },
    icon: Trophy,
    image: media.axeSport,
    activities: [
      {
        title: { fr: 'Tournois inter-établissements', en: 'Inter-campus tournaments' },
        description: {
          fr: 'Championnats organisés par l’UUPT réunissant les équipes engagées par chaque BDE affilié.',
          en: 'Championships organised by UUPT bringing together the teams entered by each affiliated BDE.',
        },
      },
      {
        title: { fr: 'Basket-ball', en: 'Basketball' },
        description: {
          fr: 'Compétition phare des campus thiessois, disputée en gymnase avec arbitrage officiel et supporters des deux camps.',
          en: 'The flagship competition of the Thiès campuses, played indoors with official refereeing and supporters from both sides.',
        },
      },
      {
        title: { fr: 'Handball', en: 'Handball' },
        description: {
          fr: 'Format de tournoi à élimination directe favorisant l’intensité, la discipline collective et la cohésion d’équipe.',
          en: 'A knockout tournament format that favours intensity, collective discipline and team cohesion.',
        },
      },
      {
        title: { fr: 'Football', en: 'Football' },
        description: {
          fr: 'Le rendez-vous le plus attendu de l’année, véritable ciment social entre les établissements privés de Thiès.',
          en: 'The most eagerly awaited event of the year, a true social bond between the private institutions of Thiès.',
        },
      },
    ],
  },
];

/* -------------------------- Historique --------------------------- */

export const timelineCopy: SectionCopy = {
  eyebrow: { fr: 'Notre histoire', en: 'Our story' },
  title: { fr: 'De l’idée initiale à la', en: 'From the initial idea to' },
  highlight: { fr: 'création officielle', en: 'the official founding' },
  description: {
    fr: 'L’UUPT n’est pas née d’une décision isolée, mais d’un processus de dialogue : une idée surgie lors d’un panel académique, une large concertation entre leaders étudiants, puis des rencontres déterminantes avec les directions des établissements privés de Thiès.',
    en: 'UUPT was not born of an isolated decision but of a process of dialogue: an idea raised during an academic panel, a broad consultation among student leaders, then decisive meetings with the leadership of Thiès’s private institutions.',
  },
};

export const timelineSteps: TimelineStep[] = [
  {
    id: 'genese',
    order: 1,
    phase: { fr: 'Genèse', en: 'Genesis' },
    period: { fr: 'Idée initiale', en: 'Initial idea' },
    title: { fr: 'Naissance de l’idée', en: 'The birth of the idea' },
    description: {
      fr: 'À l’issue d’une invitation à un panel académique, l’idée d’un rassemblement inter-établissements émerge entre les étudiants présents : et si les campus privés de Thiès parlaient enfin d’une même voix ?',
      en: 'At the close of an invitation to an academic panel, the idea of an inter-campus gathering emerged among the students present: what if the private campuses of Thiès finally spoke with one voice?',
    },
    icon: Lightbulb,
  },
  {
    id: 'concertation',
    order: 2,
    phase: { fr: 'Concertation', en: 'Consultation' },
    period: { fr: 'Dialogue inter-établissements', en: 'Inter-campus dialogue' },
    title: {
      fr: 'Large concertation entre leaders étudiants',
      en: 'Broad consultation among student leaders',
    },
    description: {
      fr: 'Rencontres et échanges ouverts réunissant les leaders étudiants de Thiès pour définir le périmètre, les missions et les règles de fonctionnement de la future Union.',
      en: 'Open meetings and exchanges bringing together Thiès’s student leaders to define the scope, missions and operating rules of the future Union.',
    },
    icon: Users,
  },
  {
    id: 'adhesion',
    order: 3,
    phase: { fr: 'Adhésion institutionnelle', en: 'Institutional endorsement' },
    period: { fr: 'Rencontres avec les directions', en: 'Meetings with the leadership' },
    title: {
      fr: 'Validation par les universités et écoles',
      en: 'Endorsed by the universities and schools',
    },
    description: {
      fr: 'Présentation du projet aux directions des différentes universités et écoles privées de Thiès, afin de valider la démarche, d’en préciser le cadre et de recueillir leur adhésion.',
      en: 'The project was presented to the leadership of the various private universities and schools of Thiès, to validate the approach, refine its framework and secure their endorsement.',
    },
    icon: Handshake,
  },
  {
    id: 'lancement',
    order: 4,
    phase: { fr: 'Lancement officiel', en: 'Official launch' },
    period: { fr: '26 Avril 2026', en: '26 April 2026' },
    title: { fr: 'Création officielle de l’UUPT', en: 'The official founding of UUPT' },
    description: {
      fr: 'L’Union des Universités Privées de Thiès est officiellement constituée, avec l’ambition de fédérer durablement la jeunesse estudiantine privée de la ville et de porter ses talents sur la scène régionale.',
      en: 'The Union of Private Universities of Thiès was officially established, with the ambition of durably uniting the city’s private student youth and bringing its talents to the regional stage.',
    },
    icon: Rocket,
    isMilestone: true,
  },
];

/* ------------------- Etablissements & BDE ------------------------ */

export const partnersCopy: SectionCopy = {
  eyebrow: { fr: 'Établissements & BDE', en: 'Institutions & BDEs' },
  title: { fr: 'Les campus qui font', en: 'The campuses that' },
  highlight: { fr: 'vivre l’Union', en: 'bring the Union to life' },
  description: {
    fr: 'Chaque établissement affilié est représenté par son Bureau Des Étudiants, interlocuteur unique de l’UUPT pour co-organiser les activités et mobiliser ses étudiants.',
    en: 'Every affiliated institution is represented by its Students’ Union (BDE), UUPT’s single point of contact for co-organising activities and mobilising its students.',
  },
};

/**
 * ATTENTION — DONNEES A PERSONNALISER
 * -----------------------------------
 * Les fiches ci-dessous decrivent les poles disciplinaires vises par
 * l'Union (par filiere), et non la liste definitive des etablissements.
 * Remplacez `name` / `shortName` / `bdeName` par les denominations
 * officielles une fois l'adhesion de chaque direction confirmee, puis
 * passez `isPlaceholder` a `false` pour masquer le bandeau d'information.
 * `name` / `shortName` / `bdeName` (noms propres) ne sont pas traduits.
 */
export const partnerDirectory: PartnerDirectory = {
  isPlaceholder: true,
  notice: {
    fr: 'Répertoire en cours de finalisation : les pôles affichés correspondent aux filières représentées. La liste nominative des établissements et des BDE sera publiée après validation par chaque direction.',
    en: 'The directory is being finalised: the poles shown correspond to the programmes represented. The named list of institutions and BDEs will be published once each leadership has confirmed it.',
  },
  establishments: [
    {
      id: 'pole-technique-ingenierie',
      name: 'Pôle Technique & Ingénierie',
      shortName: 'PTI',
      kind: { fr: 'École supérieure', en: 'Higher-education school' },
      field: { fr: 'Sciences & ingénierie', en: 'Science & engineering' },
      filieres: [
        { fr: 'Génie civil', en: 'Civil engineering' },
        { fr: 'Génie électrique', en: 'Electrical engineering' },
        { fr: 'Maintenance industrielle', en: 'Industrial maintenance' },
      ],
      bdeName: 'BDE Pôle Technique & Ingénierie',
      status: 'affilie',
    },
    {
      id: 'pole-informatique-reseaux',
      name: 'Pôle Informatique & Réseaux',
      shortName: 'PIR',
      kind: { fr: 'Institut', en: 'Institute' },
      field: { fr: 'Numérique & télécommunications', en: 'Digital & telecommunications' },
      filieres: [
        { fr: 'Développement logiciel', en: 'Software development' },
        { fr: 'Réseaux & télécoms', en: 'Networks & telecoms' },
        { fr: 'Cybersécurité', en: 'Cybersecurity' },
      ],
      bdeName: 'BDE Pôle Informatique & Réseaux',
      status: 'affilie',
    },
    {
      id: 'pole-droit-sciences-juridiques',
      name: 'Pôle Droit & Sciences Juridiques',
      shortName: 'PDSJ',
      kind: { fr: 'Institut', en: 'Institute' },
      field: { fr: 'Droit & sciences politiques', en: 'Law & political science' },
      filieres: [
        { fr: 'Droit privé', en: 'Private law' },
        { fr: 'Droit des affaires', en: 'Business law' },
        { fr: 'Sciences politiques', en: 'Political science' },
      ],
      bdeName: 'BDE Pôle Droit & Sciences Juridiques',
      status: 'affilie',
    },
    {
      id: 'pole-management-commerce',
      name: 'Pôle Management & Commerce',
      shortName: 'PMC',
      kind: { fr: 'École supérieure', en: 'Higher-education school' },
      field: { fr: 'Gestion & commerce', en: 'Management & business' },
      filieres: [
        { fr: 'Gestion des entreprises', en: 'Business management' },
        { fr: 'Marketing', en: 'Marketing' },
        { fr: 'Commerce international', en: 'International trade' },
      ],
      bdeName: 'BDE Pôle Management & Commerce',
      status: 'affilie',
    },
    {
      id: 'pole-comptabilite-finance',
      name: 'Pôle Comptabilité, Finance & Audit',
      shortName: 'PCFA',
      kind: { fr: 'École supérieure', en: 'Higher-education school' },
      field: { fr: 'Finance & audit', en: 'Finance & audit' },
      filieres: [
        { fr: 'Comptabilité', en: 'Accounting' },
        { fr: 'Finance', en: 'Finance' },
        { fr: 'Audit & contrôle de gestion', en: 'Audit & management control' },
      ],
      bdeName: 'BDE Pôle Comptabilité, Finance & Audit',
      status: 'affilie',
    },
    {
      id: 'pole-sante-sciences-vie',
      name: 'Pôle Santé & Sciences de la Vie',
      shortName: 'PSV',
      kind: { fr: 'Institut', en: 'Institute' },
      field: { fr: 'Santé & biologie', en: 'Health & biology' },
      filieres: [
        { fr: 'Sciences infirmières', en: 'Nursing science' },
        { fr: 'Biologie médicale', en: 'Medical biology' },
        { fr: 'Analyses biomédicales', en: 'Biomedical analyses' },
      ],
      bdeName: 'BDE Pôle Santé & Sciences de la Vie',
      status: 'en-cours',
    },
    {
      id: 'pole-btp-architecture',
      name: 'Pôle BTP & Architecture',
      shortName: 'PBA',
      kind: { fr: 'École supérieure', en: 'Higher-education school' },
      field: { fr: 'Construction & aménagement', en: 'Construction & built environment' },
      filieres: [
        { fr: 'Bâtiment & travaux publics', en: 'Building & public works' },
        { fr: 'Architecture', en: 'Architecture' },
        { fr: 'Géomatique', en: 'Geomatics' },
      ],
      bdeName: 'BDE Pôle BTP & Architecture',
      status: 'en-cours',
    },
    {
      id: 'pole-communication-medias',
      name: 'Pôle Communication & Médias',
      shortName: 'PCM',
      kind: { fr: 'Centre de formation', en: 'Training centre' },
      field: { fr: 'Communication & journalisme', en: 'Communication & journalism' },
      filieres: [
        { fr: 'Journalisme', en: 'Journalism' },
        { fr: 'Communication d’entreprise', en: 'Corporate communication' },
        { fr: 'Audiovisuel', en: 'Audiovisual media' },
      ],
      bdeName: 'BDE Pôle Communication & Médias',
      status: 'invite',
    },
  ],
};

/** Libelles affiches pour chaque statut d'affiliation. */
export const partnerStatusLabels: Record<Partner['status'], LocalizedText> = {
  affilie: { fr: 'Affilié', en: 'Affiliated' },
  'en-cours': { fr: 'Adhésion en cours', en: 'Membership in progress' },
  invite: { fr: 'Invité', en: 'Invited' },
};

/* --------------------------- Contact ----------------------------- */

export const contactCopy: SectionCopy = {
  eyebrow: { fr: 'Contact & Adhésion', en: 'Contact & Membership' },
  title: { fr: 'Rejoindre l’UUPT ou', en: 'Join UUPT or' },
  highlight: { fr: 'contacter un BDE', en: 'reach a BDE' },
  description: {
    fr: 'Étudiant, membre de BDE, direction d’établissement ou partenaire : écrivez-nous pour adhérer à l’Union, proposer une activité ou soutenir l’un de nos trois axes.',
    en: 'Student, BDE member, institution leadership or partner: write to us to join the Union, propose an activity or support one of our three axes.',
  },
};

/** Canaux de contact rapide affiches a cote du formulaire. */
export const contactChannels: ContactChannel[] = [
  {
    id: 'localisation',
    label: { fr: 'Localisation', en: 'Location' },
    value: {
      fr: `${organization.city}, ${organization.country.fr}`,
      en: `${organization.city}, ${organization.country.en}`,
    },
    href: '#accueil',
    icon: MapPin,
  },
  {
    id: 'email',
    label: { fr: 'Email officiel', en: 'Official email' },
    value: organization.email,
    href: `mailto:${organization.email}`,
    icon: Mail,
  },
  {
    id: 'telephone',
    label: { fr: 'Téléphone', en: 'Phone' },
    value: organization.phone,
    href: `tel:${organization.phone.replace(/\s+/g, '')}`,
    icon: Phone,
  },
  {
    id: 'mouvement',
    label: { fr: 'Nature du mouvement', en: 'Nature of the movement' },
    value: organization.type,
    href: '#a-propos',
    icon: Landmark,
  },
];

/**
 * Reseaux sociaux de l'Union.
 * Note : `lucide-react` ne fournit plus d'icones de marque (v1) ;
 * des pictogrammes generiques sont utilises a la place.
 * TODO(UUPT) : remplacer les `href` par les URL officielles des pages.
 */
export const socialLinks: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', href: '#', icon: ThumbsUp },
  { id: 'instagram', label: 'Instagram', href: '#', icon: Camera },
  { id: 'linkedin', label: 'LinkedIn', href: '#', icon: Briefcase },
  { id: 'youtube', label: 'YouTube', href: '#', icon: Play },
  { id: 'site', label: 'Site web', href: '#accueil', icon: Globe },
];

/** Roles proposes dans le formulaire de contact. */
export const roleOptions: RoleOption[] = [
  { value: 'etudiant', label: { fr: 'Étudiant(e)', en: 'Student' } },
  { value: 'membre-bde', label: { fr: 'Membre de BDE', en: 'BDE member' } },
  { value: 'president-bde', label: { fr: 'Président(e) de BDE', en: 'BDE president' } },
  { value: 'direction', label: { fr: 'Direction d’établissement', en: 'Institution leadership' } },
  {
    value: 'enseignant',
    label: { fr: 'Enseignant(e) / Formateur(trice)', en: 'Teacher / trainer' },
  },
  { value: 'partenaire', label: { fr: 'Partenaire ou institution', en: 'Partner or institution' } },
];

/** Textes et libelles du formulaire de contact. */
export const contactFormCopy = {
  badge: { fr: 'Formulaire de contact', en: 'Contact form' },
  title: { fr: 'Écrivez à l’Union', en: 'Write to the Union' },
  description: {
    fr: 'Votre demande est transmise au bureau de l’Union, qui assure la liaison avec le BDE de l’établissement concerné.',
    en: 'Your request is forwarded to the Union’s office, which liaises with the BDE of the institution concerned.',
  },
  submitLabel: { fr: 'Envoyer ma demande', en: 'Send my request' },
  submittingLabel: { fr: 'Envoi en cours…', en: 'Sending…' },
  successTitle: { fr: 'Demande enregistrée', en: 'Request received' },
  successMessage: {
    fr: 'Merci pour votre message. Le bureau de l’UUPT revient vers vous et, le cas échéant, transmet votre demande au BDE compétent.',
    en: 'Thank you for your message. The UUPT office will get back to you and, where applicable, forward your request to the relevant BDE.',
  },
  resetLabel: { fr: 'Envoyer une autre demande', en: 'Send another request' },
  privacyNote: {
    fr: 'Les informations transmises servent uniquement au traitement de votre demande par l’Union et les BDE concernés.',
    en: 'The information submitted is used solely to process your request by the Union and the BDEs concerned.',
  },
} as const;

/* --------------------- Action flottante -------------------------- */

/**
 * Bouton d'action flottant (bas de page, a droite).
 * `label` (« WhatsApp », nom de marque) n'est pas traduit.
 * TODO(UUPT) : renseigner le numero WhatsApp officiel dans
 * `organization.whatsapp` (format international sans espaces).
 */
export const whatsappAction = {
  label: 'WhatsApp',
  ariaLabel: {
    fr: 'Contacter l’UUPT sur WhatsApp',
    en: 'Chat with UUPT on WhatsApp',
  },
  href: `https://wa.me/${organization.whatsapp}`,
} as const;

/* ---------------------------- Footer ----------------------------- */

export const footerCopy = {
  description: {
    fr: 'L’Union des Universités Privées de Thiès fédère les étudiants des établissements d’enseignement supérieur privés de la ville autour de l’excellence académique, de l’innovation technique et du sport inter-établissements.',
    en: 'The Union of Private Universities of Thiès unites the students of the city’s private higher-education institutions around academic excellence, technical innovation and inter-campus sport.',
  },
  legalNote: {
    fr: `© ${new Date().getFullYear()} ${organization.name} (${organization.acronym}). Tous droits réservés.`,
    en: `© ${new Date().getFullYear()} ${organization.name} (${organization.acronym}). All rights reserved.`,
  },
  creationNote: {
    fr: `Mouvement estudiantin inter-établissements créé le ${organization.createdLabel.fr} à ${organization.city}, ${organization.country.fr}.`,
    en: `An inter-campus student movement founded on ${organization.createdLabel.en} in ${organization.city}, ${organization.country.en}.`,
  },
  builtWith: {
    fr: 'Site officiel — React, TypeScript, Tailwind CSS & Framer Motion',
    en: 'Official website — React, TypeScript, Tailwind CSS & Framer Motion',
  },
  legalLinks: [
    { label: { fr: 'Mentions légales', en: 'Legal notice' }, href: '#contact' },
    { label: { fr: 'Politique de confidentialité', en: 'Privacy policy' }, href: '#contact' },
    { label: { fr: 'Adhésion des établissements', en: 'Institution membership' }, href: '#contact' },
  ],
} as const;
