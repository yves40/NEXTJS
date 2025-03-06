import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className=" lg:max-w-xl lg:mx-auto">
        <h1 className="text-center mt-10 mb-10 text-4xl text-blue-600 italic font-semibold">This is the main page.jsx</h1>
        <p className=" mx-10">
          Often called the landing page. When requesting the / path, the user
          will see that page.
          From there he can navigate to any authorized page, depending on the profile he's been assigned.
          Profiles may be : 
          <ul className=" mx-32 my-6">
            <li>Administrator</li>
            <li>Guest</li>
            <li>Registered customer</li>
            <li>Developer</li>
          </ul>
        </p>
      </div>
    </div>
  );
}
