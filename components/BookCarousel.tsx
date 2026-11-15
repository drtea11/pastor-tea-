"use client";

import { useRef, useState } from "react";
import { BookCard } from "./Cards";

type Book = {
  title: string;
  image?: string;
  alt: string;
};

type BookCarouselProps = {
  books: Book[];
};

export function BookCarousel({ books }: BookCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeBookIndex, setActiveBookIndex] = useState(0);

  function updateActiveBook() {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const card = scroller.querySelector<HTMLElement>("[data-book-card]");
    const cardWidth = card?.offsetWidth ?? 252;
    const styles = window.getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
    const nextIndex = Math.round(scroller.scrollLeft / (cardWidth + gap));

    setActiveBookIndex(Math.max(0, Math.min(books.length - 1, nextIndex)));
  }

  function scrollToBook(index: number) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const card = scroller.querySelector<HTMLElement>("[data-book-card]");
    const cardWidth = card?.offsetWidth ?? 252;
    const styles = window.getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;

    scroller.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth"
    });
    setActiveBookIndex(index);
  }

  return (
    <>
      <div
        ref={scrollerRef}
        onScroll={updateActiveBook}
        className="mt-12 flex max-w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] lg:gap-7 [&::-webkit-scrollbar]:hidden"
      >
        {books.map((book) => (
          <div
            key={book.title}
            data-book-card
            className="w-[15.75rem] max-w-[74vw] shrink-0 snap-start lg:w-[17rem]"
          >
            <BookCard {...book} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2" aria-label="Book carousel navigation">
        {books.map((book, index) => (
          <button
            key={book.title}
            type="button"
            aria-label={`Show book ${index + 1}`}
            aria-current={activeBookIndex === index ? "true" : undefined}
            onClick={() => scrollToBook(index)}
            className={`h-2 rounded-full transition ${
              activeBookIndex === index ? "w-8 bg-brand-blue" : "w-2 bg-black/18 hover:bg-black/35"
            }`}
          />
        ))}
      </div>
    </>
  );
}
