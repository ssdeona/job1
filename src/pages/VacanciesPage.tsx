import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedValue } from '@mantine/hooks';
import { Container, Divider, Group, Stack, Text, Card } from '@mantine/core';

import { SearchBar } from '../components/SearchBar/SearchBar';
import { CitySelect } from '../components/CitySelect/CitySelect';
import { SkillsFilter } from '../components/SkillsFilter/SkillsFilter';
import { JobCard } from '../components/JobCard/JobCard';
import { Pagination } from '../components/Pagination/Pagination';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { fetchJobs } from '../store/jobsSlice';

import styles from './VacanciesPage.module.css';

export const VacanciesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const city = searchParams.get('city') || '';
  const skillsParam = searchParams.get('skills');
  const page = Number(searchParams.get('page')) || 1;

  const skills = useMemo(
    () => (skillsParam ? skillsParam.split(',').filter(Boolean) : []),
    [skillsParam],
  );

  const [newSkill, setNewSkill] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const dispatch = useDispatch<AppDispatch>();

  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const loading = useSelector((state: RootState) => state.jobs.loading);
  const error = useSelector((state: RootState) => state.jobs.error);
  const totalPages = useSelector((state: RootState) => state.jobs.totalPages);

  useEffect(() => {
    dispatch(
      fetchJobs({
        search: debouncedSearch,
        city,
        skills,
        page,
      }),
    );
  }, [dispatch, debouncedSearch, city, skills, page]);

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    updateParams({ search: value || null, page: '1' });
  };

  const handleSearch = () => {
    updateParams({ page: '1' });
  };

  const handleCityChange = (value: string) => {
    updateParams({ city: value || null, page: '1' });
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();

    if (!skill) {
      return;
    }

    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase(),
    );

    if (alreadyExists) {
      setNewSkill('');
      return;
    }

    const nextSkills = [...skills, skill];
    updateParams({ skills: nextSkills.join(','), page: '1' });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const nextSkills = skills.filter((skill) => skill !== skillToRemove);

    updateParams({
      skills: nextSkills.length > 0 ? nextSkills.join(',') : null,
      page: '1',
    });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className={styles.page}>
      <section className={styles.topSection}>
        <Container size="xl" className={styles.topContainer}>
          <div className={styles.topContent}>
            <div className={styles.titleBlock}>
              <h1 className={styles.title}>Список вакансий</h1>
              <p className={styles.subtitle}>
                по профессии Frontend-разработчик
              </p>
            </div>

            <div className={styles.searchBlock}>
              <SearchBar
                value={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                loading={loading}
              />
            </div>
          </div>
        </Container>

        <Divider />
      </section>

      <Container size="xl" py="xl">
        <Group align="flex-start" wrap="nowrap" gap="xl">
          <aside style={{ width: 300, flexShrink: 0 }}>
            <Stack gap="md">
              <Card withBorder padding="md" radius="md" bg="white">
                <SkillsFilter
                  skills={skills}
                  newSkill={newSkill}
                  onNewSkillChange={setNewSkill}
                  onAddSkill={handleAddSkill}
                  onRemoveSkill={handleRemoveSkill}
                />
              </Card>

              <Card withBorder padding="md" radius="md" bg="white">
                <CitySelect value={city} onChange={handleCityChange} />
              </Card>
            </Stack>
          </aside>

          <Stack gap="md" style={{ flex: 1, minWidth: 0 }}>
            {loading && (
              <Text ta="center" py="xl">
                Загрузка вакансий...
              </Text>
            )}

            {error && !loading && (
              <Text c="red" ta="center" py="xl">
                {error}
              </Text>
            )}

            {!loading && !error && jobs.length === 0 && (
              <Text ta="center" py="xl">
                Вакансии не найдены
              </Text>
            )}

            {!loading &&
              !error &&
              jobs.map((job) => <JobCard key={job.id} job={job} />)}

            {!loading && !error && jobs.length > 0 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            )}
          </Stack>
        </Group>
      </Container>
    </main>
  );
};