"use client";

import React from "react";
import { Mail, Phone, MapPin, ArrowUpRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const ContactSection = () => {
  return (
    <div className="p-6 md:p-16 min-h-screen font-mono bg-gradient-to-b from-white to-gray-100 text-black">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
            Let&apos;s connect
          </h2>
          <p className="text-gray-500 mt-3 text-sm md:text-base">
            Have a project or idea? Let’s build something amazing together.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* LEFT FORM */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-xl space-y-6">

            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Name" placeholder="Your Name" />
              <FormInput label="Email" placeholder="Your Email" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Address" placeholder="Your Address" />

              <div className="space-y-2">
                <label className="text-sm text-gray-600">Phone</label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 h-12 bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-400">
                  <span className="text-sm border-r border-gray-300 pr-2 mr-2">
                    🇧🇩 +880
                  </span>
                  <input
                    placeholder="Your Phone"
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>
            </div>

            <FormInput label="Subject" placeholder="Subject" />

            <div className="space-y-2">
              <label className="text-sm text-gray-600">Message</label>
              <Textarea
                placeholder="Write your message..."
                className="border border-gray-300 bg-gray-50 focus:border-emerald-400 min-h-[150px]"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="terms"
                className="border-gray-400 data-[state=checked]:bg-emerald-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-500">
                I agree to the Terms and Privacy Policy
              </label>
            </div>

            <Button className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
              Send Message <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          {/* RIGHT CONTACT */}
          <div className="p-6 md:p-8 rounded-2xl border border-gray-200 bg-white shadow-xl flex flex-col justify-center gap-8">

            <ContactInfoItem icon={<Phone />} label="Phone" value="+1-234-567-8901" />
            <ContactInfoItem icon={<Mail />} label="Email" value="contact@botble.com" />
            <ContactInfoItem icon={<X />} label="X (Twitter)" value="Botble Technologies" />
            <ContactInfoItem icon={<MapPin />} label="Address" value="0811 Erdman Prairie, Joaville CA" />

          </div>

        </div>
      </div>
    </div>
  );
};

/* Reusable Input */
const FormInput = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-600">{label}</label>
    <Input
      placeholder={placeholder}
      className="border border-gray-300 bg-gray-50 focus:border-emerald-400 h-12"
    />
  </div>
);

/* Contact Info Item */
const ContactInfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-4 group">
    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 group-hover:border-emerald-500 transition">
      <div className="text-emerald-500">{icon}</div>
    </div>

    <div>
      <p className="text-xs text-gray-500 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default ContactSection;