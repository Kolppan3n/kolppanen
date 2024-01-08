import React from 'react'
import {BiHistory, BiUser} from 'react-icons/bi'

type Status = 'offline' | 'running' | 'loading' | 'unknown'

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
    running: 'bg-status-running',
    loading: 'bg-status-loading',
    unknown: 'bg-status-unknown'
}

function formatToDHM(time: number){
    if(time <= 0)
        return '---'

    //converting ms to seconds
    time = time / 1000

    const day = 86400
    const hour = 3600
    const minute = 60

    const wholeDays = Math.floor(time / day)
    const wholeHours = Math.floor((time - wholeDays * day) / hour)
    const wholeMinutes = Math.floor((time - wholeDays * day - wholeHours * hour) /minute)

    const showDays = wholeDays > 0 ? `d${wholeDays} ` : ''
    const showHours = wholeHours > 0 ? `h${wholeHours} ` : wholeDays > 0 ? `h0 ` : ''
    const showMinutes = wholeMinutes > 0 ? `m${wholeMinutes}` : wholeHours > 0 ? `m0 ` : ''

    return showDays + showHours + showMinutes
}

async function getServers(){
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

    const resp = await fetch(`https://panel.kolppanen.com/api/application/nests/1/eggs/1`, {
        next: {revalidate: 0},
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY_PTERODACTYL}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })


    //Luodaan palautettavat serverit mappaamalla ensimmäinen lista ja lisätään toisesta lisätiedot indeksin avulla
    const servers: Server[] = serverData1.map((object: any, index: number): any => {
        const eggVariables = object.attributes.relationships.variables.data
        const bgPath = eggVariables.find((e: any) => e.attributes.name === 'Server Background Image')?.attributes.default_value

        const server: Server = {
            id: object.attributes.identifier,
            name: object.attributes.name,
            imgpath: bgPath ? bgPath : "img/avatar_weedcat.png",
            version: '---',
            status: serverData2[index].attributes.current_state,
            runtime: formatToDHM(serverData2[index].attributes.resources.uptime),
            playercount: '---',
        }

        console.log(server)
        return server
    })

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