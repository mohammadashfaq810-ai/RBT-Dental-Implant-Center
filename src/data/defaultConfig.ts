import heroClinicImg from '../assets/images/hero_dental_clinic_1793286924646.jpg';
import guidedImplantImg from '../assets/images/proc_guided_implant_1793286926185.jpg';
import cosmeticVeneersImg from '../assets/images/proc_cosmetic_veneers_1793286927570.jpg';
import rootCanalImg from '../assets/images/proc_root_canal_1793286928499.jpg';
import clearAlignersImg from '../assets/images/proc_clear_aligners_1793286928916.jpg';
import { PatientReview, SiteConfig, ThemeColors, TreatmentCatalogItem } from '../types';

export const THEME_PRESETS: Array<{ name: string; description: string; colors: ThemeColors }> = [
  {
    name: 'DHA Botanical Light Green',
    description: 'Signature calming light green canvas with deep forest headings and emerald clinical accents.',
    colors: {
      canvasBg: '#EEF8F1',
      surfaceBg: '#FFFFFF',
      tintBg: '#DFF2E5',
      headingColor: '#0D281D',
      bodyColor: '#284237',
      accentColor: '#0C7C59',
      accentDarkColor: '#085C42',
    },
  },
  {
    name: 'Soft Mint & Midnight',
    description: 'Fresh pastel mint backdrop paired with rich charcoal-slate headings and vibrantjade actions.',
    colors: {
      canvasBg: '#EBFAF3',
      surfaceBg: '#FFFFFF',
      tintBg: '#D5F4E5',
      headingColor: '#0F1F1C',
      bodyColor: '#263D38',
      accentColor: '#059669',
      accentDarkColor: '#047857',
    },
  },
  {
    name: 'Eucalyptus Clinical Calm',
    description: 'Serene eucalyptus-green page surface with dark pine typography and deep sea-green accents.',
    colors: {
      canvasBg: '#F1F8F3',
      surfaceBg: '#FFFFFF',
      tintBg: '#E2F0E6',
      headingColor: '#122B22',
      bodyColor: '#2F483E',
      accentColor: '#0F766E',
      accentDarkColor: '#115E59',
    },
  },
  {
    name: 'Spring Sage & Obsidian',
    description: 'Luminous light sage green with ultra-crisp dark obsidian headings and lively emerald buttons.',
    colors: {
      canvasBg: '#ECF7EE',
      surfaceBg: '#FFFFFF',
      tintBg: '#DCEEE0',
      headingColor: '#102118',
      bodyColor: '#2A3F33',
      accentColor: '#15803D',
      accentDarkColor: '#166534',
    },
  },
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  clinicName: 'RBT Dental & Implant Center',
  leadDentist: 'Dr. Rao Bazil Taimur',
  leadTitle: 'Principal Dental Surgeon & Digital Implant Specialist',
  phoneDisplay: '0313 3337726',
  whatsappDigits: '923133337726',
  addressFull: 'First Floor, Building 14A, A Block Sector A, Phase 5 D.H.A., Lahore',
  plusCode: 'FC6F+GJ Lahore, Pakistan',
  ratingScore: '5.0',
  reviewCount: 34,
  heroHeadline: 'Precision Dental Implants & Calm Modern Dentistry in DHA Phase 5, Lahore',
  heroSubheadline:
    'Led by Dr. Rao Bazil Taimur, RBT Dental & Implant Center combines 3D CBCT-guided implant surgery, custom zirconia crowns, porcelain veneers, clear aligners, and painless root canal care inside a serene, modern clinic designed around patient comfort.',
  heroImageUrl: heroClinicImg,
  clinicFacadeImageUrl: '/assets/aistudio/unnamed_cb2f64c8.jpg',
  aboutHeadline: 'A Calm, Hygienic Dental Sanctuary Built on Digital Precision',
  aboutStoryParagraph1:
    'Located on the First Floor of Building 14A, A Block Sector A in DHA Phase 5, Lahore, RBT Dental & Implant Center was founded by Dr. Rao Bazil Taimur to reimagine how patients experience comprehensive dental care. Instead of an intimidating or rushed clinical room, our practice feels calm, bright, and thoughtfully designed—where every step of your treatment is explained clearly before we begin.',
  aboutStoryParagraph2:
    'As a premier center for dental implants in Lahore and digital dentistry, we utilize 3D Cone-Beam Computed Tomography (CBCT) planning, custom 3D-printed surgical guides, and digital intraoral workflows. Whether you are visiting for full mouth rehabilitation with All-on-4 and All-on-6 dental implants, natural zirconia veneers, invisible aligners, or routine ultrasonic scaling and painless fillings, your care is tailored for lasting oral health and effortless comfort.',
  adminPasscode: 'rbt2026',
  theme: THEME_PRESETS[0].colors,
  schedule: [
    { day: 'Wednesday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Thursday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Friday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Saturday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Sunday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Monday', hours: '10:00 AM – 9:00 PM' },
    { day: 'Tuesday', hours: '10:00 AM – 9:00 PM' },
  ],
  procedures: [
    {
      id: 'proc-guided-implants',
      indexLabel: '01',
      category: 'implants',
      departmentLabel: 'CBCT Digital Implantology',
      title: '3D Guided Dental Implants, Immediate Implants & All-on-4 / All-on-6 Rehabilitation',
      dentistCredit: 'Performed personally by Dr. Rao Bazil Taimur using 3D CBCT surgical guides',
      duration: '45–90 mins per arch / stage',
      comfortNote: 'Keyhole minimally invasive placement under local comfort anesthesia',
      imageUrl: guidedImplantImg,
      imageAlt:
        'Dr. Rao Bazil Taimur planning CBCT 3D guided dental implant surgery at RBT Dental & Implant Center in DHA Phase 5 Lahore',
      colorScheme: 'emerald',
      seoSummary:
        'Patients searching for permanent dental implants in Lahore choose our CBCT-guided implant dentistry for unmatched accuracy, rapid healing, and natural bite restoration—ranging from single immediate tooth implants to All-on-4 and All-on-6 full-arch prosthetics.',
      dentistExecutionNarrative:
        'How the Dentist Carries Out Your Implant Procedure: Dr. Rao Bazil Taimur begins with a high-resolution 3D CBCT bone scan to map nerve pathways, sinus contours, and bone density down to sub-millimeter precision. Where bone support needs reinforcement, targeted bone grafting is performed seamlessly. Using a custom-fabricated 3D surgical guide, Dr. Bazil places the biocompatible titanium implant gently into the ideal angulation without unnecessary incisions—allowing faster recovery and rock-solid support for zirconia crowns or implant-supported dentures.',
      steps: [
        {
          stepNumber: '01.',
          title: '3D CBCT Bone Mapping & Virtual Smile Blueprint',
          detail:
            'Digital scan evaluates jawbone volume in DHA Phase 5 clinic and positions your virtual implant for optimal chewing strength.',
        },
        {
          stepNumber: '02.',
          title: 'Keyhole Guided Implant Surgery & Bone Grafting',
          detail:
            'Dr. Rao Bazil Taimur uses a custom surgical stent for gentle, stitch-minimal titanium fixture placement or immediate extraction-site implants.',
        },
        {
          stepNumber: '03.',
          title: 'Custom Zirconia Crown or Full-Arch Bridge Delivery',
          detail:
            'Precision-milled zirconia tooth, All-on-4 / All-on-6 fixed bridge, or implant-supported denture is torqued for lifelike aesthetics.',
        },
      ],
      keywords: [
        'dental implants Lahore',
        'guided implant surgery DHA Phase 5',
        'All-on-4 and All-on-6 implants Lahore',
      ],
    },
    {
      id: 'proc-zirconia-cosmetic',
      indexLabel: '02',
      category: 'cosmetic',
      departmentLabel: 'Cosmetic & Prosthetic Dentistry',
      title: 'Custom Zirconia Crowns, Porcelain Veneers & Clinical Teeth Whitening',
      dentistCredit: 'Carried out by Dr. Rao Bazil Taimur with digital shade & smile design',
      duration: '1–2 precision visits',
      comfortNote: 'Enamel-conserving preparation with natural translucency matching',
      imageUrl: cosmeticVeneersImg,
      imageAlt:
        'Cosmetic dentist matching custom zirconia crowns and porcelain veneers with patient in DHA Phase 5 Lahore',
      colorScheme: 'sky',
      seoSummary:
        'Transform chipped, discolored, or worn teeth with bespoke cosmetic dentistry in DHA Lahore. Our metal-free monolithic zirconia crowns, ultra-thin porcelain veneers, and professional teeth whitening deliver luminous, natural smiles.',
      dentistExecutionNarrative:
        'How the Dentist Carries Out Your Smile Makeover: Dr. Rao Bazil Taimur evaluates facial symmetry, lip dynamics, and natural enamel shade under calibrated daylight lighting. For zirconia crowns and bridges or cosmetic veneers, conservative micro-preparation preserves healthy tooth structure while digital impressions capture exact margins. Before final bonding, you preview the contour and brightness in the mirror so every tooth feels smooth, balanced, and unmistakably yours.',
      steps: [
        {
          stepNumber: '01.',
          title: 'Shade Calibration & Conservative Tooth Preparation',
          detail:
            'Gentle micro-shaping and VITA shade matching ensure crowns and veneers blend seamlessly with neighboring teeth.',
        },
        {
          stepNumber: '02.',
          title: 'CAD/CAM Zirconia & Ceramic Crafting',
          detail:
            'High-strength zirconia crowns, bridges, or veneers are digitally milled with natural incisal translucency.',
        },
        {
          stepNumber: '03.',
          title: 'Adhesive Resin Bonding & Bite Polishing',
          detail:
            'Dr. Bazil bonds each restoration under moisture control and polishes your bite for effortless daily comfort.',
        },
      ],
      keywords: [
        'zirconia crowns and bridges Lahore',
        'porcelain veneers DHA Lahore',
        'professional teeth whitening Lahore',
      ],
    },
    {
      id: 'proc-root-canal-restorative',
      indexLabel: '03',
      category: 'restorative',
      departmentLabel: 'Painless Endodontics & Restorative Care',
      title: 'Painless Rotary Root Canal Treatment, Ultrasonic Scaling & Aesthetic Fillings',
      dentistCredit: 'Performed step-by-step by Dr. Rao Bazil Taimur with patient-first explanation',
      duration: '30–60 mins single-visit options',
      comfortNote: 'Profound gentle anesthesia & calm chairside walkthrough at every step',
      imageUrl: rootCanalImg,
      imageAlt:
        'Dentist explaining digital X-ray before painless rotary root canal treatment and tooth-colored fillings in Lahore',
      colorScheme: 'amber',
      seoSummary:
        'Relieve toothache and save natural teeth with gentle, single-sitting root canal treatment, biomimetic tooth-colored fillings, and ultrasonic scaling and polishing in DHA Phase 5, Lahore.',
      dentistExecutionNarrative:
        'How the Dentist Carries Out Painless Root Canal & Restorative Care: Nervous patients consistently praise how Dr. Rao Bazil Taimur explains every step clearly before touching a tooth. After digital radiography and gentle topical-first numbing, flexible nickel-titanium rotary instruments and electronic apex locators clean infected root canals quietly and thoroughly without discomfort. The saved tooth is then sealed hermetically and restored with a sculpted composite filling or protective zirconia crown.',
      steps: [
        {
          stepNumber: '01.',
          title: 'Digital Radiograph & Transparent Walkthrough',
          detail:
            'Chairside X-ray review lets you see the exact cause of sensitivity before gentle, painless local numbing.',
        },
        {
          stepNumber: '02.',
          title: 'Precision Rotary Disinfection & Canal Sealing',
          detail:
            'Modern rotary endodontics removes infection smoothly and seals root canals in a calm, relaxed appointment.',
        },
        {
          stepNumber: '03.',
          title: 'Biomimetic Composite Filling or Crown Protection',
          detail:
            'Sculpted tooth-colored composite resin or a custom zirconia cap restores full chewing strength and natural anatomy.',
        },
      ],
      keywords: [
        'painless root canal treatment Lahore',
        'scaling and tooth fillings DHA Lahore',
        'reliable dentist in Lahore',
      ],
    },
    {
      id: 'proc-invisible-aligners',
      indexLabel: '04',
      category: 'orthodontics',
      departmentLabel: 'Digital Orthodontics & Clear Aligners',
      title: 'Invisible Clear Aligners, Orthodontics & Full Mouth Bite Rehabilitation',
      dentistCredit: 'Supervised by Dr. Rao Bazil Taimur with 3D digital tooth-movement tracking',
      duration: '6–14 months progressive trays',
      comfortNote: 'Removable, nearly invisible medical-grade trays with zero metal brackets',
      imageUrl: clearAlignersImg,
      imageAlt:
        'Dentist presenting transparent invisible orthodontic aligners and 3D smile simulation at RBT Dental Lahore',
      colorScheme: 'indigo',
      seoSummary:
        'Straighten crowded, gapped, or misaligned teeth discreetly with custom invisible aligners in Lahore and comprehensive orthodontic care tailored for adults and teens across DHA.',
      dentistExecutionNarrative:
        'How the Dentist Carries Out Clear Aligner Orthodontics: Dr. Rao Bazil Taimur captures a 3D digital scan of your upper and lower arches—eliminating messy putty impressions—and maps a staged orthodontic movement plan. You receive a sequence of crystal-clear, removable aligner trays engineered to gently guide each tooth into alignment while allowing normal brushing, flossing, and dining. Regular milestone check-ins ensure predictable, comfortable progress from day one to retention.',
      steps: [
        {
          stepNumber: '01.',
          title: '3D Digital Arch Scan & Smile Movement Simulation',
          detail:
            'Preview how your teeth will straighten week-by-week before wearing your very first aligner tray.',
        },
        {
          stepNumber: '02.',
          title: 'Custom Clear Aligner Series & Micro-Attachments',
          detail:
            'Smooth, transparent trays apply gentle calibrated force without wires, ulcers, or dietary restrictions.',
        },
        {
          stepNumber: '03.',
          title: 'Refinement Polish & Long-Term Smile Retention',
          detail:
            'Final contour detailing and crystal-clear retainers preserve your newly aligned smile for years to come.',
        },
      ],
      keywords: [
        'invisible aligners Lahore',
        'clear orthodontic aligners DHA Phase 5',
        'full mouth rehabilitation Lahore',
      ],
    },
  ],
};

