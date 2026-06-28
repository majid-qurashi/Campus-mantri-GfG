import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Footer } from './components/footer';
import { Home } from './pages/home';
import { About } from './pages/about';
import { CampusMantri } from './pages/campus-mantri';
import { Achievements } from './pages/achievements';
import { Workshops } from './pages/workshops';
import { Gallery } from './pages/gallery';
import { Projects } from './pages/projects';
import { Contact } from './pages/contact';
import { Refresh } from './pages/refresh';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/campus-mantri" element={<CampusMantri />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/refresh" element={<Refresh />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

