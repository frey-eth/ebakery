import StarAnimation from "@/components/background";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col ">
      <div className="flex-1 flex flex-col">
        <div className="text-decoration-none">
          <h1 className="connect-footer font-pixel my-5 text-white text-center p-5 font-bold text-[60px] md:text-[200px] font-sanctuary uppercase relative">
            Launch your favorite meme
          </h1>
        </div>
      </div>
      <StarAnimation />
    </div>
  );
}
