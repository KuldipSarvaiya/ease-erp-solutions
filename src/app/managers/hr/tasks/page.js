import TaskCard from "@/components/cards/TaskCard";
import { Divider, Input } from "@nextui-org/react";

export default function TaskPage() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* pending tasks */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500 flex gap-2 flex-wrap max-md:justify-around content-stretch">
        <p className="text-2xl font-bold tracking-wide w-full">PENDING TASKS</p>
        <Divider className="my-5" />
        <TaskCard
          text={"hello  this is second task"}
          id={"123erfds"}
          is_complete={false}
          date={new Date()}
          updated_date={new Date()}
        />
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
            className="w-52"
          />
        </span>
        <Divider className="my-5" />
        <div className="mt-2 flex gap-2 flex-row flex-wrap justify-start items-stretch max-md:justify-around">
          <TaskCard
            text={"hello  this is first two task"}
            id={"123erfds"}
            is_complete={true}
            date={new Date()}
            updated_date={new Date()}
          />
          <TaskCard
            text={"hello  this is first task"}
            id={"123erfds"}
            is_complete={true}
            date={new Date()}
            updated_date={new Date()}
          />
        </div>
      </div>
    </div>
  );
}
