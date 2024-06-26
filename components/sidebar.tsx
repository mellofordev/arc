"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ReloadIcon,
  FileIcon,
  PlusIcon,
  GearIcon,
  BlendingModeIcon,
} from "@radix-ui/react-icons";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useContext, useEffect, useState, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SearchBarContext, SearchContextInterface } from "@/lib/SearchContext";
import { validUrl } from "@/lib/validUrl";
import { santizeUrl } from "@/lib/santizeUrl";
import Spotlight from "./spotlight";
import Arc from "@/public/arc_logo.png";
import {v4} from 'uuid';
import TabComponent from "./tabs";
import { ScrollArea } from "./ui/scroll-area";
export default function Sidebar() {

  const { searchUrl, setSearchUrl, webviewRef,tabObjs,setTabObjs } = useContext(
    SearchBarContext
  ) as SearchContextInterface;
  const [sideBarSearch, setSideBarSearch] = useState(searchUrl);

  const activeTabStyle = "h-[50px] bg-slate-500 border-slate-500";
  const defaultTabStyle = "h-[50px] bg-transparent border-transparent";
  const [tabID, setTabID] = useState<string>("");
  const addTab = () => {
    // var newTabID = tabID + 1;
    var newTabID = v4();
    setTabObjs((prevTabObjs) => [
      ...prevTabObjs,
      { name: "browse.me", url: "browse.me", presentId: newTabID },
    ]);
    setTabID(newTabID);
    setSideBarSearch("browse.me");
    setSearchUrl("browse.me");
  };
  const modifyTab = () => {
    console.log("modify", searchUrl);
    setTabObjs((prevTabObjs) => {
      const updatedTabs = prevTabObjs.map((tab) => {
        if (tab.presentId === tabID) {
          return { ...tab, name:searchUrl , url: searchUrl };
        }
        return tab;
      });

      return updatedTabs;
    });
  };
  useEffect(() => {
    modifyTab();
  }, [searchUrl]);
  
  return (
    <header className="header">
      <nav className="nav justify-between">
        <div>
          <div className="p-[10px] flex flex-row justify-between m-[5px] gap-10">
            {/* <h1 className="font-bold text-[20px]">ava</h1> */}
            <img alt="Arc logo" src={Arc.src} className="h-6 w-6 mt-2" />
            <div className="flex flex-row space-x-2">
              <Spotlight />
              <Button
                variant="ghost"
                onClick={() => {
                  addTab();
                }}
              >
                <PlusIcon />
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  webviewRef.current?.goBack();
                }}
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  webviewRef.current?.goForward();
                }}
              >
                <ArrowRightIcon />
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  webviewRef.current?.reload();
                }}
              >
                <ReloadIcon />
              </Button>
            </div>
          </div>
          <div className="m-5">
            <Input
              type="text"
              className="bg-slate-400 rounded-lg border-2 focus:border-slate-500 "
              value={sideBarSearch}
              onChange={(input) => {
                setSideBarSearch(input.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key == "Enter") {
                  validUrl(sideBarSearch) == true
                    ? setSearchUrl(santizeUrl(sideBarSearch))
                    : setSearchUrl(
                        `https://google.com/search?q=${sideBarSearch}`
                      );
                  console.log("make context", searchUrl);
                }
              }}
            />
              <div className="flex flex-row gap-1 handle">
                {[
                  {
                    icon: <FaInstagram size={20} />,
                    url: "https://instagram.com",
                  },
                  { icon: <SiGmail size={20} />, url: "https://gmail.com" },
                  { icon: <FaYoutube size={20} />, url: "https://youtube.com" },
                  {
                    icon: <FaSpotify size={20} />,
                    url: "https://open.spotify.com",
                  },
                ].map((bookmark, index) => {
                  return (
                    <Card
                      className="h-[55px] w-[55px] m-1 justify-items-center bg-slate-400 text-white border-transparent cursor-pointer"
                      key={index}
                      onClick={() => setSearchUrl(bookmark.url)}
                    >
                      <CardHeader className="h-[53px] w-[53px] rounded-lg text-center p-4 backdrop-blur-[30px]">
                        {bookmark.icon}
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
          </div>
            <ScrollArea className="h-[500px]">
            {tabObjs.map((tab) => {
              console.log("render")
              return ( 
                <TabComponent 
                  tab={tab} 
                  tabID={tabID} 
                  setTabID={setTabID}
                  setSearchUrl={setSearchUrl}
                  setSideBarSearch={setSideBarSearch}
                  defaultTabStyle={defaultTabStyle}
                  activeTabStyle={activeTabStyle}
                  webRef={webviewRef}
                />
              );
            })}
            </ScrollArea>
          
        </div>
        <div className="flex flex-row justify-between m-5 ">
          <Button variant={"link"}>
            <GearIcon className="text-white" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="link">
                <BlendingModeIcon className="text-white" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="h-[300px] w-60 ml-40">
              <div>
                <h1>select theme</h1>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
}
