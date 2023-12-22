import { cn } from '@/utils';
import React from 'react'
import {BiHistory, BiUser} from 'react-icons/bi'

type Status = "offline" | "online" | "loading" | "unknown"

type Server = {
    name: string;
    imgpath: string;
    version: string;
    status: Status;
    runtime: number;
    playercount: number;
}
  
//Tähän tulee fetch joskus
const servers: Server[] = [
   {name: "Minecraft (Vanilla)", imgpath: "img/logo_minecraft.png", version: "1.20", status: "offline", runtime: 0, playercount: 5},
   {name: "Valheim (Vanilla)", imgpath: "img/logo_valheim_1.png", version: "0.217.14", status: "online", runtime: 0, playercount: 3},
   {name: "Valheim (Modded)", imgpath: "img/logo_valheim_2.png", version: "0.217", status: "unknown", runtime: 0, playercount: 0},
   {name: "Stardew Valley", imgpath: "img/logo_stardewvalley.png", version: "1.5.6", status: "loading", runtime: 0, playercount: 2}
]

export default function ServerList() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 -m-4'>
            {/*<div className="bg-status-offline bg-status-online bg-status-loading bg-status-unknown"/>*/}
            {servers.map((server) => {
                console.log(server.status)
                return(
                <div className='rounded-xl overflow-hidden shadow-lg shadow-stone-800 relative m-4'>
                    <div className='absolute w-full h-full opacity-70 bg-gradient-radial from-transparent to-neutral-950'/>
                    <img src={server.imgpath} alt="" className='w-full h-60 object-cover'/>
                    <div className='absolute top-0  m-3'>
                        <span className='block font-bold uppercase text-2xl'>{server.name}</span>
                        <span className='ms-1 text-stone-200'>{`V.${server.version}`}</span>
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
                        <div className={`h-6 w-6 shadow-md shadow-stone-800 rounded-[100%] bg-status-${server.status}`}/>
                    </div>
                </div>
            )})}
        </div>
    )
}


{/*Vanha kortti

            {servers.map((server) => {
                console.log(server.status)
                return(
                <div className='rounded-xl overflow-hidden shadow-lg shadow-stone-800 relative m-4'>
                    <img src={server.imgpath} alt="" className='w-full h-60 object-cover'/>
                    <div className='absolute top-0  m-3'>
                        <span className='block font-bold text-shadow uppercase text-2xl'>{server.name}</span>
                        <span className='ms-1 text-stone-200 text-shadow'>{`V.${server.version}`}</span>
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
                        <div className={`h-6 w-6 shadow-md shadow-stone-800 rounded-[100%] bg-${server.status}`}/>
                    </div>
                </div>
            )})}
            
*/}