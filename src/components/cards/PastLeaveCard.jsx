import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

function PastLeaveCard({
  total_leave_days,
  leave_state,
  reason,
  dates_of_leave,
}) {
  const colors = {
    pending: "bg-yellow-700",
    accepted: "bg-emerald-700",
    rejected: "bg-red-700",
  };
  return (
    <Card
      isFooterBlurred
      className={`${colors[leave_state]} backdrop:blur-3xl max-w-xs `}
    >
      <CardHeader className="text-lg font-extrabold max-md:text-base max-md:font-semibold">
        {total_leave_days} Days of leave
      </CardHeader>
      <Divider />
      <CardBody className="font-semibold max-md:font-medium max-md:text-lg flex gap-2 flex-row flex-wrap">
        {dates_of_leave.map((date) => (
          <span className="p-1 border-2 rounded-md inline self-start">{new Date(date).toLocaleDateString()}</span>
        ))}
      </CardBody>
      <Divider />
      <CardFooter>{reason.substr(0,80)+" . . ."}</CardFooter>
    </Card>
  );
}

export default PastLeaveCard;
