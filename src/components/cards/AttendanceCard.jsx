import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

function AttendanceCard({ date, point, from, to, ot, leave, holiday }) {
  const work_day = {
    0.5: "H a l f   D a y",
    1: "F u l l   D a y",
  };
  return (
    <Card isFooterBlurred className="bg-slate-800">
      <CardHeader className="text-xl font-extrabold max-md:text-base max-md:font-semibold">
        {new Date(date).toDateString()}
      </CardHeader>
      <Divider />
      <CardBody className="font-medium text-sm max-md:font-normal max-md:text-xs">
        {!holiday && !leave && (
          <>
            {new Date(from).toLocaleTimeString()} &rarr;
            {new Date(to).toLocaleTimeString()}
          </>
        )}
      </CardBody>
      <Divider />
      <CardFooter
        className={`${
          holiday
            ? "bg-purple-900"
            : leave
            ? "bg-red-900"
            : point === 1
            ? "bg-green-900"
            : "bg-orange-900"
        }`}
      >
        {holiday ? (
          "H O L I D A Y"
        ) : leave ? (
          "L E A V E"
        ) : (
          <>
            {work_day[point]}
            {ot > 0 && `- Over Time : ${ot} Hours`}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default AttendanceCard;
