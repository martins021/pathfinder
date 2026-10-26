import { useState } from "react";
import {
  Button, Flex, Input, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalHeader, ModalOverlay, Text, useToast,
} from "@chakra-ui/react";

const ShareModal = ({ url, onClose }) => {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      toast({
        description: "Could not copy the link. Select it and copy it manually.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="rgb(42, 42, 42)" color="white" mx={4}>
        <ModalHeader>Share map</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontSize="sm" mb={3}>Copy this link to share your map.</Text>
          <Flex gap={2}>
            <Input
              aria-label="Map link"
              value={url}
              isReadOnly
              minW={0}
              onFocus={event => event.target.select()}
            />
            <Button
              onClick={copyUrl}
              bg="rgb(255, 215, 0)"
              color="black"
              _hover={{ bg: "rgb(207, 175, 0)" }}
              flexShrink={0}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
