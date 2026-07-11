export interface ZigflyNavItem {
  name: string;
  path: string;
}

const zigflyMenu: ZigflyNavItem[] = [
  { name: "Home", path: "/zigfly" },
  { name: "About", path: "/zigfly/about" },
  { name: "Products", path: "/zigfly/products" },
  { name: "Testimonials", path: "/zigfly/testimonials" },
  { name: "Contact", path: "/zigfly/contact" },
];

export default zigflyMenu;
