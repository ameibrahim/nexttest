"use client";

import { CheckIcon, LanguageIcon } from "@heroicons/react/24/solid";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useTransition, useState } from "react";
import { Locale } from "@/app/i18n/config";
import { setUserLocale } from "@/app/services/locale";
import Image from "next/image";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [selectedLocale, setSelectedLocale] = useState(defaultValue); // Bind value to state
  const [isPending, startTransition] = useTransition();

  async function onChange(value: string) {
    const locale = value as Locale;
    console.log("Switching locale to:", locale); // Debugging log
    setSelectedLocale(locale); // Update the local state

    startTransition(() => {
      setUserLocale(locale).then(() => {
        console.log("Locale set, reloading page.");
      });
    });
  }

  return (
    <div className="relative">
      <Select.Root value={selectedLocale} onValueChange={onChange}>
        <Select.Trigger
          aria-label={label}
          className={clsx(
            "rounded-sm p-2 transition-colors hover:bg-slate-200",
            isPending && "pointer-events-none opacity-60"
          )}
          style={{ outline: "none" }}
        >
          <Select.Icon>
            <LanguageIcon className="h-6 w-6 text-slate-600 transition-colors group-hover:text-slate-900" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            align="end"
            className="min-w-[8rem] overflow-hidden rounded-sm bg-white py-1 shadow-md"
            position="popper"
          >
            <Select.Viewport>
              {items.map((item) => (
                <Select.Item
                  key={item.value}
                  className="flex cursor-default items-center px-3 py-2 text-base data-[highlighted]:bg-slate-100"
                  value={item.value}
                  style={{ outline: "none" }}
                >
                  <div className="mr-2 w-[1rem]">
                    {item.value === selectedLocale && (
                      <div>
                        <CheckIcon className="h-5 w-5 text-slate-600" />
                        <Image src={`/countries/${item.value}.png`} alt={""} width={20} height={20} />
                      </div>
                    )}
                  </div>
                  <span className="text-slate-900">{item.label}</span>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.Arrow className="fill-white text-white" />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
