import WriteFormModal from "~/components/Forms/WriteFormModal";
import MainLayout from "~/layouts/MainLayout";
import Aside from "~/layouts/MainLayout/Aside";
import Main from "~/layouts/MainLayout/Main";

const Homepage = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <MainLayout>
        <section className="grid w-full grid-cols-12">
          <Main />
          <Aside />
        </section>
      </MainLayout>
      <WriteFormModal />
    </div>
  );
};

export default Homepage;
