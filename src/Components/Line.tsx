import { Box, Button, Td, Tr, useDisclosure } from "@chakra-ui/react";
// import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

type taskProps = {
  id: string;
  taskname: string;
  description: string;
};

const Line = ({ id, taskname, description }: taskProps) => {
    const { onOpen } = useDisclosure();

  const Toast = useToast();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});
 
  // Filter our tasks and delete them :
  const Delete = (id: string) => {
    axios
      .delete(`/api/tasks/${id}`)
      .then((res) => {
        setTasks(tasks.filter((task: any) => task._id !== id));
        Toast({
          title: "Task Deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const onUpdate = () => {
    console.log(task);
  }


  return (
    <Tr>
      <Td>{taskname}</Td>
      <Td>{description} </Td>
      <Td>{id} </Td>
      <Td>
        <Box display="flex" gap="1">
          <Button colorScheme="blue" onClick={() => {
                onOpen();
                onUpdate();
            }}>
            <AiOutlineEdit />
          </Button>
          <Button colorScheme="red" onClick={() => Delete(id)}>
            <AiOutlineDelete />
          </Button>
        </Box>
      </Td>
    </Tr>
  );
};

export default Line;