export const FULL_TREATMENT_CATALOG: TreatmentCatalogItem[] = [
  {
    id: 'cat-guided-implant',
    category: 'implants',
    name: '3D CBCT Guided Implant Surgery',
    shortDescription:
      'Computer-guided keyhole dental implant placement using 3D bone imaging and custom surgical stents for maximum safety and minimal post-op swelling.',
    idealFor: 'Single or multiple missing teeth',
    visitEstimate: '60 mins placement',
  },
  {
    id: 'cat-immediate-implant',
    category: 'implants',
    name: 'Immediate Same-Day Dental Implants',
    shortDescription:
      'Placement of a titanium dental implant immediately following gentle tooth extraction to preserve natural gum architecture and jawbone volume.',
    idealFor: 'Fractured or non-restorable teeth',
    visitEstimate: 'Single surgical visit',
  },
  {
    id: 'cat-all-on-4-6',
    category: 'implants',
    name: 'All-on-4 & All-on-6 Full-Arch Implants',
    shortDescription:
      'Fixed full-arch teeth restoration anchored on 4 or 6 strategically angled implants—eliminating loose removable dentures permanently.',
    idealFor: 'Complete upper or lower arch restoration',
    visitEstimate: 'Staged digital workflow',
  },
  {
    id: 'cat-implant-dentures',
    category: 'implants',
    name: 'Implant-Supported Overdentures & Bone Grafting',
    shortDescription:
      'Snap-in implant dentures for rock-solid speaking and chewing confidence, paired with ridge augmentation and bone grafting when jawbone has resorbed.',
    idealFor: 'Loose denture wearers & low bone volume',
    visitEstimate: 'Custom prosthetic plan',
  },
  {
    id: 'cat-zirconia-crowns',
    category: 'cosmetic',
    name: 'Monolithic Zirconia Crowns & Bridges',
    shortDescription:
      'Metal-free CAD/CAM zirconia crowns and fixed bridges crafted for high bite strength, biocompatible gum health, and natural enamel luster.',
    idealFor: 'Root-canal treated, cracked, or missing teeth',
    visitEstimate: '2 visits',
  },
  {
    id: 'cat-veneers',
    category: 'cosmetic',
    name: 'Porcelain & Aesthetic Dental Veneers',
    shortDescription:
      'Ultra-thin custom ceramic shells bonded to front teeth to correct deep stains, diastema gaps, minor crowding, and worn edges.',
    idealFor: 'Complete cosmetic smile transformation',
    visitEstimate: '2 visits',
  },
  {
    id: 'cat-whitening',
    category: 'cosmetic',
    name: 'Clinical Power Teeth Whitening',
    shortDescription:
      'Enamel-safe in-office teeth brightening with desensitizing protection to lift years of tea, coffee, and lifestyle staining in a single session.',
    idealFor: 'Stained or dull enamel',
    visitEstimate: '45 mins single visit',
  },
  {
    id: 'cat-full-mouth-rehab',
    category: 'cosmetic',
    name: 'Full Mouth Rehabilitation',
    shortDescription:
      'Comprehensive multidisciplinary reconstruction combining implants, zirconia prosthetics, bite elevation, and gum harmony for severely worn dentition.',
    idealFor: 'Generalized tooth wear & bite collapse',
    visitEstimate: 'Phased digital plan',
  },
  {
    id: 'cat-rct',
    category: 'restorative',
    name: 'Painless Rotary Root Canal Treatment',
    shortDescription:
      'Quiet, comfortable endodontic therapy utilizing digital apex locators and flexible rotary files to eliminate tooth pain and preserve natural roots.',
    idealFor: 'Deep decay, throbbing pain, or sensitivity',
    visitEstimate: '1–2 visits',
  },
  {
    id: 'cat-fillings',
    category: 'restorative',
    name: 'Tooth-Colored Biomimetic Composite Fillings',
    shortDescription:
      'Mercury-free nano-hybrid composite restorations sculpted to match natural cusps and grooves invisibly while sealing out bacteria.',
    idealFor: 'Cavities, chipped edges, old metal fillings',
    visitEstimate: '30–45 mins',
  },
  {
    id: 'cat-scaling',
    category: 'restorative',
    name: 'Ultrasonic Scaling, Polishing & Gum Care',
    shortDescription:
      'Gentle piezoelectric ultrasonic plaque and tartar removal followed by stain-lifting air-polish paste for healthy gums and fresh breath.',
    idealFor: '6-month preventive dental checkups',
    visitEstimate: '30 mins',
  },
  {
    id: 'cat-aligners',
    category: 'orthodontics',
    name: 'Invisible Clear Aligners',
    shortDescription:
      'Custom 3D-printed clear orthodontic aligners that discreetly align crooked or spaced teeth without metal wires or bracket emergencies.',
    idealFor: 'Adults & teens seeking invisible braces',
    visitEstimate: 'Bi-monthly digital checks',
  },
  {
    id: 'cat-braces',
    category: 'orthodontics',
    name: 'Comprehensive Orthodontics & Bite Correction',
    shortDescription:
      'Precision ceramic and modern low-friction orthodontic systems engineered to correct overbites, crossbites, and arch crowding.',
    idealFor: 'Complex bite & alignment correction',
    visitEstimate: 'Structured ortho plan',
  },
];

