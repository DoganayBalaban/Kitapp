import { Book, MoveRight } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BookLogo from "../assets/images/logo1nonbg.svg";

const Landing = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Takip et", "Keşfet", "Arşivle", "Paylaş"], []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [titleNumber, titles]);

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Book size={48} />
        </div>
        <h1 className="text-6xl font-bold relative">
          Okuduğun Kitapları{"  "}
          <span className="space-x-2">
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute font-bold text-primary ml-2"
                initial={{ opacity: 0, y: "-100" }}
                transition={{ type: "spring", stiffness: 50 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
          <p>Yeni Keşifler Yap!</p>
        </h1>
        <p className="text-2xl m-10">
          Okuma alışkanlığını düzenle, kitaplarını arşivle ve yeni öneriler
          keşfet.
        </p>
        <div className="p-3 mt-4 flex items-center justify-center">
          <Link to="/login">
            <button className="text-2xl border rounded-2xl m-3 p-3 group hover:bg-black transition duration-500">
              <p className="group-hover:text-white transition duration-500">
                Giriş yap
              </p>
            </button>
          </Link>
          <Link to="/register">
            {" "}
            <button className="items-center justify-center text-2xl flex border rounded-2xl m-3 p-3 group hover:bg-black transition duration-500">
              <p className="group-hover:text-white transition duration-500">
                Kayıt ol
              </p>
              <MoveRight
                className="group-hover:text-white transition duration-500 ml-2"
                size={24}
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
