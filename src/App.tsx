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
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerOverlay, 
  useDisclosure, 
  Drawer,
  Stack,
  useToast
} from "@chakra-ui/react";
import { AiOutlineSearch, AiOutlineAppstoreAdd } from "react-icons/ai";
import Line from "./Components/Line";
import MyInputs from "./Components/MyInputs";
import axios from "axios";
import { useEffect, useState } from "react";

interface Tasks {
  _id: string;
  taskname: string;
  description: string;
}

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [task, setTask] = useState({});
  const [query, setQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [form, setForm] = useState({});
  
  const Toast = useToast();

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

  // Adding a new Task :
  const AddTask = (form: {}) => {
    axios
    .post('/api/tasks', form)
    .then((res) => {
      setTasks([...tasks, res.data])
        Toast({
          title: "Task Added.",
          status: "success",
          duration: 3000,
          isClosable: true,
    })
        setForm({});

        // close the drawer :
        onClose();
  })
    .catch(err => {
      // setErrors(err.response.data.error)
      console.log('error');
    })
  }

  const onChangeHr = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  } 

    const onAdd = () => {
      AddTask(form)
    }

    const FindOne = async (id: any) => {
      await axios
      .get(`/api/tasks/${id}`)
      .then((res) => {
        setTasks(res.data)
      })
      .catch(() => {
        console.log('error')
      })
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
            onClick={onOpen}
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
            List of My Tasks
          </Box>

          <TableContainer>
            <Table variant="simple" colorScheme="black" rounded="lg" size="sm">
              <Thead>
                <Tr>
                  <Th>Task Name</Th>
                  <Th>Description</Th>
                  <Th>Task's Id</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks?.map(({_id, taskname, description }) => {
                  return (
                    <Line id={_id} taskname={taskname} description={description} />
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      <Drawer 
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update OR Create Your Task </DrawerHeader>

          <DrawerBody>
            <Stack spacing={"24px"}>
            <MyInputs name="taskname" onChangeHandler={onChangeHr}  />
            <MyInputs name="description" onChangeHandler={onChangeHr}  />
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={() => onAdd()}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </Container>
    </>
  );
}

export default App;
