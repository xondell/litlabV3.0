import { getBookById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import BookDetailClient from './BookDetailClient';

export default async function BookPage(props: PageProps<'/book/[id]'>) {
  const { id } = await props.params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  return <BookDetailClient book={book} />;
}
