import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ButtonCopy } from "./components/ButtonCopy";
import { TextInput, Group, Button, Title } from "@mantine/core";
import { useState } from "react";
import { RandomButton } from "./components/RandomButton";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

const Home: NextPage = () => {
  const [link, setLink] = useState("");
  const [urlinvalid, setURLInvalid] = useState(true);

  const regexURL =
    "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

  const shortenLink = () => {
    console.log(link);
    if (link.match(regexURL)) {
      setURLInvalid(true);
    } else {
      setURLInvalid(false);
      showNotification({
        title: "Invalid URL",
        message: "Please enter a valid URL 😅",
        color: "red",
        icon: <IconX />,
      });
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Petite</title>
        <meta name="description" content="URL Shortner" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Title order={1} style={{ fontSize: "7rem" }}>
          Petite.
        </Title>
        <TextInput
          placeholder="Enter Link"
          style={{ width: "100%" }}
          size="lg"
          value={link}
          onChange={(event) => {
            setLink(event.currentTarget.value);
          }}
          error={!urlinvalid}
        />

        <Group>
          <RandomButton />
          <Button size="lg" onClick={shortenLink}>
            Shorten
          </Button>
        </Group>

        <Title order={1}>peti.te/test</Title>

        <ButtonCopy />
      </div>
    </div>
  );
};

export default Home;
