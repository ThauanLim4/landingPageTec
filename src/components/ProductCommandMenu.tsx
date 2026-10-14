"use client";

import { useMemo } from "react";
import Image from "next/image";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useProductViewer } from "@/components/ProductViewerProvider";
import { CATEGORIES } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export default function ProductCommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { openProduct } = useProductViewer();

  const groups = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        categoryKey: category.key,
        title: category.titleLower,
        products: category.products,
      })),
    []
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Busque um produto pelo nome..." />
      <CommandList>
        <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
        {groups.map((group) => (
          <CommandGroup key={group.categoryKey} heading={group.title}>
            {group.products.map((product) => (
              <CommandItem
                key={`${group.categoryKey}-${product.id}`}
                value={product.name}
                onSelect={() => {
                  openProduct(product, group.categoryKey);
                  onOpenChange(false);
                }}
              >
                <Image
                  src={product.img}
                  alt={product.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 object-contain"
                />
                <span className="flex-1 truncate">{product.name}</span>
                <span className="ml-auto pl-4 text-xs font-bold text-green3">
                  {formatPrice(product.price)}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}