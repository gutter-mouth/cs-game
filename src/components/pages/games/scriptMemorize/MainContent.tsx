import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Highlight,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import type { FieldValues} from "react-hook-form";
import { useForm } from "react-hook-form";
// import { DragDropContext } from "react-beautiful-dnd";

export const MainContent = () => {
  const [array, setArray] = useState([]);
  const [hide, setHide] = useState([""]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = (values: FieldValues) => {
    const myArray = values.name.replaceAll("　", " ").split(" ");
    setArray(myArray);
    setValue("name", "");
  };

  return (
    <Container maxW="1200px">
      <Center h="100px" mt={50}>
        <Heading lineHeight="tall">あんしょうせいく</Heading>
      </Center>
      {array.length !== 0 ? (
        <Box w="90%" p={5}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th w="4">ばんごう</Th>
                  <Th>みことば</Th>
                  <Th w="4">かくすボタン</Th>
                  <Th w="4">みるボタン</Th>
                </Tr>
              </Thead>
              <Tbody>
                {array.map((text: string, index: number) => (
                  <Tr key={text}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <Heading lineHeight="tall">
                        <Highlight
                          query={hide}
                          styles={{
                            px: "1",
                            py: "1",
                            bg: "black",
                            rounded: "4",
                          }}>
                          {text}
                        </Highlight>
                      </Heading>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => {
                          setHide([...hide, text]);
                        }}>
                        かくす
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => {
                          setHide(hide.filter((hide) => hide !== text));
                        }}>
                        みる
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Box mt={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel htmlFor="name">
                暗記箇所ごとにスペースで区切って入力ください
              </FormLabel>
              <Textarea
                id="name"
                placeholder="みことば"
                {...register("name", {
                  required: "This is required",
                })}
              />
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit">
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Container>
  );
};
