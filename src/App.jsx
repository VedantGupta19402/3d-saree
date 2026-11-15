// AARNA — Contemporary Indian Atelier
// Main Application Component

import GalleryExperience from './three/GalleryExperience'
import AtelierOpening from './components/AtelierOpening'
import AarnaNavbar from './components/AarnaNavbar'
import HeroSection from './components/HeroSection'
import CollectionSection from './components/CollectionSection'
import CraftSection from './components/CraftSection'
import SignatureSection from './components/SignatureSection'
import WomanSection from './components/WomanSection'
import AtelierSection from './components/AtelierSection'
import LookbookSection from './components/LookbookSection'
import FinalExperienceSection from './components/FinalExperienceSection'
import AarnaFooter from './components/AarnaFooter'
import AarnaHUD from './components/AarnaHUD'
import AarnaInspectPanel from './components/AarnaInspectPanel'
import AarnaBagDrawer from './components/AarnaBagDrawer'
import AarnaEnquiryModal from './components/AarnaEnquiryModal'
import Toast from './components/Toast'
import Cursor from './components/Cursor'
import { useSmoothScroll } from './lib/useSmoothScroll'
import { useKeyboard } from './lib/useKeyboard'
import { useCloset } from './store/useCloset'

export default function App() {
  useSmoothScroll()
  useKeyboard()
  const inspecting = useCloset((s) => s.selected !== null)

  return (
    <>
      {/* 3D Spatial Stage Canvas */}
      <div className="stage">
        <GalleryExperience />
      </div>

      {/* Atmospheric Gallery Vignette */}
      <div className="vignette" aria-hidden="true" />

      {/* Floating Editorial Navigation */}
      <AarnaNavbar />

      {/* Main Editorial Scroll Sections */}
      <main id="scroll-root" className={inspecting ? 'is-inspecting' : ''}>
        <HeroSection />
        <CollectionSection />
        <CraftSection />
        <SignatureSection />
        <WomanSection />
        <AtelierSection />
        <LookbookSection />
        <FinalExperienceSection />
        <AarnaFooter />
      </main>

      {/* Floating Gallery HUD */}
      <AarnaHUD />

      {/* 3D Garment Inspection Panel */}
      <AarnaInspectPanel />

      {/* Atelier Shopping Bag Drawer */}
      <AarnaBagDrawer />

      {/* Private Concierge Appointment Modal */}
      <AarnaEnquiryModal />

      {/* Interactive System Feedback */}
      <Toast />
      <Cursor />

      {/* "The Atelier Awakens" Cinematic Opening Experience */}
      <AtelierOpening />
    </>
  )
}
