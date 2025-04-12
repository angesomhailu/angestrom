'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useState,useEffect} from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react';
const Nav = () => {
  
    const isUserLoggedIn=true;
    const [providers,setProviders]=useState(null);
    const [toggleDropdown,setToggleDropdown]=useState(false);
    useEffect(()=>{
        const setProviders=async()=>{
          const response=await getProviders();
          setProviders(response);
        }
        setProviders();
    },[]);
  return (
   <nav className='flex-between w-full mb-16 pt-3'>
     <Link href="/" className='flex gap-2 flex-center'>
     <Image
      src="/assets/images/logo.svg" alt="angestrom" className='object-contain' width={30} height={30}
     />
     <p className='logo_text'>Angestrom</p>
     </Link>
     <div  className='sm:flex hidden'>
        {
            isUserLoggedIn ?(<div className='flex gap-3 md:gap-5'>
              <Link href="/Dashboard" className='black_btn'>Dashboard</Link>
              <button className='outline_btn' type='button' onClick={signOut}>SignOut</button>
              <Link href="/components/Profile" className=''>
              <Image className='rounded-full' src="/assets/images/logo.svg" alt='profile logo' width={37} height={37}/> 
              </Link>
            </div>):
            (<>{providers && Object.values(providers).map((provider)=>(
              <button type='button' key={provider.name} className='black_btn' onClick={()=>signIn(provider.id)}>Sign In</button>
            ))}</>)
        }
     </div>
     <div className='sm:hidden flex relative'>
      {
        isUserLoggedIn ?(
        <div className='flex'>
          <Image
          src='/assets/icons/menu.svg'
            alt='profile logo'
            width={37}
            height={37}
            className='object-contain'
            onClick={()=>setToggleDropdown((prev)=>!prev)}
          />
          {toggleDropdown && (
            <div className='dropdown'>
              <Link href='/Profile' className='dropdown_link' onClick={()=>setToggleDropdown(false)}>
              Profile
              </Link>
              <Link href='/Dashboard' className='dropdown_link' onClick={()=>setToggleDropdown(false)}>
              Dashboard
              </Link>
              <button className='mt-5 w-full black_btn' type='button'
               onClick={()=>{setToggleDropdown(false);signIn();}}>
                SignIn</button>
            </div>
          )}
        </div>
        ):(<>{providers && Object.values(providers).map((provider)=>(
          <button type='button' key={provider.name} className='black_btn' onClick={()=>signIn(provider.id)}>Sign In</button>
        ))}</>)
      }
     </div>


   </nav>
  );
}
export default Nav;
