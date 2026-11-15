export type Book = {
  title: string;
  summary: string;
  image?: string;
  alt: string;
  href: string;
};

export type BookWithImage = Book & {
  image: string;
};

const bookOrderPhoneNumber = "2348038160726";

function bookOrderHref(title: string) {
  const message = `Hello Dr. TEA, I would like to get the book: ${title}.\n\nMy name is:`;

  return `https://wa.me/${bookOrderPhoneNumber}?text=${encodeURIComponent(message)}`;
}

export const books: Book[] = [
  {
    title: "85 Wisdom Keys for World Changers",
    summary: "Practical wisdom for purpose, leadership, and transformational impact.",
    image: "/images/85-wisdom-keys-luxury-cover.svg",
    alt: "85 Wisdom Keys for World Changers book cover",
    href: bookOrderHref("85 Wisdom Keys for World Changers")
  },
  {
    title: "Overcoming the Forces Against Your Life",
    summary: "Insight for breaking resistance and rising with clarity and courage.",
    image: "/images/overcoming-forces-luxury-cover.svg",
    alt: "Overcoming the Forces Against Your Life book cover",
    href: bookOrderHref("Overcoming the Forces Against Your Life")
  },
  {
    title: "Ignite Capsules",
    summary: "Short transformational wisdom to awaken faith, purpose, and inner fire.",
    image: "/images/ignite-capsules-luxury-cover.svg",
    alt: "Ignite Capsules book cover",
    href: bookOrderHref("Ignite Capsules")
  },
  {
    title: "Setting the Stage for a Revival",
    summary: "A call for revival fire, awakening, spiritual hunger, and renewed devotion.",
    image: "/images/setting the stage .jpg",
    alt: "Setting the Stage for a Revival book cover",
    href: bookOrderHref("Setting the Stage for a Revival")
  },
  {
    title: "Mind Shift",
    summary: "Radical tools for productivity, disciplined thinking, and meaningful results.",
    image: "/images/mind shift.jpg",
    alt: "Mind Shift book cover",
    href: bookOrderHref("Mind Shift")
  },
  {
    title: "Heal Your Past, Change Your Future",
    summary: "A transformational guide for healing, renewal, and forward movement.",
    image: "/images/heal your past real .jpg",
    alt: "Heal Your Past, Change Your Future book cover",
    href: bookOrderHref("Heal Your Past, Change Your Future")
  },
  {
    title: "7 Days Prayer Guide",
    summary: "A prayer guide for receiving the sure mercies of God.",
    image: "/images/7 days prayer.jpg",
    alt: "7 Days Prayer Guide book cover",
    href: bookOrderHref("7 Days Prayer Guide")
  },
  {
    title: "The Force of Advancement",
    summary: "Insight for breaking limitation and stepping into meaningful progress.",
    image: "/images/new the force of advancements.png",
    alt: "The Force of Advancement book cover",
    href: bookOrderHref("The Force of Advancement")
  }
];

export const megaMenuBooks: BookWithImage[] = [
  books.find((book) => book.title === "Mind Shift"),
  books.find((book) => book.title === "Heal Your Past, Change Your Future"),
  books.find((book) => book.title === "7 Days Prayer Guide"),
  books.find((book) => book.title === "The Force of Advancement")
].filter((book): book is BookWithImage => Boolean(book?.image));
