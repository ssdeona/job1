import { Button, Group, TextInput, Loader } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  loading?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  loading = false,
}: SearchBarProps) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Group align="flex-end" gap="sm">
      <TextInput
        placeholder="Должность или название компании"
        leftSection={<IconSearch size={18} color="#4b5563" />}
        rightSection={
          loading ? <Loader size="xs" color="rgba(66, 99, 235, 1)" /> : null
        }
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        w={420}
        size="md"
        styles={{
          input: {
            backgroundColor: 'transparent',
            border: '1px solid #dee2e6',
            color: '#374151',
            fontSize: '15px',
            '&:focus': {
              backgroundColor: '#ffffff',
              borderColor: 'rgba(66, 99, 235, 1)',
              color: '#374151',
            },
            '&::placeholder': {
              color: '#6b7280',
            },
          },
        }}
      />

      <Button
        onClick={onSearch}
        size="md"
        styles={{
          root: {
            backgroundColor: 'rgba(66, 99, 235, 1)',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(54, 79, 199, 1)',
            },
          },
        }}
      >
        Найти
      </Button>
    </Group>
  );
};