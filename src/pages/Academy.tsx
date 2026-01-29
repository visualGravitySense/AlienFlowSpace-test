import React, { useState, useMemo, useEffect } from 'react';
import { GraduationCap, BookOpen, Video, Users, Award, Sparkles, Leaf, Brain, Coins, ShoppingCart, Heart, Lightbulb, ExternalLink, Search, Filter, Star, TrendingUp, Globe, Zap, GraduationCap as GradCap, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="bg-alien-space-dark/80 backdrop-blur-md border-alien-gold/20 hover:border-alien-gold/60 transition-all duration-300 h-full flex flex-col group cursor-pointer overflow-hidden relative">
        {/* Featured Badge - Prompt Element */}
        {partner.featured && (
          <div className="absolute top-2 right-2 z-20">
            <div className="bg-gradient-to-r from-alien-green to-alien-gold px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 text-alien-space-dark" fill="currentColor" />
              <span className="text-xs font-bold text-alien-space-dark">Featured</span>
            </div>
          </div>
        )}

        {/* Hover Gradient Overlay - Motivation Element */}
        <div className="absolute inset-0 bg-gradient-to-br from-alien-gold/10 via-alien-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <CardContent className="p-4 flex flex-col items-center text-center relative z-10 flex-grow">
          {/* Logo - Visual Trigger */}
          <div className="w-16 h-16 mb-3 flex items-center justify-center relative">
            {partner.logoUrl ? (
              <motion.img 
                src={partner.logoUrl.startsWith("/lovable-uploads/") ? getAssetPath(partner.logoUrl) : partner.logoUrl} 
                alt={`${partner.name} logo`} 
                className="max-w-full max-h-full object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.classList.remove('hidden');
                }} 
              />
            ) : null}
            <div className={`w-16 h-16 bg-alien-gold/20 rounded-xl flex items-center justify-center border border-alien-gold/30 ${partner.logoUrl ? 'hidden' : ''}`}>
              <span className="text-alien-gold font-bold text-xl">{partner.name.charAt(0)}</span>
            </div>
            
            {/* Rating Badge - Motivation Element */}
            {partner.rating && (
              <div className="absolute -bottom-1 -right-1 bg-alien-space-dark border border-alien-gold/40 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                <Star className="w-3 h-3 text-alien-gold fill-alien-gold" />
                <span className="text-xs font-bold text-alien-gold">{partner.rating}</span>
              </div>
            )}
          </div>

          {/* Name - Clear Hierarchy */}
          <h3 className="text-alien-gold font-semibold text-sm group-hover:text-alien-green transition-colors font-[Exo] mb-2 line-clamp-2">
            {partner.name}
          </h3>

          {/* Description - Motivation Element (Value Proposition) */}
          {partner.description && (
            <p className="text-xs text-gray-400 mb-3 line-clamp-2 flex-grow">
              {partner.description}
            </p>
          )}

          {/* Related Course Badge - Motivation Element */}
          {partner.relatedCourse && (
            <div className="mb-2 px-2 py-1 bg-alien-green/10 border border-alien-green/30 rounded-full">
              <span className="text-xs text-alien-green font-medium">{partner.relatedCourse}</span>
            </div>
          )}

          {/* CTA Button - Prompt Element */}
          <motion.div
            className="mt-auto w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="sm"
              className="w-full border-alien-gold/40 text-alien-gold hover:bg-alien-gold/20 hover:border-alien-gold/60 transition-all duration-300 text-xs"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Explore
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.a>
  );
};

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

  // Enhanced partners data with Fogg Model elements
  const partnersData: Partner[] = [
    { name: "Coursera", url: "https://www.coursera.org/", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/97/Coursera-Logo_600x600.svg", category: "academy", description: "World-class courses from top universities", featured: true, rating: 4.8, relatedCourse: "Abundance & Freedom" },
    { name: "edX", url: "https://www.edx.org/", logoUrl: "/lovable-uploads/Academy/edX.png", category: "academy", description: "University-level courses online", featured: true, rating: 4.7, relatedCourse: "Abundance & Freedom" },
    { name: "Khan Academy", url: "https://gwcenter.icrr.u-tokyo.ac.jp/", logoUrl: "/lovable-uploads/Academy/KAGRA.svg", category: "education", description: "Free world-class education", featured: true, rating: 4.9, relatedCourse: "All Courses" },
    { name: "MasterClass", url: "https://masterclass.com/", logoUrl: "/lovable-uploads/Academy/MasterClass.jpeg", category: "education", description: "Learn from the world's best", featured: true, rating: 4.6 },
    { name: "Udemy", url: "https://www.udemy.com/", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg", category: "education", description: "Online courses marketplace", rating: 4.5 },
    { name: "Skillshare", url: "https://www.skillshare.com/", logoUrl: "/lovable-uploads/SkillShareLogo.jpeg", category: "education", description: "Creative skills platform", rating: 4.4 },
    { name: "Udacity", url: "https://www.udacity.com/", logoUrl: "/lovable-uploads/UdacityLogo.svg", category: "tech", description: "Tech nanodegrees", relatedCourse: "Abundance & Freedom" },
    { name: "Alchemy", url: "https://www.alchemy.com/", logoUrl: "/lovable-uploads/Academy/Alchemy.png", category: "tech", description: "Web3 development platform", relatedCourse: "Abundance & Freedom" },
    { name: "Bitcoin", url: "https://bitcoin.org", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg", category: "tech", description: "Digital currency revolution", relatedCourse: "Abundance & Freedom" },
    { name: "HackerRank", url: "https://www.hackerrank.com/", logoUrl: "/lovable-uploads/Academy/HackerRank.svg", category: "tech", description: "Coding challenges & skills", rating: 4.3 },
    { name: "HackMD", url: "https://hackmd.io/", logoUrl: "/lovable-uploads/Academy/HackMD.svg", category: "tech", description: "Collaborative markdown" },
    { name: "Unity Learn", url: "https://learn.unity.com/", logoUrl: "/lovable-uploads/UnityLearnLogo.svg", category: "tech", description: "Game development education" },
    { name: "Unreal Engine", url: "https://www.unrealengine.com/en-US/learn", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/Unreal_Engine_Logo.svg", category: "tech", description: "Game engine education" },
    { name: "NASA Eyes", url: "https://eyes.nasa.gov/apps/solar-system/#/home", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg", category: "space", description: "Explore the solar system", featured: true, rating: 4.9, relatedCourse: "Harmony & Transcendence" },
    { name: "ESA", url: "https://www.esa.int/", logoUrl: "/lovable-uploads/Academy/ESA.svg", category: "space", description: "European Space Agency", featured: true, rating: 4.8, relatedCourse: "Harmony & Transcendence" },
    { name: "Virgo-GW", url: "https://www.virgo-gw.eu/", logoUrl: "/lovable-uploads/VirgoLogo.svg", category: "space", description: "Gravitational wave research", relatedCourse: "Harmony & Transcendence" },
    { name: "Map of the Universe", url: "https://mapoftheuniverse.net/", logoUrl: "/lovable-uploads/Academy/Universe.jpg", category: "space", description: "Interactive cosmic map", rating: 4.7 },
    { name: "LIGO", url: "https://www.ligo.caltech.edu/", logoUrl: "/lovable-uploads/Academy/LIGO.png", category: "science", description: "Gravitational wave observatory", relatedCourse: "Harmony & Transcendence" },
    { name: "KAGRA", url: "https://khanacademy.org/", logoUrl: "https://cdn.kastatic.org/images/khan-logo-dark-background.png", category: "science", description: "Japanese gravitational wave" },
    { name: "LSC-Canfranc", url: "https://lsc-canfranc.es/", logoUrl: "/lovable-uploads/Academy/LSC.png", category: "science", description: "LIGO Scientific Collaboration" },
    { name: "Climate Reanalyzer", url: "https://climatereanalyzer.org/", logoUrl: "/lovable-uploads/Academy/ClimateReanalyzer.svg", category: "science", description: "Climate data & analytics", relatedCourse: "Self-Management & Sustainability" },
    { name: "Academia", url: "https://www.academia.edu/", logoUrl: "/lovable-uploads/Academy/Academia.svg", category: "academy", description: "Academic research network" },
    { name: "UNESCO", url: "https://www.unesco.org/", logoUrl: "/lovable-uploads/UnescoLogo.svg", category: "academy", description: "UN education & culture", featured: true, rating: 4.8 },
    { name: "UNED", url: "https://iedra.uned.es/", logoUrl: "/lovable-uploads/Academy/UNED.png", category: "academy", description: "Spanish distance university" },
    { name: "UNSSC", url: "https://unssc.org/", logoUrl: "/lovable-uploads/UNSSCLogo.png", category: "academy", description: "UN staff college" },
    { name: "OEGlobal", url: "https://oeglobal.org/", logoUrl: "/lovable-uploads/OEGlobalLogo.jpeg", category: "education", description: "Open education network" },
    { name: "OpenUpEd", url: "https://openuped.eu/", logoUrl: "/lovable-uploads/OpenUpEdLogo.jpeg", category: "education", description: "European MOOCs" },
    { name: "MOOC", url: "https://mooc.org/", logoUrl: "/lovable-uploads/Academy/Mooc.png", category: "education", description: "Massive open online courses" },
    { name: "Google for Education", url: "https://edu.google.com/", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", category: "education", description: "Google education tools" },
    { name: "Google Growth", url: "https://grow.google/", logoUrl: "/lovable-uploads/Academy/GrowGoogle.png", category: "education", description: "Skills development" },
    { name: "FutureLearn", url: "https://www.futurelearn.com/", logoUrl: "https://www.futurelearn.com/favicon.ico", category: "education", description: "UK online courses" },
    { name: "AulaFacil", url: "https://www.aulafacil.com/", logoUrl: "https://www.aulafacil.com/favicon.ico", category: "education", description: "Free online courses (ES)" },
    { name: "Cursa", url: "https://cursa.app/", logoUrl: "/lovable-uploads/Academy/Cursa.webp", category: "education", description: "Free education platform" },
    { name: "Explore", url: "https://explore.org/", logoUrl: "/lovable-uploads/Academy/Explore.png", category: "education", description: "Nature & animal cams" },
    { name: "Hotmart", url: "https://www.hotmart.com/", logoUrl: "/lovable-uploads/Academy/Hotmart.png", category: "education", description: "Digital products platform" }
  ];

  // Fogg Model: Ability - Filtering and Search
  const [selectedCategory, setSelectedCategory] = useState<PartnerCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState<'pagination' | 'loadmore'>('pagination');
  const [loadedCount, setLoadedCount] = useState(12);

  const categories: { id: PartnerCategory; label: string; icon: React.ReactNode; count: number }[] = [
    { id: 'all', label: 'All Partners', icon: <Globe className="w-4 h-4" />, count: partnersData.length },
    { id: 'academy', label: 'Academy', icon: <GradCap className="w-4 h-4" />, count: partnersData.filter(p => p.category === 'academy').length },
    { id: 'education', label: 'Education', icon: <BookOpen className="w-4 h-4" />, count: partnersData.filter(p => p.category === 'education').length },
    { id: 'tech', label: 'Tech', icon: <Zap className="w-4 h-4" />, count: partnersData.filter(p => p.category === 'tech').length },
    { id: 'space', label: 'Space', icon: <Sparkles className="w-4 h-4" />, count: partnersData.filter(p => p.category === 'space').length },
    { id: 'science', label: 'Science', icon: <Lightbulb className="w-4 h-4" />, count: partnersData.filter(p => p.category === 'science').length }
  ];

  // Filtered partners - Ability enhancement
  const filteredPartners = useMemo(() => {
    return partnersData.filter(partner => {
      const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partner.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      // Featured partners first - Motivation element
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then by rating
      if (a.rating && b.rating) return b.rating - a.rating;
      if (a.rating) return -1;
      if (b.rating) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setLoadedCount(itemsPerPage);
  }, [selectedCategory, searchQuery, itemsPerPage]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, viewMode]);

  // Paginated partners
  const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
  const paginatedPartners = useMemo(() => {
    if (viewMode === 'loadmore') {
      return filteredPartners.slice(0, loadedCount);
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPartners.slice(startIndex, endIndex);
  }, [filteredPartners, currentPage, itemsPerPage, viewMode, loadedCount]);

  const hasMore = viewMode === 'loadmore' ? loadedCount < filteredPartners.length : false;

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

          {/* Enhanced Partners Section with Fogg Model */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 font-nasalization text-glow text-alien-green">
                Educational Partners
              </h2>
              <p className="text-alien-gold font-medium font-[Exo] mb-2">
                We collaborate with the world's best educational platforms
              </p>
              <p className="text-gray-400 text-sm font-[Exo]">
                Discover resources that enhance your learning journey
              </p>
            </div>

            {/* Search & Filter - Ability Enhancement */}
            <Card className="mb-8 bg-alien-space-dark/60 backdrop-blur-md border-alien-gold/20">
              <CardContent className="p-4">
                {/* Search Bar - Ability: Make it easy to find */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-alien-gold/60 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search partners by name or topic..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-alien-space-dark/80 border-alien-gold/30 text-alien-gold placeholder:text-gray-500 focus:border-alien-green/50"
                    />
                  </div>
                </div>

                {/* Category Filters - Ability: Simplify navigation */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
                        ${selectedCategory === category.id
                          ? 'bg-alien-green/20 border-alien-green text-alien-green shadow-lg shadow-alien-green/20'
                          : 'bg-alien-space-dark/60 border-alien-gold/30 text-alien-gold hover:border-alien-gold/50'
                        }
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.icon}
                      <span className="font-[Exo] text-sm font-medium">{category.label}</span>
                      <span className={`
                        px-2 py-0.5 rounded-full text-xs font-bold
                        ${selectedCategory === category.id
                          ? 'bg-alien-green/30 text-alien-green'
                          : 'bg-alien-gold/20 text-alien-gold'
                        }
                      `}>
                        {category.count}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Results Count & Controls - Prompt Element */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <p className="text-gray-400 font-[Exo] text-sm">
                  Showing <span className="text-alien-green font-bold">
                    {viewMode === 'loadmore' ? loadedCount : paginatedPartners.length}
                  </span> of <span className="text-alien-gold font-bold">{filteredPartners.length}</span> partners
                </p>
                
                {/* Items per page selector */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-[Exo] text-xs">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setLoadedCount(Number(e.target.value));
                    }}
                    className="bg-alien-space-dark/80 border border-alien-gold/30 rounded-lg px-2 py-1 text-alien-gold text-xs font-[Exo] focus:border-alien-green/50 focus:outline-none"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={18}>18</option>
                    <option value={24}>24</option>
                  </select>
                </div>

                {/* View mode toggle */}
                <div className="flex items-center gap-2 bg-alien-space-dark/60 rounded-lg p-1 border border-alien-gold/20">
                  <button
                    onClick={() => setViewMode('pagination')}
                    className={`px-3 py-1 rounded text-xs font-[Exo] transition-all ${
                      viewMode === 'pagination'
                        ? 'bg-alien-green/20 text-alien-green'
                        : 'text-alien-gold hover:text-alien-green'
                    }`}
                  >
                    Pages
                  </button>
                  <button
                    onClick={() => setViewMode('loadmore')}
                    className={`px-3 py-1 rounded text-xs font-[Exo] transition-all ${
                      viewMode === 'loadmore'
                        ? 'bg-alien-green/20 text-alien-green'
                        : 'text-alien-gold hover:text-alien-green'
                    }`}
                  >
                    Load More
                  </button>
                </div>
              </div>

              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="text-alien-gold hover:text-alien-green"
                >
                  Clear search
                </Button>
              )}
            </div>

            {/* Partners Grid - Enhanced with Fogg Model */}
            <AnimatePresence mode="wait">
              {filteredPartners.length > 0 ? (
                <>
                  <motion.div
                    key={`${selectedCategory}-${searchQuery}-${currentPage}-${viewMode}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-6"
                  >
                    {paginatedPartners.map((partner, index) => (
                      <PartnerCard key={`${partner.name}-${index}`} partner={partner} index={index} />
                    ))}
                  </motion.div>

                  {/* Load More Button */}
                  {viewMode === 'loadmore' && hasMore && (
                    <div className="flex justify-center mb-6">
                      <Button
                        onClick={() => setLoadedCount(prev => Math.min(prev + itemsPerPage, filteredPartners.length))}
                        className="bg-alien-green hover:bg-alien-green-light text-alien-space-dark font-[Exo] font-semibold px-8"
                      >
                        Load More Partners
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}

                  {/* Pagination */}
                  {viewMode === 'pagination' && totalPages > 1 && (
                    <div className="flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) setCurrentPage(currentPage - 1);
                              }}
                              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer text-alien-gold hover:text-alien-green border-alien-gold/30 hover:border-alien-green/50'}
                            />
                          </PaginationItem>
                          
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            if (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            ) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationLink
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setCurrentPage(page);
                                    }}
                                    isActive={currentPage === page}
                                    className={`cursor-pointer ${
                                      currentPage === page
                                        ? 'bg-alien-green/20 border-alien-green text-alien-green'
                                        : 'text-alien-gold hover:text-alien-green border-alien-gold/30 hover:border-alien-green/50'
                                    }`}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              );
                            } else if (page === currentPage - 2 || page === currentPage + 2) {
                              return (
                                <PaginationItem key={page}>
                                  <PaginationEllipsis className="text-alien-gold" />
                                </PaginationItem>
                              );
                            }
                            return null;
                          })}
                          
                          <PaginationItem>
                            <PaginationNext
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                              }}
                              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer text-alien-gold hover:text-alien-green border-alien-gold/30 hover:border-alien-green/50'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <p className="text-gray-400 font-[Exo] mb-4">No partners found matching your criteria</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="border-alien-gold/40 text-alien-gold hover:bg-alien-gold/20"
                  >
                    Reset Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Featured Partners Highlight - Motivation Element */}
            {selectedCategory === 'all' && searchQuery === '' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <Card className="bg-gradient-to-r from-alien-green/10 via-alien-gold/5 to-alien-green/10 border-alien-gold/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-alien-green" />
                      <h3 className="text-xl font-nasalization text-alien-green">Featured Partners</h3>
                    </div>
                    <p className="text-gray-300 font-[Exo] text-sm mb-4">
                      These top-rated partners are highly recommended by our community and align perfectly with our courses.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {partnersData.filter(p => p.featured).slice(0, 5).map((partner) => (
                        <a
                          key={partner.name}
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 bg-alien-space-dark/60 border border-alien-gold/30 rounded-full hover:border-alien-green/50 transition-all group"
                        >
                          {partner.logoUrl && (
                            <img
                              src={partner.logoUrl.startsWith("/lovable-uploads/") ? getAssetPath(partner.logoUrl) : partner.logoUrl}
                              alt={partner.name}
                              className="w-5 h-5 object-contain"
                            />
                          )}
                          <span className="text-xs text-alien-gold group-hover:text-alien-green font-[Exo]">{partner.name}</span>
                          {partner.rating && (
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 text-alien-gold fill-alien-gold" />
                              <span className="text-xs text-alien-gold font-bold">{partner.rating}</span>
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
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
