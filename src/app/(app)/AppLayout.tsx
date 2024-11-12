import { Footer } from "@/app/(app)/Footer";
import { Header } from "@/app/(app)/Header";
import { validateRequest } from "@/utils/lucia/lucia";

interface LayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<LayoutProps> = async ({ children }) => {
  const { user, session } = await validateRequest();

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} session={session} />
      <main className="flex-grow">
        <div className="">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
