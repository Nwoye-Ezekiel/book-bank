import BookCards from 'components/book-cards';
import { BookVolume } from 'types';

export default function withBookCards(BookCard: React.FC<{ book: BookVolume }>) {
  return function WrapperComponent(props: { search: string }) {
    return <BookCards BookCard={BookCard} {...props} />;
  };
}
