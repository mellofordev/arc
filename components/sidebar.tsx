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
import { Card, CardHeader } from "./ui/card";
import { useContext, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { SearchBarContext, SearchContextInterface } from "@/lib/SearchContext";
export default function Sidebar() {
  interface Tabs {
    name: string;
    url: string;
    presentId: number;
  }
  const activeTabStyle = "h-[50px] bg-slate-500 border-slate-500";
  const defaultTabStyle = "bg-transparent border-transparent";
  const [tabObjs, setTabObjs] = useState<Tabs[]>([
    { name: "new tab", url: "", presentId: 1 },
  ]);
  const [tabID, setTabID] = useState<number>(1);
  const addTab = () => {
    const newTabID = tabID + 1;
    setTabObjs((prevTabObjs) => [
      ...prevTabObjs,
      { name: "new tab", url: "", presentId: newTabID },
    ]);
    setTabID(newTabID);
  };
  const { searchUrl, setSearchUrl } = useContext(
    SearchBarContext
  ) as SearchContextInterface;
  return (
    <header className="header">
      <nav className="nav justify-between">
        <div>
          <div className="p-[10px] flex flex-row gap-10 m-[5px]">
            <h1 className="font-bold text-[20px]">ava</h1>
            <div className="flex flex-row space-x-2">
              <Button
                variant="ghost"
                onClick={() => {
                  addTab();
                }}
              >
                <PlusIcon />
              </Button>
              <Button variant="ghost">
                <ArrowLeftIcon />
              </Button>
              <Button variant="ghost">
                <ArrowRightIcon />
              </Button>
              <Button variant="ghost">
                <ReloadIcon />
              </Button>
            </div>
          </div>
          <div className="m-5">
            <Input
              type="text"
              className="bg-slate-400 rounded-lg border-2 focus:border-slate-500 "
              value={searchUrl}
              onChange={(input) => {
                setSearchUrl(input.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key == "Enter")
                  console.log("make context", searchUrl);
              }}
            />
            <div className="flex flex-row gap-1">
              {[
                <FaInstagram size={20} />,
                <SiGmail size={20} />,
                <FaYoutube size={20} />,
                <FaSpotify size={20} />,
              ].map((bookmark, index) => {
                return (
                  <Card
                    className="h-[55px] w-[55px] m-1 justify-items-center bg-slate-400 text-white border-transparent"
                    key={index}
                  >
                    <CardHeader className="h-[53px] w-[53px] rounded-lg text-center p-4 backdrop-blur-[30px]">
                      {bookmark}
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
          {tabObjs.map((tab) => {
            console.log(tabObjs);
            if (tab.presentId != tabID) {
              return (
                <Card
                  className={`m-3 justify-items-center text-white ${defaultTabStyle}`}
                  key={tab.presentId}
                >
                  <CardHeader className="rounded-lg flex flex-row gap-2 p-3 leading-3">
                    <FileIcon height={20} width={20} />
                    <h1 className="font-bold">{tab.name}</h1>
                  </CardHeader>
                </Card>
              );
            } else {
              return (
                <Card className="h-[50px] m-3 justify-items-center bg-slate-500 text-white border-slate-500">
                  <CardHeader className="h-[49px] rounded-lg border-2 border-slate-500 backdrop-blur-[30px] flex flex-row gap-2 p-3 leading-3">
                    <FileIcon height={20} width={20} />
                    <h1 className="font-bold">{tab.name}</h1>
                  </CardHeader>
                </Card>
              );
            }
          })}
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
