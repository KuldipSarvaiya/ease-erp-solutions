import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-75 animate-spinner-ease-spin">
      <AiOutlineLoading3Quarters />
    </span>
  );
}
