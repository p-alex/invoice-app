import Footer from "../Footer";
import Navbar from "../Navbar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col md:ml-[103px] md:flex-row">
        <main className="relative mx-auto mt-28 max-[880px]:mx-6 md:mt-[77px] md:w-full md:max-w-[730px]">
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Layout;
