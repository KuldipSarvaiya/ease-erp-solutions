import { Avatar } from "@nextui-org/react";

export default function ProfilePage() {
  return (
    <div className="relative w-full h-full max-h-full max-w-full">
      {/* photo name */}
      <div className="flex flex-row justify-start max-w-full ml-10 h-32 items-end gap-14 max-md:items-center max-md:h-fit max-md:flex-col max-md:gap-2 max-md:justify-center max-md:m-0">
        <Avatar
          src=""
          alt="profile"
          size="lg"
          className="scale-[3] mx-8 ml-24 translate-y-7 max-md:mx-0 max-md:my-10"
        />
        <p className="text-3xl font-bold md:flex-grow max-md:my-2 max-md:mt-14 min-md:text-xl">
          Welcome {":)"},
          <p className="text-4xl uppercase min-md:text-2xl">Kuldip Sarvaiya</p>
        </p>
        <p className="text-xl min-md:text-md md:mr-20">ID : 123456234rds</p>
      </div>

      {/* main content */}
      <div className="border-4 rounded-3xl mx-10 my-4 p-4 max-md:mx-2 shadow-lg shadow-slate-500">
        <p className="text-end italic md:mb-7 ">
          Hello👋, hope you are Nice, and ready to dive into today's job...
        </p>

        {/* details */}
        <div className="flex flex-row max-md:flex-col flex-wrap justify-around max-md:gap-7 text-nowrap md:text-lg">
          {/* personal details */}
          <div className="max-w-sm">
            <u className="text-3xl capitalize tracking-wider font-semibold m-16">
              Personal Profile
            </u>
            <div className="flex flex-row flex-nowrap gap-5">
              <div>
                <p><b>Full Name</b></p>
                <p><b>DOB</b></p>
                <p><b>Gender</b></p>
                <p><b>Email</b></p>
                <p><b>Contact No.</b></p>
                <p><b>Account No.</b></p>
                <p><b>Bank Name</b></p>
                <p><b>IFSC Code</b></p>
                <p><b>PAN No.</b></p>
                <p><b>Address</b></p>
              </div>
              <div>
                <p>: Sarvaiya Kuldip Kishorbhai</p>
                <p>: {new Date().toDateString()}</p>
                <p>: Male</p>
                <p>: kuldipsarvaiy94@gmail.com</p>
                <p>: 1234567890</p>
                <p>: 332211000570264</p>
                <p>: State Bank of India</p>
                <p>: SBIN00029</p>
                <p>: PEZPS8692Q</p>
                <p className="text-wrap">: 25, radhekrishna row-house, kamrej, surat, gujarat, 232329</p>
              </div>
            </div> 
          </div>
          <hr className="rotate-90 self-center hidden" width={290} />
          {/* company details */}
          <div className="max-w-xs">
            <u className="text-3xl m-16 capitalize tracking-wider font-semibold">
              Company Details
            </u>
            <div className="flex flex-row flex-nowrap gap-5">
              <div>
                <p><b>Designation</b></p>
                <p><b>DOJ</b></p>
                <p><b>Department</b></p>
                <p><b>Basic Salary</b></p>
                <p><b>OT-Salary / Hour</b></p>
                <p><b>Allowed Leave / Month</b></p>
                <p><b>Salary Cut / Leave</b></p>
              </div>
              <div>
                <p>: Kuldip</p>
                <p>: {new Date().toDateString()}</p>
                <p>: Packing and Labeling</p>
                <p>: 20232.21</p>
                <p>: 232.21</p>
                <p>: 232.21</p>
                <p>: 532.21</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
