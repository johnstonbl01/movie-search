import { Flex, IconButton, Text } from '@radix-ui/themes';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';

import styles from './MoviePagination.module.scss';

type MoviePaginationProps = {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasMovies: boolean;
};

export const MoviePagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  hasMovies
}: MoviePaginationProps) => {
  if (!hasMovies) {
    return null;
  }

  const canClickNext = currentPage + 1 <= totalPages;
  const canClickPrev = currentPage - 1 >= 1;

  const showEndPageCount = totalPages > 2 && currentPage !== totalPages;
  const showStartPageCount = totalPages > 2 && currentPage !== 1;

  return (
    <Flex gap="3" align="center">
      {showStartPageCount && <Text className={styles.pageCounter}>1 ...</Text>}
      <IconButton disabled={!canClickPrev} onClick={onPrevPage} variant="ghost">
        <ChevronLeftIcon width="16" height="16" />
      </IconButton>
      <Text>{currentPage}</Text>
      <IconButton disabled={!canClickNext} onClick={onNextPage} variant="ghost">
        <ChevronRightIcon width="16" height="16" />
      </IconButton>
      {showEndPageCount && <Text className={styles.pageCounter}>... {totalPages}</Text>}
    </Flex>
  );
};
