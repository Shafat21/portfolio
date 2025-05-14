"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"
import SectionHeading from "./SectionHeading"

// Testimonial data type
interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  content: string
  rating: number
  image?: string
}

export default function Testimonials() {
  // Sample testimonials - replace with your actual testimonials
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "tufmike",
      position: "Fiverr Client",
      company: "United States",
      content:
        "Best discord designer!",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/1d7092595d32768691edd343df53abc2-1353364841670385059.1897302/6AFFE0EE-08D5-419E-8E1D-0DE9A76FD3DF",
    },
    {
      id: 2,
      name: "dliamondking",
      position: "Fiverr Client",
      company: "Belgium",
      content:
        "thanks for fixen my new bot youre the best",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/520122b85629e1c9e38c373ca7432b5a-1131656031680367740971/JPEG_20230401_184900_402022901494760571.jpg",
    },
    {
      id: 3,
      name: "donthelosr",
      position: "Fiverr Client",
      company: "United States",
      content:
        "Reached out to me in my server to help, 10/10 please come to this guy",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/520cc0fb9e0edf711300a4e15ec61d38-959044651729537087.8827782/24630A64-6FFC-4267-93DD-FB46C04CB023",
    },
    {
      id: 4,
      name: "sneeko93",
      position: "Fiverr Client",
      company: "Canada",
      content:
        "Mans came in my discord and had this stuff done in less then a hour. 10/10 minted dude. Will be using his Services again",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/41db7d952de0a95851719883da4446f0-1587130547134/9794d4ee-b0a3-4695-93b9-5d88fa079dcd.jpg",
    },
    {
      id: 5,
      name: "sandrozh",
      position: "Fiverr Client",
      company: "Switzerland",
      content:
        "The work with Shafat was very pleasant. He implemented my ideas superbly and provided a very good service. I will contact him again next time.",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/f2342d5128d9d8c112f1a950596cd786-907846351593756191992/JPEG_20200703_080311_134614614828571514.jpg",
    },
    {
      id: 6,
      name: "kcoolz16",
      position: "Fiverr Client",
      company: "Canada",
      content:
        "Excellent at communicating and very fast with delivery and revisions.",
      rating: 5,
      image: "/user.png",
    },
    {
      id: 7,
      name: "whizzblazze",
      position: "Fiverr Client",
      company: "United States",
      content:
        "I recently had the pleasure of availing the Fivem Discord server service provided by Shafat on Fiverr. I must say, the experience was nothing short of exceptional. From the very beginning, Shafat demonstrated professionalism, expertise, and a genuine dedication to ensuring my satisfaction.",
      rating: 5,
      image: "/user.png",
    },
    {
      id: 8,
      name: "msbootyz",
      position: "Fiverr Client",
      company: "New Zealand",
      content:
        "A+++ fast response and delivery. From start to finish he was there to help me",
      rating: 5,
      image: "/user.png",
    },
    {
      id: 9,
      name: "tristenhinton",
      position: "Fiverr Client",
      company: "United States",
      content:
        "Outstanding experience!",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/bfabeca63333d36666779add5f3e24ea-1590192490498/fce885f9-8c04-40a3-b9ad-0e95cfef4024.jpg",
    },
    {
      id: 10,
      name: "johngregory844",
      position: "Fiverr Client",
      company: "United Kingdom",
      content:
        "thank you for everything you have done for me and my fivem server",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/286d81f6f2f1d358cbe434ed46e6ae02-906322731673808171.078562/F6AF895A-5E36-4464-87B5-17BCBFC0C4A7",
    },
    {
      id: 11,
      name: "alfredk784",
      position: "Fiverr Client",
      company: "Finland",
      content:
        "Fast deliver and amazing work",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/349ab49fe2e5d043f6f03ccb4239dfe9-903154861592983124.764035/1ABDC97D-F09A-4B08-AC87-5F77007CFA1F",
    },
    {
      id: 12,
      name: "buscottii",
      position: "Fiverr Client",
      company: "United States",
      content:
        "THE BEST!!!!",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/d9622752dca1fbb8d8345aebdc7f4ac8-1637099327772/cc40c5ac-539e-475e-9e7c-eff2808b329d.png",
    },
    {
      id: 13,
      name: "treefilms",
      position: "Fiverr Client",
      company: "United States",
      content:
        "Outstanding experience!",
      rating: 5,
      image: "/user.png",
    },
    {
      id: 14,
      name: "sincitycommunit",
      position: "Fiverr Client",
      company: "Austria",
      content:
        "danke Bine. Vă rugăm să mă evaluați⭐ Avans Multumesc",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/500c646a913c5ef4389223c646b71fce-1671563430476/996e17bd-8d1a-4ddc-aadb-470b95a97b09.png",
    },
    {
      id: 15,
      name: "sneeko93",
      position: "Fiverr Client",
      company: "Canada",
      content:
        "fast, an easy to deal with 💯❤️ 10/10 using again",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/41db7d952de0a95851719883da4446f0-1587130547134/9794d4ee-b0a3-4695-93b9-5d88fa079dcd.jpg",
    },
    {
      id: 16,
      name: "pierreantoinele",
      position: "Fiverr Client",
      company: "France",
      content:
        "very well job and quick delivery, thanks you man !",
      rating: 5,
      image: "/user.png",
    },
    {
      id: 17,
      name: "dliamondking",
      position: "Fiverr Client",
      company: "Belgium",
      content:
        "the person is realy fast in delivery 100 % legit recommend it to everyone",
      rating: 5,
      image: "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/520122b85629e1c9e38c373ca7432b5a-1131656031680367740971/JPEG_20230401_184900_402022901494760571.jpg",
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  // Generate star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? "text-coral-400 fill-coral-400" : "text-lightgray-300"}`}
      />
    ))
  }

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-navy-700">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-coral-400/10 via-navy-700 to-navy-800 z-0"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-coral-400/10 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-coral-400/10 blur-xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Client Testimonials" subtitle="What people say about my work" />

        <div className="max-w-4xl mx-auto">
          {/* Testimonial carousel */}
          <div className="relative">
            {/* Navigation buttons */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 z-20 hidden md:block">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-navy-800 border border-coral-400/20 text-lightgray-300 hover:bg-coral-400 hover:text-navy-700 transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 z-20 hidden md:block">
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-navy-800 border border-coral-400/20 text-lightgray-300 hover:bg-coral-400 hover:text-navy-700 transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Testimonial card */}
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-navy-800/80 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-coral-400/20 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar and info */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-coral-400/30">
                    {testimonials[currentIndex].image ? (
                      <img
                        src={testimonials[currentIndex].image || "/user.png"}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-navy-600 flex items-center justify-center text-2xl font-bold text-coral-400">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-lightgray-100 text-center md:text-left">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-coral-400 text-sm mb-2 text-center md:text-left">
                    {testimonials[currentIndex].position}
                  </p>
                  <p className="text-lightgray-300 text-sm mb-4 text-center md:text-left">
                    {testimonials[currentIndex].company}
                  </p>
                  <div className="flex">{renderStars(testimonials[currentIndex].rating)}</div>
                </div>

                {/* Testimonial content */}
                <div className="flex-1">
                  <div className="relative">
                    <Quote className="w-10 h-10 text-coral-400/20 absolute -top-4 -left-2" />
                    <p className="text-lightgray-300 text-lg leading-relaxed pt-6 italic">
                      {testimonials[currentIndex].content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-8 gap-2 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-coral-400" : "bg-navy-600 hover:bg-coral-400/50"
                } transition-colors duration-300`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>

          {/* Mobile navigation buttons */}
          <div className="flex justify-center mt-6 gap-4 md:hidden">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-navy-800 border border-coral-400/20 text-lightgray-300 hover:bg-coral-400 hover:text-navy-700 transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-navy-800 border border-coral-400/20 text-lightgray-300 hover:bg-coral-400 hover:text-navy-700 transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
