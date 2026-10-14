"use client";

import { useEffect, type ComponentProps, type ReactNode } from "react";
import { Command as CommandPrimitive } from "cmdk";
import Icon from "@/components/Icon";

function cx(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Command({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cx(
        "flex h-full w-full flex-col overflow-hidden rounded-lg bg-black4 text-white1",
        className
      )}
      {...props}
    />
  );
}

export function CommandDialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Buscar produtos"
      className="fixed inset-0 z-[9] flex items-start justify-center bg-black/70 p-4 pt-[15vh] sm:pt-[20vh]"
      onClick={() => onOpenChange(false)}
    >
      <Command
        className="glow-green w-full max-w-[640px] border border-green1/30"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Command>
    </div>
  );
}

export function CommandInput({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center gap-3 border-b border-black3 px-4">
      <Icon name="search" size={18} className="shrink-0 text-green1" />
      <CommandPrimitive.Input
        autoFocus
        className={cx(
          "h-12 w-full bg-transparent text-[15px] text-white1 outline-none placeholder:text-white1/40 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cx(
        "max-h-[300px] overflow-y-auto overflow-x-hidden px-2 pb-2",
        className
      )}
      {...props}
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      className={cx("py-6 text-center text-sm text-white1/60", className)}
      {...props}
    />
  );
}

export function CommandGroup({
  className,
  heading,
  ...props
}: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      heading={heading}
      className={cx(
        "overflow-hidden text-white1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[13px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-green3",
        className
      )}
      {...props}
    />
  );
}

export function CommandSeparator({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      className={cx("h-px bg-black3", className)}
      {...props}
    />
  );
}

export function CommandItem({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cx(
        "relative flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2.5 text-sm text-white1 outline-none",
        "data-[selected=true]:bg-green2 data-[selected=true]:text-white1",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export function CommandShortcut({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cx("ml-auto pl-4 text-xs tracking-widest text-white1/50", className)}
      {...props}
    />
  );
}