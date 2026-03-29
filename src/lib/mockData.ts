// Mock data for development without Supabase connection

export interface MockCharacter {
  name: string;
  role: string;
  description: string;
}

export interface MockBookContent {
  lang_code: string;
  title: string;
  description: string;
  plot_summary: string;
  characters: MockCharacter[];
}

export interface MockMedia {
  id: string;
  file_type: 'podcast' | 'video' | 'pdf_game' | 'infographic';
  lang_code: string;
  file_url: string;
  file_data: {
    duration?: string;
    student_author?: string;
    title?: string;
  };
}

export interface MockBook {
  id: string;
  isbn: string;
  cover_url: string;
  published_year: number;
  genre: string;
  author: {
    id: string;
    name: string;
  };
  content: MockBookContent[];
  media: MockMedia[];
}

export const MOCK_BOOKS: MockBook[] = [
  {
    id: 'b1a2c3d4-e5f6-7890-abcd-ef1234567890',
    isbn: '978-5-389-06256-6',
    cover_url: '/covers/master-margarita.jpg',
    published_year: 1967,
    genre: 'fiction',
    author: {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      name: 'Mikhail Bulgakov',
    },
    content: [
      {
        lang_code: 'en',
        title: 'The Master and Margarita',
        description:
          'A masterpiece of 20th-century literature, this novel interweaves three storylines: the Devil visiting Soviet Moscow, the story of Pontius Pilate, and the tale of the Master and his beloved Margarita.',
        plot_summary:
          'When the Devil arrives in Moscow disguised as Professor Woland, chaos erupts. Meanwhile, Margarita makes a deal with the Devil to save her beloved, the Master, an author whose novel about Pontius Pilate was rejected by the Soviet literary establishment.',
        characters: [
          { name: 'Woland', role: 'Antagonist / Devil', description: 'A mysterious foreign professor who is actually Satan, visiting Moscow with his retinue.' },
          { name: 'The Master', role: 'Protagonist', description: 'A talented but disillusioned writer who authored a novel about Pontius Pilate.' },
          { name: 'Margarita', role: 'Protagonist', description: 'The Master\'s devoted lover who becomes a witch to save him.' },
          { name: 'Behemoth', role: 'Supporting', description: 'A giant black cat who walks on two legs, part of Woland\'s retinue.' },
        ],
      },
      {
        lang_code: 'ru',
        title: 'Мастер и Маргарита',
        description:
          'Шедевр литературы XX века, этот роман сплетает три сюжетные линии: визит Дьявола в советскую Москву, историю Понтия Пилата и историю Мастера и его возлюбленной Маргариты.',
        plot_summary:
          'Когда Дьявол прибывает в Москву под видом профессора Воланда, начинается хаос. Тем временем Маргарита заключает сделку с Дьяволом, чтобы спасти своего возлюбленного — Мастера, автора романа о Понтии Пилате.',
        characters: [
          { name: 'Воланд', role: 'Антагонист / Дьявол', description: 'Загадочный иностранный профессор, который на самом деле является Сатаной.' },
          { name: 'Мастер', role: 'Протагонист', description: 'Талантливый, но разочарованный писатель, автор романа о Понтии Пилате.' },
          { name: 'Маргарита', role: 'Протагонист', description: 'Преданная возлюбленная Мастера, которая становится ведьмой ради его спасения.' },
          { name: 'Бегемот', role: 'Второстепенный', description: 'Огромный чёрный кот, ходящий на задних лапах, из свиты Воланда.' },
        ],
      },
      {
        lang_code: 'ro',
        title: 'Maestrul și Margarita',
        description:
          'O capodoperă a literaturii secolului XX, acest roman împletește trei povești: vizita Diavolului în Moscova sovietică, istoria lui Pilat din Pont și povestea Maestrului și a iubitei sale Margarita.',
        plot_summary:
          'Când Diavolul sosește în Moscova deghizat în Profesorul Woland, haosul izbucnește. Între timp, Margarita face un pact cu Diavolul pentru a-l salva pe iubitul ei, Maestrul.',
        characters: [
          { name: 'Woland', role: 'Antagonist / Diavol', description: 'Un profesor străin misterios care este de fapt Satana.' },
          { name: 'Maestrul', role: 'Protagonist', description: 'Un scriitor talentat dar deziluzionat.' },
          { name: 'Margarita', role: 'Protagonist', description: 'Iubita devotată a Maestrului care devine vrăjitoare.' },
          { name: 'Behemot', role: 'Secundar', description: 'Un pisoi negru uriaș care merge pe două picioare.' },
        ],
      },
      {
        lang_code: 'fr',
        title: 'Le Maître et Marguerite',
        description:
          'Chef-d\'œuvre de la littérature du XXe siècle, ce roman entrelace trois lignes narratives: la visite du Diable à Moscou, l\'histoire de Ponce Pilate et l\'histoire du Maître et de sa bien-aimée Marguerite.',
        plot_summary:
          'Lorsque le Diable arrive à Moscou déguisé en Professeur Woland, le chaos éclate. Pendant ce temps, Marguerite conclut un pacte avec le Diable pour sauver son bien-aimé, le Maître.',
        characters: [
          { name: 'Woland', role: 'Antagoniste / Diable', description: 'Un mystérieux professeur étranger qui est en réalité Satan.' },
          { name: 'Le Maître', role: 'Protagoniste', description: 'Un écrivain talentueux mais désabusé.' },
          { name: 'Marguerite', role: 'Protagoniste', description: 'L\'amante dévouée du Maître qui devient sorcière.' },
          { name: 'Béhémoth', role: 'Secondaire', description: 'Un énorme chat noir marchant sur deux pattes.' },
        ],
      },
    ],
    media: [
      {
        id: 'm1',
        file_type: 'podcast',
        lang_code: 'en',
        file_url: '/audio/master-margarita-en.mp3',
        file_data: { duration: '45:30', student_author: 'Anna K.', title: 'Exploring the Master\'s World' },
      },
      {
        id: 'm2',
        file_type: 'podcast',
        lang_code: 'ru',
        file_url: '/audio/master-margarita-ru.mp3',
        file_data: { duration: '38:15', student_author: 'Дмитрий С.', title: 'Мир Мастера и Маргариты' },
      },
      {
        id: 'm3',
        file_type: 'video',
        lang_code: 'en',
        file_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        file_data: { duration: '12:00', student_author: 'Maria L.', title: 'Book Review: The Master and Margarita' },
      },
      {
        id: 'm4',
        file_type: 'pdf_game',
        lang_code: 'en',
        file_url: '/games/master-margarita-boardgame.pdf',
        file_data: { student_author: 'Igor P.', title: 'Journey Through Moscow – Board Game' },
      },
      {
        id: 'm5',
        file_type: 'infographic',
        lang_code: 'en',
        file_url: '/infographics/master-margarita-characters.png',
        file_data: { student_author: 'Elena R.', title: 'Character Map' },
      },
    ],
  },
  {
    id: 'b2a3c4d5-e6f7-8901-bcde-ef2345678901',
    isbn: '978-2-07-036024-4',
    cover_url: '/covers/petit-prince.jpg',
    published_year: 1943,
    genre: 'fiction',
    author: {
      id: 'a2b3c4d5-e6f7-8901-bcde-ef2345678901',
      name: 'Antoine de Saint-Exupéry',
    },
    content: [
      {
        lang_code: 'en',
        title: 'The Little Prince',
        description: 'A beloved tale of a young prince who travels from planet to planet, learning about love, loss, and what truly matters in life.',
        plot_summary: 'A pilot stranded in the Sahara meets a mysterious boy who tells him about his travels across the universe and the rose he left behind on his tiny asteroid.',
        characters: [
          { name: 'The Little Prince', role: 'Protagonist', description: 'A young prince from a tiny asteroid who travels the universe seeking wisdom.' },
          { name: 'The Fox', role: 'Supporting', description: 'A wise fox who teaches the Prince about taming and relationships.' },
          { name: 'The Rose', role: 'Supporting', description: 'A beautiful but vain flower that the Prince loves dearly.' },
        ],
      },
      {
        lang_code: 'fr',
        title: 'Le Petit Prince',
        description: 'Un conte merveilleux d\'un jeune prince qui voyage de planète en planète, apprenant l\'amour, la perte et ce qui compte vraiment.',
        plot_summary: 'Un pilote échoué dans le Sahara rencontre un garçon mystérieux qui lui raconte ses voyages à travers l\'univers et la rose qu\'il a laissée sur son petit astéroïde.',
        characters: [
          { name: 'Le Petit Prince', role: 'Protagoniste', description: 'Un jeune prince d\'un petit astéroïde.' },
          { name: 'Le Renard', role: 'Secondaire', description: 'Un renard sage qui enseigne l\'apprivoisement.' },
          { name: 'La Rose', role: 'Secondaire', description: 'Une belle fleur vaniteuse.' },
        ],
      },
      {
        lang_code: 'ru',
        title: 'Маленький принц',
        description: 'Любимая история о юном принце, путешествующем с планеты на планету и познающем любовь, потерю и истинные ценности жизни.',
        plot_summary: 'Лётчик, совершивший вынужденную посадку в Сахаре, встречает загадочного мальчика, который рассказывает о своих путешествиях по Вселенной.',
        characters: [
          { name: 'Маленький принц', role: 'Протагонист', description: 'Юный принц с крошечного астероида.' },
          { name: 'Лис', role: 'Второстепенный', description: 'Мудрый лис, обучающий принца приручению.' },
          { name: 'Роза', role: 'Второстепенный', description: 'Прекрасный, но тщеславный цветок.' },
        ],
      },
      {
        lang_code: 'ro',
        title: 'Micul Prinț',
        description: 'O poveste îndrăgită despre un tânăr prinț care călătorește de pe o planetă pe alta, învățând despre iubire și pierdere.',
        plot_summary: 'Un pilot blocat în Sahara întâlnește un băiat misterios care îi povestește despre călătoriile sale prin univers.',
        characters: [
          { name: 'Micul Prinț', role: 'Protagonist', description: 'Un tânăr prinț de pe un asteroizi mic.' },
          { name: 'Vulpea', role: 'Secundar', description: 'O vulpe înțeleaptă.' },
          { name: 'Trandafirul', role: 'Secundar', description: 'O floare frumoasă dar vanitos.' },
        ],
      },
    ],
    media: [
      {
        id: 'm6',
        file_type: 'podcast',
        lang_code: 'fr',
        file_url: '/audio/petit-prince-fr.mp3',
        file_data: { duration: '32:00', student_author: 'Sophie D.', title: 'Le monde du Petit Prince' },
      },
      {
        id: 'm7',
        file_type: 'video',
        lang_code: 'en',
        file_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        file_data: { duration: '8:30', student_author: 'Tom S.', title: 'Animated Summary' },
      },
    ],
  },
  {
    id: 'b3a4c5d6-e7f8-9012-cdef-ef3456789012',
    isbn: '978-973-50-2092-0',
    cover_url: '/covers/ion.jpg',
    published_year: 1920,
    genre: 'fiction',
    author: {
      id: 'a3b4c5d6-e7f8-9012-cdef-ef3456789012',
      name: 'Liviu Rebreanu',
    },
    content: [
      {
        lang_code: 'ro',
        title: 'Ion',
        description: 'Un roman realist care descrie viața rurală din Transilvania, explorând teme de pământ, iubire și ambiție.',
        plot_summary: 'Ion, un tânăr țăran transilvănean, este obsedat de dorința de a deține pământ. Alegerea sa între iubire și ambiție duce la consecințe tragice.',
        characters: [
          { name: 'Ion', role: 'Protagonist', description: 'Un tânăr țăran determinat să devină proprietar de pământ.' },
          { name: 'Ana', role: 'Supporting', description: 'Fata bogată pe care Ion o ia de soție.' },
          { name: 'Florica', role: 'Supporting', description: 'Adevărata iubire a lui Ion.' },
        ],
      },
      {
        lang_code: 'en',
        title: 'Ion',
        description: 'A realist novel depicting rural life in Transylvania, exploring themes of land, love, and ambition.',
        plot_summary: 'Ion, a young Transylvanian peasant, is obsessed with owning land. His choice between love and ambition leads to tragic consequences.',
        characters: [
          { name: 'Ion', role: 'Protagonist', description: 'A young peasant determined to become a landowner.' },
          { name: 'Ana', role: 'Supporting', description: 'The wealthy girl Ion marries for land.' },
          { name: 'Florica', role: 'Supporting', description: 'Ion\'s true love.' },
        ],
      },
      {
        lang_code: 'ru',
        title: 'Ион',
        description: 'Реалистический роман, изображающий сельскую жизнь в Трансильвании.',
        plot_summary: 'Ион, молодой трансильванский крестьянин, одержим желанием владеть землёй.',
        characters: [
          { name: 'Ион', role: 'Протагонист', description: 'Молодой крестьянин, стремящийся стать землевладельцем.' },
        ],
      },
      {
        lang_code: 'fr',
        title: 'Ion',
        description: 'Un roman réaliste décrivant la vie rurale en Transylvanie.',
        plot_summary: 'Ion, un jeune paysan transylvanien, est obsédé par la possession de terres.',
        characters: [
          { name: 'Ion', role: 'Protagoniste', description: 'Un jeune paysan déterminé à devenir propriétaire terrien.' },
        ],
      },
    ],
    media: [
      {
        id: 'm8',
        file_type: 'podcast',
        lang_code: 'ro',
        file_url: '/audio/ion-ro.mp3',
        file_data: { duration: '28:45', student_author: 'Andrei M.', title: 'Lumea lui Ion' },
      },
    ],
  },
  {
    id: 'b4a5c6d7-e8f9-0123-defg-ef4567890123',
    isbn: '978-5-699-12014-7',
    cover_url: '/covers/crime-punishment.jpg',
    published_year: 1866,
    genre: 'fiction',
    author: {
      id: 'a4b5c6d7-e8f9-0123-defg-ef4567890123',
      name: 'Fyodor Dostoevsky',
    },
    content: [
      {
        lang_code: 'en',
        title: 'Crime and Punishment',
        description: 'A psychological novel exploring the moral dilemmas of a young student who commits murder.',
        plot_summary: 'Raskolnikov, a destitute former student, murders a pawnbroker to prove his theory that some people are above moral law. Guilt and paranoia consume him.',
        characters: [
          { name: 'Raskolnikov', role: 'Protagonist', description: 'A former law student tortured by his own philosophical theories.' },
          { name: 'Sonya', role: 'Supporting', description: 'A young woman who becomes Raskolnikov\'s moral compass.' },
        ],
      },
      {
        lang_code: 'ru',
        title: 'Преступление и наказание',
        description: 'Психологический роман, исследующий моральные дилеммы молодого студента, совершившего убийство.',
        plot_summary: 'Раскольников, бедный бывший студент, убивает старуху-процентщицу, чтобы доказать свою теорию. Чувство вины и паранойя поглощают его.',
        characters: [
          { name: 'Раскольников', role: 'Протагонист', description: 'Бывший студент-юрист, терзаемый собственными философскими теориями.' },
          { name: 'Соня', role: 'Второстепенный', description: 'Молодая женщина, ставшая нравственным ориентиром Раскольникова.' },
        ],
      },
      {
        lang_code: 'ro',
        title: 'Crimă și pedeapsă',
        description: 'Un roman psihologic care explorează dilemele morale ale unui tânăr student care comite o crimă.',
        plot_summary: 'Raskolnikov, un fost student sărac, ucide o cămătăreasă pentru a-și demonstra teoria.',
        characters: [
          { name: 'Raskolnikov', role: 'Protagonist', description: 'Un fost student de drept chinuit de teoriile sale filosofice.' },
        ],
      },
      {
        lang_code: 'fr',
        title: 'Crime et Châtiment',
        description: 'Un roman psychologique explorant les dilemmes moraux d\'un jeune étudiant qui commet un meurtre.',
        plot_summary: 'Raskolnikov, un ancien étudiant démuni, assassine une usurière pour prouver sa théorie.',
        characters: [
          { name: 'Raskolnikov', role: 'Protagoniste', description: 'Un ancien étudiant en droit torturé par ses propres théories philosophiques.' },
        ],
      },
    ],
    media: [
      {
        id: 'm9',
        file_type: 'podcast',
        lang_code: 'ru',
        file_url: '/audio/crime-punishment-ru.mp3',
        file_data: { duration: '52:00', student_author: 'Павел Н.', title: 'Достоевский: Преступление и наказание' },
      },
      {
        id: 'm10',
        file_type: 'pdf_game',
        lang_code: 'en',
        file_url: '/games/crime-punishment-quiz.pdf',
        file_data: { student_author: 'James T.', title: 'Crime & Punishment Quiz Game' },
      },
    ],
  },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export const GENRES = [
  { value: 'fiction', label: 'Fiction' },
  { value: 'non-fiction', label: 'Non-Fiction' },
  { value: 'poetry', label: 'Poetry' },
  { value: 'drama', label: 'Drama' },
  { value: 'science', label: 'Science' },
];

export const MEDIA_TYPES = [
  { value: 'podcast', label: 'Podcast', icon: '🎧' },
  { value: 'video', label: 'Video', icon: '📺' },
  { value: 'pdf_game', label: 'Board Game', icon: '🎮' },
  { value: 'infographic', label: 'Infographic', icon: '🖼️' },
];
