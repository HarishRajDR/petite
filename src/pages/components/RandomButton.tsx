import { useState } from "react";
import { generateSlug } from "random-word-slugs";
import { IconX } from "@tabler/icons";
import { ActionIcon, Button, TextInput } from "@mantine/core";
import styles from "../../styles/RandomButton.module.css";

export function RandomButton() {
  const [slug, setSlug] = useState("");

  const generateRandomSlug = () => {
    const data = generateSlug(2, {
      format: "camel",
      partsOfSpeech: ["adjective", "noun"],
      categories: {
        noun: ["technology", "science", "food"],
      },
    });
    if (data) {
      console.log(data);
      setSlug(data.toLowerCase());
    }

    // console.log("the generated slug is " + slug);
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
  return (
    <div className={styles.main}>
      <TextInput
        placeholder="Enter Phrase"
        size="lg"
        value={slug}
        onChange={(event) => {
          setSlug(event.currentTarget.value);
        }}
        rightSection={clearButton}
      />

      <Button size="lg" variant="light" onClick={generateRandomSlug}>
        Random Phrase
      </Button>
    </div>
  );
}
