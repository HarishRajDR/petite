import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Stack, Button, Input } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Petite</title>
        <meta name="description" content="URL Shortner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
