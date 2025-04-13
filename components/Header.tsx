"use server"
import React from 'react'
import HeaderMenu from './HeaderMenu'
import Logo from './Logo'
import Container from './Container'
import MobileMenu from './MobileMenu'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import { auth,currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignInButton,SignedIn, UserButton  } from '@clerk/nextjs'
import { getCategory,getMyOrders } from "@/app/(client)/serverApi/utility";
import { ListOrdered } from 'lucide-react'
import Link from 'next/link'
const Header = async () => {
    const user = await currentUser()
    const { userId } = await auth();
    const categories = await getCategory();
    let orders = null;
    if (userId) {
      orders = await getMyOrders(userId);
    }
    return (
        <header className='bg-white border-b border-gray-400 py-5 px-4'>
            <Container className='flex justify-between items-center gap-7 text-lightColor'>
                <HeaderMenu categories={categories}/>
                <div className='w-auto md:w-1/3 flex items-center justify-center gap-2.5' >
                    <MobileMenu />
                    <Logo className=''>
                        Apni Dukan
                    </Logo>
                </div>
                <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
                    <SearchBar />
                    <CartIcon />
                    <ClerkLoaded>
                        <SignedIn>
                            <Link href={'/orders'} className='group relative '>
                                <ListOrdered className='w-5 h-4 group-hover:text-darkColor hoverEffect' />
                                <span className='absolute -top-1 -right-1 bg-darkColor text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center'>{orders?.length ? orders?.length : 0}</span>
                            </Link>
                            <UserButton />
                        </SignedIn>
                        {
                            !user && 
                            <SignInButton mode='modal'>
                                <div>
                                    <button className='text-sm font-semibold hover:text-darkColor hoverEffect'>Login</button>
                                </div>
                            </SignInButton>
                        }
                    </ClerkLoaded>
                </div>
            </Container>
        </header>
    )
}

export default Header
