import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Reveal from "@/components/animation/Reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/productCategories";

const SLOW_EASE = "power2.out";

const ProductDetail = () => {
  const { pathname } = useLocation();
  const { productSlug } = useParams<{ productSlug: string }>();
  const categorySlug = pathname.split("/").filter(Boolean)[0];
  const result = categorySlug && productSlug ? getProductBySlug(categorySlug, productSlug) : undefined;

  if (!result) {
    return <Navigate to="/products" replace />;
  }

  const { category, product } = result;
  const Icon = product.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section
          data-header-hero
          className="relative min-h-[60svh] box-border pt-20 flex items-center overflow-hidden scroll-mt-24 lg:scroll-mt-28"
        >
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${product.image})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

          <div className="container-main relative grid items-center justify-items-center text-center">
            <Reveal
              className="max-w-3xl mx-auto"
              variant="fade-up"
              data-anim-start="top 94%"
              data-anim-duration="1.6"
              data-anim-ease={SLOW_EASE}
            >
              <Link
                to={`/${category.slug}`}
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to {category.shortName}
              </Link>
              <span className="text-sm md:text-base tracking-[0.35em] uppercase text-white/85 font-medium block">
                {product.tagline}
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl font-bold leading-tight text-white">
                {product.name}
              </h1>
              <p className="mt-6 text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">
                {product.subtitle}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main">
            <Reveal
              data-anim-start="top 90%"
              data-anim-duration="1.45"
              data-anim-ease={SLOW_EASE}
              className="group grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl bg-black">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  {product.tagline}
                </span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  {product.name}
                </h2>
                <p className="mt-2 text-base lg:text-lg font-medium italic text-foreground/80 leading-relaxed">
                  {product.subtitle}
                </p>
                <p className="mt-4 text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 gap-3 mb-6 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Applications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span
                        key={app}
                        className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild className="group">
                    <Link to="/contact">
                      Enquire Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to={`/${category.slug}`}>View all {category.shortName}</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
