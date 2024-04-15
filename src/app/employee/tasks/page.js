import { options } from "@/app/api/auth/[...nextauth]/options";
import TaskCard from "@/components/cards/TaskCard";
import Task from "@/lib/models/task.model";
import { Divider, Input } from "@nextui-org/react";
import { getServerSession } from "next-auth";

export default async function TaskPage() {
  const session = await getServerSession(options);

  if (!session?.user?._id) return <></>;

  const pending_task_P = Task.find({
    assigned_employee_id: session.user._id,
    is_complete: false,
  });
  const complete_task_P = Task.find({
    assigned_employee_id: session.user._id,
    is_complete: true,
  }).limit(20);

  const [pending_task, complete_task] = await Promise.all([
    pending_task_P,
    complete_task_P,
  ]);

  console.log(pending_task, complete_task);

  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* pending tasks */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">PENDING TASKS</p>
        <Divider className="my-5" />
        <div className="flex gap-2 flex-row flex-wrap justify-start items-stretch max-md:justify-around">
          {pending_task?.map((task) => (
            <TaskCard
              key={task._id.toString() + task.updatedAt.toString()}
              text={task.text}
              id={task._id}
              is_complete={task.is_complete}
              date={task.date}
              updated_date={task.updatedAt}
            />
          ))}
          {pending_task.length === 0 && (
            <p className="text-lg font-bold tracking-wide w-full">
              NO TASKS FOUND {":)"}
            </p>
          )}
        </div>
      </div>

      {/* old tasks */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 mt-8">
        <span className="uppercase text-2xl  tracking-wider font-bold flex flex-wrap flex-row justify-between items-center">
          <span>previous tasks</span>
          <Input
            // onChange={handleDateChange}
            variant="faded"
            radius="md"
            color="secondary"
            type="date"
            size="sm"
            // value={new Date()}
            className="w-52 can_you_please_hide"
          />
        </span>
        <Divider className="my-5" />
        <div className="mt-2 flex gap-2 flex-row flex-wrap justify-start items-stretch max-md:justify-around">
          {complete_task?.map((task) => (
            <TaskCard
              key={task._id.toString() + task.updatedAt.toString()}
              text={task.text}
              id={task._id}
              is_complete={task.is_complete}
              date={task.date}
              updated_date={task.updatedAt}
            />
          ))}
          {complete_task.length === 0 && (
            <p className="text-lg font-bold tracking-wide w-full">
              NO TASKS FOUND {":)"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
