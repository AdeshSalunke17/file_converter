import Options from "../components/Options";
import FileContainer from "../components/FileContainer";
import Header from "../components/Header";
import Main from '../components/Main';
import { getDictionary } from './dictionaries';
import ReduxProviderWrapper from '../components/ReduxProviderWrapper';
export default async function Home({ params }) {
  const { lang } = await Promise.resolve(params);
  const t = await getDictionary(lang);
  return (
    <ReduxProviderWrapper>
    <div className="bg-cover bg-center bg-[url('/public/night-sky-background-with-nebula.jpg')] min-h-screen text-white">
      <Header/>
      {/* Main Section */}
      <main className="flex flex-col items-center justify-center text-center mt-20 space-y-4 px-6 rounded-lg">
        <Main t={t}/>
      </main>
      <div className="flex flex-col items-center justify-center text-center mt-10">
        <Options/>
        <FileContainer/>
      </div>
    </div>
    </ReduxProviderWrapper>
  );
}
