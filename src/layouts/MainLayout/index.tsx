import Header from "./Header";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="space-ar flex h-screen w-full flex-col">
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
