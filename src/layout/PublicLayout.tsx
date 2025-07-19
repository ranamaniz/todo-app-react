type PublicLayoutProps = { children: React.ReactNode };

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <section className="h-screen w-screen bg-gray-50 flex justify-center items-center">
      {children}
    </section>
  );
};

export default PublicLayout;
