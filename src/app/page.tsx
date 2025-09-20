"use client"
import Image from "next/image";
import MainContent from "./components/MainContent";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAboutItems, getCertificateItems, getMenuItems } from "./redux/WebprojectsSlice";
import type { AppDispatch } from "./redux/store";
import LanguageSelect from "./components/LanguageSelect";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const langFromUrl = searchParams.get("lang")?.toLowerCase();
    const lang = langFromUrl || localStorage.getItem("lang") || "eng";

    localStorage.setItem("lang", lang);
    dispatch(getMenuItems(lang));
    dispatch(getCertificateItems(lang));
    dispatch(getAboutItems(lang));
  }, [dispatch, searchParams]);

  return (
    <div className="flex w-screen h-screen lg:py-[40px] lg:px-[160px] justify-center text-white overflow-x-hidden">
      <div className="container">
        <div className="fixed top-1/3 left-3 z-20">
          <LanguageSelect />
        </div>
        <MainContent />
      </div>
    </div>
  );
}
