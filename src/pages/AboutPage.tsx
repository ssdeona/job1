import { Container, Paper, Text, Title } from '@mantine/core';
import styles from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <main className={styles.page}>
      <Container size="sm">
        <Paper className={styles.card}>
          <Title order={2} className={styles.title}>
            Иван Васильев
          </Title>

          <Text className={styles.text}>
            Привет! Я - Frontend-разработчик. Пишу приложения
            на React + TypeScript + Redux Toolkit.
          </Text>
        </Paper>
      </Container>
    </main>
  );
};