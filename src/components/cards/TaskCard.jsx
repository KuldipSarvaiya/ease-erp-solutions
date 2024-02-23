import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { FaCheck, FaDotCircle } from "react-icons/fa";

function TaskCard({ date, text, is_complete, id, updated_date }) {
  return (
    <Card isFooterBlurred className="bg-slate-800 backdrop:blur-3xl max-w-xs">
      <CardHeader className="text-lg font-extrabold max-md:text-base max-md:font-semibold">
        {new Date(date).toLocaleString()}
      </CardHeader>
      <Divider />
      <CardBody className="font-semibold max-md:font-medium max-md:text-lg">
        {text}
      </CardBody>
      <Divider />
      <CardFooter>
        {is_complete ? (
          <>
            <i className="flex items-center text-green-500">
              <FaDotCircle />
              &nbsp;Complete
            </i>
            &nbsp;
            <p>{new Date(updated_date).toLocaleString()}</p>
          </>
        ) : (
          <>
            <i className="flex items-center text-red-500">
              <FaDotCircle />
              &nbsp;Pending
            </i>
            &nbsp; &nbsp; &nbsp;
            <Button variant="shadow" size="sm" color="secondary">
              <FaCheck />
              Mark as Complete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
