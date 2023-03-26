import { Box, Button, Container, FormControl, Input, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineAppstoreAdd } from "react-icons/ai";
import Line from "./Components/Line";
// interface Tasks {
//   taskname: string;
//   description: string;
// }

function App() {
  // const [tasks, setTasks] = useState<Tasks[]>([]);
  const [query, setQuery] = useState("");

  const onChangeHandler = (e: any) => {
    setQuery(e.target.value);
  };

  // const SearchHandler = () => {
  //   Search(query);
  // };

  return (
    <>
      <Container maxW={"full"} p="5" fontSize={"25px"}>
        <Box rounded="lg" boxShadow="base" p="4">
          <Box mt="2" gap={"2"} mb="4" display={"flex"}>
            <FormControl>
              <Input type="text" onChange={onChangeHandler} />
            </FormControl>
          </Box>
        </Box>

        <Box >
        <Button
              leftIcon={<AiOutlineAppstoreAdd />}
              colorScheme="green"
              variant="outline"
              maxW="300px"
              minW="150px"
              mt="2"
              m="4"
            >
              Add New Task
            </Button>
            <Button
              leftIcon={<AiOutlineSearch />}
              colorScheme="green"
              variant="outline"
              maxW="300px"
              minW="150px"
              mt="2"
              m="4"

            >
              {" "}
              Search
            </Button>
        </Box>

        <Box
          mt="5"
          rounded="lg"
          boxShadow="base"
          mb="6"
          width="50rem"
          marginLeft="20rem"
        >
          <Box p="4" justifyContent="space-between" mb="2">
            Tasks To Do
          </Box>

          <TableContainer>
            <Table variant="simple" colorScheme="black" rounded="lg" size="sm">
              <Thead>
                <Tr>
                  <Th>Task Name</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Line />
                <Line />
              </Tbody>
            </Table>
          </TableContainer>
        </Box>


        

      </Container>
    </>
  );
}

export default App;
