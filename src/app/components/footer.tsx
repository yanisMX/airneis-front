import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <div className="container mx-auto">
        <footer className="footer p-10 text-base-content">
          <nav>
            <h6 className="footer-title">Catégories</h6>
            <a className="link link-hover">Meubles</a>
            <a className="link link-hover">Décorations</a>
            <a className="link link-hover">Luminaires</a>
            <a className="link link-hover">Textiles</a>
          </nav>
          <nav>
            <h6 className="footer-title">Entreprise</h6>
            <a className="link link-hover">À propos</a>
            <Link href="/contact" className="link link-hover">Contact</Link>
            <a className="link link-hover">Emplois</a>
            <a className="link link-hover">Presse</a>
          </nav>
          <nav>
            <h6 className="footer-title">Légal</h6>
            {/* A mettre CGV */}
            <Link href="/cgv" className="link link-hover">Conditions générales de vente</Link>
            <Link href="/mentionslegales" className="link link-hover">Mentions Légales</Link>
          </nav>
        </footer>
        <footer className="footer px-10 py-4 border-t text-base-content border-base-300">
          <aside className="items-center grid-flow-col">
            <Image src={"/supdevinci-logo.png"} alt={"Sup de Vinci"} width={50} height={50} className="me-2"/>
            <p>Un projet d&apos;études <a href="#" className="text-[#337EC0] hover:underline" target="_blank">Sup de Vinci</a>.<br/>
              École d&apos;informatique et centre de formation</p>
          </aside>
          <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4 text-xl">
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
            </div>
          </nav>
        </footer>
      </div>
    </div>

  );
}

export default Footer;