import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AiOutlineSearch, AiOutlineAppstoreAdd } from "react-icons/ai";
import Line from "./Components/Line";
import axios from "axios";
import { useEffect, useState } from "react";

interface Tasks {
  taskname: string;
  description: string;
}

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [query, setQuery] = useState("");

  // Fethcing data from backend :
  useEffect(() => {
    const FetchData = async () => {
      const result = await axios.get<Tasks[]>("/api/tasks");
      setTasks(result.data);
    };
    FetchData();
  }, []);

  // Searching for tasks by key :
  const Search = (query: String) => {
    axios.post(`/api/tasks/search?key=${query}`)
    .then((res) => {
      setTasks(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    })
  };

  const SearchHandler = () => {
    Search(query);
  }

  // As we fill our input it will fill our empty state :
  const onChangeHandler = (e: any) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <Container maxW={"full"} p="5" fontSize={"25px"}>
        <Box rounded="lg" boxShadow="base" p="4">
          <Box mt="2" gap={"2"} mb="4" display={"flex"}>
            <FormControl>
              <Input type="text" onChange={onChangeHandler}/>
            </FormControl>
          </Box>
        </Box>

        <Box>
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
            onClick={() => SearchHandler()}
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
                {tasks?.map(({taskname, description }) => {
                  return (
                    <Line taskname={taskname} description={description} />
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
}

export default App;
