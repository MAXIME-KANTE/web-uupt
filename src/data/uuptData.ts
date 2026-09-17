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
    alt: 'Étudiants réunis sur le parvis d’un campus universitaire',
  },
  about: {
    src: '/photos/campus-thies.jpg',
    fallback: unsplash('photo-1523240795612-9a054b0db644', 1200),
    alt: 'Étudiants travaillant ensemble sur un projet académique',
  },
  axeAcademique: {
    src: '/photos/axe-academique.jpg',
    fallback: unsplash('photo-1521587760476-6c12a4b040da', 900),
    alt: 'Salle de bibliothèque universitaire',
  },
  axeInnovation: {
    src: '/photos/axe-innovation.jpg',
    fallback: unsplash('photo-1518770660439-4636190af475', 900),
    alt: 'Composants électroniques d’un prototype étudiant',
  },
  axeSport: {
    src: '/photos/axe-sport.jpg',
    fallback: unsplash('photo-1546519638-68e109498ffc', 900),
    alt: 'Terrain de basket-ball lors d’un tournoi inter-établissements',
  },
  panelInnovation: {
    src: '/photos/panel-innovation.jpg',
    fallback: unsplash('photo-1475721027785-f74eccf877e2', 1200),
    alt: 'Panel académique étudiant sur scène',
  },
} satisfies Record<string, MediaAsset>;

/* ---------------------------- Identite --------------------------- */

export const organization: OrganizationInfo = {
  name: 'Union des Universités Privées de Thiès',
  acronym: 'UUPT',
  tagline: 'Ensemble, construisons l’avenir',
  type: 'Mouvement estudiantin inter-établissements',
  createdAt: '2026-04-26',
  createdLabel: '26 Avril 2026',
  city: 'Thiès',
  region: 'Thiès',
  country: 'Sénégal',
  address: 'Thiès, Sénégal',
  // TODO(UUPT) : remplacer par les coordonnees officielles de l'Union.
  email: 'contact@uupt.sn',
  phone: '+221 00 000 00 00',
  whatsapp: '221000000000',
};

/* ------------------------- Navigation ---------------------------- */

