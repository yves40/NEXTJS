import Image from "next/image";
import Card from "@/components/Card/Card";
import speed from '../../public/images/speedtriple.jpg'

export default function Home() {
  return (
    <main className=" max-w-5xl mx-auto">
      <h1 className=" text-2xl">Styles et optimisation</h1>
      <Card></Card>
      <Image src={speed} alt="The speed"/>
    </main>
  );
}
