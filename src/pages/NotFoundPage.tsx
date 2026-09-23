import { Button, Container, Paper, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <Container size="lg" className={styles.container}>
        <Paper className={styles.card}>
   
          <div className={styles.topRow}>
            <div className={styles.textBlock}>
              <Title order={1} className={styles.title}>
                Упс! Такой страницы не существует
              </Title>

              <Text className={styles.subtitle}>
                Давайте перейдём к началу.
              </Text>
            </div>

            <Button
              className={styles.button}
              onClick={() => navigate('/')}
            >
              На главную
            </Button>
          </div>

        
          <div className={styles.imageWrapper}>
            <img
              src="/sad-cat.gif"
              alt="Грустный кот"
              className={styles.image}
            />
          </div>
        </Paper>
      </Container>
    </main>
  );
};