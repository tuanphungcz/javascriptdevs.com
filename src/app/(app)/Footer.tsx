import { Container } from "@/components/ui";

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-center">
          <div className="text-sm text-gray-500">
            © 2024 JavascriptDevs - All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};
