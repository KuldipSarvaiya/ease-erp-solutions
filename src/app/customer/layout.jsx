import NavBar from "@/components/NavBar"; 

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function LayoutCustomer({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section>{children}</section>
    </>
  );
}
