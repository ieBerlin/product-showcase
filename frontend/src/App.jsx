import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";


function App() {
  return (
    <main className='app bg-white from-gray-100 to-gray-200 flex flex-col'>
      {/* Header Section */}
     <Header/>
      <Content/>
     <Footer/>

    </main>
  );
}

export default App;