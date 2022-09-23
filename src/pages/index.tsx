import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ButtonCopy } from "../components/ButtonCopy";
import { TextInput, Group, Button, Title, ActionIcon } from "@mantine/core";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { nanoid } from "nanoid";

const Home: NextPage = () => {
  const [link, setLink] = useState("");
  const [urlinvalid, setURLInvalid] = useState(true);
  const [slug, setSlug] = useState("");
  const [short, setShort] = useState("");

  const [slugExist, setslugExist] = useState(false);

  const generateRandomSlug = () => {
    const data = nanoid(10);
    if (data) {
      setSlug(data);
    }
  };

  const clearRandom = () => {
    setSlug("");
  };

  const clearButton = (
    <ActionIcon
      size={"xl"}
      radius="md"
      variant="transparent"
      onClick={clearRandom}
    >
      <IconX size={18} />
    </ActionIcon>
  );

  const regexURL =
    "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

  const shortenLink = async () => {
    if (link.match(regexURL)) {
      setURLInvalid(true);
      console.log();
      const data = await fetch(
        `/api/add-url/add?link=${link}&surl=${slug}`
      ).then((res) => res.json());

      if (data.error) {
        showNotification({
          title: "Invalid Slug",
          message: "Slug already exist",
          color: "red",
          icon: <IconX />,
        });
        setslugExist(true);
      } else {
        setShort(data.surl);
        showNotification({
          title: "URL Generated",
          message: "The Short URL has been generated",
          color: "green",
          icon: <IconCheck />,
        });
        setslugExist(false);
      }
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
          <TextInput
            placeholder="Enter Slug"
            size="lg"
            value={slug}
            onChange={(event) => {
              setSlug(event.currentTarget.value);
              event.preventDefault();
            }}
            rightSection={clearButton}
            error={slugExist}
          />

          <Button size="lg" variant="light" onClick={generateRandomSlug}>
            Random
          </Button>
          <Button size="lg" onClick={shortenLink}>
            Shorten
          </Button>
        </Group>

        <Title order={1}>{"pet.ite/" + short}</Title>

        <ButtonCopy slink={short} />
      </div>
    </div>
  );
};

export default Home;
