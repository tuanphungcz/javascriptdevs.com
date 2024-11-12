import { Breadcrumb, Container, Description, Title } from "@/components/ui";

interface DetailEntityHeaderProps {
  breadCrumbItems: {
    label: string;
    href?: string;
  }[];
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const DetailEntityHeader = ({
  breadCrumbItems,
  title,
  description,
  children,
}: DetailEntityHeaderProps) => {
  return (
    <div className="py-16 bg-gray-100">
      <Container>
        <div className="space-y-4">
          {breadCrumbItems && <Breadcrumb items={breadCrumbItems} />}

          <div className="space-y-2">
            <Title className="lg:text-4xl">{title}</Title>
            <Description className="prose max-w-none text-gray-500 dark:text-gray-600 text-lg">
              {description}
            </Description>
          </div>
          {children}
        </div>
      </Container>
    </div>
  );
};
