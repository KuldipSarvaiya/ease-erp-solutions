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
    <Card
      isFooterBlurred
      className={`bg-${
        holiday ? "purple" : leave ? "red" : point === 1 ? "green" : "orange"
      }-500 w-fit text-slate-800`}
    >
      <CardHeader className="text-xl font-extrabold max-md:text-base max-md:font-semibold">
        {new Date(date).toDateString()}
      </CardHeader>
      <Divider />
      <CardBody className="font-medium max-md:font-normal max-md:text-xs">
        {(!holiday && !leave) && (
          <>
            {new Date(from).toLocaleTimeString()} &rarr;
            {new Date(to).toLocaleTimeString()}
          </>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
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
