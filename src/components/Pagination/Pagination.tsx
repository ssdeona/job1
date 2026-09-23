import { Group, Pagination as MantinePagination } from '@mantine/core';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  onChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Group justify="center" mt="md">
      <MantinePagination
        value={page}
        onChange={onChange}
        total={totalPages}
      />
    </Group>
  );
};