import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './VacancyPage.module.css';
import type { Job } from '../types/job';
import { getJobById } from '../api/jobsApi';

const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getJobById(id!);
        setJob(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Ошибка загрузки',
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p>Загрузка...</p>
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p>{error || 'Вакансия не найдена'}</p>
        </div>
      </main>
    );
  }

  const getSpaceLabel = (space: string) => {
    switch (space) {
      case 'remote':
        return 'Можно удалённо';
      case 'office':
        return 'Офис';
      case 'hybrid':
        return 'Гибрид';
      default:
        return space;
    }
  };

  const getSpaceClass = (space: string) => {
    switch (space) {
      case 'remote':
        return styles.spaceRemote;
      case 'office':
        return styles.spaceOffice;
      case 'hybrid':
        return styles.spaceHybrid;
      default:
        return styles.space;
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.vacancyCard}>
          <h1 className={styles.title}>{job.name}</h1>

          <div className={styles.info}>
            <span className={styles.salary}>{job.salary} ₽</span>
            <span className={styles.experience}>
              Опыт {job.experience}
            </span>
          </div>

          <div className={styles.company}>{job.company_name}</div>

          <div className={getSpaceClass(job.space)}>
            {getSpaceLabel(job.space)}
          </div>

          <div className={styles.location}>{job.city}</div>
        </section>

        <section className={styles.descriptionCard}>
          <h2>Описание вакансии</h2>
          <p>{job.description}</p>

          <h3>Ключевые навыки:</h3>
          <p>{job.skills}</p>

          <h3>О компании</h3>
          <p>{job.about_company}</p>
        </section>
      </div>
    </main>
  );
};

export default VacancyPage;