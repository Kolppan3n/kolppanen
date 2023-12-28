import {cn} from '@/utils';
import React from 'react'
import {BiHistory, BiUser} from 'react-icons/bi'

type Status = "offline" | "online" | "loading" | "unknown"

type Server = {
    id: number,
    name: string;
    imgpath: string;
    version: string;
    status: Status;
    runtime: number;
    playercount: number;
}

//Tähän tulee fetch joskus
const servers: Server[] = [
   {id: 0, name: "Minecraft (Vanilla)", imgpath: "img/logo_minecraft.png", version: "1.20", status: "offline", runtime: 0, playercount: 5},
   {id: 1, name: "Valheim (Vanilla)", imgpath: "img/logo_valheim_1.png", version: "0.217.14", status: "online", runtime: 0, playercount: 3},
   {id: 2, name: "Valheim (Modded)", imgpath: "img/logo_valheim_2.png", version: "0.217", status: "unknown", runtime: 0, playercount: 0},
   {id: 3, name: "Stardew Valley", imgpath: "img/logo_stardewvalley.png", version: "1.5.6", status: "loading", runtime: 0, playercount: 2}
]

const statusColors = {
    offline: "bg-status-offline",
    online: "bg-status-online",
    loading: "bg-status-loading",
    unknown: "bg-status-unknown"
}

const StatusBlip = (props: {status: Status}) => {
    const statusColor = statusColors[props.status]

    return (
        <div className={`h-6 w-6 shadow-md shadow-stone-800 rounded-[100%] ${statusColor}`}/>
    )
}

export default function ServerList() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 -m-4'>
            {servers.map((server) => {
                return(
                <div key={server.id} className='rounded-xl overflow-hidden shadow-lg shadow-stone-800 relative m-4'>
                    <div className="absolute w-full h-full opacity-70 bg-gradient-radial from-transparent to-stone-black"/>
                    <img src={server.imgpath} alt="" className='w-full h-60 object-cover'/>
                    <div className='absolute top-0  m-3'>
                        <span className='block font-bold uppercase text-2xl'>{server.name}</span>
                        <span className='ms-1 text-stone-gray'>{`V.${server.version}`}</span>
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
                        <StatusBlip status={server.status}/>
                    </div>
                </div>
            )})}
        </div>
    )
}