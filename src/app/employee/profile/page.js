import { Avatar } from "@nextui-org/react";

export default function ProfilePage() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full ">
      {/* photo name */}
      <div className="flex flex-row justify-start max-w-full ml-10 h-32 items-end gap-14 max-md:items-center max-md:h-fit max-md:flex-col max-md:gap-2 max-md:justify-center max-md:m-0">
        <Avatar
          src=""
          alt="profile"
          size="lg"
          className="scale-[3] mx-8 ml-24 translate-y-7 max-md:mx-0 max-md:my-10 shadow-md shadow-slate-500"
        />
        <p className="text-3xl font-bold md:flex-grow max-md:my-2 max-md:mt-14 min-md:text-xl">
          Welcome {":)"},
          <p className="text-4xl uppercase min-md:text-2xl">Kuldip Sarvaiya</p>
        </p>
        <p className="text-xl min-md:text-md md:mr-20">ID : 123456234rds</p>
      </div>
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="text-end italic md:mb-7 ">
          Hello, hope you are Nice, and ready to dive into today's job...
        </p>
      </div>
    </div>
  );
}
