"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchBarContext, SearchContextInterface } from "@/lib/SearchContext";
import WebView from "@/lib/Webview";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [browseMe,setBrowseMe] = useState<string>("");
  const { searchUrl,setSearchUrl } = useContext(SearchBarContext) as SearchContextInterface;
  return (
    <div className="h-screen w-screen border-[#5757E8] border-8">
      <div className="justify-center items-center ml-[290px] h-full">
        {searchUrl == "browse.me" ? (
          <div className="flex flex-row space-x-2 p-10">
            <Input type="text"  onChange={(input)=>{
              setBrowseMe(input.target.value);
            }} placeholder="Browse for me... !" />
            <Button className="gap-1 " onClick={()=>{browseMe!="" && setSearchUrl(browseMe)}}>
              search
              <ArrowRightIcon />
            </Button>
          </div>
        ) : (
          <WebView src={searchUrl=='browse.me' ? 'https://google.com' : searchUrl} />
        )}
      </div>
    </div>
  );
}
