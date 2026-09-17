import type { LucideIcon } from 'lucide-react';

/* ==================================================================
 * Types du domaine UUPT
 * Decrivent les donnees exposees par `src/data/uuptData.ts`.
 * ================================================================== */

/**
 * Champ editorial bilingue (convention spec §8 : contenu = champs fr/en).
 * Le FR existant est conserve tel quel ; l'EN est une traduction a part
 * entiere. Lecture cote composant : `const { lang } = useLanguage()` puis
 * `champ[lang]`.
 */
export interface LocalizedText {
  fr: string;
  en: string;
}

/** Identifiants des routes du site (navigation React Router). */
export type RouteId =
  | 'accueil'
  | 'a-propos'
  | 'axe-academique-culturel'
  | 'axe-innovation'
  | 'axe-sportif'
  | 'historique'
  | 'partenaires'
  | 'contact';

/** Identifiants des sections servant d'ancres (conservé pour compatibilité). */
export type SectionId = RouteId;

/** Ambiance visuelle d'une section (fond clair ou sombre). */
export type ThemeTone = 'light' | 'muted' | 'dark';

/** Lien de navigation (navbar / footer, routes React Router). */
export interface NavLink {
  id: RouteId;
  /** Chemin de la route (ex. `/a-propos`). */
  to: string;
  label: LocalizedText;
  /** Description courte affichee dans le menu mobile et le footer. */
  description: LocalizedText;
}

/**
 * Coordonnees et identite institutionnelle de l'Union.
 * Les noms propres (`name`, `acronym`, `city`, `region`) et les
 * coordonnees techniques (`email`, `phone`, `whatsapp`, `createdAt`)
 * restent des `string` simples : ils ne se traduisent pas.
 */
export interface OrganizationInfo {
  name: string;
  acronym: string;
  /** Baseline courte (utilisee dans le footer et les meta). */
  tagline: LocalizedText;
  type: LocalizedText;
  /** Date de creation au format ISO. */
  createdAt: string;
  /** Date lisible par un humain. */
  createdLabel: LocalizedText;
  city: string;
  region: string;
  country: LocalizedText;
  address: LocalizedText;
  email: string;
  phone: string;
  /** Numero WhatsApp au format international sans espaces (ex. 221XXXXXXXXX). */
  whatsapp: string;
}

/**
 * Ressource visuelle.
 * `src` pointe vers le fichier local (dossier `public/`), `fallback`
 * vers une image distante utilisee tant que le fichier n'est pas fourni.
 */
export interface MediaAsset {
  src: string;
  fallback: string;
  alt: LocalizedText;
}

/** Bouton d'action (CTA). */
export interface CallToAction {
  label: LocalizedText;
  href: string;
  icon?: LucideIcon;
}

/** Titre du hero decoupe pour accentuer une portion en bleu vif. */
export interface HeroTitle {
  lead: LocalizedText;
  accent: LocalizedText;
  tail: LocalizedText;
}

/** Contenu de la section Hero. */
export interface HeroContent {
  /** Sur-titre en majuscules, ex. "MOUVEMENT ESTUDIANTIN • THIÈS, SÉNÉGAL". */
  overtitle: LocalizedText;
  title: HeroTitle;
  subtitle: LocalizedText;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  background: MediaAsset;
  /** Bandeau d'accroche defilant en bas du hero. */
  marqueeItems: LocalizedText[];
}

/** Chiffre cle de la banniere de statistiques. */
export interface Stat {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: LocalizedText;
  detail: LocalizedText;
  icon: LucideIcon;
}

/** Prestation rattachee a un axe d'activite. */
export interface AxisActivity {
  title: LocalizedText;
  description: LocalizedText;
}

/** Axe d'activite de l'UUPT. */
export interface ActivityAxis {
  id: string;
  /** Numero d'ordre affiche (01, 02, 03). */
  order: string;
  title: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
  image: MediaAsset;
  activities: AxisActivity[];
}

/** Etape de l'historique de creation de l'UUPT. */
export interface TimelineStep {
  id: string;
  order: number;
  phase: LocalizedText;
  period: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
  /** Marque l'etape fondatrice du 26 avril 2026. */
  isMilestone?: boolean;
}

/** Grande mission statutaire. */
export interface MissionPillar {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
}

/** Statut d'affiliation d'un etablissement partenaire. */
export type PartnerStatus = 'affilie' | 'en-cours' | 'invite';

/**
 * Etablissement d'enseignement superieur partenaire et son BDE.
 * `name`, `shortName` et `bdeName` sont des noms propres (sigles et
 * denominations d'etablissements) : ils restent des `string` simples.
 */
export interface Partner {
  id: string;
  name: string;
  shortName: string;
  kind: LocalizedText;
  field: LocalizedText;
  filieres: LocalizedText[];
  bdeName: string;
  status: PartnerStatus;
}

/** Repertoire des etablissements et BDE. */
export interface PartnerDirectory {
  /** `true` tant que la liste officielle n'est pas validee. */
  isPlaceholder: boolean;
  notice: LocalizedText;
  establishments: Partner[];
}

/**
 * Canal de contact rapide.
 * `value` reste un `string` simple pour les coordonnees non editoriales
 * (email, telephone) ; il est bilingue pour les valeurs de contenu
 * (localisation, nature du mouvement).
 */
export interface ContactChannel {
  id: string;
  label: LocalizedText;
  value: string | LocalizedText;
  href: string;
  icon: LucideIcon;
}

/** Reseau social de l'Union. */
export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Option du selecteur "Rôle" du formulaire. */
export interface RoleOption {
  value: string;
  label: LocalizedText;
}

/** Valeurs du formulaire de contact. */
export interface ContactFormValues {
  fullName: string;
  email: string;
  institution: string;
  role: string;
  message: string;
}

/** Erreurs de validation (champ -> message). */
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

/** Statut d'envoi du formulaire. */
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/** Option de langue du selecteur de la navbar. */
export interface LanguageOption {
  /** Code affiche dans la pastille (ex. FR). */
  code: string;
  label: string;
  /** `false` => langue listee mais non encore traduite. */
  available: boolean;
}

/** Bloc de copie d'un en-tete de section. */
export interface SectionCopy {
  eyebrow: LocalizedText;
  title: LocalizedText;
  /** Portion du titre mise en valeur (bleu vif). */
  highlight?: LocalizedText;
  description: LocalizedText;
}
