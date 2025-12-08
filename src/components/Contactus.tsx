"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactUs() {
  return (
    <section className="w-full max-w-lg mx-auto mt-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Contact Us
      </h1>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            type="text"
            placeholder="Your name"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            placeholder="Your email"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <Textarea
            placeholder="Your message..."
            className="w-full min-h-[120px]"
          />
        </div>

        <Button className="w-fit rounded-lg mx-auto px-8 py-4 bg-blue-800 text-white">Send Message</Button>
      </form>
    </section>
  );
}