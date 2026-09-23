import { IconUserCircle } from '@tabler/icons-react';
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoHh}>hh</span>
        <span className={styles.logoText}>.FrontEnd</span>
      </div>

      <nav className={styles.navigation}>
        <Link
          to="/"
          className={styles.vacanciesButton}
        >
          Вакансии FE
          <span className={styles.dot} />
        </Link>

        <Link
          to="/about"
          className={styles.aboutButton}
        >
          <IconUserCircle size={22} stroke={1.5} />
          <Text size="sm">Обо мне</Text>
        </Link>
      </nav>
    </header>
  );
};