export const VERIFIED_PATIENT_REVIEWS: PatientReview[] = [
  {
    id: 'rev-1',
    authorLabel: 'Verified Patient · DHA Lahore',
    treatmentMentioned: 'Root Canal & Composite Fillings',
    timeAgo: 'Recent Google Review',
    rating: 5,
    quote:
      'I recently visited Dr. Rao Bazil for a root canal and fillings and was impressed from start to finish. The clinic is neat, hygienic, and beautifully designed. It feels calm and modern rather than clinical. Dr. Bazil is skilled and professional. He explained each step of the procedure, made sure I was comfortable throughout, and the whole treatment was far easier than I expected. You can tell he genuinely cares about his patients and the quality of his work. I’d confidently recommend him to anyone looking for a reliable dentist in Lahore.',
  },
  {
    id: 'rev-2',
    authorLabel: 'Verified Patient · Lahore',
    treatmentMentioned: 'Crowns, Scaling & Teeth Whitening',
    timeAgo: '1 week ago · New',
    rating: 5,
    quote:
      'I had a wonderful experience at RBT! I got my crowns, scaling, whitening, and other dental treatments done, and I’m really happy with the results. The team was professional, friendly, and attentive throughout the entire process.',
  },
  {
    id: 'rev-3',
    authorLabel: 'Verified Patient · DHA Phase 5',
    treatmentMentioned: 'Scaling & Painless Fillings',
    timeAgo: 'Verified Google Review',
    rating: 5,
    quote:
      'Got my scaling and fillings done by Dr. Bazil and honestly had a really good experience. I was a little nervous about the fillings, but he made sure to explain everything before starting the procedure. The whole process was smooth and painless, and I’m really happy with how everything turned out. Would definitely recommend him!',
  },
  {
    id: 'rev-4',
    authorLabel: 'Verified Patient · Aligner Care',
    treatmentMentioned: 'Invisible Aligner Orthodontics',
    timeAgo: 'Verified Google Review',
    rating: 5,
    quote:
      'Dr. Rao Bazil is a fantastic dentist, and I had a really great experience with him throughout my aligner treatment. From the very beginning, he was professional, friendly, and always took the time to explain everything clearly.',
  },
  {
    id: 'rev-5',
    authorLabel: 'Verified Patient · Comprehensive Care',
    treatmentMentioned: 'Comprehensive Dental Care',
    timeAgo: 'Verified Google Review',
    rating: 5,
    quote:
      'I had a great experience at RBT. Dr Bazil is an amazing doctor and a wonderful person. The staff was friendly, the environment was clean, and the treatment was smooth and comfortable. Highly recommended for anyone looking for quality dental care!',
  },
];
