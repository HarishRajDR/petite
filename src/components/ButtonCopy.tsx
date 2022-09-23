import { Button, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCheck } from "@tabler/icons";
import { PropsWithChildren } from "react";

export interface Props {
  slink: string;
}

export function ButtonCopy(props: PropsWithChildren<Props>) {
  const clipboard = useClipboard();
  return (
    <Tooltip
      label="Link copied!"
      offset={5}
      position="bottom"
      radius="xl"
      transition="slide-down"
      transitionDuration={100}
      opened={clipboard.copied}
    >
      <Button
        variant="light"
        color={clipboard.copied ? "green" : ""}
        rightIcon={
          clipboard.copied ? (
            <IconCheck size={20} stroke={1.5} />
          ) : (
            <IconCopy size={20} stroke={1.5} />
          )
        }
        radius="xl"
        size="md"
        styles={{
          root: { paddingRight: 14, height: 48 },
          rightIcon: { marginLeft: 22 },
        }}
        onClick={() => clipboard.copy("peti.te/" + props.slink)}
      >
        Copy link to clipboard
      </Button>
    </Tooltip>
  );
}
