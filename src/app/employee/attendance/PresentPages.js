export function HoliDay() {
  return (
    <center className="font-medium text-lg">
      Today Is...
      <br />
      <br />
      <span className="text-red-500 bg-green-500 font-extrabold rounded-md p-2 text-2xl tracking-widest">
        HOLIDAY
      </span>
      <br />
      🎉🎊🥳
    </center>
  );
}

export function OnLeave() {
  return (
    <center className="font-medium text-lg">
      Its Your
      <br />
      <br />
      <span className="text-red-500 bg-green-500 font-extrabold rounded-md p-2 text-2xl tracking-widest">
        LEAVE DAY
      </span>
      <br />
      🎉🎊🥳
    </center>
  );
}

export function Present({ data }) {
  const date1 = new Date(data.punch_out);
  const date2 = new Date(data.punch_in);
  const diffInMs = Math.abs(date2 - date1);
  const total_hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const total_minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  const point_text = {
    0: <>WAS&apos;NT IT SHORT DAY ?</>,
    0.5: "THATS HALF DAY",
    1: "THATS FULL DAY",
  };

  return (
    <center className="font-medium text-lg">
      It was Busy Day 😮‍💨, But You Made it a Good One! 👍
      <br />
      <p>Punch In Time : {new Date(data.punch_in).toLocaleTimeString()}</p>
      <p>Punch Out Time : {new Date(data.punch_out).toLocaleTimeString()}</p>
      <p>
        Total Time : {total_hours} hours&nbsp;|&nbsp;
        {total_minutes} minutes
      </p>
      {total_hours > 8 && (
        <p>
          Over Time : {total_hours - 8} hours&nbsp;|&nbsp;
          {total_minutes - 60} minutes
        </p>
      )}
      <br />
      <span className="text-red-500 bg-green-500 font-extrabold rounded-md p-2 text-2xl tracking-widest">
        {point_text[data.point]}
      </span>
    </center>
  );
}
