import Task from "@/lib/models/task.model";
import connectDB from "@/lib/mongoose";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { FaCheck, FaDotCircle } from "react-icons/fa";

function TaskCard({ date, text, is_complete, id, updated_date }) {
  console.log("Task card = ", { date, text, is_complete, id, updated_date });
  async function completeTask(formdata) {
    "use server";

    const id = formdata.get("id");

    if (!!!id) return false;

    await connectDB();
    const update = await Task.updateOne(
      { _id: id },
      { $set: { is_complete: true } }
    );

    if (update.acknowledged) {
      console.log("task completed = ", id);
      revalidatePath("/app/**/*.tasks", "page");
    }
  }

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
            <form action={completeTask}>
              <input hidden value={id.toString()} name="id" type="text" />
              <Button
                type="submit"
                variant="shadow"
                size="sm"
                color="secondary"
              >
                <FaCheck />
                Mark as Complete
              </Button>
            </form>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
