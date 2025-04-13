// 'use client'
// import { headerData } from '@/constants'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// const HeaderMenu = () => {
//   const pathname = usePathname();
//   return (
//     <div className='hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold'>
//       {
//         headerData?.map((item) => (
//           <Link
//             href={item.href} 
//             key={item.title}
//             className={`hover:text-darkColor hoverEffect relative group ${pathname === item?.href && "text-darkColor" }`}>
//             {item.title}
//             <span className={`absolute -bottom-1  left-1/2  h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === item?.href ? "w-1/2":"w-0"}`}></span>
//             <span className={`absolute -bottom-1  right-1/2  h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === item?.href ? "w-1/2":"w-0"}`}></span>
//           </Link>
//         ))
//       } 
//     </div>
//   )
// }

// export default HeaderMenu


"use client";
import { Category } from "@/app/(client)/types/ProductType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-5 text-sm capitalize font-semibold">
      <Link
        href={"/"}
        className={`hover:text-darkColor hoverEffect relative group ${
          pathname === "/" && "text-darkColor"
        }`}
      >
        Home
        <span
          className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
            pathname === "/" && "w-1/2"
          }`}
        />
        <span
          className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
            pathname === "/" && "w-1/2"
          }`}
        />
      </Link>
      {categories?.map((category) => (
        <Link
          key={category?.CategoryId}
          href={`/category/${category?.title}`}
          className={`hover:text-darkColor hoverEffect relative group ${
            pathname === `/category/${category?.title}` &&
            "text-darkColor"
          }`}
        >
          {category?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${
              pathname === `/category/${category?.title}` && "w-1/2"
            }`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${
              pathname === `/category/${category?.title}` && "w-1/2"
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;