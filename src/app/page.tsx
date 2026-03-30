import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Zap, Shield, BarChart3, ArrowRight, CheckCircle, Star } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Order Tracking",
    description: "Track every content order from brief to delivery with real-time status updates.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Professional writers deliver high-quality content within your deadlines.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with row-level access controls for your data.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Gain insights into your content pipeline with charts and performance metrics.",
  },
]

const steps = [
  { step: "1", title: "Create an Account", description: "Sign up in seconds and set your content preferences." },
  { step: "2", title: "Place an Order", description: "Describe your content needs — blog posts, social media, website copy." },
  { step: "3", title: "Get Delivered", description: "Receive polished content on time, review, and approve." },
]

const pricing = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For individuals and small projects",
    features: ["5 orders per month", "Blog posts & social media", "3-day turnaround", "Email support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/mo",
    description: "For growing businesses",
    features: ["25 orders per month", "All content types", "24-hour turnaround", "Priority support", "Analytics dashboard"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams with high-volume needs",
    features: ["Unlimited orders", "Dedicated writer team", "Same-day turnaround", "Account manager", "Custom integrations"],
    cta: "Contact Sales",
    popular: false,
  },
]

const testimonials = [
  {
    quote: "This platform transformed how we manage content. Our blog output doubled in the first month.",
    name: "Sarah Chen",
    role: "Marketing Director, TechFlow",
  },
  {
    quote: "The quality and speed are unmatched. We now have a consistent content pipeline for the first time.",
    name: "Marcus Johnson",
    role: "CEO, BrandWave",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-primary text-white font-bold text-sm">
              W
            </div>
            <span className="font-semibold text-lg">WriteFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-red-50 text-brand-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Zap className="h-3.5 w-3.5" /> Now with AI-assisted writing
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto leading-tight">
          Content writing,{" "}
          <span className="text-brand-primary">simplified.</span>
        </h1>
        <p className="text-lg text-gray-500 mt-6 max-w-2xl mx-auto">
          A modern dashboard to order, track, and manage all your content writing projects in one place. From brief to delivery, we handle it all.
        </p>
        <div className="flex items-center justify-center gap-4 mt-10">
          <Link href="/register">
            <Button size="lg" className="gap-2 text-base px-8">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#pricing">
            <Button variant="outline" size="lg" className="text-base px-8">
              View Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to scale content</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Powerful tools and a streamlined workflow for content teams of any size.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-none bg-transparent">
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
             <p className="text-gray-500 mt-3">Three simple steps to quality content.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white font-bold text-xl mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Simple, transparent pricing</h2>
            <p className="text-gray-500 mt-3">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan) => (
              <Card key={plan.name} className={`relative ${plan.popular ? 'border-brand-primary border-2 shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block">
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by content teams</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-brand-primary text-white font-bold text-xs">
              W
            </div>
            <span className="text-sm text-gray-500">&copy; {new Date().getFullYear()} WriteFlow. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
