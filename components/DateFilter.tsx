import { FormControl, FormLabel, Input, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef } from "react";

export default function DateFilter() {
  const date = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const submitHandler = (event: any) => {
    event.preventDefault();
    const filteredDate = date.current?.value;

    if (filteredDate) {
      router.push(`events/${filteredDate?.replace("-", "/")}`);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl maxW="660px" w="95%" mx="auto" mt="5">
        <Flex gap={2} alignItems={"center"}>
          <FormLabel>Month/Year:</FormLabel>
          <Input type="month" ref={date} />
          <Button colorScheme="twitter" type="submit">
            Submit
          </Button>
        </Flex>
      </FormControl>
    </form>
  );
}
