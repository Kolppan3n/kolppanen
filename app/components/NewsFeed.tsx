import React from 'react'

type Update = {
    content: string
    avatarpath: string
    authorname: string
    date: string
}

const updates: Update[] = [
    {
        content: "Maailman merissä tapahtuu kiehtovaa kehitystä, kun simpukat ovat alkaneet vallata uusia elinympäristöjä. Viimeisimmät tutkimukset osoittavat, että eräät simpukkalajit ovat aloittaneet ainutlaatuisen siirtymän vesistöistä maalle, mikä herättää kiinnostusta tutkijoiden keskuudessa.",
        avatarpath: "img/avatar_duck.png", 
        authorname: "Kolppan3n", 
        date: "22-12-2023 9:30:200"}
]

export default function NewsFeed() {
  return (
    <div>
        {updates.map((update) => {
            return(
                <div>
                    <div className='flex items-center'>
                        <img src={update.avatarpath} alt="" className='h-8 w-8 rounded-full'/>
                        <p className='ms-2'>{update.authorname}</p>
                        <p>{update.date}</p>
                    </div>
                    <p className='text-lg'>{update.content}</p>
                </div>
            )
        })}
    </div>
  )
}
