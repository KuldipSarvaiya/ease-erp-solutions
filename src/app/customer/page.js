"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function CustomerPage() {
  return (
    <section className="lg:mx-8 mx-2 flex flex-col gap-5 text-balance">
      <div className="bg-[#10151D] w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[600px_1fr] xl:grid-cols-[800px_1fr]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#B2BECD]">
                  Crafted with Care: The Art of Garment Manufacturing
                </h1>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200   bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50   dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="/customer/products"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom lg:aspect-video/none lg:order-last"
              height="300"
              src="https://utfs.io/f/8556b9e8-6ccc-4823-8f9e-cf78ce70ba93-fgq4xx.png"
              width="600"
            />
          </div>
        </div>
      </div>
      <center
        style={{ background: "#10151D" }}
        className="w-full uppercase text-xl tracking-widest font-bold text-balance"
      >
        <Breadcrumbs radius="md" size="lg" variant="solid" color="foreground">
          <BreadcrumbItem isCurrent>fabric manufacturing</BreadcrumbItem>
          <BreadcrumbItem isCurrent>cleaning & finishing</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Dying & printing</BreadcrumbItem>
          <BreadcrumbItem isCurrent>cutting</BreadcrumbItem>
          <BreadcrumbItem isCurrent>sewing</BreadcrumbItem>
          <BreadcrumbItem isCurrent>packing & labeling</BreadcrumbItem>
        </Breadcrumbs>
      </center>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20"
        style={{
          background: "#10151D",
        }}
      >
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#B2BECD]">
              Fabric Manufacturing
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              The journey of our garments begins with the finest cotton. Our
              state-of-the-art manufacturing process ensures that every piece of
              fabric meets the highest standards of quality and durability.
            </p>
          </div>
        </div>
        <Image
          alt="Fabric Manufacturing"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://utfs.io/f/e1e9a50f-b60a-416c-80f2-9d9e8b0d502d-8nqkip.webp"
          width="700"
        />
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20"
        style={{
          background: "#10151D",
        }}
      >
        <Image
          alt="Fabric Cleaning"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://utfs.io/f/9dc3b7a1-e49a-4b6b-8938-4c9d9cb16b3f-9vd2gd.jpg"
          width="700"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#B2BECD]">
              Fabric Cleaning
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Cleanliness is the hallmark of quality. Our advanced cleaning
              process ensures that the fabric is free from impurities, making it
              soft, comfortable, and safe for your skin.
            </p>
          </div>
        </div>
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20"
        style={{
          background: "#10151D",
        }}
      >
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#B2BECD]">
              Creative Printing
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Our printing experts unleash their creativity to adorn the fabric
              with stunning designs. Whether it&#39;s vibrant patterns, elegant
              motifs, or custom artwork, our printing process brings your vision
              to life.
            </p>
          </div>
        </div>
        <Image
          alt="Creative Printing"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://utfs.io/f/e25624ae-3f97-4d3a-9a3c-68a82bd3905d-ssw41b.jpg"
          width="700"
        />
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20"
        style={{
          background: "#10151D",
        }}
      >
        <Image
          alt="Art of Sewing"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="/images/sewing.jpg"
          width="700"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#B2BECD]">
              Art of Sewing
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Every stitch is a testament to our dedication. Our skilled
              tailors, guided by precision and passion, transform the
              high-quality fabric into stylish and comfortable garments that
              elevate your fashion statement.
            </p>
          </div>
        </div>
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20"
        style={{
          background: "#10151D",
        }}
      >
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#B2BECD]">
              Packaging Perfection
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              We believe that the joy of receiving a garment should begin with
              the package. Our packaging experts ensure that every item is
              wrapped with care and attention to detail, ready to delight our
              customers.
            </p>
          </div>
        </div>
        <Image
          alt="Packaging Perfection"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://utfs.io/f/e00fe1de-d115-4b42-a621-225fb884ef21-tswiv7.png"
          width="700"
        />
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20 mb-10"
        style={{
          background: "#10151D",
        }}
      >
        <Image
          alt="Elegant Designs"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://utfs.io/f/077dda1e-0d7a-48bd-b4e0-021632912b4d-rhao2s.jpg"
          width="700"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#B2BECD]">
              Elegant Designs
            </h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Step into our showroom and experience the allure of our
              ready-to-wear collections. From casual chic to sophisticated
              elegance, our garments reflect the perfect blend of style,
              comfort, and quality.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
