import React from 'react';
import { ArrowRight, CheckCircle, Users, Calendar, BarChart3, Zap, Shield, Globe, Star, Play, ChevronRight } from 'lucide-react';

const LandingPage = () => {
  const navigateToLogin = () => {
    console.log('Navigating to login page...');
    window.location.href = '/login';
  };

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Project Management",
      description: "Plan, track, and deliver projects on time with customizable workflows",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration", 
      description: "Connect teams across departments with real-time updates and communication",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Timeline & Gantt",
      description: "Visualize project timelines and dependencies with interactive Gantt charts",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automation",
      description: "Automate repetitive tasks and streamline workflows to save time",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 Type II compliance and data encryption",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Integrations",
      description: "Connect with 200+ tools including Slack, Google, Microsoft, and more",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "VP of Operations",
      company: "TechCorp",
      avatar: "SJ",
      content: "monday.com transformed how our team collaborates. We've seen a 40% increase in project delivery speed.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Project Manager", 
      company: "DesignStudio",
      avatar: "MC",
      content: "The visual project management approach is game-changing. Our clients love the transparency.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Team Lead",
      company: "StartupXYZ",
      avatar: "ER", 
      content: "From 5 to 50 employees, monday.com scaled with us perfectly. Couldn't imagine working without it.",
      rating: 5
    }
  ];

  const stats = [
    { number: "180,000+", label: "Teams worldwide" },
    { number: "99.9%", label: "Uptime guarantee" },
    { number: "200+", label: "Integrations" },
    { number: "4.6/5", label: "Customer rating" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">monday</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2">work management</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1">
                  Products <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
              </div>
              <a href="#solutions" className="text-gray-700 hover:text-gray-900 transition-colors">Solutions</a>
              <a href="#pricing" className="text-gray-700 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#resources" className="text-gray-700 hover:text-gray-900 transition-colors">Resources</a>
              <button 
                onClick={navigateToLogin}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Log in
              </button>
              <button 
                onClick={navigateToLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Now with monday AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              A platform built for a<br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                new way of work
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The Work OS that lets you shape workflows, your way. Boost productivity and 
              collaboration with a platform that adapts to your team's needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={navigateToLogin}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">See how it works</span>
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-16">No credit card needed • Unlimited time on Free plan</p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Product Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-6xl mx-auto">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="ml-4 text-sm text-gray-500">monday.com - Project Dashboard</span>
                  </div>
                </div>
                
                {/* Realistic Dashboard Mockup */}
                <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                      <div>
                        <div className="w-32 h-4 bg-gray-800 rounded mb-1"></div>
                        <div className="w-24 h-3 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Column Headers */}
                  <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className="w-full h-8 bg-gray-200 rounded"></div>
                    <div className="w-full h-8 bg-blue-100 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="w-full h-8 bg-orange-100 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="w-full h-8 bg-green-100 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="w-full h-8 bg-purple-100 rounded flex items-center justify-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Task Rows */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="grid grid-cols-5 gap-4 items-center">
                        <div className="bg-white p-3 rounded-lg shadow-sm border">
                          <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
                          <div className="w-3/4 h-3 bg-gray-400 rounded"></div>
                        </div>
                        <div className="flex justify-center">
                          <div className={`w-6 h-6 rounded-full ${i <= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="flex justify-center">
                          <div className={`w-6 h-6 rounded-full ${i === 3 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="flex justify-center">
                          <div className={`w-6 h-6 rounded-full ${i >= 4 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for the way you work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From project management to CRM, customize monday.com to fit your team's unique workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-gray-600">See what our customers have to say</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join 180,000+ teams who use monday.com to plan, track, and deliver their best work
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={navigateToLogin}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
          <p className="text-blue-200 text-sm mt-6">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl font-bold">monday</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                monday.com is a work operating system that powers teams to run projects and workflows with confidence.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Customer stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-lg">Resources</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2024 monday.com. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;