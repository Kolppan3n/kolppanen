import ServerList from "./components/ServerList"
import NewsFeed from "./components/NewsFeed"

export default function Home() {
  return (
    <main className="px-16 py-6 bg-stone-600 flex flex-col items-center">
      <article className="mb-10 max-w-6xl bg-indigo-700">
        <h1 className="text-center text-header">Ketä tämä on?</h1>
      <p className="text-center text-lg">Olen tehnyt vanhasta pöytätietokoneestani palvelimen, jota käytetään erilaisten videopelien, nettisivujen, sekä kaikenlaisen muun isännöimiseen. Toistaiseksi näitä palvelimia ei ole vielä avattu julkiselle puolelle, vaan minuun suoraan tai ystävieni kautta yheyttä ottamalla annan tarkemmat tiedot servereiden osoitteista ja salasanoista.</p>
      </article>
      <article className="mb-10 max-w-6xl bg-red-700">
        <h1 className="text-center text-header">Palvelimet</h1>
        <ServerList/>
      </article>
      <article className="mb-10 max-w-6xl bg-fuchsia-700">
        <h1 className="text-center text-header">Uutiset</h1>
        <NewsFeed/>
      </article>
    </main>
    )
}
