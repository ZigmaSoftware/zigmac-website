/**
 * Image loading and lookup utilities for projects
 */
import { normalizeProjectKey } from './dataProcessing';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="%23e2e8f0"/><text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23475569" font-family="Arial,sans-serif" font-size="40"></text></svg>';

const PROJECT_IMAGE_MODULES = import.meta.glob(
  '../../../assets/before after projects/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, string>;

const PROJECT_IMAGE_BY_FILE_NAME = Object.entries(PROJECT_IMAGE_MODULES).reduce<
  Record<string, string>
>((acc, [path, url]) => {
  const fileName = path.split('/').pop()?.toLowerCase();
  if (fileName) acc[fileName] = url;
  return acc;
}, {});

const PROJECT_IMAGE_BY_RELATIVE_PATH = Object.entries(PROJECT_IMAGE_MODULES).reduce<
  Record<string, string>
>((acc, [path, url]) => {
  const normalizedPath = path.replace(/\\/g, '/').toLowerCase();
  const marker = 'assets/before after projects/';
  const markerIndex = normalizedPath.indexOf(marker);
  if (markerIndex !== -1) {
    const relativePath = normalizedPath.slice(markerIndex + marker.length);
    acc[relativePath] = url;
  }
  return acc;
}, {});

/**
 * Get project image by file name
 */
export const getProjectImageByFileName = (fileName: string): string => {
  return PROJECT_IMAGE_BY_FILE_NAME[fileName.toLowerCase()] ?? PLACEHOLDER_IMAGE;
};

/**
 * Get project image by relative path from "assets/before after projects"
 */
export const getProjectImageByRelativePath = (relativePath: string): string => {
  const normalizedPath = relativePath.replace(/\\/g, '/').toLowerCase();
  return PROJECT_IMAGE_BY_RELATIVE_PATH[normalizedPath] ?? PLACEHOLDER_IMAGE;
};

/**
 * Get all images for a project (supports zone-wise images)
 */
export const getProjectAllImages = (prefix: string): string[] => {
  const normalizedPrefix = prefix.replace(/\\/g, '/').toLowerCase();
  const images: string[] = [];
  
  for (const [path, url] of Object.entries(PROJECT_IMAGE_MODULES)) {
    const normalizedPath = path.replace(/\\/g, '/').toLowerCase();
    const marker = 'assets/before after projects/';
    const markerIndex = normalizedPath.indexOf(marker);
    if (markerIndex === -1) continue;

    const relativePath = normalizedPath.slice(markerIndex + marker.length);
    if (relativePath.startsWith(normalizedPrefix)) {
      images.push(url);
    }
  }
  
  return images;
};

/**
 * Image lookup map for before/after images
 */
export const IMAGE_LOOKUP: Record<string, { beforeImage: string; afterImage: string }> = {
  [normalizeProjectKey('Kumbakonam')]: {
    beforeImage: getProjectImageByFileName('kumbakonam before.png'),
    afterImage: getProjectImageByFileName('kumbakonam after.png'),
  },
  [normalizeProjectKey('Sembakkam')]: {
    beforeImage: getProjectImageByFileName('SEMBAKKAM LAKE  before.png'),
    afterImage: getProjectImageByFileName('SEMBAKKAM LAKE  after.png'),
  },
  [normalizeProjectKey('Sector 54 NOIDA')]: {
    beforeImage: getProjectImageByFileName('NOIDA before.png'),
    afterImage: getProjectImageByFileName('NOIDA after.png'),
  },
  [normalizeProjectKey('Atladara- Vadodara')]: {
    beforeImage: getProjectImageByFileName('Atladara before.jpeg'),
    afterImage: getProjectImageByFileName('Atladara - after.jpeg'),
  },
  [normalizeProjectKey('Poonamallee')]: {
    beforeImage: getProjectImageByFileName('poonamallee before.png'),
    afterImage: getProjectImageByFileName('poonamallee after.png'),
  },
  [normalizeProjectKey('Vijayawada')]: {
    beforeImage: getProjectImageByFileName('VIJAYAWADA-AJITSINGH NAGAR before.png'),
    afterImage: getProjectImageByFileName('VIJAYAWADA-AJITSINGH NAGAR after.png'),
  },
  [normalizeProjectKey('Vairapalayam- Erode')]: {
    beforeImage: getProjectImageByFileName('Erode-Vairapalayam before.jpeg'),
    afterImage: getProjectImageByFileName('Erode-Vairapalayam after.jpg'),
  },
  [normalizeProjectKey('Pammal')]: {
    beforeImage: getProjectImageByFileName('pammal before.png'),
    afterImage: getProjectImageByFileName('pammal after.png'),
  },
  [normalizeProjectKey('Sector 145 NOIDA Phase 1')]: {
    beforeImage: getProjectImageByFileName('NOIDA sector 145- before (1).png'),
    afterImage: getProjectImageByFileName('NOIDA sector 145 after.png'),
  },
  [normalizeProjectKey('Sector 145 NOIDA Phase 2')]: {
    beforeImage: getProjectImageByFileName('NOIDA S-145 Site B-Before.jpg'),
    afterImage: getProjectImageByFileName('NOIDA S-145 Site B-After.jpg'),
  },
  [normalizeProjectKey('Tirupati')]: {
    beforeImage: getProjectImageByFileName('tirupathi before.png'),
    afterImage: getProjectImageByFileName('tirupathi before after.png'),
  },
  [normalizeProjectKey('Tirupati Tirumala Devasthanams')]: {
    beforeImage: getProjectImageByRelativePath('private projects/1. TTD_Before-28-02-2022.webp'),
    afterImage: getProjectImageByRelativePath('private projects/3. TTD_After-17-04-2025.webp'),
  },
  [normalizeProjectKey('Chidambaram')]: {
    beforeImage: getProjectImageByFileName('chidambaram before.png'),
    afterImage: getProjectImageByFileName('chidambaram after.png'),
  },
  [normalizeProjectKey('Pallavaram')]: {
    beforeImage: getProjectImageByFileName('pallavaram before.jpg'),
    afterImage: getProjectImageByFileName('pallavaram after.png'),
  },
  [normalizeProjectKey('Karaikudi')]: {
    beforeImage: getProjectImageByFileName('karaikudi before.png'),
    afterImage: getProjectImageByFileName('karaikudi after.png'),
  },
  [normalizeProjectKey('Karur')]: {
    beforeImage: getProjectImageByFileName('karur before.png'),
    afterImage: getProjectImageByFileName('karur after.png'),
  },
  [normalizeProjectKey('Pachayankuppam- Cuddalore')]: {
    beforeImage: getProjectImageByFileName('Pachayankuppam - Cuddalore - before.jpeg'),
    afterImage: getProjectImageByFileName('Pachayankuppam - Cuddalore -after.jpeg'),
  },
  [normalizeProjectKey('Kammiyampettai- Cuddalore')]: {
    beforeImage: getProjectImageByFileName('Kammiyampettai-Cuddalore-Before.webp'),
    afterImage: getProjectImageByFileName('Kammiyampettai-Cuddalore-After.webp'),
  },
  [normalizeProjectKey('Makarpura- Vadodara- Phase 1')]: {
    beforeImage: getProjectImageByRelativePath('Makarpura-phase-1/Makarpura-Vadodara-Phase-1-zone1-before.jpeg'),
    afterImage: getProjectImageByRelativePath('Makarpura-phase-1/Makarpura-Vadodara-Phase-1-zone1-After.jpeg'),
  },
  [normalizeProjectKey('Makarpura- Vadodara- Phase 2')]: {
    beforeImage: getProjectImageByRelativePath('Makarpura-phase-2/Makarpura-phase-2-before.jpeg'),
    afterImage: getProjectImageByRelativePath('Makarpura-phase-2/Makarpura-phase-2-after.jpeg'),
  },
  [normalizeProjectKey('Kollam')]: {
    beforeImage: getProjectImageByFileName('Kollam-Before.jpg'),
    afterImage: getProjectImageByFileName('Kollam-After.jpg'),
  },
  [normalizeProjectKey('Puducherry phase 2')]: {
    beforeImage: getProjectImageByFileName('Puducherry-Before..jpg'),
    afterImage: getProjectImageByFileName('Puducherry-After.jpg'),
  },
  [normalizeProjectKey('Puducherry phase 1')]: {
    beforeImage: getProjectImageByFileName('Puducherry-Phase 1-Before.jpeg'),
    afterImage: getProjectImageByFileName('Puducherry-Phase 1-After.jpeg'),
  },
  [normalizeProjectKey('Muthusamy Colony')]: {
    beforeImage: getProjectImageByFileName('Erode- Muthusamy colony - before.jpeg'),
    afterImage: getProjectImageByFileName('Erode - Muthusamy colony - after.jpeg'),
  },
  [normalizeProjectKey('Muthusamy Colony- Erode')]: {
    beforeImage: getProjectImageByFileName('Erode- Muthusamy colony - before.jpeg'),
    afterImage: getProjectImageByFileName('Erode - Muthusamy colony - after.jpeg'),
  },
  [normalizeProjectKey('Dindigul')]: {
    beforeImage: getProjectImageByFileName('Dindigul-Before.jpg'),
    afterImage: getProjectImageByFileName('Dindigul-After.jpg'),
  },
  [normalizeProjectKey('Nagpur- Phase 1')]: {
    beforeImage: getProjectImageByFileName('Nagpur Bhandewadi-before.jpg'),
    afterImage: getProjectImageByFileName('Nagpur Bhandewadi-After.png'),
  },
  [normalizeProjectKey('Tiruchirappalli- Phase 1')]: {
    beforeImage: getProjectImageByFileName('Tiruchirappalli phase 1 - before.jpeg'),
    afterImage: getProjectImageByFileName('Tiruchirappalli phase 1 - after.jpeg'),
  },
  [normalizeProjectKey('Tiruchirappalli- Phase 2')]: {
    beforeImage: getProjectImageByFileName('Trichy Phase 2 before.jpeg'),
    afterImage: getProjectImageByFileName('Trichy Phase 2 after.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 1')]: {
    beforeImage: getProjectImageByFileName('Vizag-Phase 1-Before.jpeg'),
    afterImage: getProjectImageByFileName('Vizag-Phase 1-After.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 2')]: {
    beforeImage: getProjectImageByFileName('Vizag-Phase 2-Before.jpeg'),
    afterImage: getProjectImageByFileName('Vizag-Phase 2-After.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 3')]: {
    beforeImage: getProjectImageByFileName('Vizag-Phase 3-Before.jpeg'),
    afterImage: getProjectImageByFileName('Vizag-Phase 3-After.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 4')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Visakhapatnam - Phase 4.jpeg'),
    afterImage: getProjectImageByRelativePath('ongoing/Visakhapatnam - Phase 4.jpeg'),
  },
  [normalizeProjectKey('Nagpur- Phase 4')]: {
    beforeImage: getProjectImageByFileName('Nagpur Bhandewadi-before.jpg'),
    afterImage: getProjectImageByRelativePath('ongoing/Visakhapatnam - Phase 4.jpeg'),
  },
  [normalizeProjectKey('B. Kothakota')]: {
    beforeImage: getProjectImageByFileName('B.Kothakota-Before.jpeg'),
    afterImage: getProjectImageByFileName('B.Kothakota After.jpeg'),
  },
  [normalizeProjectKey('Kuppam')]: {
    beforeImage: getProjectImageByFileName('Kuppam-Before.jpeg'),
    afterImage: getProjectImageByFileName('Kuppam-After.jpeg'),
  },
  [normalizeProjectKey('Madanapalle')]: {
    beforeImage: getProjectImageByFileName('Madanapalle-Before.jpeg'),
    afterImage: getProjectImageByFileName('Madanapalle-Afte.jpeg'),
  },
  [normalizeProjectKey('Punganur')]: {
    beforeImage: getProjectImageByFileName('Punganuru-Before.jpeg'),
    afterImage: getProjectImageByFileName('Punganur-After.jpeg'),
  },
  [normalizeProjectKey('Sullurupeta')]: {
    beforeImage: getProjectImageByFileName('Sulurupeta-Before.jpeg'),
    afterImage: getProjectImageByFileName('Sullurupeta-Afte.jpeg'),
  },
  [normalizeProjectKey('Venkatagiri')]: {
    beforeImage: getProjectImageByFileName('Venkatagiri-Before.jpeg'),
    afterImage: getProjectImageByFileName('Venkatagiri-After.jpeg'),
  },
  [normalizeProjectKey('Alluru')]: {
    beforeImage: getProjectImageByFileName('Allur before.jpeg'),
    afterImage: getProjectImageByFileName('Allur after.jpeg'),
  },
  [normalizeProjectKey('Anantapur')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Anantapur.jpeg'),
    afterImage: getProjectImageByRelativePath('ongoing/Anantapur.jpeg'),
  },
  [normalizeProjectKey('Chittoor')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Chittoor.jpeg'),
    afterImage: getProjectImageByRelativePath('ongoing/Chittoor.jpeg'),
  },
  [normalizeProjectKey('Srikalahasti')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Srikalahasti-Before.JPG'),
    afterImage: getProjectImageByRelativePath('ongoing/Srikalahasti-Before.JPG'),
  },
  [normalizeProjectKey('Dhontali- Nellore')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Dhontali.jpeg'),
    afterImage: getProjectImageByRelativePath('ongoing/Dhontali.jpeg'),
  },
  [normalizeProjectKey('Visakhapatnam- Phase 5')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Vizag-Phase5-Before.webp'),
    afterImage: getProjectImageByRelativePath('ongoing/Vizag-Phase5-Before.webp'),
  },
  [normalizeProjectKey('Tiruchirappalli- Phase 3')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Trichy_Phase-3_After_Apr_2026.webp'),
    afterImage: getProjectImageByRelativePath('ongoing/Trichy_Phase-3_After_Apr_2026.webp'),
  },
  [normalizeProjectKey('Kozhikode')]: {
    beforeImage: getProjectImageByRelativePath('ongoing/Kozhikode-Before.webp'),
    afterImage: getProjectImageByRelativePath('ongoing/Kozhikode-Before.webp'),
  },
  [normalizeProjectKey('Athipattu- Chennai')]: {
    beforeImage: getProjectImageByFileName('Athipattu-Before.jpeg'),
    afterImage: PLACEHOLDER_IMAGE,
  },
  [normalizeProjectKey('Paschim Boragaon- Guwahati')]: {
    beforeImage: getProjectImageByFileName('Boragaon_Before_19.07.2022.JPG.webp'),
    afterImage: getProjectImageByFileName('Boragaon_After_12.05.2026.JPG.webp'),
  },
  [normalizeProjectKey('Belortol Guwahati')]: {
    beforeImage: getProjectImageByFileName('Belortol.jpeg'),
    afterImage: getProjectImageByFileName('Belortol.jpeg'),
  },
  [normalizeProjectKey('Allipuram')]: {
    beforeImage: getProjectImageByFileName('Allipuram_Before_Dec_2025.webp'),
    afterImage: getProjectImageByFileName('Allipuram_After_Apr_2026.webp'),
  },
  [normalizeProjectKey('Atmakur')]: {
    beforeImage: getProjectImageByFileName('Atmakur-Befor.jpeg'),
    afterImage: getProjectImageByFileName('Atmakur-After.JPG'),
  },
  [normalizeProjectKey('Buchireddypalayam')]: {
    beforeImage: getProjectImageByFileName('Buchireddypalayam-Before.JPG'),
    afterImage: getProjectImageByFileName('Buchireddypalayam-After.JPG'),
  },
  [normalizeProjectKey('Gooty')]: {
    beforeImage: getProjectImageByFileName('Gooty-Befor.jpeg'),
    afterImage: getProjectImageByFileName('Gooty-Afte.jpeg'),
  },
  [normalizeProjectKey('Gudur')]: {
    beforeImage: getProjectImageByFileName('Gudur-Befor.jpeg'),
    afterImage: getProjectImageByFileName('Gudur-After.jpeg'),
  },
  [normalizeProjectKey('Guntakal')]: {
    beforeImage: getProjectImageByFileName('Guntakal-Befor.jpeg'),
    afterImage: getProjectImageByFileName('Guntakal-After.JPG'),
  },
  [normalizeProjectKey('Kavali')]: {
    beforeImage: getProjectImageByFileName('Kavali-Before.JPG'),
    afterImage: getProjectImageByFileName('Kavali-After.JPG'),
  },
  [normalizeProjectKey('Nagari')]: {
    beforeImage: getProjectImageByFileName('Nagari_Before_Aerial_Image.jpg.jpeg'),
    afterImage: getProjectImageByFileName('Nagari_After_Aerial_Image.jpg.jpeg'),
  },
  [normalizeProjectKey('Naidupetta')]: {
    beforeImage: getProjectImageByFileName('Naidupetta-Before.JPG'),
    afterImage: getProjectImageByFileName('Naidupetta-After.JPG'),
  },
  [normalizeProjectKey('Palamaneeru')]: {
    beforeImage: getProjectImageByFileName('Palamaneeru-Before.jpeg'),
    afterImage: getProjectImageByFileName('Palamaneeru-After.JPG'),
  },
  [normalizeProjectKey('Puttur')]: {
    beforeImage: getProjectImageByFileName('Puttur-Before.JPG'),
    afterImage: getProjectImageByFileName('Puttur-After.JPG'),
  },
  [normalizeProjectKey('Tambaram')]: {
    beforeImage: getProjectImageByFileName('Tambaram-Before.webp'),
    afterImage: getProjectImageByFileName('Tambaram-After.webp'),
  },
  [normalizeProjectKey('Rayadurgam')]: {
    beforeImage: getProjectImageByFileName('Rayadurgam-Before.jpeg'),
    afterImage: getProjectImageByFileName('Rayadurgam-After.jpeg'),
  },
};

/**
 * Alias map for project titles that differ between data rows and image lookup keys.
 */
const PROJECT_TITLE_ALIASES: Record<string, string> = {
  [normalizeProjectKey('Allipuram- Nellore')]: normalizeProjectKey('Allipuram'),
  [normalizeProjectKey('Buchireddypalem')]: normalizeProjectKey('Buchireddypalayam'),
  [normalizeProjectKey('Gudur(N)')]: normalizeProjectKey('Gudur'),
  [normalizeProjectKey('Nayudupeta')]: normalizeProjectKey('Naidupetta'),
  [normalizeProjectKey('Palamaneru')]: normalizeProjectKey('Palamaneeru'),
  [normalizeProjectKey('Palameneru')]: normalizeProjectKey('Palamaneeru'),
  [normalizeProjectKey('Kammiyampettai- Cuddalore')]: normalizeProjectKey('Kamiyanpettai- Cuddalore'),
};

/**
 * Resolve project images by title
 */
export const resolveProjectImages = (title: string): { beforeImage: string; afterImage: string } => {
  const normalizedTitle = normalizeProjectKey(title);
  const aliasKey = PROJECT_TITLE_ALIASES[normalizedTitle];

  return IMAGE_LOOKUP[normalizedTitle] ?? (aliasKey ? IMAGE_LOOKUP[aliasKey] : undefined) ?? {
    beforeImage: PLACEHOLDER_IMAGE,
    afterImage: PLACEHOLDER_IMAGE,
  };
};

/**
 * Get placeholder image (for ongoing projects without images)
 */
export const getPlaceholderImage = (): string => {
  return PLACEHOLDER_IMAGE;
};