export const navLinks: NavLink[] = [
  { id: 'accueil', to: '/', label: 'Accueil', description: 'Le mouvement estudiantin de Thiès' },
  {
    id: 'a-propos',
    to: '/a-propos',
    label: 'À propos',
    description: 'Mission et collaboration avec les BDE',
  },
  { id: 'axes', to: '/axes', label: 'Nos Axes', description: 'Académique, innovation, sport' },
  {
    id: 'historique',
    to: '/historique',
    label: 'Historique',
    description: 'Du panel initial au 26 avril 2026',
  },
  {
    id: 'partenaires',
    to: '/partenaires',
    label: 'BDE Partenaires',
    description: 'Établissements et bureaux étudiants',
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
  label: 'Rejoindre l’UUPT',
  href: '/contact',
  icon: UserPlus,
};

/* ------------------------------ Hero ----------------------------- */

export const heroContent: HeroContent = {
  overtitle: 'Mouvement estudiantin • Thiès, Sénégal',
  title: {
    lead: 'Fédérer, innover et',
    accent: 'construire l’avenir',
    tail: '!',
  },
  subtitle:
    'L’UUPT rassemble les étudiants des universités, écoles et instituts privés de Thiès autour de projets communs, en étroite collaboration avec les Bureaux Des Étudiants (BDE) de chaque établissement.',
  primaryCta: { label: 'Découvrir nos axes', href: '/axes', icon: ArrowRight },
  secondaryCta: { label: 'Rejoindre l’UUPT', href: '/contact', icon: UserPlus },
  background: media.hero,
  marqueeItems: [
    'Académique & Culturel',
    'Innovation & Technique',
    'Sport inter-établissements',
    'Concours de plaidoirie',
    'Panels de discussion',
    'Expositions des projets étudiants',
    'Tournois Basket • Hand • Foot',
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
    label: 'Établissements & BDE',
    detail: 'Universités, écoles et instituts privés de Thiès',
    icon: Building2,
  },
  {
    id: 'axes',
    value: 3,
    label: 'Axes majeurs',
    detail: 'Académique & culturel, innovation, sport',
    icon: Target,
  },
  {
    id: 'evenements',
    value: 10,
    prefix: '+',
    label: 'Événements prévus',
    detail: 'Panels, formations, expositions, tournois',
    icon: Calendar,
  },
  {
    id: 'disciplines',
    value: 3,
    label: 'Disciplines sportives',
    detail: 'Basket-ball, handball et football',
    icon: Trophy,
  },
];

/* ---------------------------- A propos --------------------------- */

export const aboutCopy: SectionCopy = {
  eyebrow: 'Qui sommes-nous',
  title: 'Un mouvement estudiantin',
  highlight: 'au service des étudiants de Thiès',
  description:
    'Née de la volonté des étudiants des établissements supérieurs privés de Thiès, l’UUPT transforme des campus souvent isolés les uns des autres en une communauté de destin, capable de porter des projets communs et de faire entendre une voix unique.',
};

/** Les trois engagements statutaires de l'Union. */
export const missionPillars: MissionPillar[] = [
  {
    id: 'federer',
    title: 'Fédérer les étudiants',
    description:
      'Réunir les étudiants des établissements d’enseignement supérieur privés de Thiès autour de projets communs, dans un esprit de fraternité inter-campus.',
    icon: Users,
  },
  {
    id: 'promouvoir',
    title: 'Promouvoir l’excellence',
    description:
      'Valoriser l’excellence académique, les compétences oratoires, les talents sportifs et les innovations des filières techniques et juridiques.',
    icon: Award,
  },
  {
    id: 'collaborer',
    title: 'Agir avec les BDE',
    description:
      'Concevoir et déployer l’ensemble des activités en étroite collaboration avec les Bureaux Des Étudiants de chaque établissement affilié.',
    icon: Handshake,
  },
];

/** Mise en avant du partenariat strategique avec les BDE. */
export const bdePartnership = {
  eyebrow: 'Partenaire stratégique',
  title: 'Les Bureaux Des Étudiants, colonne vertébrale de l’Union',
  description:
    'L’UUPT ne se substitue à aucun BDE : elle les relie. Chaque activité est co-construite, co-animée et restituée avec le bureau de l’établissement concerné, qui demeure le point de contact direct des étudiants et le garant de la représentativité de ses filières.',
  commitments: [
    {
      id: 'co-construction',
      title: 'Co-construction systématique',
      description:
        'Chaque projet est discuté puis validé en assemblée avec les délégués des BDE affiliés.',
      icon: MessageSquare,
    },
    {
      id: 'equite',
      title: 'Représentation équitable',
      description:
        'Une voix par établissement, quelle que soit sa taille, pour garantir un équilibre durable.',
      icon: Scale,
    },
    {
      id: 'transparence',
      title: 'Transparence totale',
      description:
        'Programmes, budgets et résultats sont restitués publiquement après chaque activité.',
      icon: ShieldCheck,
    },
    {
      id: 'competences',
      title: 'Montée en compétences',
      description:
        'Les membres des BDE sont formés à la gestion de projet, à la communication et au plaidoyer.',
      icon: GraduationCap,
    },
  ],
};

/* --------------------------- Nos axes ---------------------------- */

export const axesCopy: SectionCopy = {
  eyebrow: 'Nos axes d’activités',
  title: 'Trois leviers pour',
  highlight: 'faire grandir la jeunesse',
  description:
    'L’Union concentre son action sur trois axes complémentaires, pilotés avec les BDE de chaque établissement selon un calendrier annuel et des livrables concrets.',
};

export const activityAxes: ActivityAxis[] = [
  {
    id: 'academique-culturel',
    order: '01',
    title: 'Académique & Culturel',
    tagline: 'La parole comme premier talent',
    description:
      'Un espace d’émulation intellectuelle où les étudiants de Thiès affûtent leur esprit critique, leur culture générale et leur éloquence à travers des rencontres de haut niveau.',
    icon: BookOpen,
    image: media.axeAcademique,
    activities: [
      {
        title: 'Panels de discussion',
        description:
          'Tables rondes thématiques réunissant étudiants, enseignants et professionnels autour des grands enjeux du Sénégal et de l’Afrique.',
      },
      {
        title: 'Sessions de formation',
        description:
          'Ateliers pratiques : méthodologie de recherche, rédaction scientifique, communication et préparation à l’insertion professionnelle.',
      },
      {
        title: 'Débats d’idées',
        description:
          'Confrontations argumentées entre établissements sur des sujets de société, arbitrées par un jury et restituées devant le public.',
      },
      {
        title: 'Concours de plaidoirie',
        description:
          'Compétition d’éloquence et de droit réservée aux filières juridiques, évaluée par des praticiens du barreau et de la magistrature.',
      },
    ],
  },
  {
    id: 'innovation',
    order: '02',
    title: 'Innovation',
    tagline: 'Montrer ce que nos campus savent construire',
    description:
      'Une vitrine dédiée aux productions des filières techniques et technologiques : prototypes, logiciels, objets connectés et solutions pensées pour les besoins réels de Thiès.',
    icon: Cpu,
    image: media.axeInnovation,
    activities: [
      {
        title: 'Expositions des projets étudiants',
        description:
          'Galeries techniques où chaque établissement présente ses prototypes, maquettes et travaux de fin de cycle au grand public.',
      },
      {
        title: 'Démonstrations en direct',
        description:
          'Sessions de démonstration et de tests de solutions numériques, robotiques et énergétiques développées par les étudiants.',
      },
      {
        title: 'Rencontres avec l’écosystème',
        description:
          'Mise en relation avec les entreprises, incubateurs et institutions pour accélérer la maturation des projets présentés.',
      },
      {
        title: 'Concours d’innovation',
        description:
          'Distinction des meilleures créations par un jury mixte, réunissant enseignants-chercheurs et professionnels du secteur.',
      },
    ],
  },
  {
    id: 'sportif',
    order: '03',
    title: 'Sportif',
    tagline: 'La cohésion se construit sur le terrain',
    description:
      'Des compétitions inter-établissements qui transforment la rivalité académique en esprit d’équipe, avec le fair-play et la rigueur comme règles communes à tous les campus.',
    icon: Trophy,
    image: media.axeSport,
    activities: [
      {
        title: 'Tournois inter-établissements',
        description:
          'Championnats organisés par l’UUPT réunissant les équipes engagées par chaque BDE affilié.',
      },
      {
        title: 'Basket-ball',
        description:
          'Compétition phare des campus thiessois, disputée en gymnase avec arbitrage officiel et supporters des deux camps.',
      },
      {
        title: 'Handball',
        description:
          'Format de tournoi à élimination directe favorisant l’intensité, la discipline collective et la cohésion d’équipe.',
      },
      {
        title: 'Football',
        description:
          'Le rendez-vous le plus attendu de l’année, véritable ciment social entre les établissements privés de Thiès.',
      },
    ],
  },
];

/* -------------------------- Historique --------------------------- */

export const timelineCopy: SectionCopy = {
  eyebrow: 'Notre histoire',
  title: 'De l’idée initiale à la',
  highlight: 'création officielle',
  description:
    'L’UUPT n’est pas née d’une décision isolée, mais d’un processus de dialogue : une idée surgie lors d’un panel académique, une large concertation entre leaders étudiants, puis des rencontres déterminantes avec les directions des établissements privés de Thiès.',
};

export const timelineSteps: TimelineStep[] = [
  {
    id: 'genese',
    order: 1,
    phase: 'Genèse',
    period: 'Idée initiale',
    title: 'Naissance de l’idée',
    description:
      'À l’issue d’une invitation à un panel académique, l’idée d’un rassemblement inter-établissements émerge entre les étudiants présents : et si les campus privés de Thiès parlaient enfin d’une même voix ?',
    icon: Lightbulb,
  },
  {
    id: 'concertation',
    order: 2,
    phase: 'Concertation',
    period: 'Dialogue inter-établissements',
    title: 'Large concertation entre leaders étudiants',
    description:
      'Rencontres et échanges ouverts réunissant les leaders étudiants de Thiès pour définir le périmètre, les missions et les règles de fonctionnement de la future Union.',
    icon: Users,
  },
  {
    id: 'adhesion',
    order: 3,
    phase: 'Adhésion institutionnelle',
    period: 'Rencontres avec les directions',
    title: 'Validation par les universités et écoles',
    description:
      'Présentation du projet aux directions des différentes universités et écoles privées de Thiès, afin de valider la démarche, d’en préciser le cadre et de recueillir leur adhésion.',
    icon: Handshake,
  },
  {
    id: 'lancement',
    order: 4,
    phase: 'Lancement officiel',
    period: '26 Avril 2026',
    title: 'Création officielle de l’UUPT',
    description:
      'L’Union des Universités Privées de Thiès est officiellement constituée, avec l’ambition de fédérer durablement la jeunesse estudiantine privée de la ville et de porter ses talents sur la scène régionale.',
    icon: Rocket,
    isMilestone: true,
  },
];

/* ------------------- Etablissements & BDE ------------------------ */

export const partnersCopy: SectionCopy = {
  eyebrow: 'Établissements & BDE',
  title: 'Les campus qui font',
  highlight: 'vivre l’Union',
  description:
    'Chaque établissement affilié est représenté par son Bureau Des Étudiants, interlocuteur unique de l’UUPT pour co-organiser les activités et mobiliser ses étudiants.',
};

/**
 * ATTENTION — DONNEES A PERSONNALISER
 * -----------------------------------
 * Les fiches ci-dessous decrivent les poles disciplinaires vises par
 * l'Union (par filiere), et non la liste definitive des etablissements.
 * Remplacez `name` / `shortName` / `bdeName` par les denominations
 * officielles une fois l'adhesion de chaque direction confirmee, puis
 * passez `isPlaceholder` a `false` pour masquer le bandeau d'information.
 */
export const partnerDirectory: PartnerDirectory = {
  isPlaceholder: true,
  notice:
    'Répertoire en cours de finalisation : les pôles affichés correspondent aux filières représentées. La liste nominative des établissements et des BDE sera publiée après validation par chaque direction.',
  establishments: [
    {
      id: 'pole-technique-ingenierie',
      name: 'Pôle Technique & Ingénierie',
      shortName: 'PTI',
      kind: 'École supérieure',
      field: 'Sciences & ingénierie',
      filieres: ['Génie civil', 'Génie électrique', 'Maintenance industrielle'],
      bdeName: 'BDE Pôle Technique & Ingénierie',
      status: 'affilie',
    },
    {
      id: 'pole-informatique-reseaux',
      name: 'Pôle Informatique & Réseaux',
      shortName: 'PIR',
      kind: 'Institut',
      field: 'Numérique & télécommunications',
      filieres: ['Développement logiciel', 'Réseaux & télécoms', 'Cybersécurité'],
      bdeName: 'BDE Pôle Informatique & Réseaux',
      status: 'affilie',
    },
    {
      id: 'pole-droit-sciences-juridiques',
      name: 'Pôle Droit & Sciences Juridiques',
      shortName: 'PDSJ',
      kind: 'Institut',
      field: 'Droit & sciences politiques',
      filieres: ['Droit privé', 'Droit des affaires', 'Sciences politiques'],
      bdeName: 'BDE Pôle Droit & Sciences Juridiques',
      status: 'affilie',
    },
    {
      id: 'pole-management-commerce',
      name: 'Pôle Management & Commerce',
      shortName: 'PMC',
      kind: 'École supérieure',
      field: 'Gestion & commerce',
      filieres: ['Gestion des entreprises', 'Marketing', 'Commerce international'],
      bdeName: 'BDE Pôle Management & Commerce',
      status: 'affilie',
    },
    {
      id: 'pole-comptabilite-finance',
      name: 'Pôle Comptabilité, Finance & Audit',
      shortName: 'PCFA',
      kind: 'École supérieure',
      field: 'Finance & audit',
      filieres: ['Comptabilité', 'Finance', 'Audit & contrôle de gestion'],
      bdeName: 'BDE Pôle Comptabilité, Finance & Audit',
      status: 'affilie',
    },
    {
      id: 'pole-sante-sciences-vie',
      name: 'Pôle Santé & Sciences de la Vie',
      shortName: 'PSV',
      kind: 'Institut',
      field: 'Santé & biologie',
      filieres: ['Sciences infirmières', 'Biologie médicale', 'Analyses biomédicales'],
      bdeName: 'BDE Pôle Santé & Sciences de la Vie',
      status: 'en-cours',
    },
    {
      id: 'pole-btp-architecture',
      name: 'Pôle BTP & Architecture',
      shortName: 'PBA',
      kind: 'École supérieure',
      field: 'Construction & aménagement',
      filieres: ['Bâtiment & travaux publics', 'Architecture', 'Géomatique'],
      bdeName: 'BDE Pôle BTP & Architecture',
      status: 'en-cours',
    },
    {
      id: 'pole-communication-medias',
      name: 'Pôle Communication & Médias',
      shortName: 'PCM',
      kind: 'Centre de formation',
      field: 'Communication & journalisme',
      filieres: ['Journalisme', 'Communication d’entreprise', 'Audiovisuel'],
      bdeName: 'BDE Pôle Communication & Médias',
      status: 'invite',
    },
  ],
};

/** Libelles affiches pour chaque statut d'affiliation. */
export const partnerStatusLabels: Record<Partner['status'], string> = {
  affilie: 'Affilié',
  'en-cours': 'Adhésion en cours',
  invite: 'Invité',
};

/* --------------------------- Contact ----------------------------- */

export const contactCopy: SectionCopy = {
  eyebrow: 'Contact & Adhésion',
  title: 'Rejoindre l’UUPT ou',
  highlight: 'contacter un BDE',
  description:
    'Étudiant, membre de BDE, direction d’établissement ou partenaire : écrivez-nous pour adhérer à l’Union, proposer une activité ou soutenir l’un de nos trois axes.',
};

/** Canaux de contact rapide affiches a cote du formulaire. */
export const contactChannels: ContactChannel[] = [
  {
    id: 'localisation',
    label: 'Localisation',
    value: `${organization.city}, ${organization.country}`,
    href: '#accueil',
    icon: MapPin,
  },
  {
    id: 'email',
    label: 'Email officiel',
    value: organization.email,
    href: `mailto:${organization.email}`,
    icon: Mail,
  },
  {
    id: 'telephone',
    label: 'Téléphone',
    value: organization.phone,
    href: `tel:${organization.phone.replace(/\s+/g, '')}`,
    icon: Phone,
  },
  {
    id: 'mouvement',
    label: 'Nature du mouvement',
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
  { value: 'etudiant', label: 'Étudiant(e)' },
  { value: 'membre-bde', label: 'Membre de BDE' },
  { value: 'president-bde', label: 'Président(e) de BDE' },
  { value: 'direction', label: 'Direction d’établissement' },
  { value: 'enseignant', label: 'Enseignant(e) / Formateur(trice)' },
  { value: 'partenaire', label: 'Partenaire ou institution' },
];

/** Textes et libelles du formulaire de contact. */
export const contactFormCopy = {
  badge: 'Formulaire de contact',
  title: 'Écrivez à l’Union',
  description:
    'Votre demande est transmise au bureau de l’Union, qui assure la liaison avec le BDE de l’établissement concerné.',
  submitLabel: 'Envoyer ma demande',
  submittingLabel: 'Envoi en cours…',
  successTitle: 'Demande enregistrée',
  successMessage:
    'Merci pour votre message. Le bureau de l’UUPT revient vers vous et, le cas échéant, transmet votre demande au BDE compétent.',
  resetLabel: 'Envoyer une autre demande',
  privacyNote:
    'Les informations transmises servent uniquement au traitement de votre demande par l’Union et les BDE concernés.',
} as const;

/* --------------------- Action flottante -------------------------- */

/**
 * Bouton d'action flottant (bas de page, a droite).
 * TODO(UUPT) : renseigner le numero WhatsApp officiel dans
 * `organization.whatsapp` (format international sans espaces).
 */
export const whatsappAction = {
  label: 'WhatsApp',
  ariaLabel: 'Contacter l’UUPT sur WhatsApp',
  href: `https://wa.me/${organization.whatsapp}`,
} as const;

/* ---------------------------- Footer ----------------------------- */

export const footerCopy = {
  description:
    'L’Union des Universités Privées de Thiès fédère les étudiants des établissements d’enseignement supérieur privés de la ville autour de l’excellence académique, de l’innovation technique et du sport inter-établissements.',
  legalNote: `© ${new Date().getFullYear()} ${organization.name} (${organization.acronym}). Tous droits réservés.`,
  creationNote: `Mouvement estudiantin inter-établissements créé le ${organization.createdLabel} à ${organization.city}, ${organization.country}.`,
  builtWith: 'Site officiel — React, TypeScript, Tailwind CSS & Framer Motion',
  legalLinks: [
    { label: 'Mentions légales', href: '#contact' },
    { label: 'Politique de confidentialité', href: '#contact' },
    { label: 'Adhésion des établissements', href: '#contact' },
  ],
} as const;
