"use client";
import { useState, useEffect, useRef } from "react";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { FaShuffle } from "react-icons/fa6";
import ReturnBtn from "../components/ReturnBtn";
import { FaPlus, FaTimes, FaPause, FaPlay } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { parseBlob } from "music-metadata-browser";
import Image from "next/image";
import Read_Audio_file from "../hooks/read_Audio_file";

const injectGlobalCss = (rule) => {
  const styleElement = document.createElement("style");
  styleElement.appendChild(document.createTextNode(rule));
  document.head.appendChild(styleElement);
};

const Page = () => {
  const [playlist, setPlaylist] = useState([]);
  const [current, setCurrent] = useState(null);
  const [travel, setTravel] = useState(0);
  const [travelDuration, setTravelDuration] = useState();
  const [pause, setPause] = useState(false);
  const [currentImgUrl, setCurrentImgUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);

  const inputRef = useRef(null);
  const titleRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const titleEl = titleRef.current;
    if (titleEl) {
      if (titleEl.clientWidth > 210) {
        setTravel(titleEl.clientWidth - 210);
        setTravelDuration((titleEl.clientWidth - 210) * 0.05);
      }
    }
  }, []);

  useEffect(() => {
    const keyframes = `
      @keyframes title {
        from {
          transform: translateX(0%);
        }
        to {
          transform: translateX(-${travel}px);
        }
      }
    `;
    injectGlobalCss(keyframes);
  }, [travel]);

  async function handleAddMusic(e) {
    const file = e.target.files[0];
    if (file) {
      try {
        const data = await parseBlob(file);
        const isDuplicate = playlist.some((song)=>{
          song.data.common.title === data.common.title &&
          song.data.common.artist === data.common.artist
        }) 

        if(!isDuplicate){
          setPlaylist([...playlist,{data,file}])
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (current) {
      const uint8array = current.data.common.picture[0].data;
      const blob = new Blob([uint8array], { type: "image" });
      const imgUrl = URL.createObjectURL(blob);
      setCurrentImgUrl(imgUrl);

      const response = Read_Audio_file(current.file).then((d) => {
        setAudioUrl(d);
      });
    }
  }, [current]);

  useEffect(() => {
    if (audioUrl) {
      audioRef.current.play();
    }
  }, [audioUrl]);

  useEffect(() => {
    if (current) {
      if (pause) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [pause]);

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  function shuffle() {
    const placeholder = [...playlist];
    for (let i = placeholder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [placeholder[i], placeholder[j]] = [placeholder[j], placeholder[i]];
    }
    setPlaylist([...placeholder]);
  }

  return (
    <div className="flex p-20 flex-col h-screen text-white w-full items-center gap-10 bg-gray-800 ">
      <ReturnBtn />
      <audio ref={audioRef} src={audioUrl && audioUrl} hidden></audio>
      <div className="bg-gray-900 h-fit min-h-96 w-[500px] flex flex-col items-center p-2 rounded-md">
        <h1 className="text-3xl font-bold border-y  w-full text-center">
          Music Player
        </h1>
        <button
          className="flex items-center gap-2 bg-gray-800 mt-2 cursor-pointer w-full justify-center my-1 p-2"
          onClick={() => {
            inputRef.current.click();
          }}
        >
          Add Music <FaPlus />
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          name=""
          id=""
          hidden
          onChange={handleAddMusic}
        />
        <div className="flex h-46 my-2 w-full bg-gray-800 gap-4 p-4">
          <div className="flex w-1/2  p-4 items-center justify-center text-7xl bg-gray-900">
            {currentImgUrl ? (
              <Image
                src={currentImgUrl}
                alt="image"
                className="h-full w-full"
                width={210}
                height={100}
              />
            ) : (
              <FaMusic />
            )}
          </div>
          <div className="bg-gray-900 p-2 flex flex-col justify-between w-1/2 ">
            <div className="truncate">
              <h1
                className="title w-fit text-xl font-semibold "
                ref={titleRef}
                style={{
                  animationName: "title",
                  animationDuration: ` ${travelDuration}s`,
                  animationIterationCount: "infinite",
                }}
              >
                {current && current.data.common.title}
              </h1>
              <h2 className="text-lg">
                {current && current.data.common.artist}
              </h2>
            </div>
            <div className="text-3xl py-3 *:cursor-pointer *:active:scale-90 *:hover:text-amber-600 flex items-center justify-between">
              <button
                onClick={() => {
                  const currentIndex = playlist.indexOf(current);
                  if (currentIndex == 0) {
                    setCurrent(playlist[playlist.length - 1]);
                  } else {
                    setCurrent(playlist[currentIndex - 1]);
                  }
                }}
              >
                <IoIosSkipBackward />
              </button>
              <button
                onClick={() => {
                  if (current) {
                    setPause(!pause);
                  }
                }}
              >
                {!pause ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={() => {
                  const currentIndex = playlist.indexOf(current);
                  if (currentIndex == playlist.length - 1) {
                    setCurrent(playlist[0]);
                  } else {
                    setCurrent(playlist[currentIndex + 1]);
                  }
                }}
              >
                <IoIosSkipForward />
              </button>
              <button onClick={shuffle}>
                <FaShuffle />
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold ">PlayList</h1>
        <div className="w-full">
          {playlist.map((song, i) => (
            <div
              key={i}
              className="flex *:truncate duration-400  justify-center gap-3 py-1 w-full text-md hover:bg-white hover:text-black"
              onClick={() => {
                setCurrent(song);
              }}
            >
              <p className="w-[45%]">{song.data.common.title}</p>
              <p className="w-[35%]">{song.data.common.artist}</p>
              <p>{(song.data.format.duration / 60).toFixed(2)}</p>
              <button
                className="w-fit hover:border hover:bg-black active:scale-95 hover:text-white hover:p-1 hover:rounded-full"
                onClick={() => {
                  setPlaylist(playlist.filter((_, index) => index != i));
                }}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
