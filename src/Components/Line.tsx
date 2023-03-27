import { Box, Button, Td, Tr } from "@chakra-ui/react";
// import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type taskProps = {
    taskname: string;
    description: string;
  };

const Line = ({ taskname, description }: taskProps) => {
    // const [tasks, setTasks] = useState([]);
    return (
        <Tr>
            <Td>{taskname}</Td>
            <Td>{description} </Td>
            <Td>
            <Box display="flex" gap="1">
          <Button colorScheme="blue">
             <AiOutlineEdit/>
          </Button>
          <Button colorScheme="red" >
            <AiOutlineDelete />
          </Button>
        </Box>
        </Td>
        </Tr>
    );

};

export default Line;