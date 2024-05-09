import Navbar from "../Navbar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="relative flex flex-col md:flex-row">
      <Navbar />
      <main className="mt-[32px] sm:mt-[61px] md:mt-[77px] md:w-full md:max-w-[730px] mx-auto max-[880px]:mx-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;
