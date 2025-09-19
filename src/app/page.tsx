"use client"
import Image from "next/image";
import MainContent from "./components/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAboutItems, getCertificateItems, getMenuItems } from "./redux/WebprojectsSlice";
import type { AppDispatch, RootState } from "./redux/store";
import LanguageSelect from "./components/LanguageSelect";
import gsap from "gsap";


export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const {language} = useSelector((store: RootState) => store.WebProjects)
  
  useEffect(() => {
      dispatch(getMenuItems(localStorage.getItem("lang") || "eng"))
      dispatch(getCertificateItems(localStorage.getItem("lang") || "eng"))
      dispatch(getAboutItems(localStorage.getItem("lang") || "eng"))

  }, [dispatch, language])

  return (
    <div className="flex w-screen h-screen lg:py-[40px] lg:px-[160px] justify-center text-white overflow-x-hidden">
      <div className="container">
        <div className="fixed top-1/3 left-3 z-20">
          <LanguageSelect/>
        </div>
       <MainContent/>
      </div>
    </div>
  );
}
