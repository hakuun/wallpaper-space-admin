import { format } from "date-fns";

import prisma from "@/lib/prisma";

import { CategoryColumn } from "./components/columns";
import { CategoriesClient } from "./components/client";

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    createdAt: format(item.createdAt, "yyyy-MM-dd hh:mm:ss"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
