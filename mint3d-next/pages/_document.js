import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className="bg-black font-primary bg-[url('/3D_logo_Final.png')] bg-cover bg-center bg-no-repeat min-h-max">
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 -z-50 min-h-max'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
