"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
export default function LocalSwitcher() {
  const router = useRouter();
  const pathname1 = usePathname();
  const [isPending, startTransition] = useTransition();
  const localActive = useLocale();
  const pathname = useParams();

  const { categories, subCategory, product } = pathname;
  const match = pathname1.match(/\/(ge|en)\/(.*)/);
  const cat = categories !== undefined ? `/${categories}` : "";
  const subcat = subCategory !== undefined ? `/${subCategory}` : "";
  const prod = product !== undefined ? `/${product}` : "";
  var i = match ? `/${match[2]}` : "";
  if (i == `${cat}${subcat}${prod}`) {
    var i = "";
  }

  const onSelectChange = (e) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}${i}${cat}${subcat}${prod}`);
    });
  };

  return (
    <select
      defaultValue={localActive || "en"}
      className="btn max-h-10"
      onChange={onSelectChange}
      disabled={isPending}
    >
      <option value="en">🇺🇸</option>
      <option value="ge">🇬🇪</option>
    </select>
  );
}
