import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble} from 'react-icons/bs'

function FooterComp() {
  return (
    <Footer className="border-t-8 border-teal-500">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex">
          <div className="mt-5">
            <Link
              to="/"
              className="text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Mojij's
              </span>
              Blog
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Mojij's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Mojij3010"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_blank"
                  rel="noopener norefferer"
                >
                  Terms and Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between mb-4">
            <Footer.Copyright
                href="#"
                by="Mojij's Blog"
                year={new Date().getFullYear()}
            />

            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook}/>
                <Footer.Icon href="#" icon={BsInstagram}/>
                <Footer.Icon href="#" icon={BsGithub}/>
                <Footer.Icon href="#" icon={BsDribbble}/>
                <Footer.Icon href="#" icon={BsTwitter}/>
            </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComp;
