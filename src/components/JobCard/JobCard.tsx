import { Card, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { Job } from '../../types/job';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: Job;
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

export const JobCard = ({ job }: JobCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/vacancies/${job.id}`); 
  };

  return (
    <Card className={styles.card}>
      <Stack gap={0} align="flex-start">
     
        <div className={styles.title}>
          {job.name}
        </div>

        <div className={styles.info}>
          <span className={styles.salary}>
            {job.salary} ₽
          </span>

          <span className={styles.experience}>
            Опыт {job.experience}
          </span>
        </div>

        <div className={styles.company}>
          {job.company_name}
        </div>

       
        <div className={getSpaceClass(job.space)}>
          {getSpaceLabel(job.space)}
        </div>

        <div className={styles.city}>
          {job.city}
        </div>

        <button className={styles.button} onClick={handleClick}>
          Смотреть вакансию
        </button>
      </Stack>
    </Card>
  );
};