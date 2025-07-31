'use client'
import Welcome from "@/components/Welcome";
import Image from "next/image";
import { useSession} from "next-auth/react"
import Mainpage from "@/components/Mainpage";
import WorldInfo from "@/components/WorldInfo";
import Footer from "@/components/Footer";
export default function Home() {
  
  const { data: session } = useSession()
  if(session){
    return(
      <>
    <Mainpage/>
    <WorldInfo/>
    <Footer/>
    </>
  )
  }
  return (
    <>
    <Welcome/>
    
    </>
  );
}
