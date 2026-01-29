import React, { useState, useMemo, useEffect } from 'react';
import { GraduationCap, BookOpen, Video, Users, Award, Sparkles, Leaf, Brain, Coins, ShoppingCart, Heart, Star, TrendingUp, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAssetPath } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

const CourseCard = ({
  title,
  description,
  icon,
  modules,
  color
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  modules: Array<{
    name: string;
    topics: string[];
  }>;
  color: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="bg-alien-space-dark/80 backdrop-blur-lg border-alien-gold/30 hover:border-alien-gold/60 transition-all duration-300 hover:shadow-2xl hover:shadow-alien-gold/10 group relative overflow-hidden">
      <div className={`h-1 ${color} rounded-t-lg`}></div>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-alien-space-light/60 rounded-xl group-hover:bg-alien-gold/20 transition-colors duration-300 border border-alien-gold/20">
            {icon}
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs bg-alien-space-light/60 rounded-full text-alien-green border border-alien-green/30 font-medium">
              {modules.length} modules
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpanded(!expanded)}
              className="h-8 w-8 p-0 text-alien-gold hover:text-alien-green hover:bg-alien-gold/10 border border-alien-gold/30 rounded-lg shrink-0"
              aria-label={expanded ? 'Colapsar' : 'Expandir'}
              title={expanded ? 'Colapsar' : 'Expandir'}
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <CardTitle className="text-xl font-semibold font-nasalization group-hover:text-alien-gold-light transition-colors text-alien-green">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                {modules.map((module, index) => (
                  <div key={index} className="bg-alien-space-light/40 rounded-lg p-3 border border-alien-gold/10 hover:border-alien-gold/20 transition-colors">
                    <h4 className="text-alien-gold text-sm font-semibold mb-2 flex items-center">
                      <span className="w-6 h-6 bg-alien-gold/20 rounded-full flex items-center justify-center text-xs mr-2 border border-alien-gold/30">
                        {index + 1}
                      </span>
                      {module.name}
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1 ml-8">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-start leading-relaxed">
                          <span className="text-alien-green mr-2 mt-1">·</span>
                          <span className="flex-1">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full border-alien-gold/40 text-alien-gold hover:bg-alien-gold/15 hover:border-alien-gold/60 transition-all duration-300 font-medium">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Course
              </Button>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>

      {!expanded && (
        <CardContent className="pt-0">
          <Button
            variant="outline"
            onClick={() => setExpanded(true)}
            className="w-full border-alien-gold/40 text-alien-gold hover:bg-alien-gold/15 hover:border-alien-gold/60 transition-all duration-300 font-medium"
          >
            <ChevronDown className="w-4 h-4 mr-2" />
            Ampliar el programa
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

// Enhanced Partner type with Fogg Model elements
type PartnerCategory = 'academy' | 'tech' | 'space' | 'science' | 'education' | 'all';
type Partner = {
  name: string;
  url: string;
  logoUrl?: string;
  category: PartnerCategory;
  description?: string;
  featured?: boolean;
  rating?: number;
  relatedCourse?: string;
};

const PartnerCard = ({
  partner,
  index
}: {
  partner: Partner;
  index: number;
}) => (
  <motion.a
    href={partner.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.02 }}
  >
    <Card className="bg-alien-space-dark/80 backdrop-blur-md border-alien-gold/20 hover:border-alien-gold/50 transition-all duration-300 h-full flex flex-col items-center justify-center p-4 cursor-pointer">
      <div className="w-14 h-14 mb-2 flex items-center justify-center flex-shrink-0">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl.startsWith("/lovable-uploads/") ? getAssetPath(partner.logoUrl) : partner.logoUrl}
            alt={`${partner.name}`}
            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`w-14 h-14 bg-alien-gold/20 rounded-lg flex items-center justify-center border border-alien-gold/30 ${partner.logoUrl ? 'hidden' : ''}`}>
          <span className="text-alien-gold font-bold text-lg">{partner.name.charAt(0)}</span>
        </div>
      </div>
      <h3 className="text-alien-gold font-semibold text-sm group-hover:text-alien-green transition-colors font-[Exo] text-center line-clamp-2">
        {partner.name}
      </h3>
    </Card>
  </motion.a>
);

const Academy: React.FC = () => {
  const courses = [
    {
      title: "Abundance & Freedom",
      description: "Master the fundamentals of digital economy, blockchain and sustainable financial systems to create abundance and financial freedom.",
      icon: <Coins className="h-6 w-6 text-alien-gold" />,
      color: "bg-gradient-to-r from-green-400 to-green-600",
      modules: [
        {
          name: "EcoFinTech & Dynamics",
          topics: ["Circularity + ESG Criteria", "System Dynamics", "Macro & Micro Economy", "Game Theory"]
        },
        {
          name: "Electronic Commerce",
          topics: ["Foundations & Infrastructure", "Practical Advantages", "Implementation Types", "E-commerce Features"]
        },
        {
          name: "Blockchain & Cryptography",
          topics: ["Digital Assets (BTC, NFTs)", "DeFi & ReFi Deep Dive", "Smart Contracts", "DePIN & IPFS"]
        },
        {
          name: "Revenue Architecture",
          topics: ["Automated Systems", "Scalability Frameworks", "Digital Properties", "Market Efficiency"]
        }
      ]
    },
    {
      title: "Self-Management & Sustainability",
      description: "Learn to manage your life sustainably by integrating ecology, permaculture and conscious management of energy, space and time.",
      icon: <Leaf className="h-6 w-6 text-alien-gold" />,
      color: "bg-gradient-to-r from-emerald-400 to-emerald-600",
      modules: [
        {
          name: "Ecological Foundations",
          topics: ["Ecosystem understanding and biodiversity principles", "Climate change adaptation and mitigation strategies", "Natural resource management and conservation", "Environmental impact assessment and reduction"]
        },
        {
          name: "Permaculture Design",
          topics: ["Permaculture ethics and principles", "Site analysis and design methodology", "Food forest creation and management", "Water harvesting and management systems", "Soil regeneration and composting techniques"]
        },
        {
          name: "Conscious Living",
          topics: ["Mindful consumption and zero-waste practices", "Energy efficiency in daily life", "Sustainable transportation choices", "Community building and local resilience"]
        },
        {
          name: "Time & Space Management",
          topics: ["Productivity systems aligned with natural rhythms", "Sacred space creation and maintenance", "Work-life integration practices", "Digital minimalism and tech wellness"]
        }
      ]
    },
    {
      title: "Harmony & Transcendence",
      description: "Explore the deepest dimensions of being through consciousness, meditation, philosophical alchemy and sacred nutrition.",
      icon: <Brain className="h-6 w-6 text-alien-gold" />,
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
      modules: [
        {
          name: "Consciousness & Energy",
          topics: ["Attention & Concentration - Attitude | Aptitude", "Consciousness (Unconsciousness | Preconsciousness | Subconscious)", "Equanimity | Fullness - Focus | Perception", "Determination | Intention | Purpose | Meaning"]
        },
        {
          name: "Meditations & Yoga",
          topics: ["Advanced meditation techniques", "Integral yoga practice", "Body-mind-spirit integration"]
        },
        {
          name: "Alchemy & Philosophy",
          topics: ["Alchemy: Self-transcendence | Transcendence", "Liberal Arts (Trivium + Quadrivium)", "Hermeneutics | Heuristics", "Philosophy: Spiritual and Intellectual Illumination"]
        }
      ]
    }
  ];

  // Simplified: only these partners (from reference images)
  const partnerSections: { title: string; partners: Partner[] }[] = [
    {
      title: "Academy Partners",
      partners: [
        { name: "Academia", url: "https://www.academia.edu/", logoUrl: "/lovable-uploads/Academy/Academia.svg", category: "academy" },
        { name: "Coursera", url: "https://www.coursera.org/", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg", category: "academy" },
        { name: "UNESCO", url: "https://www.unesco.org/", logoUrl: "/lovable-uploads/UnescoLogo.svg", category: "academy" }
      ]
    },
    {
      title: "Dataflow",
      partners: [
        { name: "Alchemy", url: "https://www.alchemy.com/", logoUrl: "/lovable-uploads/Academy/Alchemy.png", category: "tech" },
        { name: "Bitcoin", url: "https://bitcoin.org", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg", category: "tech" }
      ]
    },
    {
      title: "Ecoflow",
      partners: [
        { name: "Ecoflow", url: "https://www.ecoflow.com/", category: "education" }
      ]
    },
    {
      title: "Gameflow",
      partners: [
        { name: "GameTheory", url: "https://gametheory.net/", category: "tech" }
      ]
    },
    {
      title: "Healthflow",
      partners: [
        { name: "Yazio", url: "https://www.yazio.com/", category: "education" }
      ]
    },
    {
      title: "Spaceflow",
      partners: [
        { name: "ESA", url: "https://www.esa.int/", logoUrl: "/lovable-uploads/Academy/ESA.svg", category: "space" },
        { name: "NASA Eyes", url: "https://eyes.nasa.gov/apps/solar-system/#/home", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg", category: "space" },
        { name: "Virgo", url: "https://www.virgo-gw.eu/", logoUrl: "/lovable-uploads/VirgoLogo.svg", category: "space" }
      ]
    }
  ];

  return (
    <div className="relative flex flex-col flex-1">
      {/* Academy Background Image */}
      <main className="relative z-10 flex-grow container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-alien-gold/20 rounded-full mb-6 border-2 border-alien-gold/40 backdrop-blur-md">
              <img src={getAssetPath("/lovable-uploads/AcademyLogo.png")} alt="Academy Official Logo" className="h-14 w-14 object-contain" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-nasalization text-glow text-alien-green">
              Academy
            </h1>
            <p className="max-w-4xl mx-auto font-[Exo] leading-relaxed text-[alien-gold-dark] text-alien-gold font-medium">
              Acquire complete attention capabilities to connect, discover and expand knowledge and skills. 
              This helps you evolve and propels you towards an optimal experience with fullness of flow, 
              as well as increase the benefits of your quality of life and more sustainable gains, with complete wellbeing.
            </p>
          </div>

          {/* Featured Program */}
          <Card className="mb-16 bg-alien-space-dark/70 backdrop-blur-lg border-alien-gold/40 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-4 font-nasalization text-alien-green">
                  Master Certification Program
                </h2>
                <CardDescription className="text-gray-300 mb-6 font-[Exo] text-base leading-relaxed">
                  Become a certified Explorer and Navigator of the ΔlieΠFlªw $pac¼ and unlock exclusive opportunities in our expanding cosmic ecosystem.
                </CardDescription>
                <div className="space-y-4 mb-8">
                  {["3 integrated main courses", "8 specialized modules", "Bootcamps with live mentoring sessions", "On-chain NFT credential"].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-alien-green rounded-full mr-3 flex-shrink-0"></div>
                      <p className="text-alien-green font-medium">{feature}</p>
                    </div>
                  ))}
                </div>
                <Button className="hover:bg-alien-gold-light text-alien-space-dark font-[Exo] font-semibold bg-alien-gold text-[alien-gold-dark] text-alien-green text-center">
                  <Users className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
              </CardContent>
              <div className="bg-gradient-to-br from-alien-green/20 via-alien-gold/20 to-purple-500/20 p-8 flex items-center justify-center">
                <div className="relative">
                  <GraduationCap className="h-24 w-24 text-alien-gold" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-alien-green rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-alien-space-dark" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Course Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-2 font-nasalization text-center text-glow text-alien-green">
              Main Courses
            </h2>
            <p className="text-gray-300 text-center mb-12 font-[Exo]">
              Explore our comprehensive training programs
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>

          {/* Educational Partners - only these partners */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 font-nasalization text-glow text-alien-green">
                Educational Partners
              </h2>
              <p className="text-alien-gold font-medium font-[Exo]">
                We collaborate with the world's best educational platforms
              </p>
            </div>

            <div className="space-y-10">
              {partnerSections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <h3 className="text-alien-gold font-nasalization font-bold text-lg uppercase tracking-wide mb-3 border-b border-alien-gold/30 pb-2">
                    {section.title}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {section.partners.map((partner, index) => (
                      <PartnerCard
                        key={`${section.title}-${partner.name}`}
                        partner={partner}
                        index={sectionIndex * 10 + index}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="text-center bg-alien-space-dark/70 backdrop-blur-lg border-alien-gold/30">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-alien-gold mb-4 font-nasalization">
                Ready to Expand Your Cosmic Knowledge?
              </h2>
              <CardDescription className="text-gray-300 mb-6 max-w-2xl mx-auto font-[Exo] text-base">
                Join thousands of space navigators on their journey to master the principles of the decentralized multiverse.
              </CardDescription>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-alien-gold hover:bg-alien-gold-light text-alien-space-dark font-[Exo] font-semibold">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Explore All Courses
                </Button>
                <Button variant="outline" className="border-alien-green text-alien-green hover:bg-alien-green/20 font-[Exo] font-semibold">
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Academy;
