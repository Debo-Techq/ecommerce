"use client"

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link";
import Form from "next/form";
import { SlBasket } from "react-icons/sl";
import { useCartStore } from "@/store/cart-store";


function Header() {

    const { user } = useUser();
     
    const { items } = useCartStore()
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <header className="p-4 flex flex-wrap justify-between items-center md:px-[25px] py-2 px-4 ">
      {/*Top row*/}
      <div className="flex w-full flex-wrap justify-between items-center flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
         <Link href="/" className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
         Shopr</Link>

         <div className="flex space-x-4 text-sm sm:text-base font-medium">
          <Link
            href="/product"
            className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
            Products
          </Link>
          <Link
            href="/checkout"
            className="text-gray-700 hover:text-blue-500 transition-colors duration-200"
            >
            Checkout
          </Link>
         </div>


        <div  className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
            <Link href="/checkout"
             className=" flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
             >
             <SlBasket className="w-6 h-6" />
              {/*Span item  count once global state is implemented*/}
             <span>My Basket</span>
             {cartCount > 0 && <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ">
             {cartCount}</span>}
           </Link>

           {/*user area */}
           <ClerkLoaded>
            {user ? (
                <div className="flex items-center space-x-2">
                    <UserButton />

                    <div className="hidden sm:block text-xs">
                        <p className="text-gray-400">Wellcome Back</p>
                        <p className="font-bold">{user.fullName}!</p>
                    </div>
                </div>
            ) : (
                <SignInButton mode="modal" />
            )}

           </ClerkLoaded>
        </div>
      </div>
    </header>
  );
 }


export default Header;














// import Link from "next/link";


// export default function Navbar() {
//   return (
//     <nav>
//       <div>
//         <Link href="/">Shopr</Link>
//       </div>
//       <div>
//         <Link href="/">Home</Link>
//         <Link href="/product">Products</Link>
//         <Link href="/checkout">Checkout</Link>
//       </div>
//       <div></div>
//     </nav>
//   );
// };
