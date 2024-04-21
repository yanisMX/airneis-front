import Link from "next/link";

const PresentationPage = () => {
    return (
        <div className="content-below-navbar min-h-screen flex flex-row justify-around" >

        <section className="card w-96 h-80 hover:bg-logo-color hover:text-white text-danger-content">
        <div className="card-body">
            <h2 className="card-title">Kenny Tsu Yen <span><Link href="https://www.linkedin.com/in/yutsuenkenny/"><i className="fa-brands fa-linkedin text-2xl"/></Link></span></h2>
            <p className="text-white">J&apos;ai développé le back-end avec NestJs <br/>NestJS est un framework backend pour Node.js qui utilise TypeScript par défaut </p>
            <p className="text-2xl text-white">Pourquoi ce choix ?</p>
        </div>
        </section>  

        <section className="card w-96 h-80 hover:bg-logo-color hover:text-white text-danger-content">
        <div className="card-body">
            <h2 className="card-title">Florian Pescot Jourdan <span><Link href="https://www.linkedin.com/in/florian-pescot-1850b0239/"><i className="fa-brands fa-linkedin text-2xl"/></Link></span></h2>
        </div>
        </section> 
        
        <section className="card w-96 h-80 hover:bg-logo-color hover:text-white text-danger-content">
        <div className="card-body">
            <h2 className="card-title">Yanis Mohamed<span><Link href="https://www.linkedin.com/in/yanis-mohamed-27b2091a9/"><i className="fa-brands fa-linkedin text-2xl"/></Link></span></h2>
        </div>
        </section> 




        </div>
    );
    }
export default PresentationPage;