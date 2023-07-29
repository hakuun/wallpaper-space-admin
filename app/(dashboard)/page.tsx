import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface DashboardPageProps {}

const DashboardPage: React.FC<DashboardPageProps> = async () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of dashboard" />
        <Separator />
      </div>
    </div>
  );
};

export default DashboardPage;
