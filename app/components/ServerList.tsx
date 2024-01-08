import React from 'react'
import {BiHistory, BiUser} from 'react-icons/bi'

type Status = 'offline' | 'online' | 'loading' | 'unknown'

type Server = {
    id: any,
    name: any;
    imgpath: any;
    version: any;
    status: Status;
    runtime: any;
    playercount: any;
}

const statusColors = {
    offline: 'bg-status-offline',
    online: 'bg-status-online',
    loading: 'bg-status-loading',
    unknown: 'bg-status-unknown'
}

async function getServers(){

    const servers: Server [] = []
    
    //Haetaan kaikkien servujen yleistiedot
    const response1 = await fetch(`https://panel.kolppanen.com/api/client`, {
        next: {revalidate: 0},
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY_PTERODACTYL}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    const {data:serverData1} = await response1.json()
    
    //Luodaan haut aiemmin saatujen palvelimien tunnisteiden perusteella
    const serverPromises = serverData1.map(async (server: any) => {
        const id = server.attributes.identifier
        const response = await fetch(`https://panel.kolppanen.com/api/client/servers/${id}/resources`, {
            next: {revalidate: 0},
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY_PTERODACTYL}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        return data
    })

    //suoritetaan haut, jotka palauttavat listan palvelimien muista tiedoista
    const serverData2 = await Promise.all(serverPromises)

    console.log(serverData1)
    console.log(serverData2)

    return servers
}


export default async function ServerList() {

    const servers: Server[] = await getServers()

    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 -m-4'>
                {servers.map((server) => {
                    return(
                    <div key={server.id} className='rounded-xl overflow-hidden shadow-lg shadow-stone-black relative m-4'>
                        <div className='absolute w-full h-full opacity-70 bg-gradient-radial from-transparent to-stone-black'/>
                        <img src={server.imgpath} alt='' className='w-full h-60 object-cover'/>
                        <div className='absolute top-0  m-3'>
                            <span className='block font-bold uppercase text-2xl'>{server.name}</span>
                            <span className='ms-1 text-stone-gray'>{server.version}</span>
                        </div>
                        <div className='absolute bottom-0 w-[100%] flex items-center justify-between p-3'>
                            <div className='flex'>
                                <div className='flex m-0 p-0 items-center me-6'>
                                    <BiUser size={25}/>
                                    <span className='ms-1 text-xl'>{server.playercount}</span>
                                </div>
                                <div className='flex items-center'>
                                    <BiHistory size={25}/>
                                    <span className='ms-1 text-xl'>{server.runtime}</span>
                                </div>
                            </div>
                            <div className={`h-6 w-6 shadow-md shadow-stone-800 rounded-full ${statusColors[server.status]}`}/>
                        </div>
                    </div>
                )})}
            </div>
            
            {servers.length === 0 && (
                <p className='text-xl text-center mt-6'>Yhtäkään palvelinta ei löydetty. Parempi tuuri ensi kerralla.</p>
            )}
        </>
    )
}