import { Select } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const cities = [
  {
    value: '',
    label: 'Все города',
  },
  {
    value: 'Москва',
    label: 'Москва',
  },
  {
    value: 'Санкт-Петербург',
    label: 'Санкт-Петербург',
  },
];

export const CitySelect = ({
  value,
  onChange,
}: CitySelectProps) => {
  return (
    <Select
      placeholder="Все города"
      leftSection={<IconMapPin size={18} />}
      data={cities}
      value={value}
      onChange={(newValue) => onChange(newValue || '')}
      allowDeselect={false}
    />
  );
};