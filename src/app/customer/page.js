import Link from "next/link";

export default function CustomerPage() {
  return (
    <section className="lg:mx-8">
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
            <img
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom lg:aspect-video/none lg:order-last"
              height="300"
              src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
              width="600"
            />
          </div>
        </div>
      </div>
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
        <img
          alt="Fabric Manufacturing"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
          width="700"
        />
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20"
        style={{
          background: "#10151D",
        }}
      >
        <img
          alt="Fabric Cleaning"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
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
              with stunning designs. Whether it's vibrant patterns, elegant
              motifs, or custom artwork, our printing process brings your vision
              to life.
            </p>
          </div>
        </div>
        <img
          alt="Creative Printing"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
          width="700"
        />
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20"
        style={{
          background: "#10151D",
        }}
      >
        <img
          alt="Art of Sewing"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
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
        <img
          alt="Packaging Perfection"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
          width="700"
        />
      </section>
      <section
        className="grid gap-12 lg:grid-cols-2 xl:gap-20 mb-10"
        style={{
          background: "#10151D",
        }}
      >
        <img
          alt="Elegant Designs"
          className="aspect-video rounded-lg overflow-hidden object-center object-cover"
          height="350"
          src="https://media.istockphoto.com/id/1322220448/photo/abstract-digital-futuristic-eye.jpg?s=612x612&w=0&k=20&c=oAMmGJxyTTNW0XcttULhkp5IxfW9ZTaoVdVwI2KwK5s="
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
