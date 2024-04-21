import Link from "next/link";

const PresentationPage = () => {
    return (
        <div className="content-below-navbar min-h-screen flex flex-row justify-around" >

        <section className="card w-96 h-80 hover:bg-logo-color hover:text-white text-danger-content">
        <div className="card-body">
            <h2 className="card-title">Kenny Yu Tsuen <span><Link href="https://www.linkedin.com/in/yutsuenkenny/" target="_blank"><i className="fa-brands fa-linkedin text-2xl"/></Link></span></h2>
            <p className="text-white">J&apos;ai développé le back-end avec NestJs <br/>NestJS est un framework backend pour Node.js qui utilise TypeScript par défaut </p>
            <p className="text-2xl text-white">Qui es-tu ?</p>
            <p className="text-2xl text-white">Huit.</p>
            <p className="text-2xl text-white"></p>
        </div>
        </section>  

        <section className="card w-96 h-80 hover:bg-logo-color hover:text-white text-danger-content">
        <div className="card-body">
            <h2 className="card-title">Florian Pescot Jourdan <span><Link href="https://www.linkedin.com/in/florian-pescot-1850b0239/" target="_blank"><i className="fa-brands fa-linkedin text-2xl"/></Link></span></h2>
            <p className="text-white">J&apos;ai développé le back-end avec NestJs <br/>NestJS est un framework backend pour Node.js qui utilise TypeScript par défaut </p>
            <p className="text-2xl text-white">Qui es-tu ?</p>
            <p className="text-2xl text-white">Huit.</p>
            <p className="text-2xl text-white"></p>
        </div>
        </section> 
        
        <section className="card w-96 h-auto hover:bg-logo-color hover:text-white text-danger-content">
        <div className="card-body">
            <h2 className="card-title">Yanis Mohamed<span><Link href="https://www.linkedin.com/in/yanis-mohamed-27b2091a9/" target="_blank"><i className="fa-brands fa-linkedin text-2xl"/></Link></span></h2>
            <p className="text-white">J&apos;ai développé le front-end avec NextJs <br/>NextJS est un framework front-end de React, les routes sont plus modulables et simples à définir, TailwindCSS est déjà importé donc c&apos;est un temps précieux de gagner pour se concentrer à l&apos;essentiel </p>
            <p className="text-2xl text-white">Qui es-tu ?</p>
            <p className="text-2xl text-white">Huit.</p>
            <p className="text-2xl text-white"></p>
        </div>
        </section> 




        </div>
    );
    }
export default PresentationPage;