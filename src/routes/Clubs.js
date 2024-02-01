import ClubSearch from "../components/ClubSearch";

export default function Home() {
  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-[1.4] mb-5">
        Browse clubs
      </h2>
      <ClubSearch />
    </>
  );
}
