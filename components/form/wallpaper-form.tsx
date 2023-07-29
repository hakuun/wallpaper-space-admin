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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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

const formSchema = z.object({
  imageUrl: z.string().min(1),
  categoryId: z.string().min(1),
});

type WallpaperFormValues = z.infer<typeof formSchema>;

interface WallpaperFormProps {
  initialData: Wallpaper | null;
  categories: Category[];
}

export const WallpaperForm: React.FC<WallpaperFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
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
      imageUrl: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: WallpaperFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await fetch(`/api/wallpaper/${params.wallpaperId}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
      } else {
        await fetch(`/api/wallpaper`, {
          method: "POST",
          body: JSON.stringify(data),
        });
      }
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallpaper image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
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
                    onValueChange={field.onChange}
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
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
