import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { FaDotCircle } from "react-icons/fa";

function PastLeaveCard({
  total_leave_days,
  leave_state,
  reason,
  dates_of_leave,
}) {
  const colors = {
    pending: "text-yellow-500",
    accepted: "text-emerald-500",
    rejected: "text-red-500",
  };
  return (
    <Card
      isFooterBlurred
      className={`bg-slate-800 backdrop:blur-3xl max-w-xs `}
    >
      <CardHeader className="text-lg font-extrabold flex justify-between flex-row flex-nowrap max-md:text-base max-md:font-semibold">
        {total_leave_days} Days of leave
        <FaDotCircle className={colors[leave_state]} />
      </CardHeader>
      <Divider />
      <CardBody className="font-semibold max-md:font-medium max-md:text-lg flex gap-2 flex-row flex-wrap">
        {dates_of_leave.map((date, i) => (
          <span
            key={i + Date.now()}
            className="p-1 border-2 rounded-md inline self-start"
          >
            {new Date(date).toLocaleDateString()}
          </span>
        ))}
      </CardBody>
      <Divider />
      <CardFooter>{reason.substr(0, 80) + " . . ."}</CardFooter>
    </Card>
  );
}

export default PastLeaveCard;
