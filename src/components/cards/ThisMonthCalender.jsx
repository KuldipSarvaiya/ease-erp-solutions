function ThisMonthCalender({ leaves_dates }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = firstDay.getDay();

    const calendarDays = [];

    let blankDays = startingDay === 0 ? 0 : startingDay;
    for (let i = 0; i < blankDays; i++) {
      calendarDays.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays.concat(Array(42 - calendarDays.length).fill(null));
  };

  const renderCell = (day) => {
    if (!day) return <td key={day} />;
    const afterCurrentDay =
      new Date().getDate() < day && new Date().getMonth() === getCurrentMonth();
    const leave_day = leaves_dates?.find(
      (leaveDate) =>
        new Date(leaveDate).getDate() === day &&
        new Date(leaveDate).getMonth() === getCurrentMonth()
    );
    const isSunday =
      new Date(new Date().getFullYear(), getCurrentMonth(), day).getDay() === 0;

    return (
      <td
        key={day}
        className={`px-2 py-1 text-center  ${
          isSunday
            ? "text-red-300"
            : afterCurrentDay
            ? "text-slate-500"
            : "text-slate-200"
        } ${leave_day ? "bg-red-400 rounded-md" : ""}`}
      >
        {day}
      </td>
    );
  };

  const getCurrentMonth = () => new Date().getMonth();

  return (
    <div>
      <table className="w-500 h-500 border-collapse font-bold">
        <caption>
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
          }).format(new Date())}
        </caption>
        <thead>
          <tr>
            {days.map((day) => (
              <th
                key={day}
                className="text-center px-2 py-1 text-slate-300 bg-neutral-600"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil(getMonthDays(new Date()).length / 7))].map(
            (_, week) => (
              <tr key={week}>
                {[...getMonthDays(new Date())]
                  .slice(week * 7, week * 7 + 7)
                  .map(renderCell)}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ThisMonthCalender;
