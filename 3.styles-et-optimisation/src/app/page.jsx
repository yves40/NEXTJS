import Image from "next/image";
import Card from "@/components/Card/Card";
import speed from '../../public/images/speedtriple.jpg'

export default function Home() {
  return (
    <main className=" max-w-5xl mx-auto">
      <h1 className=" text-2xl">Styles et optimisation</h1>
      <Card></Card>
      <Image src={speed} alt="The speed" sizes="
      (max-width: 500px) 500px,
      (max-width: 800px) 800px,
      (max-width: 1080px) 1080px,
      4096px" className=" border-none rounded-2xl"/>
    </main>
  );
}
