import { Flex, Heading } from '@radix-ui/themes';

import { Movies } from '@/components/Movies';

import styles from './home.module.scss';

export default async function Home() {
  return (
    <Flex asChild direction="column" align="center" className={styles.container}>
      <main>
        <Heading>Movie Search</Heading>
        <Movies />
      </main>
    </Flex>
  );
}
