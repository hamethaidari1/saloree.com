import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Car,
  Dumbbell,
  Gamepad2,
  Laptop,
  Shield,
  Shirt,
  Sofa,
  Sparkles,
} from "lucide-react";

export type HomeCategoryItem = {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  icon: LucideIcon;
};

export const fallbackCategoryImage = "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20a%20modern%20marketplace%20storefront%2C%20premium%20shopping%20experience%2C%20clean%20aesthetic%2C%204k&image_size=square_hd";

export const homeCategoryItems: HomeCategoryItem[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    itemCount: 12340,
    icon: Laptop,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20modern%20electronics%2C%20laptop%2C%20smartphone%2C%20headphones%2C%20clean%20desk%20setup%2C%20studio%20lighting%2C%204k&image_size=square_hd",
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    itemCount: 18250,
    icon: Shirt,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20premium%20fashion%20clothing%2C%20shoes%2C%20accessories%2C%20minimalist%20aesthetic%2C%20boutique%20style%2C%204k&image_size=square_hd",
  },
  {
    id: "home-living",
    name: "Home & Living",
    slug: "home-living",
    itemCount: 9120,
    icon: Sofa,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20a%20modern%20cozy%20living%20room%2C%20stylish%20furniture%2C%20home%20decor%2C%20natural%20lighting%2C%204k&image_size=square_hd",
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    itemCount: 6780,
    icon: Sparkles,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20luxury%20cosmetics%20and%20skincare%20products%2C%20makeup%2C%20elegant%20packaging%2C%20soft%20lighting%2C%204k&image_size=square_hd",
  },
  {
    id: "sports",
    name: "Sports",
    slug: "sports",
    itemCount: 7540,
    icon: Dumbbell,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20modern%20gym%20equipment%20and%20sportswear%2C%20fitness%20lifestyle%2C%20professional%20lighting%2C%204k&image_size=square_hd",
  },
  {
    id: "books",
    name: "Books",
    slug: "books",
    itemCount: 3110,
    icon: BookOpen,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20a%20cozy%20library%20scene%2C%20stacked%20books%20on%20a%20wooden%20table%2C%20warm%20lighting%2C%204k&image_size=square_hd",
  },
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    itemCount: 5420,
    icon: Gamepad2,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20a%20professional%20gaming%20setup%2C%20rgb%20lighting%2C%20gaming%20console%2C%20controller%2C%20pc%2C%204k&image_size=square_hd",
  },
  {
    id: "automotive",
    name: "Automotive",
    slug: "automotive",
    itemCount: 4950,
    icon: Car,
    image: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=high%20quality%20realistic%20photography%20of%20modern%20car%20interior%20and%20accessories%2C%20dashboard%20details%2C%20premium%20automotive%20tools%2C%204k&image_size=square_hd",
  },
];

export function formatCategoryItemCount(_itemCount: number) {
  return "Explore products";
}

type CategoryMediaProps = {
  category: HomeCategoryItem;
  alt?: string;
  className?: string;
  imgClassName?: string;
  iconClassName?: string;
};

export function CategoryMedia({
  category,
  alt,
  className = "",
  imgClassName = "",
}: CategoryMediaProps) {
  const [imgSrc, setImgSrc] = useState(category.image);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={imgSrc}
        alt={alt || `${category.name} category`}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-500 ${imgClassName}`}
        onError={() => setImgSrc(fallbackCategoryImage)}
      />
    </div>
  );
}
