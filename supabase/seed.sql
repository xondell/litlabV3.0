-- LitLab Test Data: One Complete Book in 4 Languages with All Media Types
-- Run this AFTER schema.sql

-- Insert author
INSERT INTO authors (id, name, bio_en, bio_ru, bio_ro, bio_fr) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   'Mikhail Bulgakov',
   'Russian writer and playwright, known for The Master and Margarita.',
   'Русский писатель и драматург, известен романом «Мастер и Маргарита».',
   'Scriitor și dramaturg rus, cunoscut pentru Maestrul și Margarita.',
   'Écrivain et dramaturge russe, connu pour Le Maître et Marguerite.');

-- Insert book
INSERT INTO books (id, isbn, author_id, cover_url, published_year, genre) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890',
   '978-5-389-06256-6',
   'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
   NULL, -- Replace with actual Supabase Storage URL after uploading a cover
   1967,
   'fiction');

-- Insert book content in English
INSERT INTO book_content (book_id, lang_code, title, description, plot_summary, characters) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'en',
   'The Master and Margarita',
   'A masterpiece of 20th-century literature interweaving three storylines: the Devil visiting Soviet Moscow, Pontius Pilate, and the tale of the Master and Margarita.',
   'When the Devil arrives in Moscow disguised as Professor Woland, chaos erupts. Meanwhile, Margarita makes a deal with the Devil to save her beloved, the Master.',
   '[
     {"name": "Woland", "role": "Antagonist / Devil", "description": "A mysterious foreign professor who is actually Satan."},
     {"name": "The Master", "role": "Protagonist", "description": "A disillusioned writer who authored a novel about Pontius Pilate."},
     {"name": "Margarita", "role": "Protagonist", "description": "The Master''s devoted lover who becomes a witch to save him."},
     {"name": "Behemoth", "role": "Supporting", "description": "A giant black cat who walks on two legs."}
   ]'::JSONB);

-- Insert book content in Russian
INSERT INTO book_content (book_id, lang_code, title, description, plot_summary, characters) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'ru',
   'Мастер и Маргарита',
   'Шедевр литературы XX века, сплетающий три сюжетные линии: визит Дьявола в Москву, историю Понтия Пилата и историю Мастера и Маргариты.',
   'Когда Дьявол прибывает в Москву под видом профессора Воланда, начинается хаос. Маргарита заключает сделку с Дьяволом ради спасения Мастера.',
   '[
     {"name": "Воланд", "role": "Антагонист / Дьявол", "description": "Загадочный профессор, являющийся Сатаной."},
     {"name": "Мастер", "role": "Протагонист", "description": "Разочарованный писатель, автор романа о Понтии Пилате."},
     {"name": "Маргарита", "role": "Протагонист", "description": "Преданная возлюбленная Мастера."},
     {"name": "Бегемот", "role": "Второстепенный", "description": "Огромный чёрный кот из свиты Воланда."}
   ]'::JSONB);

-- Insert book content in Romanian
INSERT INTO book_content (book_id, lang_code, title, description, plot_summary, characters) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'ro',
   'Maestrul și Margarita',
   'O capodoperă a literaturii secolului XX, care împletește trei povești: vizita Diavolului în Moscova sovietică, istoria lui Pilat din Pont și povestea Maestrului și a Margaritei.',
   'Când Diavolul sosește în Moscova deghizat în Profesorul Woland, haosul izbucnește. Margarita face un pact cu Diavolul pentru a-l salva pe Maestrul.',
   '[
     {"name": "Woland", "role": "Antagonist / Diavol", "description": "Un profesor străin misterios care este de fapt Satana."},
     {"name": "Maestrul", "role": "Protagonist", "description": "Un scriitor deziluzionat."},
     {"name": "Margarita", "role": "Protagonist", "description": "Iubita devotată a Maestrului."},
     {"name": "Behemot", "role": "Secundar", "description": "Un pisoi negru uriaș."}
   ]'::JSONB);

-- Insert book content in French
INSERT INTO book_content (book_id, lang_code, title, description, plot_summary, characters) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'fr',
   'Le Maître et Marguerite',
   'Chef-d''œuvre de la littérature du XXe siècle, ce roman entrelace trois récits: la visite du Diable à Moscou, l''histoire de Ponce Pilate et l''histoire du Maître et de Marguerite.',
   'Lorsque le Diable arrive à Moscou déguisé en Professeur Woland, le chaos éclate. Marguerite conclut un pacte avec le Diable pour sauver son bien-aimé.',
   '[
     {"name": "Woland", "role": "Antagoniste / Diable", "description": "Un mystérieux professeur étranger qui est Satan."},
     {"name": "Le Maître", "role": "Protagoniste", "description": "Un écrivain désabusé."},
     {"name": "Marguerite", "role": "Protagoniste", "description": "L''amante dévouée du Maître."},
     {"name": "Béhémoth", "role": "Secondaire", "description": "Un énorme chat noir marchant sur deux pattes."}
   ]'::JSONB);

-- Insert media: Podcast (English)
INSERT INTO library_media (book_id, file_type, lang_code, file_url, file_data, is_approved) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'podcast', 'en',
   'https://example.com/audio/master-margarita-en.mp3',
   '{"duration": "45:30", "student_author": "Anna K.", "title": "Exploring the Master''s World"}'::JSONB,
   TRUE);

-- Insert media: Podcast (Russian)
INSERT INTO library_media (book_id, file_type, lang_code, file_url, file_data, is_approved) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'podcast', 'ru',
   'https://example.com/audio/master-margarita-ru.mp3',
   '{"duration": "38:15", "student_author": "Дмитрий С.", "title": "Мир Мастера и Маргариты"}'::JSONB,
   TRUE);

-- Insert media: Video (English)
INSERT INTO library_media (book_id, file_type, lang_code, file_url, file_data, is_approved) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'video', 'en',
   'https://www.youtube.com/embed/dQw4w9WgXcQ',
   '{"duration": "12:00", "student_author": "Maria L.", "title": "Book Review: The Master and Margarita"}'::JSONB,
   TRUE);

-- Insert media: Board Game PDF (English)
INSERT INTO library_media (book_id, file_type, lang_code, file_url, file_data, is_approved) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'pdf_game', 'en',
   'https://example.com/games/master-margarita-boardgame.pdf',
   '{"student_author": "Igor P.", "title": "Journey Through Moscow – Board Game"}'::JSONB,
   TRUE);

-- Insert media: Infographic (French)
INSERT INTO library_media (book_id, file_type, lang_code, file_url, file_data, is_approved) VALUES
  ('b1a2c3d4-e5f6-7890-abcd-ef1234567890', 'infographic', 'fr',
   'https://example.com/infographics/master-margarita-chars-fr.png',
   '{"student_author": "Sophie D.", "title": "Carte des personnages"}'::JSONB,
   TRUE);
