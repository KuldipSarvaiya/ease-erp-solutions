import NavBar from "@/components/NavBar"; 

export const metadata = {
  title: "about company area",
  description: "page about company",
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
