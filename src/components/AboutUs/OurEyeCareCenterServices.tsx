import React from 'react';
import { Eye, Stethoscope, Scissors, Circle, Droplet, Glasses, Baby, Shield, Microscope } from 'lucide-react';

export const OurEyeCareCenterServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="text-white py-16" style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Eye Care Center Services</h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: '#f0f8f4' }}>
            Comprehensive eye care services delivered with expertise and compassion
          </p>
        </div>
      </section>

      {/* General & Primary Eye Care */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-10 w-10 mr-4" style={{ color: '#77a867' }} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">General & Primary Eye Care</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our comprehensive primary eye care services ensure optimal vision health for patients of all ages through routine examinations, vision correction, and immediate treatment of common eye conditions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#77a867' }}></div>
                  <div>
                    <strong className="text-gray-900">Comprehensive Eye Exams:</strong>
                    <span className="text-gray-700 ml-2">Complete evaluation of your vision and eye health using advanced diagnostic tools.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#77a867' }}></div>
                  <div>
                    <strong className="text-gray-900">Vision Correction Services:</strong>
                    <span className="text-gray-700 ml-2">Prescribing and fitting eyeglasses and contact lenses tailored to your needs.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#77a867' }}></div>
                  <div>
                    <strong className="text-gray-900">Diagnosis and Management of Common Eye Conditions:</strong>
                    <span className="text-gray-700 ml-2">Treatment for dry eye, conjunctivitis, and refractive errors.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" style={{ backgroundColor: '#77a867' }}></div>
                  <div>
                    <strong className="text-gray-900">Emergency Eye Care:</strong>
                    <span className="text-gray-700 ml-2">Immediate treatment for sudden injuries, infections, or acute vision loss.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
                alt="General eye care examination"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Medical & Surgical Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Stethoscope className="h-10 w-10 mr-4" style={{ color: '#77a867' }} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Specialized Medical & Surgical Services</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced surgical and medical treatments delivered by our team of specialized ophthalmologists
            </p>
          </div>

          {/* Cataract */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Scissors className="h-8 w-8 mr-3" style={{ color: '#77a867' }} />
                  <h3 className="text-2xl font-bold text-gray-900">1. Cataract</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Advanced cataract surgery techniques to restore clear vision and improve quality of life.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span className="text-gray-700"><strong>Cataract Surgery:</strong> State-of-the-art procedures to remove clouded lenses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span className="text-gray-700"><strong>SICS:</strong> Small Incision Cataract Surgery for accessible, cost-effective treatment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700 mr-2">•</span>
                    <span className="text-gray-700"><strong>Phaco:</strong> Phacoemulsification using ultrasound for precise, minimally invasive surgery</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"
                  alt="Cataract surgery"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Retina and Vitreous */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80"
                  alt="Retinal care"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-4">
                  <Circle className="h-8 w-8 mr-3" style={{ color: '#32705a' }} />
                  <h3 className="text-2xl font-bold text-gray-900">2. Retina and Vitreous</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Comprehensive retinal care for complex eye conditions affecting the back of the eye.
                </p>
                <div className="space-y-4">
                  <div>
                    <strong className="text-gray-900">Diagnosis and Treatment of Retinal Diseases:</strong>
                    <p className="text-gray-700 text-sm mt-1">Managing conditions like Diabetic Retinopathy, Macular Degeneration (AMD), and Retinal Vein/Artery Occlusions.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Retinal and Vitreous Surgery:</strong>
                    <p className="text-gray-700 text-sm mt-1">Procedures for Retinal Detachment, Vitreous hemorrhage, and Macular holes.</p>
                  </div>
                  <div>
                    <strong className="text-gray-900">Intraocular Injections and Laser Treatment:</strong>
                    <p className="text-gray-700 text-sm mt-1">Advanced therapeutic interventions for retinal conditions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glaucoma */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Droplet className="h-8 w-8 mr-3" style={{ color: '#77a867' }} />
                  <h3 className="text-2xl font-bold text-gray-900">3. Glaucoma</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Comprehensive glaucoma management to prevent vision loss and preserve eye health.
                </p>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-gray-900">Glaucoma Management:</strong>
                    <span className="text-gray-700 ml-2">Personalized treatment plans to control intraocular pressure</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Glaucoma Surgery:</strong>
                    <p className="text-gray-700 text-sm mt-1 ml-4">Procedures like Trabeculectomy, Valve implants, and Minimally Invasive Glaucoma Surgery (MIGS).</p>
                  </li>
                  <li>
                    <strong className="text-gray-900">Laser Procedures:</strong>
                    <span className="text-gray-700 ml-2">Such as Selective Laser Trabeculoplasty (SLT).</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&w=800&q=80"
                  alt="Glaucoma treatment"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Cornea and External Disease */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80"
                  alt="Corneal care"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 mr-3" style={{ color: '#fbce6e' }} />
                  <h3 className="text-2xl font-bold text-gray-900">4. Cornea and External Disease</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Specialized care for corneal conditions and external eye diseases.
                </p>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-gray-900">Corneal Disease Management:</strong>
                    <span className="text-gray-700 ml-2">Treatment for infections, keratitis, and dry eye syndrome.</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Corneal Transplants:</strong>
                    <span className="text-gray-700 ml-2">Surgical procedures to replace a diseased cornea (e.g., penetrating keratoplasty, DSAEK, DMEK).</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Cross-linking (CXL):</strong>
                    <span className="text-gray-700 ml-2">Treatment for progressive Keratoconus.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Refractive Surgery */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Glasses className="h-8 w-8 mr-3" style={{ color: '#77a867' }} />
                  <h3 className="text-2xl font-bold text-gray-900">5. Refractive Surgery</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Advanced laser vision correction to reduce or eliminate dependence on glasses and contact lenses.
                </p>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-gray-900">Laser Vision Correction:</strong>
                    <span className="text-gray-700 ml-2">Procedures like LASIK, PRK, and SMILE to correct vision and reduce dependence on glasses.</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Implantable Collamer Lens (ICL) Surgery:</strong>
                    <span className="text-gray-700 ml-2">Advanced lens implantation for vision correction.</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
                  alt="Refractive surgery"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Pediatric Ophthalmology */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
                  alt="Pediatric eye care"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center mb-4">
                  <Baby className="h-8 w-8 mr-3" style={{ color: '#fbce6e' }} />
                  <h3 className="text-2xl font-bold text-gray-900">6. Pediatric Ophthalmology and Strabismus</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Specialized eye care for children, addressing unique pediatric eye conditions and vision development.
                </p>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-gray-900">Pediatric Eye Exams:</strong>
                    <span className="text-gray-700 ml-2">Specialized care for infants and children.</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Strabismus (Misaligned Eyes) Management:</strong>
                    <span className="text-gray-700 ml-2">Treating "crossed eyes" or "lazy eye" (Amblyopia) with glasses, patching, or surgery.</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Diagnosis of Congenital Eye Diseases:</strong>
                    <span className="text-gray-700 ml-2">Early detection and management of eye conditions present from birth.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Oculoplastics */}
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 mr-3" style={{ color: '#32705a' }} />
                  <h3 className="text-2xl font-bold text-gray-900">7. Oculoplastics, Orbit, and Lacrimal Surgery</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Surgical and medical care for the eyelids, eye socket, and tear drainage system.
                </p>
                <ul className="space-y-3">
                  <li>
                    <strong className="text-gray-900">Eyelid Surgery:</strong>
                    <span className="text-gray-700 ml-2">Medically necessary procedures for droopy eyelids (Ptosis), in-turning (Entropion) or out-turning (Ectropion) eyelids, and eyelid tumors.</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Tear Duct Surgery (DCR):</strong>
                    <span className="text-gray-700 ml-2">Addressing excessive tearing or blocked tear ducts.</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Orbital Surgery:</strong>
                    <span className="text-gray-700 ml-2">Treatment of eye socket disorders, including those related to Graves' Disease.</span>
                  </li>
                  <li>
                    <strong className="text-gray-900">Cosmetic Services:</strong>
                    <span className="text-gray-700 ml-2">Eyelid lifts (Blepharoplasty) and facial injectables.</span>
                  </li>
                </ul>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"
                  alt="Oculoplastic surgery"
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic & Allied Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"
                alt="Diagnostic services"
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <Microscope className="h-10 w-10 mr-4" style={{ color: '#77a867' }} />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Diagnostic & Allied Services</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                State-of-the-art diagnostic equipment and comprehensive support services to ensure accurate diagnosis and optimal patient care.
              </p>
              <div className="space-y-4">
                <div>
                  <strong className="text-gray-900 text-lg">Advanced Diagnostic Imaging:</strong>
                  <p className="text-gray-700 mt-2">Including Optical Coherence Tomography (OCT), Fluorescein Angiography, and Ultrasound for detailed eye imaging and disease detection.</p>
                </div>
                <div>
                  <strong className="text-gray-900 text-lg">Optical Shop and Laboratory:</strong>
                  <p className="text-gray-700 mt-2">On-site services for dispensing glasses, specialized lenses, and contact lens fitting with expert optometrists.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(to right, #32705a, #77a867)` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Eye Care You Can Trust</h2>
          <p className="text-xl mb-8" style={{ color: '#f0f8f4' }}>
            Our comprehensive range of services ensures that all your eye care needs are met under one roof, with the highest standards of medical excellence.
          </p>
        </div>
      </section>
    </div>
  );
};

