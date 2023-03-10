import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";

export default function DateFilter() {
  return (
    <FormControl maxW="660px" w="95%" mx="auto" mt="5">
      <Flex gap={2} alignItems={"center"}>
        <FormLabel>Month/Year:</FormLabel>
        <Input type="month" />
        <Button colorScheme="twitter" type="submit">
          Submit
        </Button>
      </Flex>
    </FormControl>
  );
}
