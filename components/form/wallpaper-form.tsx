"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { Wallpaper, Category } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { Image, WallpaperFormInitialData } from "@/types/image";

const formSchema = z.object({
  categoryId: z.string().min(1),
  isPublished: z.boolean(),
  images: z.array(Image),
});

type WallpaperFormValues = z.infer<typeof formSchema>;

interface WallpaperFormProps {
  initialData: WallpaperFormInitialData | null;
  categories: Category[];
}

export const WallpaperForm: React.FC<WallpaperFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [folder, setFolder] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit wallpaper" : "Create wallpaper";
  const description = initialData ? "Edit a wallpaper." : "Add a new wallpaper";
  const toastMessage = initialData
    ? "Wallpaper updated."
    : "Wallpaper created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<WallpaperFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      categoryId: "",
      isPublished: false,
      images: [],
    },
  });

  function makeRequest(data: any) {
    const method = initialData ? "PATCH" : "POST";
    const url = initialData
      ? `/api/wallpaper/${params.wallpaperId}`
      : "/api/wallpaper";
    return fetch(url, {
      method,
      body: JSON.stringify(data),
    });
  }

  const onSubmit = async (values: WallpaperFormValues) => {
    try {
      setLoading(true);
      const { images, isPublished, categoryId } = values;

      const all = images.map((image) => {
        const wallpaper = {
          ...image,
          categoryId,
          isPublished,
        };
        return makeRequest(wallpaper);
      });

      await Promise.all(all);

      router.refresh();
      router.push(`/wallpaper`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await fetch(`/api/wallpaper/${params.wallpaperId}`, {
        method: "DELETE",
      });
      router.refresh();
      router.push(`/wallpaper`);
      toast.success("Wallpaper deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this wallpaper first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  function handleSetFolder(id: string) {
    const seletedCategroy = categories.find((category) => category.id === id);
    setFolder(seletedCategroy?.name);
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    uploadOptions={{
                      multiple: true,
                      folder,
                    }}
                    value={field.value}
                    disabled={loading}
                    onChange={(image) =>
                      field.onChange([...field.value, { ...image }])
                    }
                    onRemove={(image) =>
                      field.onChange([
                        ...field.value.filter(
                          (current) => current.assetId !== image.assetId
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleSetFolder(value);
                    }}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Published</FormLabel>
                    <FormDescription>
                      This wallpaper will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
