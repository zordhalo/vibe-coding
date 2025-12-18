'use client';

import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check cookie consent
    const consent = localStorage.getItem('cookieConsent');
    setCookieConsent(consent !== null);

    // Scroll listener
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection observer for animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.card, .process-step').forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('email', email);

      const response = await fetch('/api/lead', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thanks for subscribing! Check your inbox for confirmation.' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setCookieConsent(true);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setCookieConsent(true);
  };

  return (
    <>
      {/* Skip to main content link */}
      <a href="#framework" className="skip-link">Skip to main content</a>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top" role="navigation" aria-label="Main navigation">
        <div className="container-fluid">
          <a className="navbar-brand" href="#home" aria-label="Vibe Coding Home">
            <i className="fas fa-code" aria-hidden="true"></i> Vibe Coding
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#framework">Framework</a></li>
              <li className="nav-item"><a className="nav-link" href="#process">Build Process</a></li>
              <li className="nav-item"><a className="nav-link" href="#tech-stack">Tech Stack</a></li>
              <li className="nav-item"><a className="nav-link" href="#marketing">Marketing</a></li>
              <li className="nav-item"><a className="nav-link" href="#resources">Resources</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 hero-content">
              <h1>Build $20K/Month Apps in 14 Days</h1>
              <p>Learn Connor Burd&apos;s complete framework for rapid app development using AI, modern design principles, and data-driven growth strategies.</p>
              <div className="d-flex gap-3 flex-wrap">
                <button className="btn btn-primary btn-lg" onClick={() => scrollToSection('framework')} aria-label="Get started with the Vibe Coding framework">
                  <i className="fas fa-rocket" aria-hidden="true"></i> Get Started
                </button>
                <button className="btn btn-outline-primary btn-lg" onClick={() => scrollToSection('process')} aria-label="Learn more about the build process">
                  <i className="fas fa-book" aria-hidden="true"></i> Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="row">
            <div className="col-md-3 stat-item">
              <div className="stat-number">14</div>
              <div className="stat-label">Days to Build</div>
            </div>
            <div className="col-md-3 stat-item">
              <div className="stat-number">$20K</div>
              <div className="stat-label">Monthly Revenue</div>
            </div>
            <div className="col-md-3 stat-item">
              <div className="stat-number">12K+</div>
              <div className="stat-label">App Downloads</div>
            </div>
            <div className="col-md-3 stat-item">
              <div className="stat-number">100K+</div>
              <div className="stat-label">Monthly Portfolio Revenue</div>
            </div>
          </div>
        </div>
      </section>

      {/* Framework Overview */}
      <section className="section" id="framework">
        <div className="container">
          <div className="section-header">
            <h2>The Vibe Coding Framework</h2>
            <p>A complete system for building revenue-first applications with AI-powered development</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <i className="fas fa-lightbulb" style={{ color: 'var(--primary)' }}></i> Philosophy
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text mb-3">
                    <strong>Revenue-First Mindset:</strong> Apps are designed to make money from day one, not after achieving product-market fit.
                  </p>
                  <p className="card-text mb-3">
                    <strong>Simplicity Over Complexity:</strong> Build 1-3 core features with exceptional onboarding instead of comprehensive solutions.
                  </p>
                  <p className="card-text mb-0">
                    <strong>Modification Over Innovation:</strong> Prioritize variations of proven ideas rather than creating entirely new categories.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <i className="fas fa-brain" style={{ color: 'var(--accent-pink)' }}></i> Core Principles
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text mb-3">
                    <strong>Human Psychology First:</strong> Tap into universal desires (money, health, attractiveness) rather than solving niche problems.
                  </p>
                  <p className="card-text mb-3">
                    <strong>Onboarding Drives Conversions:</strong> 90% of users never see core features—focus on onboarding excellence.
                  </p>
                  <p className="card-text mb-0">
                    <strong>Speed to Market:</strong> Ship quickly with AI tools, iterate with real users rather than perfecting in isolation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="highlight-box mt-5">
            <h4><i className="fas fa-quote-left"></i> Connor&apos;s Core Philosophy</h4>
            <p>
              &quot;Build something simple with a great onboarding. A simple app can make lots of money. You only really need 1-3 good features and your onboarding will pull most of the weight for you.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Build Process */}
      <section className="section bg-dark" id="process">
        <div className="container">
          <div className="section-header">
            <h2>7-Phase Build Process</h2>
            <p>From idea validation to deployment—a step-by-step system</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6 col-xl-4">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-title">Validate Idea</div>
                <div className="step-description">
                  Mine TikTok, Instagram, Reddit for recurring pain points. Look for &quot;how do I solve this?&quot; patterns. Existing competitors = proof of demand.
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-title">Design Research</div>
                <div className="step-description">
                  Download 20 competitor + beautiful-design apps. Screenshot every onboarding screen. Import into Figma. Cherry-pick best elements.
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-title">Onboarding Design</div>
                <div className="step-description">
                  Design emotionally compelling flow with 5 principles: invoke emotion, show strongest incentives, simplicity, personalization, scientific credibility.
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-title">Data Structures</div>
                <div className="step-description">
                  Document data model with text specs + JSON examples. Feed upfront to AI so it doesn&apos;t hallucinate. This prevents 80% of coding errors.
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="process-step">
                <div className="step-number">5</div>
                <div className="step-title">Vibe Coding</div>
                <div className="step-description">
                  Drop Figma screenshots + specs into Claude. AI generates full screens & code. Iterate rapidly. Don&apos;t perfectionism—ship fast.
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="process-step">
                <div className="step-number">6</div>
                <div className="step-title">Test & Iterate</div>
                <div className="step-description">
                  Ship to real users. Track conversions, retention, revenue with Mixpanel + RevenueCat. Iterate based on data, not gut feeling.
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="process-step">
                <div className="step-number">7</div>
                <div className="step-title">Deploy & Scale</div>
                <div className="step-description">
                  Launch paid marketing campaigns. Optimize CAC vs LTV ratios. Scale winning ads, kill losers fast. Reinvest profits into growth.
                </div>
              </div>
            </div>
          </div>

          {/* Onboarding Deep Dive */}
          <div className="mt-5 pt-5 border-top border-secondary">
            <h3 className="mb-4">Onboarding: The 90% Rule</h3>
            <div className="row g-4">
              <div className="col-lg-6">
                <p className="lead">
                  <strong>Why It Matters:</strong> Approximately 90% of users never see anything beyond the onboarding if the app features a paywall. For most subscription apps, the onboarding is effectively the entire product experience for the vast majority of users.
                </p>
                <p>
                  This makes onboarding optimization the highest-leverage activity in app development. Every element should be designed for one goal: increasing conversion to paid subscription.
                </p>
              </div>
              <div className="col-lg-6">
                <div className="card bg-primary bg-opacity-10 border-primary">
                  <div className="card-body">
                    <h5 className="card-title text-light">5 Onboarding Principles</h5>
                    <ul className="list-unstyled text-light">
                      <li className="mb-2"><span className="badge bg-primary text-light me-2">1</span> Invoke emotion—purchase decisions are emotional</li>
                      <li className="mb-2"><span className="badge bg-primary text-light me-2">2</span> Show strongest incentives—clear life improvement</li>
                      <li className="mb-2"><span className="badge bg-primary text-light me-2">3</span> Simplicity—easy purchase decision</li>
                      <li className="mb-2"><span className="badge bg-primary text-light me-2">4</span> Personalization—custom-built for each user</li>
                      <li><span className="badge bg-primary text-light me-2">5</span> Scientific credibility—charts, graphs, data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Prompting Best Practices */}
      <section className="section" id="prompting">
        <div className="container">
          <div className="section-header">
            <h2>AI Prompting Best Practices</h2>
            <p>Techniques to maximize Claude code generation quality</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title"><i className="fas fa-layer-group"></i> Context Layering</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Provide all relevant background upfront—architecture notes, recent changes, API contracts, user stories. Gives AI the same mental map a human developer needs.</p>
                  <div className="code-block">
                    <code>{`// Architecture: React Native with Expo, 
// backend: Next.js API routes...
// Database: PostgreSQL with these schemas...
// Recent changes: Changed auth flow...`}</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title"><i className="fas fa-cut"></i> Stepwise Prompting</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Break complex features into small chunks with feedback between each step. Prevents errors from compounding and catches issues early.</p>
                  <div className="code-block">
                    <code>{`1. Create database schema
2. Create API endpoint
3. Build frontend form
Review each step before next`}</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title"><i className="fas fa-user"></i> Role Assignment</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Explicitly define the AI&apos;s expertise level. This causes it to generate code matching senior-level practices rather than basic implementations.</p>
                  <div className="code-block">
                    <code>{`"You are a senior mobile developer 
with expertise in React Native and 
subscription app patterns. Code..."`}</code>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title"><i className="fas fa-brain"></i> Chain-of-Thought</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Ask AI to explain reasoning before generating code. Surfaces assumptions and allows course-correction before implementation.</p>
                  <div className="code-block">
                    <code>{`"Explain your approach step-by-step 
before implementing the payment flow"`}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section bg-dark" id="tech-stack">
        <div className="container">
          <div className="section-header">
            <h2>Complete Tech Stack</h2>
            <p>Proven tools optimized for speed and AI code generation</p>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-palette"></i></div>
                <div className="tech-name">Figma</div>
                <div className="tech-description">UI design, icons, and App Store screenshots. AI-friendly for visual specifications.</div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-brain"></i></div>
                <div className="tech-name">Claude</div>
                <div className="tech-description">AI code generation. Use exclusively for all coding—understand it deeply for best results.</div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-mobile-alt"></i></div>
                <div className="tech-name">Expo + React Native</div>
                <div className="tech-description">Cross-platform mobile development. Single codebase for iOS and Android.</div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-server"></i></div>
                <div className="tech-name">Next.js + TypeScript</div>
                <div className="tech-description">Web backend and API logic. TypeScript ensures type safety for better AI generation.</div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-rocket"></i></div>
                <div className="tech-name">Vercel</div>
                <div className="tech-description">Hosting for Next.js apps. Seamless GitHub integration, automatic deployments.</div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-chart-line"></i></div>
                <div className="tech-name">Mixpanel</div>
                <div className="tech-description">Event-based analytics. Track funnels, identify where users drop off in onboarding.</div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-credit-card"></i></div>
                <div className="tech-name">RevenueCat</div>
                <div className="tech-description">Subscription management. A/B test pricing without app store submissions.</div>
              </div>
            </div>

            <div className="col-lg-6 col-xl-4">
              <div className="tech-item">
                <div className="tech-icon"><i className="fas fa-code-branch"></i></div>
                <div className="tech-name">GitHub</div>
                <div className="tech-description">Version control. Integrated with Vercel for automatic deployments.</div>
              </div>
            </div>
          </div>

          <div className="highlight-box">
            <h4><i className="fas fa-lightbulb"></i> Why This Stack</h4>
            <p>
              This stack is optimized for solo developer velocity and AI code generation compatibility. It avoids complex state management, extensive testing frameworks, and architectural patterns that slow development. Every tool is proven, well-documented, and extensively featured in AI training data—ensuring maximum code generation quality.
            </p>
          </div>
        </div>
      </section>

      {/* Marketing Strategy */}
      <section className="section" id="marketing">
        <div className="container">
          <div className="section-header">
            <h2>Complete Marketing Playbook</h2>
            <p>Data-driven growth strategies that take apps from zero to $20K/month</p>
          </div>

          <div className="row g-5">
            <div className="col-lg-6">
              <h3 className="mb-4">Strategy 1: Influencer & UGC Campaigns</h3>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Why It Works</h5>
                  <p className="card-text">Leverage creators with existing audiences in your niche. Create relatable, viral content that feels natural and unprocessed.</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Execution</h5>
                  <ol className="card-text">
                    <li>Partner with creators in your niche</li>
                    <li>Goal: authentic user-friendly content</li>
                    <li>Track organic performance (views, engagement)</li>
                    <li>Convert top performers to paid ads</li>
                    <li>Build ad library from best creators</li>
                  </ol>
                </div>
              </div>

              <div className="card bg-success bg-opacity-10 border-success">
                <div className="card-body">
                  <h5 className="card-title"><i className="fas fa-chart-line"></i> UGC Results</h5>
                  <ul className="list-unstyled">
                    <li><strong>4x</strong> higher click-through rates</li>
                    <li><strong>50%</strong> lower cost-per-click</li>
                    <li><strong>25%</strong> lower CPM vs branded ads</li>
                    <li><strong>35%</strong> higher conversion vs studio content</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <h3 className="mb-4">Strategy 2: Facebook Ads</h3>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Master One Channel</h5>
                  <p className="card-text">Focus exclusively on Facebook to develop deep expertise. Spreading thin across multiple channels dilutes focus and prevents mastery.</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">The Algorithm Balance</h5>
                  <p className="card-text mb-2">Facebook&apos;s algorithm balances two goals:</p>
                  <ul className="card-text">
                    <li><strong>Advertiser Success:</strong> Ads must drive conversions</li>
                    <li><strong>User Experience:</strong> Ads must be entertaining enough to not interrupt</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-primary bg-opacity-10 border-primary">
                <div className="card-body">
                  <h5 className="card-title">Creative Best Practices</h5>
                  <ul className="list-unstyled text-small">
                    <li className="mb-2">✓ Bold colors, high contrast, human emotion</li>
                    <li className="mb-2">✓ Hook in first 0.5 seconds—problem + solution</li>
                    <li className="mb-2">✓ Balance entertainment with conversion intent</li>
                    <li className="mb-2">✓ Vertical mobile-optimized format</li>
                    <li>✓ Multiple angles + continuous testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Growth Flywheel */}
          <div className="mt-5 pt-5 border-top border-secondary">
            <h3 className="mb-4">The Growth Flywheel</h3>
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="card border-primary">
                  <div className="card-body">
                    <div className="row text-center g-4 pt-4 justify-content-center align-items-center">
                      <div className="col-auto">
                        <div className="mb-3">
                          <i className="fas fa-users fa-2x" style={{ color: 'var(--primary)' }}></i>
                        </div>
                        <p className="fw-bold">Influencer<br />Partnerships</p>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-arrow-right fa-2x" style={{ color: 'var(--tertiary)' }}></i>
                      </div>
                      <div className="col-auto">
                        <div className="mb-3">
                          <i className="fas fa-arrow-trend-up fa-2x" style={{ color: 'var(--secondary)' }} aria-hidden="true"></i>
                        </div>
                        <p className="fw-bold">Organic<br />Performance Data</p>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-arrow-right fa-2x" style={{ color: 'var(--tertiary)' }}></i>
                      </div>
                      <div className="col-auto">
                        <div className="mb-3">
                          <i className="fas fa-dollar-sign fa-2x" style={{ color: 'var(--success)' }}></i>
                        </div>
                        <p className="fw-bold">Paid<br />Scaling</p>
                      </div>
                    </div>
                    <p className="text-center mt-4 text-muted">
                      Increased scale → More data for optimization → Higher efficiency → Higher ad spend → Revenue growth
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monetization */}
      <section className="section bg-dark" id="monetization">
        <div className="container">
          <div className="section-header">
            <h2>Monetization Architecture</h2>
            <p>Subscription design and pricing optimization for maximum lifetime value</p>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Paywall Strategy</h5>
                </div>
                <div className="card-body">
                  <p className="card-text mb-3">
                    <strong>Dual Options:</strong> Present weekly and yearly plans
                  </p>
                  <p className="card-text mb-3">
                    <strong>Price Anchoring:</strong> Weekly plan makes annual plan appear valuable
                  </p>
                  <p className="card-text mb-3">
                    <strong>Annual Priority:</strong> Annual subscriptions generate highest LTV and reduce churn
                  </p>
                  <p className="card-text">
                    <strong>Social Proof:</strong> Include user counts and testimonials on paywall screens
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">RevenueCat Features</h5>
                </div>
                <div className="card-body">
                  <p className="card-text mb-3">
                    <strong>Remote Configuration:</strong> Change pricing without app store submission
                  </p>
                  <p className="card-text mb-3">
                    <strong>A/B Testing:</strong> Test price points, trial lengths, and offers simultaneously
                  </p>
                  <p className="card-text mb-3">
                    <strong>Full Analytics:</strong> Track conversion, retention, churn, and LTV across iOS and Android
                  </p>
                  <p className="card-text">
                    <strong>Unified Dashboard:</strong> Single source of truth vs App Store Connect + Google Play
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="mb-4">LTV Optimization Metrics</h3>
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">LTV Target</h5>
                    <p className="display-6" style={{ color: 'var(--success)' }}>3:1</p>
                    <p className="card-text">LTV to CAC Ratio minimum for healthy subscription app</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Best Metric</h5>
                    <p className="display-6" style={{ color: 'var(--secondary)' }}>Cohort</p>
                    <p className="card-text">Cohort-based retention reflects actual user behavior and is industry gold standard</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">Revenue Type</h5>
                    <p className="display-6" style={{ color: 'var(--primary)' }}>Net</p>
                    <p className="card-text">Calculate on net revenue (after fees, taxes, refunds), not gross</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="section" id="case-study">
        <div className="container">
          <div className="section-header">
            <h2>Case Study: Payout App</h2>
            <p>How the framework generated $20K/month in 50 days</p>
          </div>

          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h3>The App</h3>
              <p className="lead">
                A mobile app that helps users discover class-action lawsuits they qualify for, auto-fills claim details, and auto-generates PDFs to submit claims.
              </p>

              <div className="mb-4">
                <h5>Core Features (Just 3)</h5>
                <ul>
                  <li>Browse eligible lawsuits</li>
                  <li>Check eligibility requirements</li>
                  <li>Autofill & generate PDF claims</li>
                </ul>
              </div>

              <div className="mb-4">
                <h5>Why It Succeeded</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">✓ Taps core human desire: making money</li>
                  <li className="mb-2">✓ Obvious value: find money you&apos;re owed</li>
                  <li className="mb-2">✓ Easy purchase decision: pay to make more</li>
                  <li className="mb-2">✓ Simple features: realistic 14-day build</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card bg-primary bg-opacity-10 border-primary mb-4">
                <div className="card-body">
                  <h5 className="card-title">Performance Metrics</h5>
                  <div className="row text-center">
                    <div className="col-6 mb-3">
                      <div style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 700 }}>14</div>
                      <p className="card-text">Days to Build</p>
                    </div>
                    <div className="col-6 mb-3">
                      <div style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 700 }}>50</div>
                      <p className="card-text">Days to $20K/month</p>
                    </div>
                    <div className="col-6 mb-3">
                      <div style={{ fontSize: '2rem', color: 'var(--success)', fontWeight: 700 }}>12K+</div>
                      <p className="card-text">App Downloads</p>
                    </div>
                    <div className="col-6 mb-0">
                      <div style={{ fontSize: '2rem', color: 'var(--tertiary)', fontWeight: 700 }}>300+</div>
                      <p className="card-text">Subscriptions</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-success bg-opacity-10 border-success">
                <div className="card-body">
                  <h5 className="card-title">Additional Achievement</h5>
                  <p className="card-text">
                    Won first place in RevenueCat&apos;s Chipotle competition (55K+ entrants) and received $65K prize for highest growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="section bg-dark" id="takeaways">
        <div className="container">
          <div className="section-header">
            <h2>Key Takeaways</h2>
            <p>Principles for replicating this framework</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="badge badge-primary">1</span> Simplicity Wins
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Build 1-3 core features with exceptional onboarding. Most users never see beyond onboarding anyway, so focus your effort there.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="badge badge-primary">2</span> Revenue from Day 1
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Design for immediate monetization. If users won&apos;t pay for it immediately, the value prop isn&apos;t strong enough.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="badge badge-primary">3</span> Modify, Don&apos;t Innovate
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Prioritize variations of proven concepts. If competitors are already making money, demand is validated and risk is lower.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="badge badge-primary">4</span> AI Amplifies, Not Replaces
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Use AI to handle mechanical coding work. You still make all product decisions, design UX, define data structures, and review code.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="badge badge-primary">5</span> Master One Channel
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Develop deep expertise in a single growth channel rather than spreading effort across many. Mastery beats multi-channel mediocrity.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">
                    <span className="badge badge-primary">6</span> Ship & Iterate
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Don&apos;t wait for perfection. Ship to real users quickly, then iterate based on data. Speed to market beats polish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section" id="resources">
        <div className="container">
          <div className="section-header">
            <h2>Additional Resources</h2>
            <p>Tools, guides, and learning materials for implementation</p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-lg-3">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-video fa-3x mb-3" style={{ color: 'var(--primary)' }}></i>
                  <h5 className="card-title">Original Interview</h5>
                  <p className="card-text">Watch the full Starter Story interview with Connor Burd on YouTube</p>
                  <a href="https://www.youtube.com/watch?v=CwHD6Fg-Mjs" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Watch</a>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-book fa-3x mb-3" style={{ color: 'var(--secondary)' }}></i>
                  <h5 className="card-title">Bootstrap Docs</h5>
                  <p className="card-text">Official Bootstrap 5 documentation for component customization</p>
                  <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Learn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section className="section bg-dark" id="signup">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mb-3">Ready to Build Your App?</h2>
              <p className="text-secondary mb-4">Get tips on AI-powered development, marketing strategies, and app monetization.</p>
              <form className="signup-form" onSubmit={handleSubmit}>
                <div className="input-group input-group-lg mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your email" 
                    aria-label="Email address" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    name="email"
                  />
                  <button className="btn btn-primary" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
                <p className="text-muted small">No spam. Unsubscribe anytime.</p>
              </form>
              {message && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                  <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} aria-hidden="true"></i> {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row g-5">
            <div className="col-md-3">
              <div className="footer-section">
                <h5>Framework</h5>
                <a href="#framework">Overview</a>
                <a href="#process">Build Process</a>
                <a href="#prompting">AI Prompting</a>
                <a href="#takeaways">Principles</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-section">
                <h5>Technical</h5>
                <a href="#tech-stack">Tech Stack</a>
                <a href="#process">Vibe Coding</a>
                <a href="#monetization">Monetization</a>
                <a href="#resources">Resources</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-section">
                <h5>Growth</h5>
                <a href="#marketing">Marketing</a>
                <a href="#marketing">UGC Campaigns</a>
                <a href="#marketing">Facebook Ads</a>
                <a href="#case-study">Case Study</a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="footer-section">
                <h5>Creator</h5>
                <a href="https://www.linkedin.com/in/connor-burd-800482225/" target="_blank" rel="noopener noreferrer">Connor Burd</a>
                <a href="https://www.starterstory.com/" target="_blank" rel="noopener noreferrer">Starter Story</a>
                <a href="https://apps.apple.com/us/app/payout-claim-class-actions/id6748968935" target="_blank" rel="noopener noreferrer">Payout App</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Inspired by public interviews with founder Connor Burd; not affiliated with or endorsed by Connor Burd or Starter Story.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button 
        className={`scroll-to-top ${showScrollTop ? 'show' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
      >
        <i className="fas fa-arrow-up" aria-hidden="true"></i>
      </button>

      {/* Cookie Consent Banner */}
      {cookieConsent === false && (
        <div className="cookie-consent" role="dialog" aria-labelledby="cookieTitle" aria-describedby="cookieDesc">
          <div className="cookie-content">
            <p id="cookieDesc" className="mb-2"><strong id="cookieTitle">🍪 Cookie Notice</strong><br />We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-primary btn-sm" onClick={acceptCookies} aria-label="Accept cookies">Accept</button>
              <button className="btn btn-outline-light btn-sm" onClick={declineCookies} aria-label="Decline cookies">Decline</button>
              <a href="/privacy" className="btn btn-link btn-sm text-light" aria-label="View privacy policy">Privacy Policy</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
