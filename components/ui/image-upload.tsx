"use client";

import { CldUploadWidget, CldUploadWidgetPropsOptions } from "next-cloudinary";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ImageType } from "@/types/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: ImageType) => void;
  onRemove: (value: ImageType) => void;
  value: ImageType[];
  uploadOptions?: CldUploadWidgetPropsOptions;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  uploadOptions,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    try {
      if (result.error) {
        console.log(result.error);
        return;
      }
      const value: ImageType = {
        assetId: result.info.asset_id,
        publicId: result.info.public_id,
        height: result.info.height,
        width: result.info.width,
        secureUrl: result.info.secure_url,
        url: result.info.url,
        format: result.info.format,
      };
      onChange(value);
    } catch (error) {
      console.error("upload image error", error);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((image) => (
          <div
            key={image.url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(image)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={image.url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        options={uploadOptions}
        onUpload={onUpload}
        uploadPreset="anlv12ke"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
