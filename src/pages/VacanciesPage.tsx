import { useEffect, useState } from 'react';
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

const DEFAULT_SKILLS = ['JavaScript', 'React', 'Redux', 'Python'];

const getInitialFilters = () => {
  const params = new URLSearchParams(window.location.search);

  const skillsFromUrl = params.get('skills');

  return {
    search: params.get('search') || '',
    city: params.get('city') || '',
    skills: skillsFromUrl
      ? skillsFromUrl.split(',').filter(Boolean)
      : DEFAULT_SKILLS,
    page: Number(params.get('page')) || 1,
  };
};

export const VacanciesPage = () => {
  const [search, setSearch] = useState(() => getInitialFilters().search);
  const [city, setCity] = useState(() => getInitialFilters().city);
  const [skills, setSkills] = useState<string[]>(
    () => getInitialFilters().skills,
  );
  const [newSkill, setNewSkill] = useState('');
  const [page, setPage] = useState(() => getInitialFilters().page);

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

  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.set('search', search);
    }

    if (city) {
      params.set('city', city);
    }

    if (skills.length > 0) {
      params.set('skills', skills.join(','));
    }

    params.set('page', String(page));

    const query = params.toString();

    window.history.replaceState(
      null,
      '',
      query ? `?${query}` : window.location.pathname,
    );
  }, [search, city, skills, page]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setPage(1);
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

    setSkills((currentSkills) => [...currentSkills, skill]);
    setNewSkill('');
    setPage(1);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills((currentSkills) =>
      currentSkills.filter((skill) => skill !== skillToRemove),
    );

    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

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
                onChange={setSearch}
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
          <aside
            style={{
              width: 300,
              flexShrink: 0,
            }}
          >
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
                <CitySelect
                  value={city}
                  onChange={handleCityChange}
                />
              </Card>
            </Stack>
          </aside>

          <Stack
            gap="md"
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
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
              jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}

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