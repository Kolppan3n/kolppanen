import React from 'react'

type Update = {
    id: number
    paragraphs: string[]
    avatarpath: string
    authorname: string
    date: string
}

const updates: Update[] = [
    {
        id: 0,
        paragraphs: ["Maailman merissä tapahtuu kiehtovaa kehitystä, kun simpukat ovat alkaneet vallata uusia elinympäristöjä. Viimeisimmät tutkimukset osoittavat, että eräät simpukkalajit ovat aloittaneet ainutlaatuisen siirtymän vesistöistä maalle, mikä herättää kiinnostusta tutkijoiden keskuudessa."],
        avatarpath: "img/avatar_duck.png", 
        authorname: "Kolppan3n", 
        date: "22-12-2023 9:30:200"
    },
    {
        id: 1,
        paragraphs: ["Viimeaikaiset tutkimukset ovat paljastaneet jännittäviä havaintoja uudesta papulajista, joka herättää laajaa kiinnostusta biologien keskuudessa. Tämä löytö on merkittävä paitsi sen harvinaisuuden vuoksi myös siksi, että se avaa ikkunan uudenlaiseen ymmärrykseen papujen monimuotoisuudesta ja ekologiasta. Uusi laji eroaa perinteisistä papulajeista niin morfologiansa kuin geneettisen koostumuksensakin osalta, herättäen kysymyksiä sen alkuperästä ja sopeutumiskyvystä erilaisiin ympäristöihin. Tutkijat ympäri maailmaa innostuvat syvemmistä tutkimuksista tämän uuden papulajin ympärillä, toivoen löytävänsä vastauksia, jotka valaisevat paitsi tämän lajin ainutlaatuisuutta myös sen potentiaalista vaikutusta laajempaan ekosysteemiin."],
        avatarpath: "img/avatar_duck.png", 
        authorname: "Kolppan3n", 
        date: "22-12-2023 9:30:200"
    },
    {
        id: 2,
        paragraphs: ["Viimeaikaiset tutkimukset ovat paljastaneet hälyttäviä löytöjä perinteisessä suomalaisessa herkussa, mämmi. Laboratorioanalyysit ovat osoittaneet, että useista mämmieristä on löytynyt vaarallisia aineita, jotka aiheuttavat terveysriskejä kuluttajille. Tämä löydös on johtanut kiireellisiin toimenpiteisiin, ja viranomaiset ovat päättäneet poistaa mämmiä kaupoista, kunnes tilanne saadaan täysin selvitettyä.", " Tämä äkillinen päätös on herättänyt laajaa huolta ja keskustelua niin kuluttajien kuin valmistajienkin keskuudessa. Mämmi, perinteinen pääsiäisherkku ja suomalaisen kulttuurin ikoni, on nyt keskiössä odottamattoman ja vakavan terveysriskin vuoksi. Asiantuntijat ovat aloittaneet intensiiviset tutkimukset selvittääkseen, miten nämä vaaralliset aineet ovat päätyneet mämmiin ja mitä seurauksia niillä voi olla ihmisten terveydelle. Samalla keskustellaan mahdollisista uusista turvallisuustoimenpiteistä ja valvontamenettelyistä, jotta vastaavilta riskeiltä voitaisiin jatkossa välttyä."],
        avatarpath: "img/avatar_duck.png", 
        authorname: "Kolppan3n", 
        date: "22-12-2023 9:30:200"
    },
    {
        id: 3,
        paragraphs: ["Pelaajien maailmat järkkyvät, kun odottamaton tapahtuma ravistelee Mario- ja Sonic-universumeja. Mario, rakastettu putkimies, on raskaana ja odottaa lasta Sonicin kanssa. Tämä yllättävä käänteinen tapahtui sen jälkeen, kun kaksi ikonista hahmoa seikkailivat yhdessä."],
        avatarpath: "img/avatar_duck.png", 
        authorname: "Kolppan3n", 
        date: "22-12-2023 9:30:200"
    },
    {
        id: 4,
        paragraphs: ["Kaikkien Minecraft-pelaajien käyttäjätilit on järkyttävästi suljettu bannauksen myötä. Tämä odottamaton ja laaja bannaus on sysännyt koko peliyhteisön kaaokseen ja herättänyt valtavan huolen faneissa ympäri maailmaa."],
        avatarpath: "img/avatar_duck.png", 
        authorname: "Kolppan3n", 
        date: "22-12-2023 9:30:200"
    }
]

export default function NewsFeed() {
  return (
    <div className='overflow-y-auto max-h-xl'>
        {updates.map((update) => {
            return(
                <div key={update.id} className='mb-6'>
                    <div className='flex items-center mb-1'>
                        <img src={update.avatarpath} alt="" className='h-8 w-8 rounded-full me-2'/>
                        <p className='me-2 text-stone-light'>{update.authorname}</p>
                        <p className='text-[0.5rem] me-2 text-stone-dark'>•</p>
                        <p className='text-stone-dark'>{update.date}</p>
                    </div>
                    {update.paragraphs.map((paragraph) => {
                        return(
                            <p className='text-lg max-w-prose mb-2'>{paragraph}</p>
                        )
                    })}
                </div>
            )
        })}
    </div>
  )
}
