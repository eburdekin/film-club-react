import FilmSearch from "./FilmSearch";
import FilmList from "./FilmList";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        Browse films
      </h1>
      {/* <p className="text-2xl text-gray-700 dark:text-gray-300">Films here.</p> */}
      <FilmSearch />
      <FilmList />
    </>
  );
}
