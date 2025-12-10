import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  Stethoscope,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Button } from './components/Button';
import { InfoCard } from './components/InfoCard';
import { Reviews } from './components/Reviews';
import { CookieBanner } from './components/CookieBanner';
import { Review, OpeningHour, Insurance } from './types';

// Data Constants
const OPENING_HOURS: OpeningHour[] = [
  { day: 'Montag', morning: '07:45 – 11:45', afternoon: '14:00 – 16:00' },
  { day: 'Dienstag', morning: '07:45 – 11:45' },
  { day: 'Mittwoch', morning: '07:45 – 11:45' },
  { day: 'Donnerstag', afternoon: '15:00 – 19:00' },
  { day: 'Freitag', morning: '07:45 – 11:45' },
];

const INSURANCES: Insurance[] = [
  { abbr: 'ÖGK', fullName: 'Österreichische Gesundheitskasse' },
  { abbr: 'BVAEB', fullName: 'Versicherungsanstalt öffentlich Bediensteter, Eisenbahnen und Bergbau' },
  { abbr: 'KFAG', fullName: 'Krankenfürsorgeanstalt für Bedienstete der Stadt Graz' },
  { abbr: 'SVS', fullName: 'Sozialversicherungsanstalt für Selbständige' },
  { abbr: 'KFAW', fullName: 'Krankenfürsorgeanstalt für Bedienstete der Gemeinde Wien' },
];

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'DocFinder Nutzer',
    date: 'vor 10 Monaten',
    rating: 5.0,
    title: 'Netter, kompetenter Arzt mit Herz',
    text: 'Herr Dr. Amman ist super nett und sehr kompetent. Wir sind seit vielen Jahren bei ihm und waren immer sehr zufrieden. Er nimmt sich immer Zeit, auch wenn das Wartezimmer voll ist.'
  },
  {
    id: '2',
    author: 'DocFinder Nutzer',
    date: 'vor 4 Jahren',
    rating: 5.0,
    title: 'Toller Arzt',
    text: 'Nimmt sich Zeit, Top Betreuung und das bei einem Kassenarzt. Vielen Dank!!'
  },
  {
    id: '3',
    author: 'DocFinder Nutzer',
    date: 'vor 3 Jahren',
    rating: 5.0,
    title: 'Mehr geht nicht',
    text: 'Hier fühle ich mich besser aufgehoben als bei manchem Spezialisten. Ein sehr nettes Team.'
  },
];

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initialize Lucide icons
    // @ts-ignore
    if (window.lucide) window.lucide.createIcons();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-medical-900 rounded-lg flex items-center justify-center text-white">
              <Stethoscope size={20} />
            </div>
            <div>
              <h1 className={`font-display font-bold text-lg leading-tight ${scrolled || isMobileMenuOpen ? 'text-slate-900' : 'text-slate-900 lg:text-slate-900'}`}>
                Dr. Klemens Ammann
              </h1>
              <p className={`text-xs font-medium tracking-wide uppercase ${scrolled || isMobileMenuOpen ? 'text-medical-700' : 'text-medical-800 lg:text-medical-800'}`}>
                Allgemeinmedizin Graz
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-medical-700 transition-colors">Start</button>
            <button onClick={() => scrollToSection('ordination')} className="text-sm font-medium hover:text-medical-700 transition-colors">Ordination</button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-medical-700 transition-colors">Leistungen</button>
            <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-medical-700 transition-colors">Bewertungen</button>
            <Button size="sm" onClick={() => scrollToSection('contact')}>
              Kontakt
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-4 shadow-lg md:hidden flex flex-col gap-4 animate-fade-in">
            <button onClick={() => scrollToSection('home')} className="text-left px-4 py-2 hover:bg-slate-50 rounded-lg">Start</button>
            <button onClick={() => scrollToSection('ordination')} className="text-left px-4 py-2 hover:bg-slate-50 rounded-lg">Ordination</button>
            <button onClick={() => scrollToSection('services')} className="text-left px-4 py-2 hover:bg-slate-50 rounded-lg">Leistungen</button>
            <button onClick={() => scrollToSection('reviews')} className="text-left px-4 py-2 hover:bg-slate-50 rounded-lg">Bewertungen</button>
            <Button fullWidth onClick={() => scrollToSection('contact')}>
              Kontakt aufnehmen
            </Button>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-[50%] h-full bg-medical-50/50 -z-10 rounded-l-[4rem] hidden lg:block" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-100 text-medical-800 text-sm font-medium animate-fade-in-up">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-medical-500"></span>
                  </span>
                  Jetzt Termine vereinbaren
                </div>
                
                <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] animate-fade-in-up delay-100">
                  Kompetente Medizin <br/> 
                  <span className="text-medical-800">mit Herz in Graz.</span>
                </h1>
                
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg animate-fade-in-up delay-200">
                  Willkommen in der Ordination Dr. Klemens Ammann. Als Arzt für Allgemeinmedizin in Graz-Geidorf biete ich Ihnen umfassende Betreuung und nehme mir Zeit für Ihre Gesundheit.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                  <Button size="lg" onClick={() => window.location.href = 'tel:+43316672414'}>
                    <Phone className="w-5 h-5 mr-2" />
                    +43 (316) 672414
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection('ordination')}>
                    Öffnungszeiten
                  </Button>
                </div>

                <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-8 text-slate-500 animate-fade-in-up delay-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-medical-600" size={20} />
                    <span className="text-sm font-medium">Alle Kassen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="text-medical-600" size={20} />
                    <span className="text-sm font-medium">Manuelle Medizin</span>
                  </div>
                </div>
              </div>

              {/* Info Grid - Bento Box Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up delay-200">
                <div className="bg-medical-900 text-white p-6 md:p-8 rounded-3xl sm:col-span-2 shadow-xl shadow-medical-900/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="text-medical-200" />
                    <h3 className="font-display text-xl font-bold">Ordinationszeiten</h3>
                  </div>
                  <div className="space-y-3 font-medium text-medical-50">
                    {OPENING_HOURS.map((hour) => (
                      <div key={hour.day} className="flex justify-between items-start border-b border-medical-800/50 last:border-0 pb-2 last:pb-0">
                        <span className="w-24 shrink-0">{hour.day}</span>
                        <div className="text-right">
                          {hour.isClosed ? (
                            <span className="text-medical-300">Geschlossen</span>
                          ) : (
                            <>
                              {hour.morning && <span className="block">{hour.morning}</span>}
                              {hour.afternoon && <span className="block">{hour.afternoon}</span>}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 text-sm text-medical-200 italic">
                      Und nach telefonischer Vereinbarung
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => window.open('https://maps.google.com/?q=Carnerigasse+38,+8010+Graz', '_blank')}>
                  <div className="w-10 h-10 bg-medical-50 text-medical-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 mb-1">Anfahrt</h3>
                  <p className="text-slate-600 text-sm">Carnerigasse 38<br/>8010 Graz - Geidorf</p>
                </div>

                <div className="bg-medical-50 p-6 rounded-3xl border border-medical-100 hover:border-medical-200 transition-colors group cursor-pointer" onClick={() => window.location.href = 'tel:+43316672414'}>
                  <div className="w-10 h-10 bg-white text-medical-700 rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 mb-1">Notfall?</h3>
                  <p className="text-slate-600 text-sm">Rufen Sie uns direkt an:<br/>+43 (316) 672414</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services & Diplomas */}
        <section id="services" className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Insurances */}
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <ShieldCheck className="text-medical-600" />
                  Kassenverträge
                </h2>
                <div className="space-y-4">
                  {INSURANCES.map((ins) => (
                    <div key={ins.abbr} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-300">
                      <div className="w-12 h-12 bg-medical-100 text-medical-800 rounded-lg flex items-center justify-center font-bold shrink-0 text-sm">
                        {ins.abbr}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{ins.abbr}</h4>
                        <p className="text-sm text-slate-600">{ins.fullName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diplomas & Expertise */}
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <Award className="text-medical-600" />
                  Qualifikationen
                </h2>
                <div className="bg-medical-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden mb-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-medical-800 rounded-bl-full opacity-50" />
                  <h3 className="font-display text-xl font-bold mb-6 relative z-10">ÖÄK-Diplome</h3>
                  <ul className="space-y-4 relative z-10">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-medical-300" />
                      <span className="font-medium text-lg">ÖÄK-Diplom-Fortbildung</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-medical-300" />
                      <span className="font-medium text-lg">ÖÄK-Diplom Manuelle Medizin</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Warum Manuelle Medizin?</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Die Manuelle Medizin befasst sich mit der Diagnostik und Therapie von Funktionsstörungen am Haltungs- und Bewegungsapparat. Als Allgemeinmediziner mit diesem Zusatzdiplom kann ich Schmerzursachen gezielt behandeln.
                  </p>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="inline-flex items-center text-medical-700 font-semibold hover:gap-2 transition-all">
                    Termin vereinbaren <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <div id="reviews">
          <Reviews reviews={REVIEWS} />
        </div>

        {/* Contact & Map Section */}
        <section id="contact" className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="p-8 md:p-12 lg:p-16 md:w-1/2 flex flex-col justify-center bg-slate-900 text-white relative">
                <div className="relative z-10">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Wir sind für Sie da.</h2>
                  <p className="text-slate-400 text-lg mb-8 max-w-md">
                    Vereinbaren Sie Ihren Termin telefonisch oder kommen Sie während unserer Ordinationszeiten vorbei.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                        <MapPin className="text-medical-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Adresse</h4>
                        <p className="text-slate-400">Carnerigasse 38<br/>8010 Graz - Geidorf</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                        <Phone className="text-medical-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Kontakt</h4>
                        <p className="text-slate-400">
                          Tel: <a href="tel:+43316672414" className="hover:text-white transition-colors">+43 (316) 672414</a><br/>
                          Fax: +43 (316) 6724144
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-medical-900 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-900 rounded-full blur-3xl opacity-20"></div>
              </div>
              
              <div className="md:w-1/2 bg-slate-800 min-h-[300px] md:min-h-full relative">
                 {/* Simulated Map */}
                 <iframe 
                  width="100%" 
                  height="100%" 
                  style={{border:0, minHeight: '400px'}} 
                  loading="lazy" 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade" 
                  title="Ordination Location"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.146522866442!2d15.441!3d47.085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476e358eb23f0a0d%3A0x123456789!2sCarnerigasse%2038%2C%208010%20Graz!5e0!3m2!1sde!2sat!4v1600000000000!5m2!1sde!2sat`}
                 ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12 text-sm text-slate-500">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-slate-900 text-lg mb-4">Dr. Klemens Ammann</h4>
              <p>Ihr verlässlicher Partner für Allgemeinmedizin in Graz.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Rechtliches</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-medical-800">Impressum</a></li>
                <li><a href="#" className="hover:text-medical-800">Datenschutzerklärung</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Notrufnummern</h4>
              <ul className="space-y-2">
                <li className="flex justify-between max-w-[150px]"><span>Rettung:</span> <span className="font-bold text-slate-900">144</span></li>
                <li className="flex justify-between max-w-[150px]"><span>Ärztenotdienst:</span> <span className="font-bold text-slate-900">141</span></li>
                <li className="flex justify-between max-w-[150px]"><span>Euro-Notruf:</span> <span className="font-bold text-slate-900">112</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 text-center">
            &copy; {new Date().getFullYear()} Dr. Klemens Ammann. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
      
      <CookieBanner />
    </div>
  );
};

export default App;