import { Autocomplete, Button, Group, Pill, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface SkillsFilterProps {
  skills: string[];
  newSkill: string;
  onNewSkillChange: (value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
}


const POPULAR_SKILLS = [
  'JavaScript',
  'React',
  'Redux',
  'Python'
];

export const SkillsFilter = ({
  skills,
  newSkill,
  onNewSkillChange,
  onAddSkill,
  onRemoveSkill,
}: SkillsFilterProps) => {

  const suggestions = POPULAR_SKILLS.filter(
    (skill) =>
      !skills.some((s) => s.toLowerCase() === skill.toLowerCase()) &&
      skill.toLowerCase().includes(newSkill.toLowerCase())
  );

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      onAddSkill();
    }
  };


  const handleOptionSubmit = (value: string) => {
    onNewSkillChange(value);
    setTimeout(onAddSkill, 0);
  };

  return (
    <Stack gap="md">
      <Text fw={600}>Ключевые навыки</Text>

      <Group align="flex-end" wrap="nowrap" gap="xs">
        <Autocomplete
          placeholder="Навык"
          value={newSkill}
          onChange={onNewSkillChange}
          onKeyDown={handleKeyDown}
          onOptionSubmit={handleOptionSubmit}
          data={suggestions}
          style={{ flex: 1 }}
          maxDropdownHeight={200}
        />

        <Button onClick={onAddSkill} variant="light" px="sm">
          <IconPlus size={20} />
        </Button>
      </Group>

      <Group
        gap="xs"
        align="center"
        style={{
          maxHeight: 180,
          overflowY: 'auto',
        }}
      >
        {skills.map((skill) => (
          <Pill
            key={skill}
            withRemoveButton
            onRemove={() => onRemoveSkill(skill)}
          >
            {skill}
          </Pill>
        ))}
      </Group>
    </Stack>
  );
};