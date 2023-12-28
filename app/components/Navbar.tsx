import Link from "next/link";

export default function Navbar(){

    const links = [
        {href:"/", name:"Koti"},
        {href:"/", name:"Palvelimet"},
        {href:"/", name:"Ilmoitukset"},
        {href:"/", name:"Pelaajat"},
        {href:"/", name:"Muuta"},
        {href:"/", name:"Yhteystiedot"}
    ]

    return (
        <nav className={"lg:flex justify-center p-4 bg-gradient-to-t from-transparent via-background-dark to-background-dark"}>
            <h1 className="text-center text-3xl mx-4">KOLPPANEN.COM</h1>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-2 lg:mt-0">
                {links.map(link => 
                    <Link key={link.name} href={link.href} className="hover:text-stone-white text-xl my-1 sm:mx-4 sm:my-0">{link.name}</Link>
                    )}
            </div>
        </nav>
    )
}