import Link from "next/link";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Image,
  Flex,
  Center,
} from "@chakra-ui/react";
import { CalendarIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function EventCard(props: any) {
  return (
    <Box maxW="660px" w="95%" mx="auto" mt="5">
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        my="5"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md" mb="2">
              {props.title}
            </Heading>
            <Flex py="2" flexDir={"column"} alignItems={"start"}>
              <Center mb={1}>
                <CalendarIcon w={5} h={5} mr="2" color="black" />
                <Text>{props.date}</Text>
              </Center>
              <Center>
                <Image
                  w={5}
                  mr="2"
                  src="https://webstockreview.net/images/document-clipart-disorderly-1.png"
                  alt="Location"
                />
                <Text color={"black"}>
                  {props.address1}
                  <br />
                  {props.address2}
                </Text>
              </Center>
            </Flex>
          </CardBody>
          <CardFooter>
            {props.showExploreBtn && (
              <Button
                as={Link}
                href={`/events/${props.id}`}
                variant="solid"
                colorScheme={"blue"}
              >
                Explore Event
                <ArrowForwardIcon w={5} h={5} ml="2" />
              </Button>
            )}
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
}
